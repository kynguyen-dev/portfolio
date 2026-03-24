import {
  useSpring,
  useTrail,
  config,
  type SpringConfig,
} from '@react-spring/web';
import { useEffect, useRef, useState, useCallback } from 'react';

/* ───────────────────────────────────────────────────────────
 * react-spring hooks that replace framer-motion patterns.
 * ─────────────────────────────────────────────────────────── */

/* ─── Shared easing configs ─── */
export const EASE_OUT: SpringConfig = { tension: 170, friction: 26 };
export const EASE_IN_OUT: SpringConfig = { tension: 120, friction: 20 };
export const GENTLE: SpringConfig = config.gentle;
export const WOBBLY: SpringConfig = config.wobbly;
export const SPRING_BOUNCE: SpringConfig = { tension: 260, friction: 18 };

/* ─── Intersection Observer hook (replaces whileInView) ─── */
export function useInView(options?: IntersectionObserverInit) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(el); // once: true
        }
      },
      { threshold: 0.2, ...options }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, inView };
}

/* ─── Fade Up ─── */
export function useFadeUp(trigger = true, delay = 0) {
  return useSpring({
    from: { opacity: 0, y: 60 },
    to: trigger ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 },
    delay,
    config: EASE_OUT,
  });
}

/* ─── Fade Down ─── */
export function useFadeDown(trigger = true, delay = 0) {
  return useSpring({
    from: { opacity: 0, y: -50 },
    to: trigger ? { opacity: 1, y: 0 } : { opacity: 0, y: -50 },
    delay,
    config: EASE_OUT,
  });
}

/* ─── Slide In Left ─── */
export function useSlideInLeft(trigger = true, delay = 0) {
  return useSpring({
    from: { opacity: 0, x: -80 },
    to: trigger ? { opacity: 1, x: 0 } : { opacity: 0, x: -80 },
    delay,
    config: EASE_OUT,
  });
}

/* ─── Slide In Right ─── */
export function useSlideInRight(trigger = true, delay = 0) {
  return useSpring({
    from: { opacity: 0, x: 80 },
    to: trigger ? { opacity: 1, x: 0 } : { opacity: 0, x: 80 },
    delay,
    config: EASE_OUT,
  });
}

/* ─── Scale Up ─── */
export function useScaleUp(trigger = true, delay = 0) {
  return useSpring({
    from: { opacity: 0, scale: 0.8 },
    to: trigger ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 },
    delay,
    config: EASE_OUT,
  });
}

/* ─── Simple Fade ─── */
export function useFade(trigger = true, delay = 0) {
  return useSpring({
    from: { opacity: 0 },
    to: trigger ? { opacity: 1 } : { opacity: 0 },
    delay,
    config: EASE_OUT,
  });
}

/* ─── Blur In ─── */
export function useBlurIn(trigger = true, delay = 0) {
  return useSpring({
    from: { opacity: 0, filter: 'blur(12px)', y: 20 },
    to: trigger
      ? { opacity: 1, filter: 'blur(0px)', y: 0 }
      : { opacity: 0, filter: 'blur(12px)', y: 20 },
    delay,
    config: { duration: 800 },
  });
}

/* ─── Stagger Trail (replaces staggerContainer + staggerItem) ─── */
export function useStaggerTrail<T>(items: T[], trigger = true) {
  return useTrail(items.length, {
    from: { opacity: 0, y: 40 },
    to: trigger ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 },
    config: EASE_OUT,
  });
}

/* ─── Hover Spring ─── */
export function useHoverSpring(scaleFactor = 1.05) {
  const [hovered, setHovered] = useState(false);
  const spring = useSpring({
    scale: hovered ? scaleFactor : 1,
    config: { tension: 300, friction: 10 },
  });
  const bind = {
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
  };
  return { spring, bind };
}

/* ─── Tap Spring ─── */
export function useTapSpring(scaleFactor = 0.95) {
  const [pressed, setPressed] = useState(false);
  const spring = useSpring({
    scale: pressed ? scaleFactor : 1,
    config: { tension: 300, friction: 10 },
  });
  const bind = {
    onMouseDown: () => setPressed(true),
    onMouseUp: () => setPressed(false),
    onMouseLeave: () => setPressed(false),
  };
  return { spring, bind };
}

/* ─── Scroll Parallax (replaces useScroll+useTransform) ─── */
export function useParallax(offset = 60) {
  const ref = useRef<HTMLDivElement>(null);
  const [y, setY] = useState(0);

  const handleScroll = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const windowH = window.innerHeight;
    const progress = Math.max(
      0,
      Math.min(1, (windowH - rect.top) / (windowH + rect.height))
    );
    setY(offset - progress * offset * 2);
  }, [offset]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const spring = useSpring({ y, config: { tension: 120, friction: 14 } });
  return { ref, spring };
}

/* ─── Looping pulse (replaces motion animate with repeat) ─── */
export function usePulse(from = 1, to = 1.1) {
  const [toggle, setToggle] = useState(false);
  const spring = useSpring({
    scale: toggle ? to : from,
    config: { duration: 1500 },
    onRest: () => setToggle(prev => !prev),
  });
  useEffect(() => setToggle(true), []);
  return spring;
}
