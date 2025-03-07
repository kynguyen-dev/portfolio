import { motion } from 'framer-motion';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { Stack, SvgIconTypeMap, Tooltip, useTheme } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import { APP_INFORMATION, APP_SIZES, EMAIL, GITHUB, PHONE } from '@constants';
import { PFTypography } from '@components/core';
import { APP_MESSAGES } from "@utils/core/messages";

interface ContactProps {
  icon: OverridableComponent<SvgIconTypeMap<{}, 'svg'>> & { muiName: string };
  key: string;
  href: string;
  message: string;
}

const contacts: ContactProps[] = [
  {
    icon: GitHubIcon,
    key: GITHUB,
    href: APP_INFORMATION.GITHUB_URL,
    message: APP_MESSAGES.contacts.visitMyGithub,
  },
  {
    icon: MailOutlineIcon,
    key: EMAIL,
    href: APP_INFORMATION.EMAIL_TO,
    message: APP_MESSAGES.contacts.sendMeEmail,
  },
  {
    icon: SmartphoneIcon,
    key: PHONE,
    href: APP_INFORMATION.PHONE_NUMBER_TO,
    message: APP_MESSAGES.contacts.callMe,
  },
];

export const Contact = () => {
  const { palette } = useTheme();

  const handleClick = (href: string, key: string) => {
    if (key === 'github') {
      window.open(href, '_blank');
    } else if (key === 'phone') {
      if (/Mobi|Android/i.test(navigator.userAgent)) {
        // Mobile: Open dialer
        window.location.href = href;
      } else {
        // Desktop: Show alert
        alert(APP_MESSAGES.contacts.phoneAlert);
      }
    } else {
      window.location.href = href;
    }
  };

  return (
    <Stack gap={10} direction='row'>
      {contacts.map(({ icon: Icon, href, message, key }) => (
        <Tooltip
          key={key}
          title={<PFTypography variant='body2'>{message}</PFTypography>}
          arrow
        >
          <motion.div
            key={key}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 300 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
            onClick={() => handleClick(href, key)}
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
  );
};
