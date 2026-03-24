import { useState, useRef, useEffect } from 'react';
import {
  Send,
  Copy,
  Sparkles,
  Bug,
  Loader2,
  X,
  AlertCircle,
} from 'lucide-react';
import ToolPageLayout from './ToolPageLayout';
import { PFTypography, PFButton } from '@components/core';
import { animated, useTransition, useSpring } from '@react-spring/web';
import { useThemeMode } from '@contexts/theme-mode';
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
  const { mode } = useThemeMode();
  const isLight = mode === 'light';
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'ai',
      content:
        'Connected to Gemini 2.0 Flash (Ultra Speed). How can I assist your Database architecture today?',
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

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
      description='Expert Database Mode Powered by Gemini 2.0.'
    >
      <div
        className={cn(
          'w-full max-w-[900px] h-[600px] flex flex-col backdrop-blur-2xl rounded-2xl border overflow-hidden mt-8 transition-all duration-300 shadow-2xl',
          isLight
            ? 'bg-white/40 border-primary-main/20'
            : 'bg-background-default/40 border-primary-main/20'
        )}
      >
        {/* Header */}
        <div className='p-4 border-b border-white/10 flex justify-between items-center bg-white/5'>
          <div className='flex items-center gap-2'>
            <Sparkles className='w-5 h-5 text-primary-main' />
            <PFTypography
              variant='subtitle2'
              className={cn(
                'font-bold tracking-tight',
                isLight ? 'text-primary-dark' : 'text-primary-light'
              )}
            >
              GEMINI PRO ASSISTANT
            </PFTypography>
          </div>
          <button
            onClick={debugModels}
            className='p-1.5 rounded-lg hover:bg-white/10 text-text-secondary opacity-50 hover:opacity-100 transition-all'
            title='Debug Models'
          >
            <Bug className='w-4 h-4' />
          </button>
        </div>

        {/* Chat Area */}
        <div
          ref={scrollRef}
          className='flex-grow overflow-y-auto p-6 flex flex-col gap-4 scrollbar-thin scrollbar-thumb-primary-main/20 scrollbar-track-transparent'
        >
          {messages.map((msg, index) => (
            <MessageBubble
              key={index}
              msg={msg}
              isLight={isLight}
              onCopy={copyToClipboard}
            />
          ))}
          {isLoading && (
            <div className='self-center mt-4 flex items-center gap-2 text-primary-main'>
              <Loader2 className='w-5 h-5 animate-spin' />
              <span className='text-xs font-medium'>Gemini is thinking...</span>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className='p-4 bg-black/10 border-t border-white/5'>
          <div className='flex gap-3'>
            <textarea
              className={cn(
                'flex-grow p-3 rounded-xl bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-primary-main/50 transition-all resize-none min-h-[48px] max-h-32 text-sm',
                isLight
                  ? 'text-primary-dark placeholder:text-primary-dark/40'
                  : 'text-primary-light placeholder:text-primary-light/40'
              )}
              placeholder='Ask for SQL or Architecture...'
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
            <PFButton
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className='h-12 w-12 rounded-xl p-0 flex items-center justify-center shrink-0 shadow-lg shadow-primary-main/20'
              magnet
            >
              <Send className='w-5 h-5' />
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
            <div className='bg-red-500/90 backdrop-blur-md text-white px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-red-400/20'>
              <AlertCircle className='w-5 h-5' />
              <span className='text-sm font-medium'>{msg}</span>
              <button
                onClick={() => setErrorMsg(null)}
                className='p-1 hover:bg-white/10 rounded-lg'
              >
                <X className='w-4 h-4' />
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
  isLight,
  onCopy,
}: {
  msg: Message;
  isLight: boolean;
  onCopy: (text: string) => void;
}) => {
  const spring = useSpring({
    from: { opacity: 0, y: 10, scale: 0.95 },
    to: { opacity: 1, y: 0, scale: 1 },
  });

  return (
    <animated.div
      style={spring}
      className={cn(
        'max-w-[85%] relative group transition-all',
        msg.role === 'user' ? 'self-end' : 'self-start'
      )}
    >
      <div
        className={cn(
          'p-4 rounded-2xl shadow-sm transition-all',
          msg.role === 'user'
            ? isLight
              ? 'bg-primary-main text-white'
              : 'bg-primary-main text-background-default'
            : 'bg-white/5 text-text-primary border border-white/5 backdrop-blur-sm'
        )}
      >
        <PFTypography
          variant='body2'
          className='whitespace-pre-wrap leading-relaxed'
        >
          {msg.content}
        </PFTypography>

        {msg.role === 'ai' && (
          <button
            onClick={() => onCopy(msg.content)}
            className={cn(
              'absolute -bottom-8 right-0 p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all hover:bg-white/10',
              isLight ? 'text-primary-dark' : 'text-primary-light'
            )}
            title='Copy SQL'
          >
            <Copy className='w-4 h-4' />
          </button>
        )}
      </div>
    </animated.div>
  );
};

export default AiSqlHelper;
