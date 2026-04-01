import { useTranslation } from 'react-i18next';
import {
  EnvelopeIcon,
  GlobeIcon,
  PhoneIcon,
  CircleNotchIcon,
} from '@phosphor-icons/react';
import { useThemeMode } from '@contexts/theme-mode';
import { useInView } from '@utils/animations/springVariants';
import { animated, useSpring } from '@react-spring/web';
import { APP_INFORMATION } from '@constants';
import { useContactTransmission } from '@components/pages/contacts/useContactTransmission';

// ─── Shared input class builder ───────────────────────────────────────────
const inputClass = (isLight: boolean, hasError?: boolean) => {
  const base = `w-full px-5 py-4 rounded-xl border text-ct-on-surface font-label-grotesk placeholder:text-ct-outline focus:outline-none focus:ring-1 transition-all ${
    isLight
      ? 'bg-ct-surface/40 hover:bg-ct-surface/60'
      : 'bg-ct-surface-container-highest/40 hover:bg-ct-surface-container-highest/60'
  }`;
  if (hasError) {
    return `${base} border-red-500/60 focus:ring-red-500/50 focus:border-red-500/50 shadow-[0_0_10px_rgba(239,68,68,0.1)]`;
  }
  return `${base} border-ct-outline-variant/30 focus:ring-ct-secondary/50 focus:border-ct-secondary/50`;
};

const labelClass =
  'text-xs font-label-grotesk font-black text-ct-on-surface-variant uppercase tracking-[0.15em]';

