import { useNavigate } from '@tanstack/react-router';
import { animated, useTrail } from '@react-spring/web';
import { ArrowUpRight } from '@phosphor-icons/react';
import { useTranslation } from 'react-i18next';
import { ROUTES } from '@constants/router';
import { useInView } from '@utils/animations/springVariants';

interface ToolItem {
  emoji?: string;
  image?: string;
  titleKey: string;
  descriptionKey: string;
  route: string;
  /** Grid column span on md+ */
  colSpan: number;
  /** Card height */
  height: string;
  /** Optional tech label key */
  techLabelKey?: string;
}

const TOOLS: ToolItem[] = [
  {
    image: '/images/three-kingdoms/logo.jpg',
    titleKey: 'tools.items.threeKingdoms.title',
    descriptionKey: 'tools.items.threeKingdoms.description',
    route: ROUTES.TOOLS.THREE_KINGDOMS,
    colSpan: 8,
    height: 'h-[500px]',
    techLabelKey: 'tools.items.threeKingdoms.techLabel',
  },
  {
    emoji: '🖼️',
    titleKey: 'tools.items.gallery.title',
    descriptionKey: 'tools.items.gallery.description',
    route: ROUTES.TOOLS.GALLERY,
    colSpan: 4,
    height: 'h-[500px]',
    techLabelKey: 'tools.items.gallery.techLabel',
  },
  {
    emoji: '🤖',
    titleKey: 'tools.items.aiSqlHelper.title',
    descriptionKey: 'tools.items.aiSqlHelper.description',
    route: ROUTES.TOOLS.AI_SQL_HELPER,
    colSpan: 4,
    height: 'h-80',
    techLabelKey: 'tools.items.aiSqlHelper.techLabel',
  },
  {
    emoji: '📊',
    titleKey: 'tools.items.marketInsights.title',
    descriptionKey: 'tools.items.marketInsights.description',
    route: ROUTES.TOOLS.MARKET_INSIGHTS,
    colSpan: 4,
    height: 'h-80',
    techLabelKey: 'tools.items.marketInsights.techLabel',
  },
];

export const Tools = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { ref, inView } = useInView({ threshold: 0.1 });

  const trail = useTrail(TOOLS.length + 1, {
    from: { opacity: 0, y: 40, scale: 0.95 },
    to: inView
      ? { opacity: 1, y: 0, scale: 1 }
      : { opacity: 0, y: 40, scale: 0.95 },
    config: { tension: 200, friction: 20 },
  });

  return (
    <section id='tools' className='py-24 px-8 lg:px-16'>
      {/* ─── Section Header ─── */}
      <div className='flex items-end gap-6 mb-16'>
        <div className='flex-shrink-0'>
          <h2 className='text-ct-secondary font-label-grotesk text-xs font-black tracking-[0.3em] uppercase mb-2'>
            03 {'// '}
            {t('tools.sectionLabel')}
          </h2>
          <h3 className='font-serif-display text-4xl md:text-5xl text-ct-on-surface'>
            {t('tools.heading')}
          </h3>
        </div>
        <div
          className='hidden md:block h-[2px] flex-grow'
          style={{ background: 'linear-gradient(to right, #4edea3, transparent)' }}
        />
      </div>

      {/* ─── 12-Column Grid ─── */}
      <div ref={ref} className='grid grid-cols-1 md:grid-cols-12 gap-6'>
        {TOOLS.map((tool, i) => (
          <animated.div
            key={tool.route}
            style={trail[i]}
            className={`md:col-span-${tool.colSpan} group relative overflow-hidden rounded-2xl ${tool.height} glass-panel cursor-pointer`}
            onClick={() => navigate({ to: tool.route })}
            role='link'
            tabIndex={0}
            onKeyDown={e => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                navigate({ to: tool.route });
              }
            }}
          >
            {/* Background Image or Gradient */}
            {tool.image ? (
              <img
                alt={t(tool.titleKey)}
                className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-40'
                src={tool.image}
              />
            ) : (
              <div className='absolute inset-0 bg-gradient-to-br from-ct-surface-container-high/50 to-ct-surface-container-lowest transition-all duration-500 group-hover:from-primary-main/5' />
            )}

            {/* Content Overlay */}
            <div className='absolute inset-0 bg-gradient-to-t from-ct-bg via-ct-bg/20 to-transparent p-8 md:p-12 flex flex-col justify-end'>
              {/* Emoji/Icon */}
              {tool.emoji && (
                <div className='text-4xl mb-4 opacity-80 group-hover:opacity-100 transition-opacity'>
                  {tool.emoji}
                </div>
              )}

              {/* Tech Label */}
              {tool.techLabelKey && (
                <div className='text-ct-secondary font-label-grotesk text-sm tracking-widest mb-2'>
                  [ {t(tool.techLabelKey)} ]
                </div>
              )}

              {/* Title */}
              <h4
                className={`font-serif-display mb-3 ${tool.colSpan >= 8 ? 'text-3xl md:text-4xl' : 'text-2xl md:text-3xl'}`}
              >
                {t(tool.titleKey)}
              </h4>

              {/* Description */}
              <p className='text-ct-on-surface-variant text-sm max-w-lg leading-relaxed'>
                {t(tool.descriptionKey)}
              </p>

              {/* CTA */}
              <div className='mt-6 flex gap-4'>
                <span className='px-6 py-2 bg-ct-secondary text-ct-on-secondary text-xs font-bold rounded inline-flex items-center gap-2 group-hover:shadow-[0_0_20px_rgba(78,222,163,0.3)] transition-shadow'>
                  {t('tools.explore')}
                  <ArrowUpRight size={14} weight='bold' />
                </span>
                <span className='text-ct-outline-variant flex items-center gap-2 text-xs'>
                  {'// '}
                  {tool.techLabelKey ? t(tool.techLabelKey) : ''}
                </span>
              </div>
            </div>
          </animated.div>
        ))}

        {/* ─── CTA Card: "Interested in Synthesis?" ─── */}
        <animated.div
          style={trail[TOOLS.length]}
          className='md:col-span-4 bg-ct-surface-container-high p-12 rounded-2xl flex items-center justify-between border border-ct-outline-variant/10'
        >
          <div className='max-w-md'>
            <h4 className='text-3xl font-serif-display mb-4'>
              {t('nav.initContact')}
            </h4>
            <p className='text-ct-on-surface-variant'>{t('tools.subtitle')}</p>
          </div>
          <a
            href='#contact'
            className='w-16 h-16 rounded-full bg-primary-main text-ct-on-primary flex items-center justify-center hover:scale-110 transition-transform flex-shrink-0'
          >
            <ArrowUpRight size={24} weight='bold' />
          </a>
        </animated.div>
      </div>
    </section>
  );
};
