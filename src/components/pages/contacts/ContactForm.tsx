import { useTranslation } from 'react-i18next';
import { EnvelopeIcon } from '@phosphor-icons/react';
import { useThemeMode } from '@contexts/theme-mode';
import { useInView } from '@utils/animations/springVariants';
import { animated, useSpring } from '@react-spring/web';

export const ContactForm = () => {
  const { t } = useTranslation();
  const { ref, inView } = useInView({ threshold: 0.1 });
  const { mode } = useThemeMode();
  const isLight = mode === 'light';

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
              {t('contact.title', 'Contact us')}
            </h2>
            <p className='text-ct-on-surface-variant text-base md:text-lg font-label-grotesk max-w-md leading-relaxed'>
              {t(
                'contact.description',
                'We are always looking for ways to improve our products and services. Contact us and let us know how we can help you.'
              )}
            </p>
          </div>

          <div className='flex flex-wrap items-center gap-4 text-xs font-label-grotesk font-medium text-ct-outline tracking-wider'>
            <a
              href='mailto:contact@kynguyen.dev'
              className='hover:text-ct-secondary transition-colors'
            >
              contact@kynguyen.dev
            </a>
            <span className='w-1 h-1 rounded-full bg-ct-outline-variant/40' />
            <a
              href='tel:+84868772887'
              className='hover:text-ct-secondary transition-colors'
            >
              +1 (800) 123 XX21
            </a>
            <span className='w-1 h-1 rounded-full bg-ct-outline-variant/40' />
            <a
              href='mailto:support@kynguyen.dev'
              className='hover:text-ct-secondary transition-colors'
            >
              support@kynguyen.dev
            </a>
          </div>

          <div className='relative mt-8 w-full max-w-lg overflow-visible self-center lg:self-start'>
            {/* Conditional style inversion for world svg */}
            <img
              src='https://assets.aceternity.com/pro/world.svg'
              alt='World Map'
              className={`w-full h-auto pointer-events-none transition-all duration-500 overflow-visible ${
                isLight
                  ? 'mix-blend-luminosity invert opacity-40'
                  : 'opacity-[0.85] saturate-0 brightness-150 drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]'
              }`}
            />

            {/* We are here tooltip pin - Ho Chi Minh City */}
            <div className='absolute top-[51%] left-[80%] flex flex-col items-center -translate-x-1/2 -translate-y-full hover:scale-110 transition-transform cursor-default group z-20'>
              <div className='px-3 py-1.5 mb-0 bg-ct-surface-container-highest/90 backdrop-blur-md rounded-lg flex items-center justify-center border border-ct-outline-variant/30 shadow-2xl'>
                <span className='bg-ct-secondary/20 text-ct-secondary font-label-grotesk font-black text-[10px] px-2 py-0.5 tracking-widest uppercase'>
                  We are here
                </span>
              </div>
              <div className='w-px h-16 bg-gradient-to-b from-transparent to-primary-main opacity-80' />

              {/* The Pin */}
              <div className='relative flex items-center justify-center mt-[-1px]'>
                {/* Green outline circles */}
                <div
                  className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-7 h-7 md:w-8 md:h-8 rounded-full border border-ct-secondary opacity-60 animate-ping'
                  style={{ animationDuration: '3s' }}
                />
                <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-7 h-7 md:w-8 md:h-8 rounded-full border border-ct-secondary opacity-50' />

                {/* Purple glow */}
                <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 md:w-6 md:h-6 rounded-full bg-primary-main blur-[3px] opacity-80' />

                {/* Black dot */}
                <div className='w-2 h-2 rounded-full bg-ct-surface-container-lowest relative z-10 shadow-[0_0_10px_rgba(208,188,255,1)]' />
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

          <div className='relative z-10 flex flex-col gap-6'>
            {/* Full Name */}
            <div className='flex flex-col gap-2'>
              <label
                htmlFor='fullName'
                className='text-xs font-label-grotesk font-black text-ct-on-surface-variant uppercase tracking-[0.15em]'
              >
                {t('contact.form.fullName', 'Full name')}
              </label>
              <input
                id='fullName'
                type='text'
                placeholder='Manu Arora'
                className={`w-full px-5 py-4 rounded-xl border border-ct-outline-variant/30 text-ct-on-surface font-label-grotesk placeholder:text-ct-outline focus:outline-none focus:ring-1 focus:ring-ct-secondary/50 focus:border-ct-secondary/50 transition-all ${
                  isLight
                    ? 'bg-ct-surface/40 hover:bg-ct-surface/60'
                    : 'bg-ct-surface-container-highest/40 hover:bg-ct-surface-container-highest/60'
                }`}
              />
            </div>

            {/* Email Address */}
            <div className='flex flex-col gap-2'>
              <label
                htmlFor='email'
                className='text-xs font-label-grotesk font-black text-ct-on-surface-variant uppercase tracking-[0.15em]'
              >
                {t('contact.form.email', 'Email Address')}
              </label>
              <input
                id='email'
                type='email'
                placeholder='support@aceternity.com'
                className={`w-full px-5 py-4 rounded-xl border border-ct-outline-variant/30 text-ct-on-surface font-label-grotesk placeholder:text-ct-outline focus:outline-none focus:ring-1 focus:ring-ct-secondary/50 focus:border-ct-secondary/50 transition-all ${
                  isLight
                    ? 'bg-ct-surface/40 hover:bg-ct-surface/60'
                    : 'bg-ct-surface-container-highest/40 hover:bg-ct-surface-container-highest/60'
                }`}
              />
            </div>

            {/* Company */}
            <div className='flex flex-col gap-2'>
              <label
                htmlFor='company'
                className='text-xs font-label-grotesk font-black text-ct-on-surface-variant uppercase tracking-[0.15em]'
              >
                {t('contact.form.company', 'Company')}
              </label>
              <input
                id='company'
                type='text'
                placeholder='Aceternity Labs LLC'
                className={`w-full px-5 py-4 rounded-xl border border-ct-outline-variant/30 text-ct-on-surface font-label-grotesk placeholder:text-ct-outline focus:outline-none focus:ring-1 focus:ring-ct-secondary/50 focus:border-ct-secondary/50 transition-all ${
                  isLight
                    ? 'bg-ct-surface/40 hover:bg-ct-surface/60'
                    : 'bg-ct-surface-container-highest/40 hover:bg-ct-surface-container-highest/60'
                }`}
              />
            </div>

            {/* Message */}
            <div className='flex flex-col gap-2 mb-2'>
              <label
                htmlFor='message'
                className='text-xs font-label-grotesk font-black text-ct-on-surface-variant uppercase tracking-[0.15em]'
              >
                {t('contact.form.message', 'Message')}
              </label>
              <textarea
                id='message'
                rows={4}
                placeholder='Type your message here'
                className={`w-full px-5 py-4 rounded-xl border border-ct-outline-variant/30 text-ct-on-surface font-label-grotesk placeholder:text-ct-outline focus:outline-none focus:ring-1 focus:ring-ct-secondary/50 focus:border-ct-secondary/50 transition-all resize-y min-h-[120px] ${
                  isLight
                    ? 'bg-ct-surface/40 hover:bg-ct-surface/60'
                    : 'bg-ct-surface-container-highest/40 hover:bg-ct-surface-container-highest/60'
                }`}
              />
            </div>

            {/* Submit Button */}
            <div className='mt-2'>
              <button
                type='button'
                className='px-8 py-3.5 bg-ct-on-surface text-ct-surface-container rounded-xl font-label-grotesk font-black uppercase tracking-[0.15em] text-xs hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg hover:shadow-xl hover:bg-ct-secondary hover:text-ct-on-secondary'
              >
                {t('contact.form.submit', 'Submit')}
              </button>
            </div>
          </div>
        </div>
      </animated.div>
    </section>
  );
};
