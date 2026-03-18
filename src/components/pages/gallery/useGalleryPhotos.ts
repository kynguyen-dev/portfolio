import { useState, useCallback, useRef } from 'react';
import type { GalleryPhoto } from './types';

/* ─── Deterministic pseudo-random from seed ─── */
const seededRandom = (seed: number) => {
  const x = Math.sin(seed * 9301 + 49297) * 49297;
  return x - Math.floor(x);
};

/* ─── Pleasing background colors ─── */
const COLORS = [
  '#264653',
  '#2a9d8f',
  '#e9c46a',
  '#f4a261',
  '#e76f51',
  '#606c38',
  '#283618',
  '#dda15e',
  '#bc6c25',
  '#6d6875',
  '#b5838d',
  '#ffb4a2',
  '#023047',
  '#219ebc',
  '#8ecae6',
  '#540b0e',
  '#9b2226',
  '#ae2012',
  '#bb3e03',
  '#ca6702',
  '#ee9b00',
  '#e9d8a6',
  '#94d2bd',
  '#0a9396',
  '#005f73',
  '#7209b7',
  '#560bad',
  '#480ca8',
  '#3a0ca3',
  '#3f37c9',
  '#4361ee',
  '#4895ef',
  '#4cc9f0',
  '#f72585',
  '#b5179e',
];

/* ─── Author names for realism ─── */
const AUTHORS = [
  'Ava Chen',
  'Liam Müller',
  'Yuki Tanaka',
  'Sofia Reyes',
  'Noah Park',
  'Emma Johansson',
  'Mateo Rivera',
  'Aisha Khan',
  'Leo Rossi',
  'Chloe Dubois',
  'Kai Nakamura',
  'Mila Petrova',
  'Ethan Brooks',
  'Zara Ahmed',
  'Lucas Fernandez',
  'Olivia West',
  'Ravi Sharma',
  'Hana Kim',
  "Felix O'Connor",
  'Nadia Volkov',
];

/** How many photos to load per batch */
const BATCH_SIZE = 40;

/**
 * Generates a batch of photo metadata.
 * Uses Lorem Picsum with smaller thumbnail sizes to reduce network load.
 */
const generateBatch = (startIndex: number, count: number): GalleryPhoto[] =>
  Array.from({ length: count }, (_, i) => {
    const idx = startIndex + i;
    const seed = seededRandom(idx);

    // Smaller thumbnails = faster loads, less bandwidth
    const thumbW = 300;
    const thumbH = 200 + Math.floor(seed * 100); // 200-300px tall

    return {
      id: `photo-${idx}`,
      src: `https://picsum.photos/seed/${idx}/${thumbW * 3}/${thumbH * 3}`,
      thumbSrc: `https://picsum.photos/seed/${idx}/${thumbW}/${thumbH}`,
      width: thumbW,
      height: thumbH,
      author: AUTHORS[idx % AUTHORS.length],
      color: COLORS[idx % COLORS.length],
    };
  });

/**
 * Custom hook that manages photo data and infinite loading.
 * Starts with a single batch and loads more on demand.
 */
export const useGalleryPhotos = () => {
  // Start with just one batch (40 photos) instead of 120
  const [photos, setPhotos] = useState<GalleryPhoto[]>(() =>
    generateBatch(0, BATCH_SIZE)
  );
  const [isLoading, setIsLoading] = useState(false);
  const loadingRef = useRef(false);

  const loadMore = useCallback(() => {
    if (loadingRef.current) return;
    loadingRef.current = true;
    setIsLoading(true);

    // Small delay to prevent scroll-jank from synchronous state updates
    requestAnimationFrame(() => {
      setPhotos(prev => {
        const newBatch = generateBatch(prev.length, BATCH_SIZE);
        return [...prev, ...newBatch];
      });
      setIsLoading(false);
      loadingRef.current = false;
    });
  }, []);

  return { photos, isLoading, loadMore };
};
