import { useState } from 'react';
import { motion } from 'framer-motion';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import {
  Snackbar,
  Stack,
  SvgIconTypeMap,
  Tooltip,
  useTheme,
} from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import { useTranslation } from 'react-i18next';
import {
  APP_INFORMATION,
  APP_SIZES,
  EMAIL,
  GITHUB,
  LINKEDIN,
  PHONE,
} from '@constants';
import { PFTypography } from '@components/core';

interface ContactProps {
  icon: OverridableComponent<SvgIconTypeMap<object, 'svg'>> & {
    muiName: string;
  };
  id: string;
  href: string;
  messageKey: string;
}

const contacts: ContactProps[] = [
  {
    icon: GitHubIcon,
    id: GITHUB,
    href: APP_INFORMATION.GITHUB_URL,
    messageKey: 'contact.visitMyGithub',
  },
  {
    icon: LinkedInIcon,
    id: LINKEDIN,
    href: APP_INFORMATION.LINKEDIN_URL,
    messageKey: 'contact.visitMyLinkedIn',
  },
  {
    icon: MailOutlineIcon,
    id: EMAIL,
    href: APP_INFORMATION.EMAIL_TO,
    messageKey: 'contact.sendMeEmail',
  },
  {
    icon: SmartphoneIcon,
    id: PHONE,
    href: APP_INFORMATION.PHONE_NUMBER_TO,
    messageKey: 'contact.callMe',
  },
];

export const Contact = () => {
  const { palette } = useTheme();
  const { t } = useTranslation();
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleClick = (href: string, key: string) => {
    if (key === GITHUB || key === LINKEDIN) {
      window.open(href, '_blank', 'noopener,noreferrer');
    } else if (key === PHONE) {
      if (/Mobi|Android/i.test(navigator.userAgent)) {
        window.location.href = href;
      } else {
        // Desktop: copy number to clipboard instead of alert()
        const phoneNumber = href.replace('tel:', '');
        navigator.clipboard.writeText(phoneNumber).then(() => {
          setSnackbarOpen(true);
        });
      }
    } else {
      window.location.href = href;
    }
  };

  return (
    <>
      <Stack gap={{ xs: 4, sm: 6, md: 10 }} direction='row'>
        {contacts.map(({ icon: Icon, href, messageKey, id }) => (
          <Tooltip
            key={id}
            title={<PFTypography variant='body2'>{t(messageKey)}</PFTypography>}
            arrow
          >
            <motion.div
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 300 }}
              role='link'
              aria-label={t(messageKey)}
              tabIndex={0}
              onKeyDown={(e: React.KeyboardEvent) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleClick(href, id);
                }
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
              onClick={() => handleClick(href, id)}
            >
              <Icon
                fontSize={APP_SIZES.LARGE}
                sx={{
                  color: palette.text.primary,
                  transition:
                    'color 0.3s ease-in-out, transform 0.3s ease-in-out',
                  '&:hover': {
                    color: palette.primary.dark,
                  },
                }}
              />
            </motion.div>
          </Tooltip>
        ))}
      </Stack>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message={t('contact.phoneCopied')}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </>
  );
};
