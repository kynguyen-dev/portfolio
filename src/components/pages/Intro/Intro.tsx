import { motion } from "framer-motion";
import { Avatar, Box, Chip, Stack, useTheme } from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { PFGradientTypography, PFTypography } from "@components/core";
import { StyledButton } from "@components/core/button";
import { useTranslation } from "react-i18next";
import {
  APP_PAGES,
  APP_THEMES,
  APP_TYPOGRAPHIES,
  APP_TYPOGRAPHIES_ANIMATION,
} from "@constants";
import { staggerContainer, staggerItem, pop } from '@utils/animations/scrollVariants';
import { getYearsOfExperience } from '@utils/core/career';

export const Intro = () => {
  const { palette } = useTheme();
  const { t } = useTranslation();
  const years = getYearsOfExperience();

  const statBadges = [
    { label: t('intro.yearsExperience', { years }) },
    { label: t('intro.productionApps') },
    { label: t('intro.techStack') },
  ];

  return (
    <Box
      component="section"
      display="flex"
      justifyContent="center"
      alignItems="center"
      id={APP_PAGES.HOME.toLowerCase()}
      aria-label={t('intro.title')}
      sx={{ px: { xs: 3, md: 0 }, minHeight: '100vh', pt: { xs: 10, md: 12 }, pb: { xs: 4, md: 6 } }}
    >
      <Stack
        alignItems="center"
        justifyContent="center"
        gap={4}
        textAlign={{ xs: "center", md: "left" }}
      >
        <PFGradientTypography
          variant={APP_TYPOGRAPHIES.HEADER_PRIMARY}
          theme={APP_THEMES.DARK}
          fontWeight="bold"
          animations={[
            APP_TYPOGRAPHIES_ANIMATION.TYPEWRITER,
            APP_TYPOGRAPHIES_ANIMATION.OUTLINE_TO_SOLID,
          ]}
        >
          {t('intro.title')}
        </PFGradientTypography>
        <PFTypography
          variant={APP_TYPOGRAPHIES.SUBTITLE_PRIMARY}
          color={palette.text.disabled}
        >
          {t('intro.description')}
        </PFTypography>

        {/* CTA Buttons */}
        <motion.div
          variants={staggerContainer(0.15, 0.3)}
          initial="hidden"
          animate="visible"
        >
          <Stack direction={{ xs: 'column', sm: 'row' }} gap={2} alignItems="center">
            <motion.div variants={staggerItem}>
              <StyledButton
                variant="contained"
                size="large"
                onClick={() => {
                  const el = document.getElementById(APP_PAGES.PROJECTS.toLowerCase());
                  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
              >
                {t('intro.viewMyWork')}
              </StyledButton>
            </motion.div>
            <motion.div variants={staggerItem}>
              <StyledButton
                variant="outlined"
                size="large"
                onClick={() => {
                  window.open('/resume/Ky_Nguyen_CV.pdf', '_blank', 'noopener,noreferrer');
                }}
              >
                {t('intro.downloadCV')}
              </StyledButton>
            </motion.div>
          </Stack>
        </motion.div>

        {/* Stat Badges */}
        <Stack
          component={motion.div}
          variants={staggerContainer(0.1, 0.6)}
          initial="hidden"
          animate="visible"
          direction="row"
          flexWrap="wrap"
          justifyContent="center"
          gap={1.5}
        >
          {statBadges.map(badge => (
            <motion.div key={badge.label} variants={pop}>
              <Chip
                label={badge.label}
                sx={{
                  background: `${palette.primary.light}1E`,
                  border: `1px solid ${palette.primary.light}59`,
                  color: palette.primary.light,
                  fontWeight: 600,
                  fontSize: { xs: '0.75rem', sm: '0.85rem' },
                  px: 1,
                  backdropFilter: 'blur(6px)',
                }}
              />
            </motion.div>
          ))}
        </Stack>

        <Box
          component={motion.div}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 80, damping: 15, delay: 0.3 }}
          whileHover={{ scale: 1.08, transition: { duration: 0.3 } }}
          sx={{ position: 'relative', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
        >
          {/* Outer rotating dashed ring */}
          <Box
            component={motion.div}
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            sx={{
              position: 'absolute',
              width: { md: 220, xs: 155 },
              height: { md: 220, xs: 155 },
              borderRadius: '50%',
              border: `2px dashed ${palette.primary.light}40`,
            }}
          />
          {/* Middle pulsing glow ring */}
          <Box
            component={motion.div}
            animate={{
              boxShadow: [
                `0 0 20px ${palette.primary.main}30, 0 0 40px ${palette.primary.main}10`,
                `0 0 30px ${palette.primary.main}60, 0 0 60px ${palette.primary.main}30`,
                `0 0 20px ${palette.primary.main}30, 0 0 40px ${palette.primary.main}10`,
              ],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            sx={{
              position: 'absolute',
              width: { md: 200, xs: 140 },
              height: { md: 200, xs: 140 },
              borderRadius: '50%',
              border: `2px solid ${palette.primary.light}50`,
            }}
          />
          {/* Floating orbital dots */}
          {[0, 1, 2, 3].map(i => (
            <Box
              key={i}
              component={motion.div}
              animate={{ rotate: 360 }}
              transition={{
                duration: 8 + i * 2,
                repeat: Infinity,
                ease: 'linear',
                delay: i * 0.5,
              }}
              sx={{
                position: 'absolute',
                width: { md: 210 + i * 8, xs: 148 + i * 6 },
                height: { md: 210 + i * 8, xs: 148 + i * 6 },
              }}
            >
              <Box
                component={motion.div}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.6, 1, 0.6],
                }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: { md: 8, xs: 6 },
                  height: { md: 8, xs: 6 },
                  borderRadius: '50%',
                  background: i % 2 === 0 ? palette.primary.light : palette.secondary.light,
                  boxShadow: `0 0 8px ${i % 2 === 0 ? palette.primary.light : palette.secondary.light}`,
                }}
              />
            </Box>
          ))}
          {/* Avatar image */}
          <Avatar
            src="/images/avatar.png"
            alt="Ky Nguyen's avatar"
            sx={{
              width: { md: 180, xs: 120 },
              height: { md: 180, xs: 120 },
              boxShadow: `0 0 30px ${palette.primary.main}60, 0 0 60px ${palette.secondary.main}30`,
              background: palette.primary.main,
              border: `3px solid ${palette.primary.light}`,
              zIndex: 1,
            }}
          />
        </Box>

        <Box
          component={motion.img}
          src='/images/home.svg'
          alt='Home illustration'
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          height='auto'
          width={{ xs: '100%', md: '800px' }}
          pt={6}
        />

        {/* Scroll-down indicator */}
        <Box
          component={motion.div}
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          sx={{ mt: 2, cursor: 'pointer', opacity: 0.6 }}
          onClick={() => {
            const el = document.getElementById('about');
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }}
        >
          <KeyboardArrowDownIcon sx={{ fontSize: 36, color: palette.primary.light }} />
        </Box>
      </Stack>
    </Box>
  );
};
