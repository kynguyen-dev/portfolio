import * as React from "react";
import { makeStyles } from "@mui/styles";
import Box from "@mui/material/Box";
import Backdrop from "@mui/material/Backdrop";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import HomeIcon from '@mui/icons-material/Home';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import { motion } from "framer-motion";
import { APP_PAGES } from "@constants";
import { useMediaQuery } from "@mui/material";

const pageItems = [
  { icon: <HomeIcon />, name: APP_PAGES.HOME },
  { icon: <AccountBoxIcon />, name: APP_PAGES.PROFILE },
  { icon: <WorkHistoryIcon />, name: APP_PAGES.PROJECTS },
  { icon: <ConnectWithoutContactIcon />, name: APP_PAGES.CONTACT },
];

const useStyles = makeStyles(() => ({
  speedDial: {
    position: "fixed",
    bottom: 16,
    right: 16,
    zIndex: 1000,
  },
}));

export const SpeedDialCustom = () => {
  const classes = useStyles();
  const isMobile = useMediaQuery("(max-width: 600px)");
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleScrollTo = (id: string) => {
    const elementId = id.toLowerCase();
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      console.warn(`Element with ID '${elementId}' not found`);
    }
    handleClose();
  };

  /** Hide on mobile screens */
  if (isMobile) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className={classes.speedDial}
    >
      <Box sx={{ height: 330, transform: "translateZ(0px)", flexGrow: 1 }}>
        <Backdrop open={open} />
        <SpeedDial
          ariaLabel="SpeedDial tooltip example"
          sx={{ position: "absolute", bottom: 16, right: 16 }}
          icon={<SpeedDialIcon />}
          onClose={handleClose}
          onOpen={handleOpen}
          open={open}
        >
          {pageItems.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              tooltipOpen
              onClick={() => handleScrollTo(action.name)}
            />
          ))}
        </SpeedDial>
      </Box>
    </motion.div>
  );
};
