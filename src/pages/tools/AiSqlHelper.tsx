import { useState, useRef, useEffect } from 'react';
import {
  Paper,
  TextField,
  Button,
  Stack,
  Box,
  IconButton,
  useTheme,
  CircularProgress,
  Typography,
  Alert,
  Snackbar,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import BugReportIcon from '@mui/icons-material/BugReport';
import ToolPageLayout from './ToolPageLayout';
import { PFTypography } from '@components/core';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  role: 'user' | 'ai';
  content: string;
}

const SYSTEM_INSTRUCTIONS = `You are a Senior SQL Expert and Database Architect. 
Provide optimized SQL queries (using best practices like indexing, avoiding SELECT *) or detailed App Plans.
Support Vietnamese, English, and Japanese. Always format SQL in markdown code blocks.`;

const AiSqlHelper = () => {
  const { palette } = useTheme();
  const isLight = palette.mode === 'light';
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'ai',
      content: 'Connected to Gemini 2.0 Flash (Ultra Speed). How can I assist your Database architecture today?',
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
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
      const data = await response.json();
      if (data.models) {
        const modelNames = data.models.map((m: any) => m.name.replace('models/', '')).join(', ');
        setMessages(prev => [...prev, { role: 'ai', content: `DEBUG: Your key supports: ${modelNames}` }]);
      }
    } catch (e: any) {
      setErrorMsg("Debug failed: " + e.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    if (!apiKey) { setErrorMsg("API Key missing."); return; }

    const userMessage: Message = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Use 'gemini-flash-latest' as seen in your debug list
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: `${SYSTEM_INSTRUCTIONS}\n\nUser Request: ${input}` }] }],
          }),
        }
      );

      const data = await response.json();
      if (!response.ok) throw new Error(data.error?.message || `Error ${response.status}`);

      const text = data.candidates[0].content.parts[0].text;
      setMessages((prev) => [...prev, { role: 'ai', content: text }]);
    } catch (error: any) {
      setErrorMsg(`Failed: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text.replace(/```sql|```/g, '').trim());
  };

  return (
    <ToolPageLayout title="AI SQL Assistant" emoji="🤖" description="Expert Database Mode Powered by Gemini 2.0.">
      <Paper elevation={0} sx={{ width: '100%', maxWidth: '900px', height: '600px', display: 'flex', flexDirection: 'column', background: isLight ? 'rgba(255, 255, 255, 0.4)' : 'rgba(11, 13, 46, 0.4)', backdropFilter: 'blur(20px)', borderRadius: 4, border: `1px solid ${isLight ? 'rgba(184,137,31,0.2)' : 'rgba(245,208,96,0.2)'}`, overflow: 'hidden', mt: 4 }}>
        <Box sx={{ p: 2, borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Stack direction="row" spacing={1} alignItems="center">
            <AutoFixHighIcon sx={{ color: isLight ? '#B8891F' : '#F5D060' }} />
            <Typography variant="subtitle2" fontWeight={700} sx={{ color: isLight ? '#5C4A32' : '#FFE4B5' }}>GEMINI PRO ASSISTANT</Typography>
          </Stack>
          <IconButton onClick={debugModels} size="small" color="inherit" sx={{ opacity: 0.5 }}>
            <BugReportIcon fontSize="small" />
          </IconButton>
        </Box>

        <Box ref={scrollRef} sx={{ flexGrow: 1, overflowY: 'auto', p: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <AnimatePresence>
            {messages.map((msg, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start', maxWidth: '85%' }}>
                <Box sx={{ p: 2, borderRadius: 3, background: msg.role === 'user' ? (isLight ? '#B8891F' : '#F5D060') : 'rgba(255,255,255,0.05)', color: msg.role === 'user' ? (isLight ? '#FFF' : '#0B0D2E') : (isLight ? '#5C4A32' : '#FFE4B5'), position: 'relative' }}>
                  <PFTypography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>{msg.content}</PFTypography>
                  {msg.role === 'ai' && (
                    <IconButton size="small" onClick={() => copyToClipboard(msg.content)} sx={{ position: 'absolute', bottom: -30, right: 0, color: isLight ? '#B8891F' : '#F5D060' }}>
                      <ContentCopyIcon sx={{ fontSize: 16 }} />
                    </IconButton>
                  )}
                </Box>
              </motion.div>
            ))}
          </AnimatePresence>
          {isLoading && <CircularProgress size={20} sx={{ mt: 2, color: isLight ? '#B8891F' : '#F5D060', alignSelf: 'center' }} />}
        </Box>

        <Box sx={{ p: 2, background: 'rgba(0,0,0,0.1)' }}>
          <Stack direction="row" spacing={1}>
            <TextField fullWidth multiline maxRows={4} placeholder="Ask for SQL or Architecture..." value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSend())} sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3, color: isLight ? '#5C4A32' : '#FFE4B5' } }} />
            <Button variant="contained" onClick={handleSend} disabled={isLoading || !input.trim()} sx={{ borderRadius: 3, background: isLight ? '#B8891F' : '#F5D060' }}><SendIcon /></Button>
          </Stack>
        </Box>
      </Paper>
      <Snackbar open={!!errorMsg} autoHideDuration={6000} onClose={() => setErrorMsg(null)}><Alert severity="error">{errorMsg}</Alert></Snackbar>
    </ToolPageLayout>
  );
};

export default AiSqlHelper;
