import { useCallback, useEffect, useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { useSpring } from '@react-spring/web';
import { useTranslation } from 'react-i18next';

// ─── Transmission States ────────────────────────────────────────────────────
type TransmissionStatus = 'IDLE' | 'TRANSMITTING' | 'SUCCESS' | 'ERROR';

interface FormData {
  user_name: string;
  user_email: string;
  user_phone: string;
  user_company: string;
  user_message: string;
}

export interface FormErrors {
  user_name?: string;
  user_email?: string;
  user_message?: string;
}

interface TransmissionResult {
  status: TransmissionStatus;
  errorCode: string | null;
}

const INITIAL_FORM: FormData = {
  user_name: '',
  user_email: '',
  user_phone: '',
  user_company: '',
  user_message: '',
};

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID ?? '';
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID ?? '';
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY ?? '';

// ─── Typewriter Engine ──────────────────────────────────────────────────────
const SUCCESS_MESSAGE =
  'SIGNAL_SENT: Packet delivery confirmed by SMTP Gateway.';

const useTypewriter = (text: string, active: boolean, speed = 35) => {
  const [displayed, setDisplayed] = useState('');
  const indexRef = useRef(0);

  useEffect(() => {
    if (!active) {
      setDisplayed('');
      indexRef.current = 0;
      return;
    }
    const interval = setInterval(() => {
      if (indexRef.current < text.length) {
        setDisplayed(text.slice(0, indexRef.current + 1));
        indexRef.current += 1;
      } else {
        clearInterval(interval);
      }
    }, speed);
    return () => clearInterval(interval);
  }, [active, text, speed]);

  return displayed;
};

// ─── Main Hook ──────────────────────────────────────────────────────────────
export const useContactTransmission = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [result, setResult] = useState<TransmissionResult>({
    status: 'IDLE',
    errorCode: null,
  });

  const isTransmitting = result.status === 'TRANSMITTING';
  const isSuccess = result.status === 'SUCCESS';
  const isError = result.status === 'ERROR';

  // ─── Form Handlers ──────────────────────────────────────────────────────
  const updateField = useCallback(
    (field: keyof FormData) =>
      (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({ ...prev, [field]: e.target.value }));
        // Clear error when user starts typing
        setErrors(prev => ({ ...prev, [field]: undefined }));
      },
    []
  );

  const resetForm = useCallback(() => {
    setFormData(INITIAL_FORM);
  }, []);

  // ─── Transmission Handler ───────────────────────────────────────────────
  const transmit = useCallback(async () => {
    // Validate fields
    const newErrors: FormErrors = {};
    if (!formData.user_name.trim())
      newErrors.user_name = t('contact.nameRequired', 'Name is required.');

    if (!formData.user_email.trim()) {
      newErrors.user_email = t('contact.emailRequired', 'Email is required.');
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.user_email)
    ) {
      newErrors.user_email = t(
        'contact.emailInvalid',
        'Please enter a valid email address.'
      );
    }

    if (!formData.user_message.trim())
      newErrors.user_message = t(
        'contact.messageRequired',
        'Message is required.'
      );

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setResult({
        status: 'ERROR',
        errorCode: 'ERR_01: VALIDATION_FAILED',
      });
      // Auto-dismiss validation error quickly
      setTimeout(() => setResult({ status: 'IDLE', errorCode: null }), 3000);
      return;
    }

    // Validate env config
    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
      setResult({
        status: 'ERROR',
        errorCode: 'ERR_02: EMAILJS_CONFIG_MISSING',
      });
      return;
    }

    setResult({ status: 'TRANSMITTING', errorCode: null });

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          user_name: formData.user_name.trim(),
          user_email: formData.user_email.trim(),
          user_phone: formData.user_phone.trim() || 'N/A',
          user_company: formData.user_company.trim() || 'UNIDENTIFIED',
          user_message: formData.user_message.trim(),
        },
        EMAILJS_PUBLIC_KEY
      );

      setResult({ status: 'SUCCESS', errorCode: null });
      resetForm();

      // Auto-dismiss success after 6s
      setTimeout(() => {
        setResult({ status: 'IDLE', errorCode: null });
      }, 6000);
    } catch (error: unknown) {
      const code = error instanceof Error ? error.message : 'UNKNOWN_FAILURE';
      setResult({
        status: 'ERROR',
        errorCode: `ERR_04: CONNECTION_INTERRUPTED — ${code}`,
      });

      // Auto-dismiss error after 8s
      setTimeout(() => {
        setResult({ status: 'IDLE', errorCode: null });
      }, 8000);
    }
  }, [formData, resetForm, t]);

  const dismissStatus = useCallback(() => {
    setResult({ status: 'IDLE', errorCode: null });
  }, []);

  // ─── Spring: Button Pulse ───────────────────────────────────────────────
  const buttonSpring = useSpring({
    loop: isTransmitting,
    from: { scale: 1, boxShadow: '0 0 0px rgba(78,222,163,0)' },
    to: isTransmitting
      ? [
          {
            scale: 1.04,
            boxShadow: '0 0 20px rgba(78,222,163,0.5)',
          },
          {
            scale: 1,
            boxShadow: '0 0 0px rgba(78,222,163,0)',
          },
        ]
      : { scale: 1, boxShadow: '0 0 0px rgba(78,222,163,0)' },
    config: { tension: 200, friction: 12 },
  });

  // ─── Spring: Success Overlay ────────────────────────────────────────────
  const overlaySpring = useSpring({
    opacity: isSuccess ? 1 : 0,
    y: isSuccess ? 0 : 20,
    config: { tension: 220, friction: 20 },
  });

  // ─── Spring: Error Log ──────────────────────────────────────────────────
  const errorSpring = useSpring({
    opacity: isError ? 1 : 0,
    y: isError ? 0 : 10,
    config: { tension: 280, friction: 22 },
  });

  // ─── Typewriter ─────────────────────────────────────────────────────────
  const typewriterText = useTypewriter(SUCCESS_MESSAGE, isSuccess);

  return {
    formData,
    errors,
    updateField,
    transmit,
    dismissStatus,
    result,
    isTransmitting,
    isSuccess,
    isError,
    buttonSpring,
    overlaySpring,
    errorSpring,
    typewriterText,
  };
};
