import { useState, useMemo, useEffect, useCallback } from 'react';
import {
  CaretLeftIcon,
  MagnifyingGlassIcon,
  XIcon,
} from '@phosphor-icons/react';
import { useNavigate } from '@tanstack/react-router';
import { animated, useSpring, useTransition } from '@react-spring/web';
import { PFAppBar, PFGradientTypography, PFTypography } from '@components/core';
import { SunriseBackground } from '@components/customs/backgrounds/SunriseBackground';
import { CharacterTable } from '@components/pages/three-kingdoms/CharacterTable';
import { CharacterDetail } from '@components/pages/three-kingdoms/CharacterDetail';
import { BattleCompare } from '@components/pages/three-kingdoms/BattleCompare';
import { KingdomFilter } from '@components/pages/three-kingdoms/KingdomFilter';
import { CHARACTERS, QUOTES, getKingdomMeta } from '@constants/three-kingdoms';
import { APP_THEMES } from '@constants';
import type {
  ThreeKingdomsCharacter,
  Kingdom,
} from '@constants/three-kingdoms';
import type { SortingState } from '@tanstack/react-table';
import { useThemeMode } from '@contexts/theme-mode';
import { cn } from '@utils/core/cn';
import { Meteors } from '@components/customs/aceternity';

type View = 'browse' | 'detail' | 'compare';

