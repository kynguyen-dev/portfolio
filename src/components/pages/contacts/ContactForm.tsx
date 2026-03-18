import { useState, useEffect, FormEvent } from 'react';
import {
  Box,
  TextField,
  Alert,
  CircularProgress,
  Stack,
  useTheme,
} from '@mui/material';
import { motion } from 'framer-motion';
import SendIcon from '@mui/icons-material/Send';
import emailjs from '@emailjs/browser';
import { useTranslation } from 'react-i18next';
import {
  PFGradientTypography,
  PFTypography,
} from '@components/core/typography';
import { APP_THEMES, APP_TYPOGRAPHIES } from '@constants';
import { glassCardSx } from '@utils/styles/glassCard';
import { StyledButton } from '@components/core/button';
import { scaleUp } from '@utils/animations/scrollVariants';
import { useAuth0 } from '@auth0/auth0-react';

// ---- EmailJS config (public keys — safe to commit) ----
const EMAILJS_SERVICE_ID =
  import.meta.env.VITE_EMAILJS_SERVICE_ID ?? 'YOUR_SERVICE_ID';
const EMAILJS_TEMPLATE_ID =
  import.meta.env.VITE_EMAILJS_TEMPLATE_ID ?? 'YOUR_TEMPLATE_ID';
const EMAILJS_PUBLIC_KEY =
  import.meta.env.VITE_EMAILJS_PUBLIC_KEY ?? 'YOUR_PUBLIC_KEY';

const inputSx = {
  '& .MuiOutlinedInput-root': {
    color: 'text.primary',
    '& fieldset': { borderColor: 'divider' },
    '&:hover fieldset': { borderColor: 'primary.light' },
    '&.Mui-focused fieldset': { borderColor: 'primary.light' },
  },
  '& .MuiInputLabel-root': { color: 'text.secondary' },
  '& .MuiInputLabel-root.Mui-focused': { color: 'primary.light' },
};

export const ContactForm = () => {
  const { t } = useTranslation();
  const { palette } = useTheme();
  const isLight = palette.mode === 'light';
  const { user, isAuthenticated } = useAuth0();
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<
    'idle' | 'sending' | 'success' | 'error'
  >('idle');

  // Pre-fill name & email from Auth0 profile when logged in
  useEffect(() => {
    if (isAuthenticated && user) {
      setForm(prev => ({
        ...prev,
        name: prev.name || user.name || '',
        email: prev.email || user.email || '',
      }));
    }
  }, [isAuthenticated, user]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          from_email: form.email,
          message: form.message,
        },
        EMAILJS_PUBLIC_KEY
      );
      setStatus('success');
      setForm({ name: '', email: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  return (
    <Box
      component='section'
      id='contact'
      aria-label={t('contact.heading')}
      sx={{
        py: { xs: 8, md: 12 },
        px: { xs: 2, md: 6 },
        maxWidth: 700,
        mx: 'auto',
      }}
    >
      <PFGradientTypography
        variant={APP_TYPOGRAPHIES.HEADER_PRIMARY}
        theme={APP_THEMES.DARK}
        fontWeight='bold'
        align='center'
        sx={{ mb: 1 }}
      >
        {t('contact.heading')}
      </PFGradientTypography>
      <PFTypography
        variant='body1'
        align='center'
        sx={{ color: palette.text.secondary, opacity: 0.7, mb: 5 }}
      >
        {t('contact.subtitle')}
      </PFTypography>

      <Box
        component={motion.form}
        variants={scaleUp}
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true, amount: 0.2 }}
        onSubmit={handleSubmit}
        sx={{
          ...glassCardSx(isLight, { hoverLift: false }),
          p: { xs: 3, md: 5 },
        }}
      >
        <Stack spacing={3}>
          <TextField
            label={t('contact.nameLabel')}
            required
            fullWidth
            value={form.name}
            onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
            sx={inputSx}
          />
          <TextField
            label={t('contact.emailLabel')}
            required
            type='email'
            fullWidth
            value={form.email}
            onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
            sx={inputSx}
          />
          <TextField
            label={t('contact.messageLabel')}
            required
            multiline
            minRows={4}
            fullWidth
            value={form.message}
            onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
            sx={inputSx}
          />

          <StyledButton
            type='submit'
            variant='contained'
            size='large'
            disabled={status === 'sending'}
            endIcon={
              status === 'sending' ? (
                <CircularProgress size={18} sx={{ color: 'inherit' }} />
              ) : (
                <SendIcon />
              )
            }
          >
            {status === 'sending' ? t('contact.sending') : t('contact.send')}
          </StyledButton>

          {status === 'success' && (
            <Alert
              severity='success'
              sx={{
                background: isLight
                  ? 'rgba(107,142,58,0.12)'
                  : 'rgba(107,142,58,0.2)',
                color: isLight ? 'success.dark' : '#8AAE55',
                '& .MuiAlert-icon': {
                  color: isLight ? 'success.main' : '#8AAE55',
                },
              }}
            >
              <strong>{t('contact.successTitle')}</strong>{' '}
              {t('contact.successMessage')}
            </Alert>
          )}
          {status === 'error' && (
            <Alert
              severity='error'
              sx={{
                background: isLight
                  ? 'rgba(212,64,64,0.08)'
                  : 'rgba(212,64,64,0.15)',
                color: isLight ? 'error.dark' : '#E06060',
                '& .MuiAlert-icon': {
                  color: isLight ? 'error.main' : '#E06060',
                },
              }}
            >
              <strong>{t('contact.errorTitle')}</strong>{' '}
              {t('contact.errorMessage')}
            </Alert>
          )}
        </Stack>
      </Box>
    </Box>
  );
};
