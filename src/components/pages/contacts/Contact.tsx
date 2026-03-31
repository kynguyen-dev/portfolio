import { useState } from 'react';
import { animated, useSpring } from '@react-spring/web';
import {
  GithubLogoIcon,
  LinkedinLogoIcon,
  EnvelopeIcon,
  DeviceMobileIcon,
  ChatCircleIcon,
} from '@phosphor-icons/react';
import { useTranslation } from 'react-i18next';
import { APP_INFORMATION, EMAIL, GITHUB, LINKEDIN, PHONE } from '@constants';

import { useThemeMode } from '@contexts/theme-mode';

interface ContactProps {
  icon: React.ElementType;
  id: string;
  href: string;
  messageKey: string;
}

const contacts: ContactProps[] = [
  {
    icon: GithubLogoIcon,
    id: GITHUB,
    href: APP_INFORMATION.GITHUB_URL,
    messageKey: 'contact.visitMyGithub',
  },
  {
    icon: LinkedinLogoIcon,
    id: LINKEDIN,
    href: APP_INFORMATION.LINKEDIN_URL,
    messageKey: 'contact.visitMyLinkedIn',
  },
  {
    icon: EnvelopeIcon,
    id: EMAIL,
    href: APP_INFORMATION.EMAIL_TO,
    messageKey: 'contact.sendMeEmail',
  },
  {
    icon: ChatCircleIcon,
    id: 'zalo',
    href: 'https://zalo.me/84868772887',
    messageKey: 'Zalo',
  },
  {
    icon: DeviceMobileIcon,
    id: PHONE,
    href: APP_INFORMATION.PHONE_NUMBER_TO,
    messageKey: 'contact.callMe',
  },
];

const ContactIcon = ({
  Icon,
  href,
  messageKey,
  id,
  onClickAction,
}: {
  Icon: ContactProps['icon'];
  href: string;
  messageKey: string;
  id: string;
  onClickAction: (href: string, key: string) => void;
}) => {
  const { t } = useTranslation();
  const [hovered, setHovered] = useState(false);

  const spring = useSpring({
    scale: hovered ? 1.2 : 1,
    config: { tension: 300, friction: 10 },
  });

  return (
    <animated.div
      style={spring}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      role='link'
      aria-label={t(messageKey)}
      tabIndex={0}
      onKeyDown={(e: React.KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClickAction(href, id);
        }
      }}
      onClick={() => onClickAction(href, id)}
      className='relative group flex items-center justify-center cursor-pointer text-ct-on-surface hover:text-primary-dark transition-colors duration-300'
    >
      <Icon size={28} />

      {/* Tooltip */}
      <div className='absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-ct-surface-container-high text-ct-on-surface text-xs font-label-grotesk font-bold rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap border border-ct-outline-variant/10 shadow-xl pointer-events-none z-50'>
        {id === PHONE ? href.replace('tel:', '') : t(messageKey)}
        {/* Tooltip Arrow */}
        <div className='absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 bg-ct-surface-container-high border-b border-r border-ct-outline-variant/10' />
      </div>
    </animated.div>
  );
};

export const Contact = () => {
  const { t } = useTranslation();
  const { mode } = useThemeMode();
  const isLight = mode === 'light';
  const [toast, setToast] = useState<string | null>(null);

  const handleClick = (href: string, key: string) => {
    if (key === GITHUB || key === LINKEDIN || key === 'zalo') {
      window.open(href, '_blank', 'noopener,noreferrer');
    } else if (key === EMAIL) {
      window.open(
        `https://mail.google.com/mail/?view=cm&fs=1&to=${href.replace('mailto:', '')}`,
        '_blank',
        'noopener,noreferrer'
      );
    } else if (key === PHONE) {
      const phoneNumber = href.replace('tel:', '');
      navigator.clipboard.writeText(phoneNumber).then(() => {
        setToast(t('contact.phoneCopied'));
        setTimeout(() => setToast(null), 3000);
      });
    } else {
      window.location.href = href;
    }
  };

  return (
    <>
      <div className='flex flex-row gap-6 sm:gap-10 md:gap-16'>
        {contacts.map(({ icon: Icon, href, messageKey, id }) => (
          <ContactIcon
            key={id}
            Icon={Icon}
            href={href}
            messageKey={messageKey}
            id={id}
            onClickAction={handleClick}
          />
        ))}
      </div>

      {/* Toast notification */}
      {toast && (
        <div
          className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-[9999] px-6 py-3 rounded-lg shadow-lg text-sm font-semibold transition-opacity ${
            isLight
              ? 'bg-ct-surface-container-highest text-ct-on-surface'
              : 'bg-ct-surface-bright text-ct-on-surface'
          }`}
        >
          {toast}
        </div>
      )}
    </>
  );
};
