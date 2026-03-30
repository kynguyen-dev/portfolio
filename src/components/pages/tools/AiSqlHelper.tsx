import { useState, useRef, useEffect } from 'react';
import {
  PaperPlaneTiltIcon,
  CopyIcon,
  SparkleIcon,
  BugIcon,
  CircleNotchIcon,
  XIcon,
  WarningCircleIcon,
} from '@phosphor-icons/react';
import ToolPageLayout from './ToolPageLayout';
import { PFTypography, PFButton } from '@components/core';
import { animated, useTransition, useSpring } from '@react-spring/web';
import { useTranslation } from 'react-i18next';
import { cn } from '@utils/core/cn';

interface Message {
  role: 'user' | 'ai';
  content: string;
}

interface GeminiModel {
  name: string;
  version: string;
  displayName: string;
  description: string;
  inputTokenLimit: number;
  outputTokenLimit: number;
  supportedGenerationMethods: string[];
}

interface GeminiModelsResponse {
  models: GeminiModel[];
}

interface GeminiCandidate {
  content: {
    parts: {
      text: string;
    }[];
  };
}

interface GeminiResponse {
  candidates: GeminiCandidate[];
  error?: {
    message: string;
  };
}

const SYSTEM_INSTRUCTIONS = `You are a Senior SQL Expert and Database Architect. 
Provide optimized SQL queries (using best practices like indexing, avoiding SELECT *) or detailed App Plans.
Support Vietnamese, English, and Japanese. Always format SQL in markdown code blocks.`;