const ThreeKingdoms = () => {
  const navigate = useNavigate();
  const { mode } = useThemeMode();

  const [view, setView] = useState<View>('browse');
  const [search, setSearch] = useState('');
  const [kingdomFilter, setKingdomFilter] = useState<Kingdom | 'all'>('all');
  const [sorting, setSorting] = useState<SortingState>([]);
  const [selected, setSelected] = useState<ThreeKingdomsCharacter | null>(null);
  const [comparePick, setComparePick] = useState<ThreeKingdomsCharacter | null>(
    null
  );
  const [fighter1, setFighter1] = useState<ThreeKingdomsCharacter | null>(null);
  const [fighter2, setFighter2] = useState<ThreeKingdomsCharacter | null>(null);
  const [quoteIdx, setQuoteIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(
      () => setQuoteIdx(prev => (prev + 1) % QUOTES.length),
      6000
    );
    return () => clearInterval(timer);
  }, []);

  const filteredData = useMemo(
    () =>
      kingdomFilter === 'all'
        ? CHARACTERS
        : CHARACTERS.filter(c => c.kingdom === kingdomFilter),
    [kingdomFilter]
  );

  const handleRowClick = useCallback(
    (char: ThreeKingdomsCharacter) => {
      if (comparePick) {
        setFighter1(comparePick);
        setFighter2(char);
        setComparePick(null);
        setView('compare');
      } else {
        setSelected(char);
        setView('detail');
      }
    },
    [comparePick]
  );

  const handleCompare = useCallback((char: ThreeKingdomsCharacter) => {
    setComparePick(char);
    setSelected(null);
    setView('browse');
  }, []);

  const handleCancelCompare = useCallback(() => setComparePick(null), []);

  const handleBackToDetail = useCallback((char: ThreeKingdomsCharacter) => {
    setSelected(char);
    setFighter1(null);
    setFighter2(null);
    setComparePick(null);
    setView('detail');
  }, []);

  const handleBackToBrowse = useCallback(() => {
    setView('browse');
    setSelected(null);
    setFighter1(null);
    setFighter2(null);
    setComparePick(null);
  }, []);

  const handleBack = useCallback(() => {
    if (comparePick) {
      handleCancelCompare();
      return;
    }
    if (view === 'compare') {
      if (fighter1) {
        handleBackToDetail(fighter1);
      } else {
        handleBackToBrowse();
      }
    } else if (view === 'detail') {
      handleBackToBrowse();
    } else {
      navigate({ to: '/' });
    }
  }, [
    view,
    navigate,
    fighter1,
    comparePick,
    handleBackToDetail,
    handleBackToBrowse,
    handleCancelCompare,
  ]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleBack();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [handleBack]);

  const headerKey = view === 'browse' ? 'full' : 'compact';
  const headerTransition = useTransition(headerKey, {
    from: { opacity: 0, y: -20 },
    enter: { opacity: 1, y: 0 },
    leave: { opacity: 0, y: -20 },
    config: { tension: 280, friction: 60 },
  });
  const quoteTransition = useTransition(quoteIdx, {
    from: { opacity: 0, y: 8 },
    enter: { opacity: 1, y: 0 },
    leave: { opacity: 0, y: -8 },
    config: { duration: 500 },
  });
  const viewTransition = useTransition(view, {
    from: { opacity: 0, scale: 0.98, filter: 'blur(10px)' },
    enter: { opacity: 1, scale: 1, filter: 'blur(0px)' },
    leave: { opacity: 0, scale: 0.98, filter: 'blur(10px)' },
    config: { tension: 220, friction: 24 },
  });

  const [logoPulse, setLogoPulse] = useState(false);
  useEffect(() => {
    const interval = setInterval(() => setLogoPulse(prev => !prev), 1500);
    return () => clearInterval(interval);
  }, []);
  const logoSpring = useSpring({
    scale: logoPulse ? 1.05 : 1,
    config: { duration: 1500 },
  });

  return (
    <SunriseBackground>
      <div className='fixed inset-0 z-0 pointer-events-none overflow-hidden'>
        <Meteors number={20} />
      </div>
      <PFAppBar
        brandText='Three Kingdoms Finder'
        brandLogo={
          <div className='w-8 h-8 rounded-full overflow-hidden glass-panel primary-glow p-0.5 border-ct-secondary/30'>
            <img
              src='/images/three-kingdoms/logo.jpg'
              alt='Logo'
              className='w-full h-full rounded-full object-cover'
            />
          </div>
        }
      />
      <main
        className='flex flex-col overflow-hidden px-4 md:px-12 lg:px-16 pt-24 pb-24 md:pt-32 md:pb-32 relative z-10'
        style={{ height: '100vh' }}
      >
        {/* Back button */}
        <div className='fixed top-[88px] left-5 z-50 md:top-[96px] md:left-8'>
          <button
            onClick={handleBack}
            aria-label='Back'
            className='flex items-center justify-center w-10 h-10 rounded-full text-ct-on-surface glass-panel hover:bg-ct-surface-container-high/90 transition-all duration-300 cursor-pointer active:scale-90 shadow-lg shadow-black/10'
          >
            <CaretLeftIcon size={20} weight='bold' />
          </button>
        </div>

        {/* Header */}
        {headerTransition((style, key) => (
          <animated.div key={key} style={style}>
            <div
              className={`flex flex-col items-center gap-2 ${view === 'browse' ? 'mb-8' : 'mb-4'}`}
            >
              <animated.div style={logoSpring}>
                <div
                  className={cn(
                    'rounded-full overflow-hidden transition-all duration-500 glass-panel primary-glow p-1',
                    view === 'browse'
                      ? 'w-24 h-24 md:w-28 md:h-28'
                      : 'w-12 h-12 md:w-14 md:h-14'
                  )}
                >
                  <img
                    src='/images/three-kingdoms/logo.jpg'
                    alt='Three Kingdoms'
                    className='w-full h-full rounded-full object-cover'
                  />
                </div>
              </animated.div>
              <PFGradientTypography
                variant={view === 'browse' ? 'h3' : 'h5'}
                fontWeight={800}
                theme={mode === 'dark' ? APP_THEMES.DARK : APP_THEMES.LIGHT}
                className='font-serif-display uppercase tracking-widest'
              >
                Three Kingdoms Finder
              </PFGradientTypography>

              {view === 'browse' && (
                <div className='relative w-full' style={{ minHeight: 80 }}>
                  {quoteTransition((qStyle, idx) => (
                    <animated.div
                      key={idx}
                      style={{ ...qStyle, position: 'absolute', width: '100%' }}
                    >
                      <PFTypography
                        variant='body2'
                        textAlign='center'
                        className='italic max-w-[600px] mx-auto text-ct-on-surface-variant font-medium'
                      >
                        &quot;{QUOTES[idx]?.vi}&quot;
                        <span className='block text-xs mt-1 font-bold text-ct-secondary tracking-widest uppercase'>
                          — {QUOTES[idx]?.author}
                        </span>
                      </PFTypography>
                    </animated.div>
                  ))}
                </div>
              )}
            </div>
          </animated.div>
        ))}

        {/* Content */}
        {viewTransition((style, currentView) => (
          <animated.div
            key={currentView}
            style={{
              ...style,
              display: currentView === view ? 'flex' : 'none',
              flexDirection: 'column',
              flex: 1,
              minHeight: 0,
            }}
          >
            {currentView === 'browse' && (
              <>
                {comparePick && (
                  <div className='mb-6 p-4 rounded-xl flex items-center justify-between gap-4 glass-panel border-ct-secondary/30 animate-pulse'>
                    <div className='flex items-center gap-3'>
                      <div className='w-2 h-2 rounded-full bg-ct-secondary animate-ping' />
                      <PFTypography
                        variant='body2'
                        className='font-bold text-ct-on-surface'
                      >
                        ⚔️ Select an opponent for{' '}
                        <span
                          className='font-black'
                          style={{
                            color: getKingdomMeta(comparePick.kingdom).color,
                          }}
                        >
                          {comparePick.name.cn}
                        </span>
                      </PFTypography>
                    </div>
                    <button
                      onClick={handleCancelCompare}
                      className='flex items-center gap-1 px-3 py-1.5 rounded-lg cursor-pointer text-xs font-black text-ct-secondary uppercase tracking-widest glass-panel hover:bg-ct-surface-container-highest transition-all duration-300'
                    >
                      <XIcon size={14} weight='bold' /> Cancel
                    </button>
                  </div>
                )}

                {/* Search + filter */}
                <div className='flex flex-col md:flex-row gap-6 md:items-center mb-8'>
                  <div className='relative flex-1 max-w-[400px]'>
                    <MagnifyingGlassIcon
                      size={20}
                      className='absolute left-4 top-1/2 -translate-y-1/2 text-ct-secondary z-10'
                      weight='bold'
                    />
                    <input
                      type='text'
                      placeholder='Search warriors...'
                      value={search}
                      onChange={e => setSearch(e.target.value)}
                      className='w-full pl-12 pr-4 py-3 rounded-xl text-sm text-ct-on-surface placeholder:text-ct-on-surface-variant/40 glass-panel focus:outline-none focus:ring-2 focus:ring-ct-secondary/40 focus:border-ct-secondary/50 transition-all duration-300 font-medium'
                    />
                  </div>
                  <KingdomFilter
                    selected={kingdomFilter}
                    onChange={setKingdomFilter}
                  />
                </div>

                <div className='glass-panel rounded-2xl overflow-hidden ambient-shadow flex-1 min-h-0'>
                  <CharacterTable
                    data={filteredData}
                    globalFilter={search}
                    sorting={sorting}
                    onSortingChange={setSorting}
                    onRowClick={handleRowClick}
                  />
                </div>

                <div className='flex justify-center mt-6'>
                  <span className='hud-breadcrumb'>
                    {filteredData.length}{' '}
                    <span className='text-ct-on-surface-variant/60'>
                      Warriors Discovered
                    </span>
                  </span>
                </div>
              </>
            )}

            {currentView === 'detail' && selected && (
              <CharacterDetail
                character={selected}
                onClose={() => {
                  setView('browse');
                  setSelected(null);
                }}
                onCompare={handleCompare}
              />
            )}

            {currentView === 'compare' && fighter1 && fighter2 && (
              <BattleCompare
                fighter1={fighter1}
                fighter2={fighter2}
                onBackToDetail={handleBackToDetail}
                onBackToBrowse={handleBackToBrowse}
              />
            )}
          </animated.div>
        ))}
      </main>
    </SunriseBackground>
  );
};

export default ThreeKingdoms;
