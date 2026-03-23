import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { Contact } from '@components/pages/contacts/Contact.tsx';
import { fadeUp } from '@utils/animations/scrollVariants';

export const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer
      id='footer'
      className='bg-ct-surface relative pb-12 pt-24 border-t border-ct-outline-variant/10'
    >
      <div className='max-w-7xl mx-auto px-8 flex flex-col items-center text-center gap-12'>
        {/* Copyright / Status  */}
        <motion.div
          variants={fadeUp}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true }}
          className='font-mono-code text-sm uppercase tracking-widest text-ct-secondary'
        >
          {t('footer.copyright')}
        </motion.div>

        {/* Navigation Links */}
        <div className='flex gap-8 font-label-grotesk text-sm uppercase tracking-widest'>
          <a
            className='text-ct-on-surface/40 hover:text-ct-on-surface transition-colors cursor-pointer'
            href='#projects'
          >
            {t('nav.tacticalPath')}
          </a>
          <a
            className='text-ct-on-surface/40 hover:text-ct-on-surface transition-colors cursor-pointer'
            href='#skills'
          >
            {t('nav.theArsenal')}
          </a>
          <a
            className='text-ct-on-surface/40 hover:text-ct-on-surface transition-colors cursor-pointer'
            href='#projects'
          >
            {t('nav.projects')}
          </a>
        </div>

        {/* Social Icons */}
        <Contact />

        {/* Version info */}
        <div className='pt-12 flex flex-col items-center gap-4'>
          <div className='text-[10px] font-mono-code text-ct-on-surface-variant/40 tracking-[0.5em] uppercase'>
            {t('footer.builtFor')}
          </div>
        </div>
      </div>
    </footer>
  );
};