const AiSqlHelper = () => {
  const { t } = useTranslation();
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isKeyValid, setIsKeyValid] = useState<boolean | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  useEffect(() => {
    const validateKey = async () => {
      if (!apiKey) {
        setIsKeyValid(false);
        setMessages([
          {
            role: 'ai',
            content: t('tools.items.aiSqlHelper.apiKeyMissing'),
          },
        ]);
        return;
      }

      try {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`
        );
        if (response.ok) {
          setIsKeyValid(true);
          setMessages([
            {
              role: 'ai',
              content: t('tools.items.aiSqlHelper.connected'),
            },
          ]);
        } else {
          setIsKeyValid(false);
          const data = await response.json();
          const errorDetail = data.error?.message || 'Unauthorized';
          setMessages([
            {
              role: 'ai',
              content: t('tools.items.aiSqlHelper.connectionFailed', {
                error: errorDetail,
              }),
            },
          ]);
        }
      } catch {
        setIsKeyValid(false);
        setMessages([
          {
            role: 'ai',
            content: t('tools.items.aiSqlHelper.networkError'),
          },
        ]);
      }
    };

    validateKey();
  }, [apiKey]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const debugModels = async () => {
    if (!apiKey) return;
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`
      );
      const data = (await response.json()) as GeminiModelsResponse;
      if (data.models) {
        const modelNames = data.models
          .map(m => m.name.replace('models/', ''))
          .join(', ');
        setMessages(prev => [
          ...prev,
          { role: 'ai', content: `DEBUG: Your key supports: ${modelNames}` },
        ]);
      }
    } catch (e) {
      const error = e as Error;
      setErrorMsg('Debug failed: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    if (!apiKey) {
      setErrorMsg('API Key missing.');
      return;
    }

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `${SYSTEM_INSTRUCTIONS}\n\nUser Request: ${input}`,
                  },
                ],
              },
            ],
          }),
        }
      );

      const data = (await response.json()) as GeminiResponse;
      if (!response.ok)
        throw new Error(data.error?.message || `Error ${response.status}`);

      const text = data.candidates[0].content.parts[0].text;
      setMessages(prev => [...prev, { role: 'ai', content: text }]);
    } catch (error) {
      const err = error as Error;
      setErrorMsg(`Failed: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text.replace(/```sql|```/g, '').trim());
  };

  const errorTransition = useTransition(errorMsg, {
    from: { opacity: 0, y: 50 },
    enter: { opacity: 1, y: 0 },
    leave: { opacity: 0, y: 50 },
  });

  return (
    <ToolPageLayout
      title='AI SQL Assistant'
      emoji='🤖'
      description='Expert Database Mode Powered by Gemini 2.0. Optimized for high-performance query generation and architectural planning.'
    >
      <div
        className={cn(
          'w-full max-w-[1000px] h-[650px] flex flex-col glass-panel rounded-2xl overflow-hidden mt-8 transition-all duration-500 ambient-shadow border-ct-outline-variant/10 mx-auto text-left'
        )}
      >
        {/* Header */}
        <div className='px-6 py-4 border-b border-ct-outline-variant/10 flex justify-between items-center bg-ct-surface-container-low/40'>
          <div className='flex items-center gap-3'>
            <div className='p-2 rounded-lg bg-primary-main/10'>
              <SparkleIcon
                className='w-5 h-5 text-primary-main'
                weight='fill'
              />
            </div>
            <div className='flex flex-col items-start'>
              <PFTypography
                variant='subtitle2'
                className={cn(
                  'font-black tracking-[0.2em] uppercase text-xs',
                  isKeyValid === true
                    ? 'text-primary-main'
                    : isKeyValid === false
                      ? 'text-red-500'
                      : 'text-ct-on-surface-variant/40'
                )}
              >
                Gemini 2.0 Flash
              </PFTypography>
              <span
                className={cn(
                  'text-[10px] font-label-grotesk tracking-wider',
                  isKeyValid === true
                    ? 'text-ct-on-surface-variant/60'
                    : isKeyValid === false
                      ? 'text-red-500/60'
                      : 'text-ct-on-surface-variant/30'
                )}
              >
                [ STATUS:{' '}
                {isKeyValid === true
                  ? 'OPERATIONAL'
                  : isKeyValid === false
                    ? 'OFFLINE_ERR'
                    : 'SYNCHRONIZING...'}{' '}
                ]
              </span>
            </div>
          </div>
          <button
            onClick={debugModels}
            className='p-2 rounded-lg hover:bg-ct-surface-container-high text-ct-on-surface-variant opacity-40 hover:opacity-100 transition-all cursor-pointer'
            title='Debug Models'
          >
            <BugIcon className='w-5 h-5' />
          </button>
        </div>

        {/* Chat Area */}
        <div
          ref={scrollRef}
          className='flex-grow overflow-y-auto p-8 flex flex-col gap-6 scrollbar-none'
        >
          {messages.map((msg, index) => (
            <MessageBubble key={index} msg={msg} onCopy={copyToClipboard} />
          ))}
          {isLoading && (
            <div className='self-center mt-4 flex items-center gap-3 text-primary-main glass-panel px-4 py-2 rounded-full animate-pulse'>
              <CircleNotchIcon className='w-4 h-4 animate-spin' weight='bold' />
              <span className='text-[10px] font-black tracking-widest uppercase'>
                Neural Link Processing...
              </span>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className='p-6 bg-ct-surface-container-lowest/30 border-t border-ct-outline-variant/10 backdrop-blur-md'>
          <div className='flex gap-4 items-end'>
            <div className='relative flex-grow group'>
              <textarea
                className={cn(
                  'w-full p-4 rounded-xl bg-ct-surface-container-low/50 border border-ct-outline-variant/20 focus:outline-none focus:ring-2 focus:ring-primary-main/30 transition-all resize-none min-h-[56px] max-h-32 text-sm font-sans placeholder:text-ct-on-surface-variant/30 text-ct-on-surface'
                )}
                placeholder='Execute architectural query...'
                rows={1}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
              />
              <div className='absolute right-4 bottom-4 text-[10px] font-black text-ct-on-surface-variant/20 tracking-tighter pointer-events-none group-focus-within:text-primary-main/40 transition-colors'>
                SHIFT + ENTER FOR NEW LINE
              </div>
            </div>
            <PFButton
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className='h-14 w-14 rounded-xl p-0 flex items-center justify-center shrink-0 shadow-lg shadow-primary-main/10 bg-primary-main hover:bg-primary-dark transition-all'
              magnet
            >
              <PaperPlaneTiltIcon
                className='w-6 h-6 text-primary-contrast'
                weight='bold'
              />
            </PFButton>
          </div>
        </div>
      </div>

      {/* Error Toast */}
      {errorTransition((style, msg) =>
        msg ? (
          <animated.div
            style={style}
            className='fixed bottom-8 left-1/2 -translate-x-1/2 z-[200000]'
          >
            <div className='bg-red-500/90 backdrop-blur-md text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 border border-red-400/20'>
              <WarningCircleIcon className='w-5 h-5' weight='bold' />
              <span className='text-xs font-bold tracking-wide uppercase'>
                {msg}
              </span>
              <button
                onClick={() => setErrorMsg(null)}
                className='p-1 hover:bg-white/10 rounded-lg cursor-pointer'
              >
                <XIcon className='w-4 h-4' weight='bold' />
              </button>
            </div>
          </animated.div>
        ) : null
      )}
    </ToolPageLayout>
  );
};

/** Animated chat message bubble */
const MessageBubble = ({
  msg,
  onCopy,
}: {
  msg: Message;
  onCopy: (text: string) => void;
}) => {
  const spring = useSpring({
    from: { opacity: 0, y: 20, scale: 0.98 },
    to: { opacity: 1, y: 0, scale: 1 },
    config: { tension: 280, friction: 20 },
  });

  const isAI = msg.role === 'ai';

  return (
    <animated.div
      style={spring}
      className={cn(
        'max-w-[85%] relative group transition-all',
        !isAI ? 'self-end' : 'self-start'
      )}
    >
      <div
        className={cn(
          'p-5 rounded-2xl transition-all relative overflow-hidden',
          !isAI
            ? 'bg-primary-main text-primary-contrast shadow-lg shadow-primary-main/10 rounded-tr-none'
            : 'glass-elevated text-ct-on-surface border border-ct-outline-variant/10 rounded-tl-none'
        )}
      >
        <div
          className={cn(
            'text-[10px] font-black tracking-[0.2em] uppercase mb-2 opacity-50 text-left',
            !isAI ? 'text-primary-contrast' : 'text-primary-main'
          )}
        >
          {isAI ? '// ARCHITECT_AI' : '// USER_PROMPT'}
        </div>
        <PFTypography
          variant='body2'
          className={cn(
            'whitespace-pre-wrap leading-relaxed font-sans text-[13px] md:text-sm text-left',
            !isAI ? 'font-medium' : 'font-normal'
          )}
        >
          {msg.content}
        </PFTypography>

        {isAI && (
          <button
            onClick={() => onCopy(msg.content)}
            className='absolute top-4 right-4 p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-all hover:bg-ct-surface-container-highest text-ct-on-surface-variant cursor-pointer'
            title='CopyIcon SQL'
          >
            <CopyIcon className='w-4 h-4' weight='bold' />
          </button>
        )}
      </div>
    </animated.div>
  );
};

export default AiSqlHelper;