export const ContactForm = () => {
  const { t } = useTranslation();
  const { ref, inView } = useInView({ threshold: 0.1 });
  const { mode } = useThemeMode();
  const isLight = mode === 'light';

  const {
    formData,
    errors,
    updateField,
    transmit,
    dismissStatus,
    isTransmitting,
    isSuccess,
    isError,
    result,
    buttonSpring,
    overlaySpring,
    errorSpring,
    typewriterText,
  } = useContactTransmission();

  const containerSpring = useSpring({
    from: { opacity: 0, y: 40 },
    to: inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 },
    config: { tension: 170, friction: 26 },
  });

  return (
    <section
      id='contact'
      aria-label={t('contact.heading', 'Contact')}
      className='py-24 md:py-32 px-6 md:px-12 lg:px-24 max-w-screen-2xl mx-auto'
    >
      <animated.div
        ref={ref}
        style={containerSpring}
        className='grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start'
      >
        {/* Left Side: Info & Map */}
        <div className='flex flex-col gap-8'>
          <div className='glass-panel p-3 rounded-xl w-fit border border-ct-outline-variant/30 shadow-sm'>
            <EnvelopeIcon
              size={24}
              weight='fill'
              className='text-primary-main'
            />
          </div>

          <div>
            <h2 className='font-serif-display text-4xl md:text-5xl text-ct-on-surface mb-4 tracking-tight'>
              {t('contact.heading', 'Get In Touch')}
            </h2>
            <p className='text-ct-on-surface-variant text-base md:text-lg font-label-grotesk max-w-md leading-relaxed'>
              {t(
                'contact.subtitle',
                "Have a project in mind or just want to chat? I'd love to hear from you."
              )}
            </p>
          </div>

          <div className='flex flex-wrap items-center gap-4 text-xs font-label-grotesk font-medium text-ct-outline tracking-wider'>
            <a
              href='https://kynguyen.vercel.app/'
              target='_blank'
              rel='noopener noreferrer'
              className='flex items-center gap-1.5 hover:text-ct-secondary transition-colors'
            >
              <GlobeIcon
                size={16}
                weight='duotone'
                className='text-ct-secondary'
              />
              kynguyen.vercel.app
            </a>
            <span className='w-1 h-1 rounded-full bg-ct-outline-variant/40' />
            <a
              href={APP_INFORMATION.EMAIL_TO}
              className='flex items-center gap-1.5 hover:text-ct-secondary transition-colors'
            >
              <EnvelopeIcon
                size={16}
                weight='duotone'
                className='text-ct-secondary'
              />
              [EMAIL_ADDRESS]
            </a>
            <span className='w-1 h-1 rounded-full bg-ct-outline-variant/40' />
            <a
              href={APP_INFORMATION.PHONE_NUMBER_TO}
              className='flex items-center gap-1.5 hover:text-ct-secondary transition-colors'
            >
              <PhoneIcon
                size={16}
                weight='duotone'
                className='text-ct-secondary'
              />
              (+84) 868 772 887
            </a>
          </div>

          <div className='relative mt-8 w-full max-w-lg overflow-visible self-center lg:self-start'>
            {/* World map using mask so it follows theme color */}
            <div
              className='w-full aspect-[2000/857] pointer-events-none transition-all duration-500 overflow-visible bg-ct-on-surface opacity-15'
              style={{
                maskImage: "url('https://assets.aceternity.com/pro/world.svg')",
                maskSize: 'contain',
                maskRepeat: 'no-repeat',
                maskPosition: 'center',
                WebkitMaskImage:
                  "url('https://assets.aceternity.com/pro/world.svg')",
                WebkitMaskSize: 'contain',
                WebkitMaskRepeat: 'no-repeat',
                WebkitMaskPosition: 'center',
              }}
            />

            {/* Location pin - Ho Chi Minh City */}
            <div className='absolute top-[51%] left-[80%] flex flex-col items-center -translate-x-1/2 -translate-y-full hover:scale-110 transition-transform cursor-default group z-20'>
              <span
                className={`font-label-grotesk font-black text-[10px] px-2 py-0.5 tracking-widest uppercase rounded ${isLight ? 'bg-ct-secondary/15 text-ct-secondary' : 'bg-ct-on-surface/10 text-ct-on-surface'}`}
              >
                {t('contact.weAreHere', 'Ho Chi Minh City')}
              </span>
              <div className='w-px h-16 bg-gradient-to-b from-transparent to-primary-main opacity-80' />

              {/* The Pin */}
              <div className='relative flex items-center justify-center mt-[-1px]'>
                {/* Green outline circles */}
                <div
                  className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-7 h-7 md:w-8 md:h-8 rounded-full border border-ct-secondary opacity-60 animate-ping'
                  style={{ animationDuration: '3s' }}
                />
                <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-7 h-7 md:w-8 md:h-8 rounded-full border border-ct-secondary opacity-50' />

                {/* Green glow */}
                <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 md:w-6 md:h-6 rounded-full bg-ct-secondary blur-[4px] opacity-50' />

                {/* Center dot */}
                <div className='w-3 h-3 rounded-full bg-ct-secondary relative z-10 shadow-[0_0_10px_rgba(78,222,163,0.8)]' />
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Form Card */}
        <div
          className={`glass-panel rounded-3xl p-8 lg:p-12 shadow-2xl relative overflow-hidden flex flex-col border ${isLight ? 'border-ct-outline-variant/20' : 'border-ct-outline-variant/10'} group`}
        >
          {/* Subtle Grid Background */}
          <div className='absolute inset-0 topology-grid opacity-[0.15] pointer-events-none transition-opacity group-hover:opacity-[0.25]' />

          {/* ── Success Overlay ─────────────────────────────────── */}
          {isSuccess && (
            <animated.div
              style={overlaySpring}
              className='absolute inset-0 z-30 flex flex-col items-center justify-center gap-6 backdrop-blur-sm bg-ct-surface-container/80'
              onClick={dismissStatus}
            >
              {/* Animated checkmark ring */}
              <div className='relative flex items-center justify-center'>
                <div
                  className='w-16 h-16 rounded-full border-2 border-ct-secondary animate-ping opacity-30'
                  style={{ animationDuration: '2s' }}
                />
                <div className='absolute w-16 h-16 rounded-full border-2 border-ct-secondary flex items-center justify-center'>
                  <span className='text-ct-secondary text-2xl font-bold'>
                    ✓
                  </span>
                </div>
              </div>

              {/* Typewriter message */}
              <div className='px-6 py-3 rounded-lg bg-ct-secondary/10 border border-ct-secondary/20 max-w-sm'>
                <p className='font-mono text-xs text-ct-secondary tracking-wide leading-relaxed'>
                  <span className='text-ct-secondary/60'>{'> '}</span>
                  {typewriterText}
                  <span className='animate-pulse ml-0.5 text-ct-secondary'>
                    █
                  </span>
                </p>
              </div>

              <p className='text-ct-on-surface-variant text-xs font-label-grotesk tracking-wider uppercase'>
                {t(
                  'contact.successMessage',
                  "Thanks for reaching out — I'll get back to you soon."
                )}
              </p>
            </animated.div>
          )}

          <div className='relative z-10 flex flex-col gap-6'>
            {/* Full Name */}
            <div className='flex flex-col gap-2'>
              <label htmlFor='fullName' className={labelClass}>
                {t('contact.nameLabel', 'Your Name')}
              </label>
              <input
                id='fullName'
                type='text'
                value={formData.user_name}
                onChange={updateField('user_name')}
                placeholder={t('contact.namePlaceholder', 'John Doe')}
                className={inputClass(isLight, !!errors.user_name)}
                disabled={isTransmitting}
              />
              {errors.user_name && (
                <span className='text-red-400 text-[11px] uppercase tracking-widest pl-1 font-label-grotesk'>
                  * {errors.user_name}
                </span>
              )}
            </div>

            {/* Email Address */}
            <div className='flex flex-col gap-2'>
              <label htmlFor='email' className={labelClass}>
                {t('contact.emailLabel', 'Your Email')}
              </label>
              <input
                id='email'
                type='email'
                value={formData.user_email}
                onChange={updateField('user_email')}
                placeholder={t('contact.emailPlaceholder', 'john@example.com')}
                className={inputClass(isLight, !!errors.user_email)}
                disabled={isTransmitting}
              />
              {errors.user_email && (
                <span className='text-red-400 text-[11px] uppercase tracking-widest pl-1 font-label-grotesk'>
                  * {errors.user_email}
                </span>
              )}
            </div>

            {/* Phone Number */}
            <div className='flex flex-col gap-2'>
              <label htmlFor='phone' className={labelClass}>
                {t('contact.phoneLabel', 'Phone Number (Optional)')}
              </label>
              <input
                id='phone'
                type='tel'
                value={formData.user_phone}
                onChange={updateField('user_phone')}
                placeholder={t('contact.phonePlaceholder', '(+84) 000 000 000')}
                className={inputClass(isLight)}
                disabled={isTransmitting}
              />
            </div>

            {/* Company */}
            <div className='flex flex-col gap-2'>
              <label htmlFor='company' className={labelClass}>
                {t('contact.companyLabel', 'Company (Optional)')}
              </label>
              <input
                id='company'
                type='text'
                value={formData.user_company}
                onChange={updateField('user_company')}
                placeholder={t(
                  'contact.companyPlaceholder',
                  'Acme Corporation'
                )}
                className={inputClass(isLight)}
                disabled={isTransmitting}
              />
            </div>

            {/* Message */}
            <div className='flex flex-col gap-2 mb-2'>
              <label htmlFor='message' className={labelClass}>
                {t('contact.messageLabel', 'Your Message')}
              </label>
              <textarea
                id='message'
                value={formData.user_message}
                onChange={updateField('user_message')}
                placeholder={t(
                  'contact.messagePlaceholder',
                  'Type your message here...'
                )}
                rows={5}
                className={`${inputClass(isLight, !!errors.user_message)} resize-none`}
                disabled={isTransmitting}
              />
              {errors.user_message && (
                <span className='text-red-400 text-[11px] uppercase tracking-widest pl-1 font-label-grotesk'>
                  * {errors.user_message}
                </span>
              )}
            </div>

            {/* Submit Button */}
            <div className='mt-2'>
              <animated.button
                type='button'
                onClick={transmit}
                disabled={isTransmitting}
                style={buttonSpring}
                className={`px-8 py-3.5 rounded-xl font-label-grotesk font-black uppercase tracking-[0.15em] text-xs transition-all shadow-lg hover:shadow-xl flex items-center gap-2 ${
                  isTransmitting
                    ? 'bg-ct-secondary text-ct-on-secondary cursor-wait'
                    : 'bg-ct-on-surface text-ct-surface-container hover:scale-[1.02] active:scale-[0.98] hover:bg-ct-secondary hover:text-ct-on-secondary'
                }`}
              >
                {isTransmitting && (
                  <CircleNotchIcon size={14} className='animate-spin' />
                )}
                {isTransmitting
                  ? t('contact.sending', 'Transmitting...')
                  : t('contact.send', 'Send Message')}
              </animated.button>
            </div>

            {/* ── Terminal Error Log ──────────────────────────── */}
            {isError && result.errorCode && (
              <animated.div
                style={errorSpring}
                className='mt-2 px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/20'
              >
                <p className='font-mono text-[11px] text-red-400 tracking-wide'>
                  <span className='text-red-500/60'>{'[SYSTEM] > '}</span>
                  {result.errorCode}
                </p>
              </animated.div>
            )}
          </div>
        </div>
      </animated.div>
    </section>
  );
};
