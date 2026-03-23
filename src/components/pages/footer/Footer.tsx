import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { PFGradientTypography } from '@components/core';
import { Contact } from '@components/pages/contacts/Contact.tsx';
import { TechStack } from '@components/pages/footer/TechStack.tsx';
import { APP_TYPOGRAPHIES } from '@constants';
import { fadeUp, blurIn } from '@utils/animations/scrollVariants';
import { useThemeMode } from '@contexts/theme-mode';
import { cn } from '@utils/core/cn';

export const Footer = () => {
  const { t } = useTranslation();
  const { mode } = useThemeMode();
  const isLight = mode === 'light';

  return (
    <footer
      id='footer'
      className={cn(
        'relative flex flex-col items-center justify-between gap-16 px-6 pb-10 pt-20 backdrop-blur-[2px]',
        isLight
          ? 'bg-gradient-to-b from-transparent via-primary-main/5 to-primary-main/15'
          : 'bg-gradient-to-b from-transparent via-black/10 to-background-default/40'
      )}
    >
      {/* Centered Content */}
      <motion.div
        variants={fadeUp}
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true }}
        className='flex flex-col items-center'
      >
        <PFGradientTypography
          variant={APP_TYPOGRAPHIES.HEADER_SECONDARY}
          className='text-center max-w-2xl px-4'
        >
          {t('footer.quote')}
        </PFGradientTypography>
      </motion.div>

      {/* Social Icons */}
      <motion.div
        variants={blurIn}
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true }}
        className='w-full flex justify-center'
      >
        <Contact />
      </motion.div>

      {/* Footer - Stays at the Bottom */}
      <TechStack />
    </footer>
  );
};
