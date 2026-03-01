import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import DescriptionIcon from '@mui/icons-material/Description';
import EmailIcon from '@mui/icons-material/Email';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { motion } from "framer-motion";
import { APP_INFORMATION } from "@constants";
import { useMediaQuery } from "@mui/material";
import { useTranslation } from "react-i18next";

export const SpeedDialCustom = () => {
  const { t } = useTranslation();
  const isMobile = useMediaQuery("(max-width: 600px)");
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const actions = [
    {
      icon: <DescriptionIcon />,
      name: t('intro.downloadCV'),
      onClick: () => window.open('/resume/Ky_Nguyen_CV.pdf', '_blank', 'noopener,noreferrer'),
    },
    {
      icon: <EmailIcon />,
      name: t('contact.sendMeEmail'),
      onClick: () => { window.location.href = APP_INFORMATION.EMAIL_TO; },
    },
    {
      icon: <LinkedInIcon />,
      name: 'LinkedIn',
      onClick: () => window.open(APP_INFORMATION.LINKEDIN_URL, '_blank', 'noopener,noreferrer'),
    },
    {
      icon: <GitHubIcon />,
      name: 'GitHub',
      onClick: () => window.open(APP_INFORMATION.GITHUB_URL, '_blank', 'noopener,noreferrer'),
    },
  ];

  /** Hide on mobile screens — navbar drawer handles mobile navigation */
  if (isMobile) return null;

  return (
    <>
      <Backdrop open={open} sx={{ zIndex: 999 }} onClick={handleClose} />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        style={{ position: 'fixed', bottom: 32, right: 32, zIndex: 1000, pointerEvents: 'none' }}
      >
        <SpeedDial
          ariaLabel={t('common.quickActions')}
          icon={<SpeedDialIcon />}
          onClose={handleClose}
          onOpen={handleOpen}
          open={open}
          sx={{ pointerEvents: 'auto' }}
        >
          {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              FabProps={{ sx: { width: 48, height: 48 } }}
              sx={{
                '& .MuiSpeedDialAction-staticTooltipLabel': {
                  whiteSpace: 'nowrap',
                  maxWidth: 'none',
                },
              }}
              onClick={() => { action.onClick(); handleClose(); }}
            />
          ))}
        </SpeedDial>
      </motion.div>
    </>
  );
};
