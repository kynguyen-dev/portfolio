import { useState, useMemo, useEffect, useCallback } from 'react';
import {
  Stack,
  Box,
  IconButton,
  TextField,
  useTheme,
  InputAdornment,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from '@tanstack/react-router';
import { motion, AnimatePresence } from 'framer-motion';
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

type View = 'browse' | 'detail' | 'compare';

const ThreeKingdoms = () => {
  const navigate = useNavigate();
  const { palette } = useTheme();
  const isLight = palette.mode === 'light';

  /* ─── State ─── */
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

  /* ─── Rotating quotes ─── */
  useEffect(() => {
    const timer = setInterval(() => {
      setQuoteIdx(prev => (prev + 1) % QUOTES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const quote = QUOTES[quoteIdx];

  /* ─── Filtered data ─── */
  const filteredData = useMemo(
    () =>
      kingdomFilter === 'all'
        ? CHARACTERS
        : CHARACTERS.filter(c => c.kingdom === kingdomFilter),
    [kingdomFilter]
  );

  /* ─── Handlers ─── */
  const handleRowClick = useCallback(
    (char: ThreeKingdomsCharacter) => {
      if (comparePick) {
        // We're in compare-pick mode — use this as fighter2
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

  const handleCancelCompare = useCallback(() => {
    setComparePick(null);
  }, []);

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

  /* ─── Keyboard shortcut: Escape to go back ─── */
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleBack();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [handleBack]);

  return (
    <SunriseBackground>
      <Stack
        component='main'
        sx={{
          height: 'calc(100vh - 80px)',
          overflow: 'hidden',
          px: { xs: 2, md: 6, lg: 8 },
          py: { xs: 8, md: 10 },
        }}
      >
        {/* Back button */}
        <Box sx={{ position: 'fixed', top: 20, left: 20, zIndex: 50 }}>
          <IconButton
            onClick={handleBack}
            aria-label='Back'
            sx={{
              color: isLight ? '#5C4A32' : '#FFE4B5',
              background: isLight
                ? 'rgba(255,248,240,0.8)'
                : 'rgba(11,13,46,0.6)',
              backdropFilter: 'blur(12px)',
              border: `1px solid ${isLight ? 'rgba(184,137,31,0.2)' : 'rgba(245,208,96,0.2)'}`,
              '&:hover': {
                background: isLight
                  ? 'rgba(255,248,240,0.95)'
                  : 'rgba(11,13,46,0.85)',
              },
            }}
          >
            <ArrowBackIcon />
          </IconButton>
        </Box>

        {/* Header — collapses when not browsing */}
        <AnimatePresence mode='wait'>
          <motion.div
            key={view === 'browse' ? 'full' : 'compact'}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Stack
              alignItems='center'
              spacing={1}
              sx={{ mb: view === 'browse' ? 4 : 2 }}
            >
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <Box
                  component='img'
                  src='/images/three-kingdoms/logo.jpg'
                  alt='Three Kingdoms'
                  sx={{
                    width:
                      view === 'browse'
                        ? { xs: 80, md: 100 }
                        : { xs: 48, md: 56 },
                    height:
                      view === 'browse'
                        ? { xs: 80, md: 100 }
                        : { xs: 48, md: 56 },
                    borderRadius: '50%',
                    objectFit: 'cover',
                    transition: 'all 0.3s ease',
                    border: `2px solid ${isLight ? 'rgba(184,137,31,0.3)' : 'rgba(245,208,96,0.3)'}`,
                    boxShadow: isLight
                      ? '0 4px 20px rgba(184,137,31,0.15)'
                      : '0 4px 20px rgba(245,208,96,0.15)',
                  }}
                />
              </motion.div>
              <PFGradientTypography
                variant={view === 'browse' ? 'h3' : 'h5'}
                fontWeight={800}
              >
                Three Kingdoms Finder
              </PFGradientTypography>

              {/* Rotating quote — only on browse */}
              {view === 'browse' && (
                <AnimatePresence mode='wait'>
                  <motion.div
                    key={quoteIdx}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.5 }}
                  >
                    <PFTypography
                      variant='body2'
                      sx={{
                        textAlign: 'center',
                        fontStyle: 'italic',
                        color: isLight ? '#8B7355' : '#C9A96E',
                        maxWidth: 500,
                      }}
                    >
                      "{quote.vi}"
                      <Box
                        component='span'
                        sx={{
                          display: 'block',
                          fontSize: '0.7rem',
                          mt: 0.5,
                          opacity: 0.7,
                        }}
                      >
                        — {quote.author}
                      </Box>
                    </PFTypography>
                  </motion.div>
                </AnimatePresence>
              )}
            </Stack>
          </motion.div>
        </AnimatePresence>

        {/* Content area */}
        <AnimatePresence mode='wait'>
          {view === 'browse' && (
            <motion.div
              key='browse'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ display: 'flex', flexDirection: 'column', flex: 1 }}
            >
              {/* Compare pick banner */}
              {comparePick && (
                <Box
                  sx={{
                    mb: 2,
                    p: 1.5,
                    borderRadius: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 2,
                    background: `linear-gradient(90deg, ${getKingdomColor(comparePick)}18, transparent)`,
                    border: `1px solid ${getKingdomColor(comparePick)}40`,
                  }}
                >
                  <PFTypography variant='body2' sx={{ fontWeight: 600 }}>
                    ⚔️ Select an opponent for{' '}
                    <Box
                      component='span'
                      sx={{
                        color: getKingdomColor(comparePick),
                        fontWeight: 800,
                      }}
                    >
                      {comparePick.name.cn} ({comparePick.name.en})
                    </Box>
                  </PFTypography>
                  <Box
                    onClick={handleCancelCompare}
                    role='button'
                    tabIndex={0}
                    onKeyDown={e => {
                      if (e.key === 'Enter') handleCancelCompare();
                    }}
                    sx={{
                      px: 1.5,
                      py: 0.5,
                      borderRadius: 1.5,
                      cursor: 'pointer',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      color: palette.text.secondary,
                      border: `1px solid ${isLight ? 'rgba(0,0,0,0.15)' : 'rgba(255,255,255,0.15)'}`,
                      transition: 'all 0.2s',
                      '&:hover': {
                        background: isLight
                          ? 'rgba(0,0,0,0.05)'
                          : 'rgba(255,255,255,0.08)',
                      },
                    }}
                  >
                    ✕ Cancel
                  </Box>
                </Box>
              )}

              {/* Search + filter */}
              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={2}
                alignItems={{ sm: 'center' }}
                sx={{ mb: 3 }}
              >
                <TextField
                  placeholder='Search by name...'
                  size='small'
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <SearchIcon
                          sx={{ color: palette.text.secondary, fontSize: 20 }}
                        />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    flex: 1,
                    maxWidth: 320,
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: isLight
                        ? 'rgba(255,248,240,0.7)'
                        : 'rgba(11,13,46,0.4)',
                      backdropFilter: 'blur(8px)',
                      borderRadius: 2,
                      '& fieldset': {
                        borderColor: isLight
                          ? 'rgba(184,137,31,0.2)'
                          : 'rgba(245,208,96,0.2)',
                      },
                    },
                  }}
                />
                <KingdomFilter
                  selected={kingdomFilter}
                  onChange={setKingdomFilter}
                />
              </Stack>

              {/* Table */}
              <CharacterTable
                data={filteredData}
                globalFilter={search}
                sorting={sorting}
                onSortingChange={setSorting}
                onRowClick={handleRowClick}
              />

              {/* Character count */}
              <PFTypography
                variant='caption'
                sx={{
                  display: 'block',
                  textAlign: 'center',
                  mt: 1.5,
                  color: palette.text.secondary,
                }}
              >
                {filteredData.length} warriors
              </PFTypography>
            </motion.div>
          )}

          {view === 'detail' && selected && (
            <CharacterDetail
              key='detail'
              character={selected}
              onClose={() => {
                setView('browse');
                setSelected(null);
              }}
              onCompare={handleCompare}
            />
          )}

          {view === 'compare' && fighter1 && fighter2 && (
            <BattleCompare
              key='compare'
              fighter1={fighter1}
              fighter2={fighter2}
              onBackToDetail={handleBackToDetail}
              onBackToBrowse={handleBackToBrowse}
            />
          )}
        </AnimatePresence>
      </Stack>
    </SunriseBackground>
  );
};

/* Helper to get kingdom color from a character */
const getKingdomColor = (char: ThreeKingdomsCharacter) =>
  getKingdomMeta(char.kingdom).color;

export default ThreeKingdoms;
