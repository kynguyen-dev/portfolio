import { useState, useMemo, useEffect, useCallback } from 'react';
import { ArrowLeft, Search } from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';
import { animated, useSpring, useTransition } from '@react-spring/web';
import { PFGradientTypography, PFTypography } from '@components/core';
import { SunriseBackground } from '@components/customs/backgrounds/SunriseBackground';
import { CharacterTable } from '@components/pages/three-kingdoms/CharacterTable';
import { CharacterDetail } from '@components/pages/three-kingdoms/CharacterDetail';
import { BattleCompare } from '@components/pages/three-kingdoms/BattleCompare';
import { KingdomFilter } from '@components/pages/three-kingdoms/KingdomFilter';
import { CHARACTERS, QUOTES, getKingdomMeta } from '@constants/three-kingdoms';
import type {
  ThreeKingdomsCharacter,
  Kingdom,
} from '@constants/three-kingdoms';
import type { SortingState } from '@tanstack/react-table';
import { useThemeMode } from '@contexts/theme-mode';

type View = 'browse' | 'detail' | 'compare';

const ThreeKingdoms = () => {
  const navigate = useNavigate();
  const { mode } = useThemeMode();
  const isLight = mode === 'light';

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
    from: { opacity: 0, maxHeight: 0 },
    enter: { opacity: 1, maxHeight: 500 },
    leave: { opacity: 0, maxHeight: 0 },
    config: { duration: 300 },
  });
  const quoteTransition = useTransition(quoteIdx, {
    from: { opacity: 0, y: 8 },
    enter: { opacity: 1, y: 0 },
    leave: { opacity: 0, y: -8 },
    config: { duration: 500 },
  });
  const viewTransition = useTransition(view, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: { duration: 200 },
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
      <main
        className='flex flex-col overflow-hidden px-4 md:px-12 lg:px-16 py-16 md:py-20'
        style={{ height: 'calc(100vh - 80px)' }}
      >
        {/* Back button */}
        <div className='fixed top-5 left-5 z-50'>
          <button
            onClick={handleBack}
            aria-label='Back'
            className='flex items-center justify-center w-10 h-10 rounded-full text-ct-on-surface bg-ct-surface-container/80 backdrop-blur-xl border border-ct-outline-variant/20 hover:bg-ct-surface-container-high/90 transition-colors cursor-pointer'
          >
            <ArrowLeft size={20} />
          </button>
        </div>

        {/* Header */}
        {headerTransition((style, key) => (
          <animated.div key={key} style={{ ...style, overflow: 'hidden' }}>
            <div
              className={`flex flex-col items-center gap-2 ${view === 'browse' ? 'mb-8' : 'mb-4'}`}
            >
              <animated.div style={logoSpring}>
                <img
                  src='/images/three-kingdoms/logo.jpg'
                  alt='Three Kingdoms'
                  className={`rounded-full object-cover transition-all duration-300 ${
                    view === 'browse'
                      ? 'w-20 h-20 md:w-[100px] md:h-[100px]'
                      : 'w-12 h-12 md:w-14 md:h-14'
                  }`}
                  style={{
                    border: `2px solid ${isLight ? 'rgba(184,137,31,0.3)' : 'rgba(245,208,96,0.3)'}`,
                    boxShadow: isLight
                      ? '0 4px 20px rgba(184,137,31,0.15)'
                      : '0 4px 20px rgba(245,208,96,0.15)',
                  }}
                />
              </animated.div>
              <PFGradientTypography
                variant={view === 'browse' ? 'h3' : 'h5'}
                fontWeight={800}
              >
                Three Kingdoms Finder
              </PFGradientTypography>

              {view === 'browse' && (
                <div className='relative' style={{ minHeight: 60 }}>
                  {quoteTransition((qStyle, idx) => (
                    <animated.div
                      key={idx}
                      style={{ ...qStyle, position: 'absolute', width: '100%' }}
                    >
                      <PFTypography
                        variant='body2'
                        textAlign='center'
                        className='italic max-w-[500px] mx-auto'
                        style={{ color: isLight ? '#8B7355' : '#C9A96E' }}
                      >
                        &quot;{QUOTES[idx]?.vi}&quot;
                        <span className='block text-[0.7rem] mt-1 opacity-70'>
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
            }}
          >
            {currentView === 'browse' && (
              <>
                {comparePick && (
                  <div
                    className='mb-4 p-3 rounded-lg flex items-center justify-center gap-4'
                    style={{
                      background: `linear-gradient(90deg, ${getKingdomColor(comparePick)}18, transparent)`,
                      border: `1px solid ${getKingdomColor(comparePick)}40`,
                    }}
                  >
                    <PFTypography variant='body2' fontWeight={600}>
                      ⚔️ Select an opponent for{' '}
                      <span
                        className='font-extrabold'
                        style={{ color: getKingdomColor(comparePick) }}
                      >
                        {comparePick.name.cn} ({comparePick.name.en})
                      </span>
                    </PFTypography>
                    <button
                      onClick={handleCancelCompare}
                      className='px-3 py-1 rounded-md cursor-pointer text-xs font-semibold text-ct-on-surface-variant border border-ct-outline-variant/15 hover:bg-white/5 transition-colors'
                    >
                      ✕ Cancel
                    </button>
                  </div>
                )}

                {/* Search + filter */}
                <div className='flex flex-col sm:flex-row gap-4 sm:items-center mb-6'>
                  <div className='relative flex-1 max-w-[320px]'>
                    <Search
                      size={18}
                      className='absolute left-3 top-1/2 -translate-y-1/2 text-ct-on-surface-variant'
                    />
                    <input
                      type='text'
                      placeholder='Search by name...'
                      value={search}
                      onChange={e => setSearch(e.target.value)}
                      className='w-full pl-10 pr-4 py-2 rounded-lg text-sm text-ct-on-surface placeholder:text-ct-on-surface-variant/50 backdrop-blur-sm border focus:outline-none focus:ring-2 focus:ring-primary-main/50'
                      style={{
                        background: isLight
                          ? 'rgba(255,248,240,0.7)'
                          : 'rgba(11,13,46,0.4)',
                        borderColor: isLight
                          ? 'rgba(184,137,31,0.2)'
                          : 'rgba(245,208,96,0.2)',
                      }}
                    />
                  </div>
                  <KingdomFilter
                    selected={kingdomFilter}
                    onChange={setKingdomFilter}
                  />
                </div>

                <CharacterTable
                  data={filteredData}
                  globalFilter={search}
                  sorting={sorting}
                  onSortingChange={setSorting}
                  onRowClick={handleRowClick}
                />

                <PFTypography
                  variant='caption'
                  textAlign='center'
                  className='block mt-3 text-ct-on-surface-variant'
                >
                  {filteredData.length} warriors
                </PFTypography>
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

const getKingdomColor = (char: ThreeKingdomsCharacter) =>
  getKingdomMeta(char.kingdom).color;

export default ThreeKingdoms;
