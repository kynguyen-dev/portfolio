import { Stack } from "@mui/material";
import { motion, type Variants } from "framer-motion";
import { Profile } from "@components/pages/profile/Profile.tsx";
import { Footer } from "@components/pages/footer/Footer.tsx";
import { WorkExperience } from "@components/pages/work-experience/WorkExperience.tsx";
import { Intro } from "@components/pages/Intro/Intro.tsx";
import { Skills } from "@components/pages/skills/Skills.tsx";
import { AboutMe } from "@components/pages/about-me/AboutMe";
import { Education } from "@components/pages/education/Education";
import { Testimonials } from "@components/pages/testimonials/Testimonials";
import { ContactForm } from "@components/pages/contacts/ContactForm";
import { Blog } from "@components/pages/blog/Blog";
import { SpeedDialCustom } from "@components/customs/speed-dial";
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
          <Section variants={scaleUp}><Profile /></Section>
          <ParallaxSection offset={30}>
            <Section variants={slideInLeft}><Education /></Section>
          </ParallaxSection>
          <Section variants={fadeUp}><Skills /></Section>
          <ParallaxSection offset={50}>
            <Section variants={slideInRight}><WorkExperience /></Section>
          </ParallaxSection>
          <Section variants={rotateIn}><Blog /></Section>
          <ParallaxSection offset={30}>
            <Section variants={blurIn}><Testimonials /></Section>
          </ParallaxSection>
          <Section variants={scaleUp}><ContactForm /></Section>
          <Footer />
        </Stack>
        <SpeedDialCustom />
        <BackToTop />
      </main>
    </SunriseBackground>
  );
};

export default HomePage;
