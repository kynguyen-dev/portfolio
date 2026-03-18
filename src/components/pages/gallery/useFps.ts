import { useEffect, useRef, useCallback, useState } from 'react';

/**
 * Measures real-time FPS using requestAnimationFrame.
 * Updates every 500 ms to avoid excessive re-renders.
 */
export const useFps = () => {
  const [fps, setFps] = useState(0);
  const frameCount = useRef(0);
  const lastTime = useRef(performance.now());
  const rafId = useRef(0);

  const tick = useCallback(() => {
    frameCount.current++;
    const now = performance.now();
    const elapsed = now - lastTime.current;

    if (elapsed >= 500) {
      setFps(Math.round((frameCount.current * 1000) / elapsed));
      frameCount.current = 0;
      lastTime.current = now;
    }

    rafId.current = requestAnimationFrame(tick);
  }, []);

  useEffect(() => {
    rafId.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId.current);
  }, [tick]);

  return fps;
};
