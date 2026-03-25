import { animated, useSpring } from '@react-spring/web';
import { useTranslation } from 'react-i18next';
import { ArrowRight } from '@phosphor-icons/react';
import { useInView } from '@utils/animations/springVariants';
import { ImagesBadge } from '@components/customs/aceternity';

/* Badge images for the email CTA hover effect */
const contactBadgeImages = [
  '/icons/developer.png',
  '/icons/dashboard-icon.png',
  '/icons/medicare-icon.png',
  '/icons/air-conditioner.png',
];

export const ContactForm = () => {
  const { t } = useTranslation();
  const { ref, inView } = useInView({ threshold: 0.3 });

  const containerSpring = useSpring({
    from: { opacity: 0, y: 40 },
    to: inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 },
    config: { tension: 170, friction: 26 },
  });

  return (
    <section
      id='contact'
      aria-label={t('contact.heading')}
      className='py-24 md:py-32 px-8 lg:px-16'
    >
      <animated.div
        ref={ref}
        style={containerSpring}
        className='glass p-12 md:p-20 rounded-[3rem] text-center relative overflow-hidden border-2 border-ct-secondary/10'
      >
        {/* Background gradient overlay */}
        <div className='absolute inset-0 bg-gradient-to-b from-transparent to-ct-surface-container-low/50' />

        {/* Content */}
        <div className='relative z-10'>
          <h2 className='font-serif-display text-5xl md:text-7xl text-ct-secondary mb-8'>
            {t('contact.ctaTitle')}{' '}
            <span className='text-ct-on-surface'>
              {t('contact.ctaTitleAccent')}
            </span>
          </h2>
          <p className='text-ct-on-surface-variant max-w-xl mx-auto mb-12 text-lg'>
            {t('contact.ctaDescription')}
          </p>
          <ImagesBadge
            images={contactBadgeImages}
            href='mailto:kynguyen.dev@gmail.com'
            hoverSpread={30}
            hoverRotation={15}
            hoverTranslateY={-40}
            imageSize={38}
            className='inline-flex items-center gap-4 bg-ct-secondary text-ct-on-secondary px-10 py-5 rounded-full font-bold text-xl transition-all duration-300 shadow-[0_10px_40px_rgba(78,222,163,0.2)] group cursor-pointer no-underline'
          >
            {t('contact.ctaButton')}
            <ArrowRight
              className='group-hover:translate-x-2 transition-transform'
              size={24}
              weight='bold'
            />
          </ImagesBadge>
        </div>
      </animated.div>
    </section>
  );
};
