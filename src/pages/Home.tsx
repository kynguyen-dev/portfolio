import { Stack, Box, useTheme } from "@mui/material";
import { lazy, Suspense } from "react";
import { motion, type Variants } from "framer-motion";
import { Intro } from "@components/pages/Intro/Intro.tsx";
import { AboutMe } from "@components/pages/about-me/AboutMe";
import { SunriseBackground } from "@components/customs/backgrounds/SunriseBackground";
import { PFAppBar } from "@components/core/header";
import { ScrollProgressBar } from "@components/core/scroll-progress/ScrollProgressBar";
import { BackToTop } from "@components/core/back-to-top/BackToTop";
import { ParallaxSection } from "@components/customs/effects/ParallaxSection";
import {
  fadeUp,
  slideInLeft,
  slideInRight,
  scaleUp,
  blurIn,
  rotateIn,
} from "@utils/animations/scrollVariants";

/* Below-the-fold sections — lazy loaded for faster initial paint */
const Profile = lazy(() => import("@components/pages/profile/Profile.tsx").then(m => ({ default: m.Profile })));
const Footer = lazy(() => import("@components/pages/footer/Footer.tsx").then(m => ({ default: m.Footer })));
const WorkExperience = lazy(() => import("@components/pages/work-experience/WorkExperience.tsx").then(m => ({ default: m.WorkExperience })));
const Skills = lazy(() => import("@components/pages/skills/Skills.tsx").then(m => ({ default: m.Skills })));
const Education = lazy(() => import("@components/pages/education/Education.tsx").then(m => ({ default: m.Education })));
const Testimonials = lazy(() => import("@components/pages/testimonials/Testimonials.tsx").then(m => ({ default: m.Testimonials })));
const ContactForm = lazy(() => import("@components/pages/contacts/ContactForm.tsx").then(m => ({ default: m.ContactForm })));
const Blog = lazy(() => import("@components/pages/blog/Blog.tsx").then(m => ({ default: m.Blog })));
const Tools = lazy(() => import("@components/pages/tools/Tools.tsx").then(m => ({ default: m.Tools })));
const SpeedDialCustom = lazy(() => import("@components/customs/speed-dial").then(m => ({ default: m.SpeedDialCustom })));

/** Animated scroll-reveal wrapper — accepts a framer-motion variant */
const Section = ({
  children,
  variants = fadeUp,
}: {
  children: React.ReactNode;
  variants?: Variants;
}) => (
  <motion.div
    variants={variants}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.15 }}
  >
    {children}
  </motion.div>
);

/** Lightweight placeholder shown while lazy sections load */
const SectionSkeleton = () => {
  const { palette } = useTheme();
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        py: { xs: 8, md: 12 },
        minHeight: 200,
      }}
    >
      <Box
        sx={{
          width: 40,
          height: 40,
          borderRadius: '50%',
          border: `3px solid ${palette.primary.light}30`,
          borderTopColor: palette.primary.light,
          animation: 'spin 0.8s linear infinite',
          '@keyframes spin': {
            to: { transform: 'rotate(360deg)' },
          },
        }}
      />
    </Box>
  );
};

const HomePage = () => {
  return (
    <SunriseBackground>
      <ScrollProgressBar />
      {/* Skip-to-content for keyboard / screen-reader users */}
      <a
        href="#main-content"
        style={{
          position: 'absolute',
          left: '-9999px',
          top: 'auto',
          width: '1px',
          height: '1px',
          overflow: 'hidden',
          zIndex: 9999,
        }}
        onFocus={(e) => {
          e.currentTarget.style.position = 'fixed';
          e.currentTarget.style.left = '16px';
          e.currentTarget.style.top = '16px';
          e.currentTarget.style.width = 'auto';
          e.currentTarget.style.height = 'auto';
          e.currentTarget.style.padding = '12px 24px';
          e.currentTarget.style.background = '#0B0D2E';
          e.currentTarget.style.color = '#F5D060';
          e.currentTarget.style.borderRadius = '8px';
          e.currentTarget.style.fontSize = '1rem';
          e.currentTarget.style.textDecoration = 'none';
        }}
        onBlur={(e) => {
          e.currentTarget.style.position = 'absolute';
          e.currentTarget.style.left = '-9999px';
          e.currentTarget.style.width = '1px';
          e.currentTarget.style.height = '1px';
        }}
      >
        Skip to content
      </a>
      <PFAppBar />
      <main id="main-content">
        <Stack component="div" direction={'column'}>
          <Intro />
          <ParallaxSection offset={40}>
            <Section variants={blurIn}><AboutMe /></Section>
          </ParallaxSection>
          <Suspense fallback={<SectionSkeleton />}>
            <Section variants={scaleUp}><Profile /></Section>
            <ParallaxSection offset={30}>
              <Section variants={slideInLeft}><Education /></Section>
            </ParallaxSection>
            <Section variants={fadeUp}><Skills /></Section>
            <ParallaxSection offset={50}>
              <Section variants={slideInRight}><WorkExperience /></Section>
            </ParallaxSection>
            <Section variants={rotateIn}><Blog /></Section>
            <ParallaxSection offset={35}>
              <Section variants={scaleUp}><Tools /></Section>
            </ParallaxSection>
            <ParallaxSection offset={30}>
              <Section variants={blurIn}><Testimonials /></Section>
            </ParallaxSection>
            <Section variants={scaleUp}><ContactForm /></Section>
            <Footer />
          </Suspense>
        </Stack>
        <Suspense fallback={<SectionSkeleton />}>
          <SpeedDialCustom />
        </Suspense>
        <BackToTop />
      </main>
    </SunriseBackground>
  );
};

export default HomePage;
