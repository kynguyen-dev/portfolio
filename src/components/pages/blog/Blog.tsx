import { animated, useTrail } from '@react-spring/web';
import { ArrowSquareOutIcon } from '@phosphor-icons/react';
import { useTranslation } from 'react-i18next';
import {
  PFGradientTypography,
  PFTypography,
} from '@components/core/typography';
import { APP_THEMES, APP_TYPOGRAPHIES } from '@constants';
import { useInView } from '@utils/animations/springVariants';

interface BlogPost {
  titleKey: string;
  summaryKey: string;
  url: string;
  tags: string[];
  date: string;
  minRead: number;
}

const posts: BlogPost[] = [
  {
    titleKey: 'Scaling React Apps with Feature-Based Architecture',
    summaryKey:
      'How I structure large React + TypeScript codebases using feature folders, barrel exports, and path aliases to keep things maintainable as the team grows.',
    url: 'https://dev.to/',
    tags: ['React', 'Architecture', 'TypeScript'],
    date: '2025-12',
    minRead: 6,
  },
  {
    titleKey: 'Taming API State with TanStack Query',
    summaryKey:
      'A practical guide to replacing manual useEffect data fetching with TanStack Query — caching, retries, optimistic updates, and real-world patterns.',
    url: 'https://dev.to/',
    tags: ['TanStack Query', 'React', 'Performance'],
    date: '2025-10',
    minRead: 8,
  },
  {
    titleKey: 'Building Accessible UIs with Material UI',
    summaryKey:
      'Lessons learned from shipping healthcare and education platforms — keyboard navigation, ARIA patterns, and color contrast strategies that actually work.',
    url: 'https://dev.to/',
    tags: ['Accessibility', 'Material UI', 'UX'],
    date: '2025-08',
    minRead: 5,
  },
];

export const Blog = () => {
  const { t } = useTranslation();
  const { ref, inView } = useInView({ threshold: 0.15 });

  const trail = useTrail(posts.length, {
    from: { opacity: 0, y: 40, scale: 0.95 },
    to: inView
      ? { opacity: 1, y: 0, scale: 1 }
      : { opacity: 0, y: 40, scale: 0.95 },
    config: { tension: 170, friction: 26 },
  });

  return (
    <section
      aria-label={t('blog.heading')}
      className='py-16 md:py-24 px-4 md:px-12 max-w-[1100px] mx-auto'
    >
      <PFGradientTypography
        variant={APP_TYPOGRAPHIES.HEADER_PRIMARY}
        theme={APP_THEMES.DARK}
        fontWeight='bold'
        align='center'
        className='mb-2'
      >
        {t('blog.heading')}
      </PFGradientTypography>
      <PFTypography
        variant='body1'
        align='center'
        className='text-text-secondary opacity-70 mb-12'
      >
        {t('blog.subtitle')}
      </PFTypography>

      <div ref={ref} className='flex flex-col gap-6'>
        {trail.map((style, i) => {
          const post = posts[i];
          return (
            <animated.a
              key={i}
              href={post.url}
              target='_blank'
              rel='noopener noreferrer'
              style={{ ...style, textDecoration: 'none', display: 'block' }}
            >
              <div className='glass rounded-2xl p-6 md:p-8 cursor-pointer border-l-[3px] border-l-primary-light focus-visible:outline-2 focus-visible:outline-primary-light focus-visible:outline-offset-2 transition-transform duration-200 hover:scale-[1.01]'>
                <div className='flex flex-row justify-between items-start'>
                  <div className='flex-1'>
                    <div className='flex items-center gap-2 mb-2'>
                      <PFTypography
                        variant='h6'
                        fontWeight={700}
                        className='text-ct-on-surface'
                      >
                        {post.titleKey}
                      </PFTypography>
                      <ArrowSquareOutIcon
                        size={18}
                        className='text-ct-on-surface-variant/40'
                      />
                    </div>
                    <PFTypography
                      variant='body2'
                      className='text-text-secondary opacity-80 leading-[1.7] mb-4'
                    >
                      {post.summaryKey}
                    </PFTypography>
                    <div className='flex flex-row flex-wrap gap-2 items-center'>
                      {post.tags.map(tag => (
                        <span
                          key={tag}
                          className='text-[0.7rem] font-semibold px-2 py-0.5 rounded-full border border-primary-light/20 bg-primary-light/10 text-primary-light'
                        >
                          {tag}
                        </span>
                      ))}
                      <PFTypography
                        variant='caption'
                        className='text-text-secondary opacity-50 ml-2'
                      >
                        {post.date} · {t('blog.minRead', { min: post.minRead })}
                      </PFTypography>
                    </div>
                  </div>
                </div>
              </div>
            </animated.a>
          );
        })}
      </div>
    </section>
  );
};
