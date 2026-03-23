import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export const ContactForm = () => {
  const { t } = useTranslation();

  return (
    <section
      id='contact'
      aria-label={t('contact.heading')}
      className='py-24 md:py-32 px-8'
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7 }}
        className='max-w-5xl mx-auto glass p-12 md:p-20 rounded-[3rem] text-center relative overflow-hidden border-2 border-ct-secondary/10'
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
          <motion.a
            href='mailto:kynguyen.dev@gmail.com'
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className='inline-flex items-center gap-4 bg-ct-secondary text-ct-on-secondary px-10 py-5 rounded-full font-bold text-xl transition-all duration-300 shadow-[0_10px_40px_rgba(212,175,55,0.3)] group cursor-pointer no-underline'
          >
            {t('contact.ctaButton')}
            <ArrowForwardIcon className='group-hover:translate-x-2 transition-transform' />
          </motion.a>
        </div>
      </motion.div>
    </section>
  );
};
