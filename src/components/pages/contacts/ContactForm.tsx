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
import { Input } from '@components/customs/aceternity/Input';
import { Label } from '@components/customs/aceternity/Label';
import { Textarea } from '@components/customs/aceternity/Textarea';
import { HoverBorderGradient } from '@components/customs/aceternity/HoverBorderGradient';
import { cn } from '@utils/core/cn';

// ─── Aceternity LabelInputContainer ───────────────────────────────────────
const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn('flex w-full flex-col space-y-2', className)}>
      {children}
    </div>
  );
};

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

    overlaySpring,
    errorSpring,
    typewriterText,
  } = useContactTransmission();

  const containerSpring = useSpring({
    from: { opacity: 0, y: 40 },
    to: inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 },
    config: { tension: 170, friction: 26 },
  });

  const headingSpring = useSpring({
    from: { opacity: 0, x: -30 },
    to: inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 },
    delay: 200,
    config: { tension: 120, friction: 20 },
  });

  const subtitleSpring = useSpring({
    from: { opacity: 0, x: -20 },
    to: inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 },
    delay: 400,
    config: { tension: 120, friction: 20 },
  });

  const infoSpring = useSpring({
    from: { opacity: 0, y: 15 },
    to: inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 },
    delay: 600,
    config: { tension: 120, friction: 20 },
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
            <animated.h2
              style={headingSpring}
              className='font-serif-display text-4xl md:text-5xl text-ct-on-surface mb-4 tracking-tight'
            >
              {t('contact.heading', 'Contact Us')}
            </animated.h2>
            <animated.p
              style={subtitleSpring}
              className='text-ct-on-surface-variant text-base md:text-lg font-label-grotesk max-w-md leading-relaxed'
            >
              {t(
                'contact.subtitle',
                "Have a project in mind or just want to chat? I'd love to hear from you."
              )}
            </animated.p>
          </div>

          <animated.div style={infoSpring} className='flex flex-wrap items-center gap-4 text-xs font-label-grotesk font-medium text-ct-outline tracking-wider'>
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
              kynt101099@gmail.com
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
          </animated.div>

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
            <a
              href='https://www.google.com/maps/place/T%C3%B2a+S5.01+Vinhomes+Grand+Park/@10.8398161,106.8346712,17z/data=!3m1!4b1!4m6!3m5!1s0x317521c3fd962989:0x5f8afcaf11f1d5f8!8m2!3d10.8398108!4d106.8372461!16s%2Fg%2F11hvw51wnn?entry=ttu&g_ep=EgoyMDI2MDMzMC4wIKXMDSoASAFQAw%3D%3D'
              target='_blank'
              rel='noopener noreferrer'
              className='absolute top-[51%] left-[80%] flex flex-col items-center -translate-x-1/2 -translate-y-full hover:scale-110 transition-transform cursor-pointer pointer-events-auto group z-20'
            >
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
            </a>
        </div>
      </div>

      {/* Right Side: Form Card — Aceternity Style */}
      <div
        className={`shadow-input mx-auto w-full max-w-lg rounded-none p-4 md:rounded-2xl md:p-8 relative overflow-hidden ${isLight
          ? 'bg-ct-surface-container-lowest'
          : 'bg-ct-surface-container-low'
          }`}
      >
        {/* Subtle Grid Background */}
        <div className='absolute inset-0 topology-grid opacity-[0.08] pointer-events-none' />

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

        <form className='relative z-10' onSubmit={(e) => e.preventDefault()}>
          {/* Full Name */}
          <LabelInputContainer className='mb-4'>
            <Label htmlFor='fullName'>
              {t('contact.nameLabel', 'Your Name')}
            </Label>
            <Input
              id='fullName'
              type='text'
              value={formData.user_name}
              onChange={updateField('user_name')}
              placeholder={t('contact.namePlaceholder', 'John Doe')}
              disabled={isTransmitting}
              className={
                errors.user_name
                  ? 'ring-2 ring-red-500/50 border-red-500/50'
                  : ''
              }
            />
            {errors.user_name && (
              <span className='text-red-400 text-[11px] uppercase tracking-widest pl-1 font-label-grotesk'>
                * {errors.user_name}
              </span>
            )}
          </LabelInputContainer>

          {/* Email */}
          <LabelInputContainer className='mb-4'>
            <Label htmlFor='email'>
              {t('contact.emailLabel', 'Your Email')}
            </Label>
            <Input
              id='email'
              type='email'
              value={formData.user_email}
              onChange={updateField('user_email')}
              placeholder={t('contact.emailPlaceholder', 'john@example.com')}
              disabled={isTransmitting}
              className={
                errors.user_email
                  ? 'ring-2 ring-red-500/50 border-red-500/50'
                  : ''
              }
            />
            {errors.user_email && (
              <span className='text-red-400 text-[11px] uppercase tracking-widest pl-1 font-label-grotesk'>
                * {errors.user_email}
              </span>
            )}
          </LabelInputContainer>

          {/* Phone */}
          <LabelInputContainer className='mb-4'>
            <Label htmlFor='phone'>
              {t('contact.phoneLabel', 'Phone Number (Optional)')}
            </Label>
            <Input
              id='phone'
              type='tel'
              value={formData.user_phone}
              onChange={updateField('user_phone')}
              placeholder={t(
                'contact.phonePlaceholder',
                '(+84) 000 000 000'
              )}
              disabled={isTransmitting}
            />
          </LabelInputContainer>

          {/* Company */}
          <LabelInputContainer className='mb-4'>
            <Label htmlFor='company'>
              {t('contact.companyLabel', 'Company (Optional)')}
            </Label>
            <Input
              id='company'
              type='text'
              value={formData.user_company}
              onChange={updateField('user_company')}
              placeholder={t(
                'contact.companyPlaceholder',
                'Acme Corporation'
              )}
              disabled={isTransmitting}
            />
          </LabelInputContainer>

          {/* Message */}
          <LabelInputContainer className='mb-8'>
            <Label htmlFor='message'>
              {t('contact.messageLabel', 'Your Message')}
            </Label>
            <Textarea
              id='message'
              value={formData.user_message}
              onChange={updateField('user_message')}
              placeholder={t(
                'contact.messagePlaceholder',
                'Type your message here...'
              )}
              rows={5}
              disabled={isTransmitting}
              className={
                errors.user_message
                  ? 'ring-2 ring-red-500/50 border-red-500/50'
                  : ''
              }
            />
            {errors.user_message && (
              <span className='text-red-400 text-[11px] uppercase tracking-widest pl-1 font-label-grotesk'>
                * {errors.user_message}
              </span>
            )}
          </LabelInputContainer>

          {/* Submit Button — Aceternity Hover Border Gradient */}
          <div className='flex justify-center w-full'>
            <HoverBorderGradient
              containerClassName='rounded-full w-full'
              className='w-full flex items-center justify-center gap-2 text-ct-on-surface font-label-grotesk font-black uppercase tracking-[0.15em] text-sm py-3'
              as='button'
              onClick={transmit}
            >
              {isTransmitting && (
                <CircleNotchIcon size={14} className='animate-spin' />
              )}
              {isTransmitting
                ? t('contact.sending', 'Transmitting...')
                : t('contact.send', 'Send Message')}
              {!isTransmitting && <span>&rarr;</span>}
            </HoverBorderGradient>
          </div>



          {/* ── Terminal Error Log ──────────────────────────── */}
          {isError && result.errorCode && (
            <animated.div
              style={errorSpring}
              className='mt-4 px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/20'
            >
              <p className='font-mono text-[11px] text-red-400 tracking-wide'>
                <span className='text-red-500/60'>{'[SYSTEM] > '}</span>
                {result.errorCode}
              </p>
            </animated.div>
          )}
        </form>
      </div>
    </animated.div>
    </section >
  );
};
