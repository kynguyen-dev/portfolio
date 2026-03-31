import { useRef, ReactNode, useMemo } from 'react';
import {
  useSpring,
  animated,
  useScroll,
  config,
  Interpolation,
} from '@react-spring/web';
import { cn } from '@utils/core/cn';

/**
 * Hero Parallax — Aceternity-style scroll effect with
 * rotation, translation and opacity animations.
 *
 * Adapted for the Algorithmic Atelier design system
 * using @react-spring/web for high-performance physics-based animations.
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
    // @ts-expect-error container type discrepancy
    container: ref,
    default: {
      immediate: true,
    },
  });

  const springConfig = { tension: 170, friction: 26 };

  // First row moves left
  const translateX = scrollYProgress.to([0, 1], [0, 1000]);
  // Second row moves right
  const translateXReverse = scrollYProgress.to([0, 1], [0, -1000]);
  // Third row moves left (slower)
  const translateXThird = scrollYProgress.to([0, 1], [0, 500]);

  // Combined spring for the grid container transformations
  const containerSpring = useSpring({
    rotateX: scrollYProgress.to([0, 0.2], [15, 0]),
    rotateZ: scrollYProgress.to([0, 0.2], [20, 0]),
    translateY: scrollYProgress.to([0, 0.2], [-700, 0]),
    opacity: scrollYProgress.to([0, 0.2], [0.2, 1]),
    config: springConfig,
  });

  // Split into 3 rows
  const { firstRow, secondRow, thirdRow } = useMemo(() => {
    const rowSize = Math.ceil(products.length / 3);
    return {
      firstRow: products.slice(0, rowSize),
      secondRow: products.slice(rowSize, rowSize * 2),
      thirdRow: products.slice(rowSize * 2),
    };
  }, [products]);

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
      <animated.div
        style={{
          rotateX: containerSpring.rotateX,
          rotateZ: containerSpring.rotateZ,
          transform: containerSpring.translateY.to(y => `translateY(${y}px)`),
          opacity: containerSpring.opacity,
        }}
      >
        {/* Row 1 — moves right */}
        <div className='flex flex-row-reverse space-x-reverse space-x-8 mb-8'>
          {firstRow.map(product => (
            <ProductCard
              key={product.title}
              product={product}
              translate={translateX}
            />
          ))}
        </div>

        {/* Row 2 — moves left */}
        <div className='flex flex-row space-x-8 mb-8'>
          {secondRow.map(product => (
            <ProductCard
              key={product.title}
              product={product}
              translate={translateXReverse}
            />
          ))}
        </div>

        {/* Row 3 — moves right (slower) */}
        <div className='flex flex-row-reverse space-x-reverse space-x-8'>
          {thirdRow.map(product => (
            <ProductCard
              key={product.title}
              product={product}
              translate={translateXThird}
            />
          ))}
        </div>
      </animated.div>
    </div>
  );
};

interface ProductCardProps {
  product: HeroParallaxProduct;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  translate: Interpolation<number, any>;
}

const ProductCard = ({ product, translate }: ProductCardProps) => {
  const [hoverSpring, api] = useSpring(() => ({
    y: 0,
    config: config.gentle,
  }));

  return (
    <animated.div
      style={{
        x: translate,
        transform: hoverSpring.y.to(y => `translateY(${y}px)`),
      }}
      onMouseEnter={() => api.start({ y: -20 })}
      onMouseLeave={() => api.start({ y: 0 })}
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
    </animated.div>
  );
};

/**
 * GradientPlaceholder — a decorative gradient card for when no image is available.
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

interface GradientCardProps {
  product: HeroParallaxProduct;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  translate: Interpolation<number, any>;
  gradient: string;
}

export const GradientCard = ({
  product,
  translate,
  gradient,
}: GradientCardProps) => {
  const [hoverSpring, api] = useSpring(() => ({
    y: 0,
    config: config.gentle,
  }));

  return (
    <animated.div
      style={{
        x: translate,
        transform: hoverSpring.y.to(y => `translateY(${y}px)`),
      }}
      onMouseEnter={() => api.start({ y: -20 })}
      onMouseLeave={() => api.start({ y: 0 })}
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
    </animated.div>
  );
};

export const HeroParallaxWithGradients = ({
  products,
  children,
  className,
}: HeroParallaxProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    // @ts-expect-error container type discrepancy
    container: ref,
    default: {
      immediate: true,
    },
  });

  const springConfig = { tension: 170, friction: 26 };

  const translateX = scrollYProgress.to([0, 1], [0, 1000]);
  const translateXReverse = scrollYProgress.to([0, 1], [0, -1000]);
  const translateXThird = scrollYProgress.to([0, 1], [0, 500]);

  const containerSpring = useSpring({
    rotateX: scrollYProgress.to([0, 0.2], [15, 0]),
    rotateZ: scrollYProgress.to([0, 0.2], [20, 0]),
    translateY: scrollYProgress.to([0, 0.2], [-700, 0]),
    opacity: scrollYProgress.to([0, 0.2], [0.2, 1]),
    config: springConfig,
  });

  const { firstRow, secondRow, thirdRow } = useMemo(() => {
    const rowSize = Math.ceil(products.length / 3);
    return {
      firstRow: products.slice(0, rowSize),
      secondRow: products.slice(rowSize, rowSize * 2),
      thirdRow: products.slice(rowSize * 2),
    };
  }, [products]);

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

      <animated.div
        style={{
          rotateX: containerSpring.rotateX,
          rotateZ: containerSpring.rotateZ,
          transform: containerSpring.translateY.to(y => `translateY(${y}px)`),
          opacity: containerSpring.opacity,
        }}
      >
        <div className='flex flex-row-reverse space-x-reverse space-x-8 mb-8'>
          {firstRow.map((product, i) => (
            <GradientCard
              key={product.title}
              product={product}
              translate={translateX}
              gradient={GRADIENT_PLACEHOLDERS[i % GRADIENT_PLACEHOLDERS.length]}
            />
          ))}
        </div>

        <div className='flex flex-row space-x-8 mb-8'>
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
        </div>

        <div className='flex flex-row-reverse space-x-reverse space-x-8'>
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
        </div>
      </animated.div>
    </div>
  );
};
