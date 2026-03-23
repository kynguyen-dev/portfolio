import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import PersonIcon from '@mui/icons-material/Person';

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.2,
      duration: 0.7,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  }),
};

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

  return (
    <section
      aria-label={t('testimonials.heading')}
      className='max-w-4xl mx-auto px-8 py-24 md:py-32 relative'
    >
      {/* Decorative quote mark */}
      <div className='absolute top-0 right-0 font-serif-display text-[16rem] md:text-[24rem] text-ct-secondary/5 leading-none select-none -z-10 translate-x-1/2 -translate-y-1/4'>
        &ldquo;
      </div>

      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className='mb-16'
      >
        <h2 className='font-serif-display text-4xl text-ct-secondary mb-4'>
          {t('testimonials.sectionTitle')}
        </h2>
        <div className='h-1 w-12 bg-ct-primary-container' />
      </motion.div>

      {/* Testimonial cards */}
      <div className='space-y-12'>
        {items.map((item, i) => (
          <motion.div
            key={i}
            custom={i}
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true, amount: 0.3 }}
            variants={cardVariants}
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
              &ldquo;{item.quote}&rdquo;
            </p>

            {/* Author */}
            <div className='flex items-center gap-4'>
              <div className='w-12 h-12 rounded-full bg-ct-surface-container-highest border border-ct-outline-variant/30 flex items-center justify-center'>
                <PersonIcon
                  className={iconColors[i % iconColors.length]}
                  fontSize='medium'
                />
              </div>
              <div>
                <div className='font-bold text-ct-on-surface'>{item.name}</div>
                <div className='font-mono-code text-[10px] text-ct-on-surface-variant uppercase tracking-widest'>
                  {item.relationship} {'// '}
                  {item.title}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
