import { useRef, ReactNode } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from 'motion/react';
import { cn } from '@utils/core/cn';

/**
 * Hero Parallax — Aceternity-style scroll effect with
 * rotation, translation and opacity animations.
 *
 * Adapted for the Algorithmic Atelier design system
 * using motion (framer-motion).
 */

export interface HeroParallaxProduct {
  title: string;
  link: string;
  thumbnail: string;
}

interface HeroParallaxProps {
  products: HeroParallaxProduct[];
  children?: ReactNode;
  className?: string;
}

export const HeroParallax = ({
  products,
  children,
  className,
}: HeroParallaxProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

  // First row moves left
  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 1000]),
    springConfig
  );
  // Second row moves right
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -1000]),
    springConfig
  );
  // Third row moves left (slower)
  const translateXThird = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 500]),
    springConfig
  );

  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [15, 0]),
    springConfig
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0.2, 1]),
    springConfig
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [20, 0]),
    springConfig
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [-700, 0]),
    springConfig
  );

  // Split into 3 rows
  const firstRow = products.slice(0, Math.ceil(products.length / 3));
  const secondRow = products.slice(
    Math.ceil(products.length / 3),
    Math.ceil((products.length / 3) * 2)
  );
  const thirdRow = products.slice(Math.ceil((products.length / 3) * 2));

  return (
    <div
      ref={ref}
      className={cn(
        'h-[300vh] py-40 overflow-hidden antialiased relative flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d]',
        className
      )}
    >
      {/* Header Content (children) */}
      {children && (
        <div className='max-w-7xl relative mx-auto py-20 md:py-40 px-4 w-full left-0 top-0'>
          {children}
        </div>
      )}

      {/* Parallax Card Grid */}
      <motion.div
        style={{
          rotateX,
          rotateZ,
          translateY,
          opacity,
        }}
      >
        {/* Row 1 — moves right */}
        <motion.div className='flex flex-row-reverse space-x-reverse space-x-8 mb-8'>
          {firstRow.map(product => (
            <ProductCard
              key={product.title}
              product={product}
              translate={translateX}
            />
          ))}
        </motion.div>

        {/* Row 2 — moves left */}
        <motion.div className='flex flex-row space-x-8 mb-8'>
          {secondRow.map(product => (
            <ProductCard
              key={product.title}
              product={product}
              translate={translateXReverse}
            />
          ))}
        </motion.div>

        {/* Row 3 — moves right (slower) */}
        <motion.div className='flex flex-row-reverse space-x-reverse space-x-8'>
          {thirdRow.map(product => (
            <ProductCard
              key={product.title}
              product={product}
              translate={translateXThird}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

interface ProductCardProps {
  product: HeroParallaxProduct;
  translate: MotionValue<number>;
}

const ProductCard = ({ product, translate }: ProductCardProps) => {
  return (
    <motion.div
      style={{ x: translate }}
      whileHover={{ y: -20 }}
      className='group/product h-72 w-[28rem] relative shrink-0'
    >
      <a
        href={product.link}
        target='_blank'
        rel='noopener noreferrer'
        className='block group-hover/product:shadow-2xl'
      >
        <img
          src={product.thumbnail}
          alt={product.title}
          className='object-cover object-left-top absolute h-full w-full inset-0 rounded-xl'
          loading='lazy'
        />
      </a>
      <div className='absolute inset-0 h-full w-full opacity-0 group-hover/product:opacity-80 bg-black pointer-events-none rounded-xl transition-opacity duration-300' />
      <h3 className='absolute bottom-4 left-4 opacity-0 group-hover/product:opacity-100 text-white font-label-grotesk text-sm tracking-wider uppercase transition-opacity duration-300'>
        {product.title}
      </h3>
    </motion.div>
  );
};

/**
 * GradientPlaceholder — a decorative gradient card for when no image is available.
 * Use as a thumbnail source via a data URI or inline style.
 */
export const GRADIENT_PLACEHOLDERS = [
  'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
  'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
  'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)',
  'linear-gradient(135deg, #fccb90 0%, #d57eeb 100%)',
  'linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)',
  'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
  'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  'linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)',
  'linear-gradient(135deg, #fddb92 0%, #d1fdff 100%)',
  'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)',
  'linear-gradient(135deg, #d4fc79 0%, #96e6a1 100%)',
  'linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)',
];

/**
 * GradientCard — a product card replacement when no screenshot image is available.
 * Uses a CSS gradient background instead of an img tag.
 */
interface GradientCardProps {
  product: HeroParallaxProduct;
  translate: MotionValue<number>;
  gradient: string;
}

export const GradientCard = ({
  product,
  translate,
  gradient,
}: GradientCardProps) => {
  return (
    <motion.div
      style={{ x: translate }}
      whileHover={{ y: -20 }}
      className='group/product h-72 w-[28rem] relative shrink-0'
    >
      <a
        href={product.link}
        target='_blank'
        rel='noopener noreferrer'
        className='block group-hover/product:shadow-2xl absolute inset-0 rounded-xl overflow-hidden'
      >
        <div
          className='absolute inset-0 rounded-xl'
          style={{ background: gradient }}
        />
        <div className='absolute inset-0 bg-black/20 rounded-xl' />
        {/* Tech label overlay */}
        <div className='absolute top-4 left-4 flex items-center gap-2'>
          <div className='w-2 h-2 rounded-full bg-white/60' />
          <span className='text-white/80 text-xs font-label-grotesk uppercase tracking-widest'>
            {product.title}
          </span>
        </div>
      </a>
      <div className='absolute inset-0 h-full w-full opacity-0 group-hover/product:opacity-60 bg-black pointer-events-none rounded-xl transition-opacity duration-300' />
      <h3 className='absolute bottom-4 left-4 opacity-0 group-hover/product:opacity-100 text-white font-label-grotesk text-sm tracking-wider uppercase transition-opacity duration-300'>
        {product.title}
      </h3>
    </motion.div>
  );
};

/**
 * HeroParallaxWithGradients — variant that uses gradient cards instead of images.
 * Perfect for portfolios without product screenshots.
 */
interface HeroParallaxGradientsProps {
  products: HeroParallaxProduct[];
  children?: ReactNode;
  className?: string;
}

export const HeroParallaxWithGradients = ({
  products,
  children,
  className,
}: HeroParallaxGradientsProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 1000]),
    springConfig
  );
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -1000]),
    springConfig
  );
  const translateXThird = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 500]),
    springConfig
  );

  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [15, 0]),
    springConfig
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0.2, 1]),
    springConfig
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [20, 0]),
    springConfig
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [-700, 0]),
    springConfig
  );

  const firstRow = products.slice(0, Math.ceil(products.length / 3));
  const secondRow = products.slice(
    Math.ceil(products.length / 3),
    Math.ceil((products.length / 3) * 2)
  );
  const thirdRow = products.slice(Math.ceil((products.length / 3) * 2));

  return (
    <div
      ref={ref}
      className={cn(
        'h-[300vh] py-40 overflow-hidden antialiased relative flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d]',
        className
      )}
    >
      {children && (
        <div className='max-w-7xl relative mx-auto py-20 md:py-40 px-4 w-full left-0 top-0'>
          {children}
        </div>
      )}

      <motion.div
        style={{
          rotateX,
          rotateZ,
          translateY,
          opacity,
        }}
      >
        <motion.div className='flex flex-row-reverse space-x-reverse space-x-8 mb-8'>
          {firstRow.map((product, i) => (
            <GradientCard
              key={product.title}
              product={product}
              translate={translateX}
              gradient={GRADIENT_PLACEHOLDERS[i % GRADIENT_PLACEHOLDERS.length]}
            />
          ))}
        </motion.div>

        <motion.div className='flex flex-row space-x-8 mb-8'>
          {secondRow.map((product, i) => (
            <GradientCard
              key={product.title}
              product={product}
              translate={translateXReverse}
              gradient={
                GRADIENT_PLACEHOLDERS[
                  (i + firstRow.length) % GRADIENT_PLACEHOLDERS.length
                ]
              }
            />
          ))}
        </motion.div>

        <motion.div className='flex flex-row-reverse space-x-reverse space-x-8'>
          {thirdRow.map((product, i) => (
            <GradientCard
              key={product.title}
              product={product}
              translate={translateXThird}
              gradient={
                GRADIENT_PLACEHOLDERS[
                  (i + firstRow.length + secondRow.length) %
                    GRADIENT_PLACEHOLDERS.length
                ]
              }
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};
