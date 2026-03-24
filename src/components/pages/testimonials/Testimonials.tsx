import { animated, useSpring, useTrail } from '@react-spring/web';
import { useTranslation } from 'react-i18next';
import { User } from 'lucide-react';
import { useInView } from '@utils/animations/springVariants';

export const Testimonials = () => {
  const { t } = useTranslation();
  const items = t('testimonials.items', { returnObjects: true }) as Array<{
    quote: string;
    name: string;
    title: string;
    relationship: string;
  }>;

  const borderColors = [
    'border-l-ct-secondary',
    'border-l-ct-primary-container',
    'border-l-ct-secondary',
  ];
  const tagColors = [
    'text-ct-secondary/40',
    'text-ct-primary-container/40',
    'text-ct-secondary/40',
  ];
  const iconColors = [
    'text-ct-secondary',
    'text-ct-primary-container',
    'text-ct-secondary',
  ];

  const { ref: headerRef, inView: headerInView } = useInView();
  const headerSpring = useSpring({
    from: { opacity: 0, y: 20 },
    to: headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 },
    config: { duration: 600 },
  });

  const { ref: cardsRef, inView: cardsInView } = useInView({ threshold: 0.1 });
  const trail = useTrail(items.length, {
    from: { opacity: 0, y: 50, scale: 0.95 },
    to: cardsInView
      ? { opacity: 1, y: 0, scale: 1 }
      : { opacity: 0, y: 50, scale: 0.95 },
    config: { tension: 170, friction: 26 },
  });

  return (
    <section
      aria-label={t('testimonials.heading')}
      className='max-w-screen-lg mx-auto px-8 lg:px-16 py-24 md:py-32 relative'
    >
      {/* Decorative quote mark */}
      <div className='absolute top-0 right-0 font-serif-display text-[16rem] md:text-[24rem] text-ct-secondary/5 leading-none select-none -z-10 translate-x-1/2 -translate-y-1/4'>
        &ldquo;
      </div>

      {/* Section header */}
      <animated.div ref={headerRef} style={headerSpring} className='mb-16'>
        <h2 className='font-serif-display text-4xl text-ct-secondary mb-4'>
          {t('testimonials.sectionTitle')}
        </h2>
        <div className='h-1 w-12 bg-ct-primary-container' />
      </animated.div>

      {/* Testimonial cards */}
      <div ref={cardsRef} className='space-y-12'>
        {trail.map((style, i) => (
          <animated.div
            key={i}
            style={style}
            className={`glass p-10 rounded-2xl border-l-4 ${borderColors[i % borderColors.length]} relative overflow-hidden`}
          >
            {/* Decrypted message tag */}
            <div
              className={`font-mono-code text-[10px] ${tagColors[i % tagColors.length]} absolute top-4 right-6`}
            >
              DECRYPTED_MESSAGE_TX_{String(i + 9).padStart(2, '0')}
            </div>

            {/* Quote */}
            <p className='text-xl md:text-2xl italic leading-relaxed text-ct-on-surface mb-8'>
              &ldquo;{items[i].quote}&rdquo;
            </p>

            {/* Author */}
            <div className='flex items-center gap-4'>
              <div className='w-12 h-12 rounded-full bg-ct-surface-container-highest border border-ct-outline-variant/30 flex items-center justify-center'>
                <User className={iconColors[i % iconColors.length]} size={20} />
              </div>
              <div>
                <div className='font-bold text-ct-on-surface'>
                  {items[i].name}
                </div>
                <div className='font-mono-code text-[10px] text-ct-on-surface-variant uppercase tracking-widest'>
                  {items[i].relationship} {'// '}
                  {items[i].title}
                </div>
              </div>
            </div>
          </animated.div>
        ))}
      </div>
    </section>
  );
};
