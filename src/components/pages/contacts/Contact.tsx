import { motion } from 'framer-motion';
import { OverridableComponent } from "@mui/material/OverridableComponent";
import {Stack, SvgIconTypeMap, Tooltip, useTheme} from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import {APP_SIZES} from "@constants";
import {PFTypography} from "@components/core";


interface ContactProps {
  icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & { muiName: string };
  key: string;
  href: string;
  message: string;
}

const contacts: ContactProps[] = [
  { icon: GitHubIcon, key: 'github', href: "https://github.com/kynguyen-dev", message: "Visit my GitHub" },
  { icon: MailOutlineIcon, key: 'mail', href: "mailto:kynt101099@gmail.com", message: "Send me an email" },
  { icon: SmartphoneIcon, key: 'phone', href: "tel:+84868772887", message: "Call me" },
]

export const Contact = () => {
  const { palette } = useTheme();

  const handleClick = (href: string, key: string) => {
    if (key === "github") {
      window.open(href, "_blank");
    } else if (key === "phone") {
      if (/Mobi|Android/i.test(navigator.userAgent)) {
        // Mobile: Open dialer
        window.location.href = href;
      } else {
        // Desktop: Show alert
        alert("Phone calls can only be made from a mobile device.");
      }
    } else {
      window.location.href = href;
    }
  };

  return (
    <Stack gap={10} direction='row'>
      {contacts.map(({ icon: Icon, href, message, key }) => (
        <Tooltip key={key} title={<PFTypography variant="body2">{message}</PFTypography>} arrow>
          <motion.div
            key={key}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 300 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: "pointer",
            }}
            onClick={() => handleClick(href, key)}
          >
            <Icon
              fontSize={APP_SIZES.LARGE}
              sx={{
                color: palette.primary.light,
                transition: 'color 0.3s ease-in-out, transform 0.3s ease-in-out',
                '&:hover': {
                  color: palette.text.primary,
                },
              }}
            />
          </motion.div>
        </Tooltip>
      ))}
    </Stack>
  );
};
