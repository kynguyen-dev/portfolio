import { motion } from 'framer-motion';
import { Stack, useTheme } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import SmartphoneIcon from '@mui/icons-material/Smartphone';

export const Contact = () => {
  const { palette } = useTheme();

  return (
    <Stack gap={10} direction='row'>
      {[
        { icon: GitHubIcon, key: 'github' },
        { icon: MailOutlineIcon, key: 'mail' },
        { icon: SmartphoneIcon, key: 'phone' },
      ].map(({ icon: Icon, key }) => (
        <motion.div
          key={key}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 300 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Icon
            fontSize='large'
            sx={{
              color: palette.primary.light,
              transition: 'color 0.3s ease-in-out, transform 0.3s ease-in-out',
              '&:hover': {
                color: palette.text.primary,
              },
              cursor: 'pointer',
            }}
          />
        </motion.div>
      ))}
    </Stack>
  );
};
