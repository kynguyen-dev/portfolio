import { motion } from "framer-motion";
import { Avatar, Box, Chip, Stack, useTheme } from "@mui/material";
import { PFGradientTypography, PFTypography } from "@components/core";
import { StyledButton } from "@components/core/button";
import { useTranslation } from "react-i18next";
import {
  APP_PAGES,
  APP_THEMES,
  APP_TYPOGRAPHIES,
  APP_TYPOGRAPHIES_ANIMATION,
  CAREER_START_DATE,
} from "@constants";
import { staggerContainer, staggerItem, pop } from "@utils/animations/scrollVariants";

const getYears = () =>
  Math.floor((Date.now() - CAREER_START_DATE.getTime()) / (365.25 * 24 * 60 * 60 * 1000));

export const Intro = () => {
  const { palette } = useTheme();
  const { t } = useTranslation();
  const years = getYears();

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
      aria-label={t('intro.heading')}
      sx={{ px: { xs: 3, md: 0 }, pt: 20 }}
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
                  window.open('/resume/Ky_Nguyen_CV.pdf', '_blank');
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
          initial={{ opacity: 0, x: '100%', rotate: 180 }}
          animate={{ opacity: 1, x: 0, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 80, damping: 15, delay: 0.3 }}
          whileHover={{ scale: 1.1, y: -10, transition: { duration: 0.3 } }}
        >
          <Avatar
            src="/images/avatar.png"
            alt="Ky Nguyen's avatar"
            sx={{
              width: { md: 180, xs: 120 },
              height: { md: 180, xs: 120 },
              boxShadow: `0 0 30px ${palette.primary.main}60, 0 0 60px ${palette.secondary.main}30`,
              background: palette.primary.main,
              border: `3px solid ${palette.primary.light}`,
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
          whileHover={{ scale: 1.05, opacity: 0.85, y: -10 }}
          height='auto'
          width={{ xs: '100%', md: '800px' }}
          pt={6}
        />
      </Stack>
    </Box>
  );
};
