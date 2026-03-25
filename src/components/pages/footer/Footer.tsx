import { animated, useSpring } from '@react-spring/web';
import { useTranslation } from 'react-i18next';
import { Contact } from '@components/pages/contacts/Contact.tsx';
import { useInView } from '@utils/animations/springVariants';

export const Footer = () => {
  const { t } = useTranslation();
  const { ref, inView } = useInView();

  const spring = useSpring({
    from: { opacity: 0, y: 30 },
    to: inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 },
    config: { tension: 170, friction: 26 },
  });

  return (
    <footer
      id='footer'
      className='py-12 border-t border-ct-outline-variant/10 px-8 lg:px-16'
    >
      <animated.div
        ref={ref}
        style={spring}
        className='flex flex-col md:flex-row justify-between items-center gap-8'
      >
        {/* Brand */}
        <div className='flex items-center gap-4'>
          <div className='font-label-grotesk font-black tracking-widest text-lg text-ct-secondary uppercase'>
            KY_NGUYEN
          </div>
          <div className='w-1 h-1 rounded-full bg-ct-outline-variant' />
          <div className='text-[10px] text-ct-outline tracking-[0.2em] uppercase'>
            Built on the Algorithmic Atelier
          </div>
        </div>

        {/* Navigation */}
        <div className='flex gap-8'>
          <a
            className='text-xs text-ct-on-surface-variant hover:text-ct-secondary transition-colors uppercase tracking-widest cursor-pointer'
            href='#projects'
          >
            {t('nav.projects')}
          </a>
          <a
            className='text-xs text-ct-on-surface-variant hover:text-ct-secondary transition-colors uppercase tracking-widest cursor-pointer'
            href='#skills'
          >
            {t('nav.theArsenal')}
          </a>
          <a
            className='text-xs text-ct-on-surface-variant hover:text-ct-secondary transition-colors uppercase tracking-widest cursor-pointer'
            href='#path'
          >
            {t('nav.tacticalPath')}
          </a>
        </div>
      </animated.div>

      {/* Social Icons */}
      <div className='mt-8 flex justify-center'>
        <Contact />
      </div>

      {/* Version */}
      <div className='mt-8 text-center'>
        <div className='text-[10px] font-label-grotesk text-ct-on-surface-variant/40 tracking-[0.5em] uppercase'>
          {t('footer.builtFor')}
        </div>
      </div>
    </footer>
  );
};
