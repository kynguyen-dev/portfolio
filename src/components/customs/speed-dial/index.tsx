import { useState, useEffect, useCallback } from 'react';
import { animated, useSpring, useTrail } from '@react-spring/web';
import { FileText, Mail, Linkedin, Github, Plus, X } from 'lucide-react';
import { APP_INFORMATION } from '@constants';
import { useTranslation } from 'react-i18next';

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 600px)');
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return isMobile;
};

export const SpeedDialCustom = () => {
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);

  const handleToggle = () => setOpen(prev => !prev);
  const handleClose = useCallback(() => setOpen(false), []);

  const actions = [
    {
      icon: <FileText size={20} />,
      name: t('intro.downloadCV'),
      onClick: () =>
        window.open(
          '/resume/Ky_Nguyen_CV.pdf',
          '_blank',
          'noopener,noreferrer'
        ),
    },
    {
      icon: <Mail size={20} />,
      name: t('contact.sendMeEmail'),
      onClick: () => {
        window.location.href = APP_INFORMATION.EMAIL_TO;
      },
    },
    {
      icon: <Linkedin size={20} />,
      name: 'LinkedIn',
      onClick: () =>
        window.open(
          APP_INFORMATION.LINKEDIN_URL,
          '_blank',
          'noopener,noreferrer'
        ),
    },
    {
      icon: <Github size={20} />,
      name: 'GitHub',
      onClick: () =>
        window.open(
          APP_INFORMATION.GITHUB_URL,
          '_blank',
          'noopener,noreferrer'
        ),
    },
  ];

  const fadeSpring = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 300 },
  });

  const buttonSpring = useSpring({
    rotate: open ? 45 : 0,
    config: { tension: 300, friction: 15 },
  });

  const trail = useTrail(actions.length, {
    opacity: open ? 1 : 0,
    y: open ? 0 : 20,
    scale: open ? 1 : 0.8,
    config: { tension: 280, friction: 22 },
  });

  if (isMobile) return null;

  return (
    <>
      {/* Backdrop */}
      {open && (
        <div
          className='fixed inset-0 z-[999] bg-black/30 backdrop-blur-sm'
          onClick={handleClose}
        />
      )}

      <animated.div
        style={{
          ...fadeSpring,
          position: 'fixed',
          bottom: 32,
          right: 32,
          zIndex: 1000,
        }}
      >
        {/* Action buttons */}
        <div className='flex flex-col-reverse items-center gap-3 mb-3'>
          {trail.map((style, i) => (
            <animated.div key={actions[i].name} style={style}>
              <div className='flex items-center gap-3'>
                {/* Tooltip label */}
                <span className='bg-ct-surface-container-highest text-ct-on-surface text-xs font-semibold px-3 py-1.5 rounded-lg shadow-md whitespace-nowrap'>
                  {actions[i].name}
                </span>
                <button
                  onClick={() => {
                    actions[i].onClick();
                    handleClose();
                  }}
                  aria-label={actions[i].name}
                  className='w-12 h-12 rounded-full bg-ct-surface-container-high text-ct-on-surface flex items-center justify-center shadow-lg hover:bg-ct-surface-bright transition-colors cursor-pointer'
                >
                  {actions[i].icon}
                </button>
              </div>
            </animated.div>
          ))}
        </div>

        {/* Main FAB */}
        <animated.button
          style={buttonSpring}
          onClick={handleToggle}
          aria-label={t('common.quickActions')}
          className='w-14 h-14 rounded-full weaver-gradient text-white flex items-center justify-center shadow-[0_4px_20px_rgba(208,188,255,0.4)] hover:shadow-[0_6px_28px_rgba(208,188,255,0.5)] transition-shadow cursor-pointer ml-auto'
        >
          {open ? <X size={24} /> : <Plus size={24} />}
        </animated.button>
      </animated.div>
    </>
  );
};
