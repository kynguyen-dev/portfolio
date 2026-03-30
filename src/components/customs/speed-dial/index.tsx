import { useState, useEffect, useCallback } from 'react';
import { animated, useSpring, useTrail } from '@react-spring/web';
import {
  FilePdfIcon,
  EnvelopeIcon,
  LinkedinLogoIcon,
  GithubLogoIcon,
  PlusIcon,
  XIcon,
  PhoneIcon,
  ChatCircleIcon,
} from '@phosphor-icons/react';
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
  const [toast, setToast] = useState<string | null>(null);

  const handleToggle = () => setOpen(prev => !prev);
  const handleClose = useCallback(() => setOpen(false), []);

  const actions = [
    {
      icon: <FilePdfIcon size={20} weight='duotone' />,
      name: t('intro.downloadCV'),
      onClick: () =>
        window.open(
          '/resume/FULL_STACK_DEVELOPER_NGUYEN_TRUONG_KY_CV.pdf',
          '_blank',
          'noopener,noreferrer'
        ),
    },
    {
      icon: <PhoneIcon size={20} weight='duotone' />,
      name: t('contact.callMe'),
      onClick: () => {
        const phoneNumber = APP_INFORMATION.PHONE_NUMBER_TO.replace('tel:', '');
        navigator.clipboard.writeText(phoneNumber).then(() => {
          setToast(t('contact.phoneCopied'));
          setTimeout(() => setToast(null), 3000);
        });
      },
    },
    {
      icon: <ChatCircleIcon size={20} weight='duotone' />,
      name: 'Zalo',
      onClick: () => {
        window.open(
          'https://zalo.me/84868772887',
          '_blank',
          'noopener,noreferrer'
        );
      },
    },
    {
      icon: <EnvelopeIcon size={20} weight='duotone' />,
      name: t('contact.sendMeEmail'),
      onClick: () => {
        window.open(
          `https://mail.google.com/mail/?view=cm&fs=1&to=${APP_INFORMATION.EMAIL_TO.replace('mailto:', '')}`,
          '_blank',
          'noopener,noreferrer'
        );
      },
    },
    {
      icon: <LinkedinLogoIcon size={20} weight='duotone' />,
      name: 'LinkedIn',
      onClick: () =>
        window.open(
          APP_INFORMATION.LINKEDIN_URL,
          '_blank',
          'noopener,noreferrer'
        ),
    },
    {
      icon: <GithubLogoIcon size={20} weight='duotone' />,
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
    transform: open ? 'rotate(45deg)' : 'rotate(0deg)',
    config: { tension: 300, friction: 15 },
  });

  const trail = useTrail(actions.length, {
    opacity: open ? 1 : 0,
    transform: open
      ? 'translateY(0px) scale(1)'
      : 'translateY(40px) scale(0.6)',
    config: { tension: 320, friction: 20 },
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

      {/* Action buttons — separate fixed container above the FAB */}
      {open && (
        <animated.div
          style={{
            ...fadeSpring,
            position: 'fixed',
            bottom: 96,
            right: 24,
            zIndex: 1000,
          }}
          className='flex flex-col items-end'
        >
          {trail.map((style, i) => (
            <animated.div
              key={actions[i].name}
              style={style}
              className='h-16 flex items-center'
            >
              <div className='flex items-center gap-4 pr-1'>
                <span className='bg-ct-surface-container-highest text-ct-on-surface text-xs font-semibold px-3 py-1.5 rounded-lg shadow-md whitespace-nowrap font-label-grotesk tracking-wide'>
                  {actions[i].name}
                </span>
                <button
                  onClick={() => {
                    actions[i].onClick();
                    handleClose();
                  }}
                  aria-label={actions[i].name}
                  className='w-12 h-12 rounded-full bg-ct-surface-container-high text-ct-on-surface flex items-center justify-center shadow-lg hover:bg-ct-surface-bright hover:scale-110 transition-all duration-200 cursor-pointer'
                >
                  {actions[i].icon}
                </button>
              </div>
            </animated.div>
          ))}
        </animated.div>
      )}

      {/* Main FAB */}
      <animated.div
        style={{
          ...fadeSpring,
          position: 'fixed',
          bottom: 24,
          right: 24,
          zIndex: 1000,
        }}
      >
        <animated.button
          style={buttonSpring}
          onClick={handleToggle}
          aria-label={t('common.quickActions')}
          className='w-14 h-14 rounded-full weaver-gradient text-white flex items-center justify-center shadow-[0_4px_20px_rgba(208,188,255,0.4)] hover:shadow-[0_6px_28px_rgba(208,188,255,0.5)] transition-shadow cursor-pointer'
        >
          {open ? (
            <XIcon size={24} weight='bold' />
          ) : (
            <PlusIcon size={24} weight='bold' />
          )}
        </animated.button>
      </animated.div>

      {/* Toast notification */}
      {toast && (
        <div className='fixed bottom-24 right-24 z-[9999] px-6 py-3 rounded-lg shadow-lg text-sm font-semibold transition-opacity bg-ct-surface-bright text-ct-on-surface border border-ct-outline-variant/10 font-label-grotesk'>
          {toast}
        </div>
      )}
    </>
  );
};
