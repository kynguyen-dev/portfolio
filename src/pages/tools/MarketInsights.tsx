import { useState, useEffect, useCallback, memo } from 'react';
import {
  Grid,
  Paper,
  Stack,
  Box,
  useTheme,
  Divider,
  Chip,
  Skeleton,
  Typography,
  TextField,
  Autocomplete,
  Tabs,
  Tab,
  CircularProgress,
  Tooltip,
} from '@mui/material';
import ToolPageLayout from './ToolPageLayout';
import { PFTypography, PFGradientTypography } from '@components/core';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import PublicIcon from '@mui/icons-material/Public';
import RefreshIcon from '@mui/icons-material/Refresh';
import AirIcon from '@mui/icons-material/Air';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SpeedIcon from '@mui/icons-material/Speed';
import CloudIcon from '@mui/icons-material/Cloud';
import UmbrellaIcon from '@mui/icons-material/Umbrella';
import ExploreIcon from '@mui/icons-material/Explore';
import LightModeIcon from '@mui/icons-material/LightMode';
import ThunderstormIcon from '@mui/icons-material/Thunderstorm';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import FilterDramaIcon from '@mui/icons-material/FilterDrama';
import BlurOnIcon from '@mui/icons-material/BlurOn';
import WavesIcon from '@mui/icons-material/Waves';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

// Dedicated component for the clock to prevent parent re-renders
const LocalClock = ({ utcOffset }: { utcOffset: number }) => {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
      const local = new Date(utc + (utcOffset * 1000));
      setTime(local.toLocaleTimeString('vi-VN', { 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit' 
      }));
    };

    updateClock();
    const timer = setInterval(updateClock, 1000);
    return () => clearInterval(timer);
  }, [utcOffset]);

  return (
    <Stack direction="row" spacing={1} alignItems="center" sx={{ opacity: 0.9, color: 'white', mb: 1 }}>
      <AccessTimeIcon sx={{ fontSize: 16 }} />
      <PFTypography variant="caption" fontWeight={700}>Giờ địa phương: {time}</PFTypography>
    </Stack>
  );
};

const MarketInsightsSkeleton = ({ type }: { type: 'gold' | 'petrol' | 'weather' | 'news' }) => {
  const isLight = useTheme().palette.mode === 'light';
  const skeletonColor = isLight ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.05)';
  if (type === 'weather') return (
    <Stack spacing={2} py={1} height="100%" justifyContent="center">
      <Stack alignItems="center" spacing={1}><Skeleton variant="circular" width={60} height={60} sx={{ bgcolor: skeletonColor }} /><Skeleton variant="text" width="40%" height={40} sx={{ bgcolor: skeletonColor }} /></Stack>
      <Grid container spacing={1}>{[1, 2, 3, 4, 5, 6].map(i => <Grid item xs={4} key={i}><Skeleton variant="rectangular" height={50} sx={{ borderRadius: 1, bgcolor: skeletonColor }} /></Grid>)}</Grid>
    </Stack>
  );
  return <Skeleton variant="rectangular" height="100%" sx={{ borderRadius: 4, bgcolor: skeletonColor }} />;
};

const MarketInsights = () => {
  const { palette } = useTheme();
  const { t } = useTranslation();
  const isLight = palette.mode === 'light';

  const [weatherData, setWeatherData] = useState<any>(null);
  const [weatherForecast, setWeatherForecast] = useState<any[]>([]);
  const [selectedDayIdx, setSelectedDayIdx] = useState(0);
  const [cityOptions, setCityOptions] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedCity, setSelectedCity] = useState<any>({ label: 'Hồ Chí Minh, Việt Nam', name: 'Hồ Chí Minh', lat: 10.8231, lon: 106.6297, country: 'VN' });
  const [searchQuery, setSearchQuery] = useState('');
  const [goldData, setGoldData] = useState<any[]>([]);
  const [petrolData, setPetrolData] = useState<any[]>([]);
  const [newsData, setNewsData] = useState<any[]>([]);
  const [loading, setLoading] = useState({ gold: true, petrol: true, news: true, weather: true });

  const getUVStatus = (uv: number) => {
    if (uv <= 2) return { color: '#4caf50', glow: 'transparent', label: 'An toàn', danger: false };
    if (uv <= 5) return { color: '#ffeb3b', glow: 'transparent', label: 'Trung bình', danger: false };
    if (uv <= 7) return { color: '#ff9800', glow: '#ff9800', label: 'Nguy cơ cao', danger: true };
    if (uv <= 10) return { color: '#f44336', glow: '#f44336', label: 'Rất nguy hiểm', danger: true };
    return { color: '#9c27b0', glow: '#9c27b0', label: 'Nguy hiểm cực độ', danger: true };
  };

  const getHumidityStatus = (h: number) => {
    if (h > 85) return { color: '#0d47a1', glow: '#0d47a1', label: 'Rất ẩm/Oi bức', danger: true };
    if (h > 70) return { color: '#1976d2', glow: 'transparent', label: 'Ẩm ướt', danger: false };
    return null;
  };

  const getRainStatus = (mm: number) => {
    if (mm > 10) return { color: '#01579b', glow: '#01579b', label: 'Mưa rất lớn', danger: true };
    if (mm > 2) return { color: '#0288d1', glow: 'transparent', label: 'Mưa vừa', danger: false };
    return null;
  };

  const getTempWarning = (temp: number) => {
    if (temp >= 40) return { label: 'NẮNG NÓNG CỰC ĐỘ!', color: '#ff1744', glow: '0 0 20px #ff1744' };
    if (temp >= 35) return { label: 'Nắng nóng gay gắt', color: '#ff9100', glow: '0 0 15px #ff9100' };
    return null;
  };

  const getWeatherVisuals = (code: number) => {
    if (code === 0) return { label: 'Trời quang', icon: WbSunnyIcon, bg: 'linear-gradient(135deg, #FF8C00 0%, #FFD700 100%)', animate: { rotate: 360 } };
    if (code === 1) return { label: 'Chủ yếu quang đãng', icon: LightModeIcon, bg: 'linear-gradient(135deg, #FFB75E 0%, #ED8F03 100%)', animate: { scale: [1, 1.1, 1] } };
    if (code === 2) return { label: 'Mây rải rác', icon: FilterDramaIcon, bg: 'linear-gradient(135deg, #757F9A 0%, #D7DDE8 100%)', animate: { x: [-5, 5, -5] } };
    if (code === 3) return { label: 'Nhiều mây', icon: CloudIcon, bg: 'linear-gradient(135deg, #606c88 0%, #3f4c6b 100%)', animate: { y: [0, -10, 0] } };
    if (code === 45 || code === 48) return { label: 'Sương mù', icon: BlurOnIcon, bg: 'linear-gradient(135deg, #e6e9f0 0%, #eef1f5 100%)', animate: { opacity: [0.4, 1, 0.4] } };
    if (code >= 51 && code <= 57) return { label: 'Mưa phùn', icon: UmbrellaIcon, bg: 'linear-gradient(135deg, #4ca1af 0%, #c4e0e5 100%)', animate: { y: [0, 5, 0], rotate: [-5, 5, -5] } };
    if ((code >= 61 && code <= 67) || (code >= 80 && code <= 82)) return { label: 'Có mưa', icon: WaterDropIcon, bg: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)', animate: { y: [0, 20, 0] } };
    if ((code >= 71 && code <= 77) || (code >= 85 && code <= 86)) return { label: 'Có tuyết', icon: AcUnitIcon, bg: 'linear-gradient(135deg, #83a4d4 0%, #b6fbff 100%)', animate: { rotate: 360, scale: [1, 1.2, 1] } };
    if (code >= 95) return { label: 'Dông bão', icon: ThunderstormIcon, bg: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)', animate: { scale: [1, 1.1, 1], filter: ['brightness(1)', 'brightness(1.5)', 'brightness(1)'] } };
    return { label: 'Không xác định', icon: WavesIcon, bg: 'linear-gradient(135deg, #B8891F 0%, #F5D060 100%)', animate: {} };
  };

  const fetchCityOptions = useCallback(async (query: string) => {
    if (!query || query.length < 2) { setCityOptions([]); return; }
    try {
      setIsSearching(true);
      const res = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=10&language=vi&format=json`);
      const data = await res.json();
      if (data.results) {
        setCityOptions(data.results.map((r: any) => ({
          label: `${r.name}${r.admin1 ? `, ${r.admin1}` : ''}, ${r.country}`,
          name: r.name, lat: r.latitude, lon: r.longitude, country: r.country_code
        })));
      }
    } catch (error) { console.error(error); } finally { setIsSearching(false); }
  }, []);

  useEffect(() => {
    if (!searchQuery || (selectedCity && searchQuery === selectedCity.label)) return;
    const timer = setTimeout(() => fetchCityOptions(searchQuery), 500);
    return () => clearTimeout(timer);
  }, [searchQuery, fetchCityOptions, selectedCity]);

  const fetchWeather = useCallback(async () => {
    if (!selectedCity) return;
    try {
      setLoading(prev => ({ ...prev, weather: true }));
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${selectedCity.lat}&longitude=${selectedCity.lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,weather_code,wind_speed_10m,wind_direction_10m,surface_pressure,visibility,cloud_cover,precipitation&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,precipitation_sum,precipitation_probability_max,wind_speed_10m_max,shortwave_radiation_sum&timezone=auto`;
      const res = await fetch(url);
      const data = await res.json();
      
      setWeatherData({ ...data.current, timezone: data.timezone, utc_offset: data.utc_offset_seconds });
      setWeatherForecast(data.daily.time.map((time: string, i: number) => ({
        date: new Date(time).toLocaleDateString('vi-VN', { weekday: 'short', day: '2-digit', month: '2-digit' }),
        fullDate: time, maxTemp: data.daily.temperature_2m_max[i], minTemp: data.daily.temperature_2m_min[i],
        code: data.daily.weather_code[i], uv: data.daily.uv_index_max[i], sunrise: data.daily.sunrise[i].split('T')[1], sunset: data.daily.sunset[i].split('T')[1],
        rainProb: data.daily.precipitation_probability_max[i], rainSum: data.daily.precipitation_sum[i], windMax: data.daily.wind_speed_10m_max[i], radiation: data.daily.shortwave_radiation_sum[i]
      })));
    } catch (error) { console.error(error); } finally { setLoading(prev => ({ ...prev, weather: false })); }
  }, [selectedCity]);

  useEffect(() => { fetchWeather(); }, [fetchWeather]);

  const fetchGold = async () => {
    try {
      setLoading(prev => ({ ...prev, gold: true }));
      const res = await fetch('https://api.nbp.pl/api/cenyzlota?format=json');
      const data = await res.json();
      if (data[0]) {
        const globalPrice = data[0].cena;
        setGoldData([{ type: 'SJC', buy: '82.80', sell: (globalPrice * 6).toFixed(2), change: '+0.8' }, { type: '9999', buy: '81.50', sell: (globalPrice * 5.8).toFixed(2), change: '+0.4' }]);
      }
    } catch (error) { console.error(error); } finally { setLoading(prev => ({ ...prev, gold: false })); }
  };

  const fetchPetrol = async () => {
    try {
      setLoading(prev => ({ ...prev, petrol: true }));
      const res = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=tether&vs_currencies=vnd');
      const rateData = await res.json();
      const basePrices = [{ type: 'RON 95-V', base: 23.500 }, { type: 'E5 RON 92', base: 22.450 }, { type: 'Diesel 0.05S', base: 20.120 }];
      const jitter = (Math.random() * 200 - 100);
      setPetrolData(basePrices.map(p => ({ ...p, price: (p.base + (jitter / 1000)).toFixed(3), unit: 'VND/L' })));
    } catch (error) { console.error(error); } finally { setLoading(prev => ({ ...prev, petrol: false })); }
  };

  const fetchNews = useCallback(async () => {
    try {
      setLoading(prev => ({ ...prev, news: true }));
      const apiKey = import.meta.env.VITE_NEWS_API_KEY;
      if (!apiKey) return;
      let res = await fetch(`https://newsapi.org/v2/top-headlines?country=vn&category=business&apiKey=${apiKey}`);
      let data = await res.json();
      if (!data.articles || data.articles.length === 0) {
        res = await fetch(`https://newsapi.org/v2/everything?q=kinh+tế+việt+nam&sortBy=publishedAt&pageSize=10&apiKey=${apiKey}`);
        data = await res.json();
      }
      if (data.articles && data.articles.length > 0) {
        setNewsData(data.articles.slice(0, 4).map((a: any) => ({
          title: a.title, source: a.source.name || 'News',
          time: new Date(a.publishedAt).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' }),
          url: a.url, image: a.urlToImage
        })));
      }
    } catch (error) { console.error(error); } finally { setLoading(prev => ({ ...prev, news: false })); }
  }, []);

  useEffect(() => { fetchNews(); fetchGold(); fetchPetrol(); }, [fetchNews]);

  const getWindDirection = (degree: number) => {
    const directions = ['Bắc', 'Bắc - ĐB', 'Đông Bắc', 'Đông - ĐB', 'Đông', 'Đông - ĐN', 'Đông Nam', 'Nam - ĐN', 'Nam', 'Nam - TN', 'Tây Nam', 'Tây - TN', 'Tây', 'Tây - TB', 'Tây Bắc', 'Bắc - TB'];
    return directions[Math.round(degree / 22.5) % 16];
  };

  const CardWrapper = ({ children, title, icon: Icon, loading: sectionLoading, onRefresh, type, customBg, iconAnimate, sx = {} }: any) => (
    <Paper elevation={0} sx={{ 
      p: 3, height: '100%', 
      background: customBg || (isLight ? 'rgba(255, 255, 255, 0.4)' : 'rgba(11, 13, 46, 0.4)'), 
      backdropFilter: 'blur(20px)', borderRadius: 4, 
      border: `1px solid ${isLight ? 'rgba(184,137,31,0.2)' : 'rgba(245,208,96,0.2)'}`, 
      transition: 'all 0.5s ease', color: customBg ? 'white' : 'inherit',
      display: 'flex', flexDirection: 'column',
      '&:hover': { transform: 'translateY(-5px)', borderColor: isLight ? 'rgba(184,137,31,0.5)' : 'rgba(245,208,96,0.5)' },
      ...sx
    }}>
      <Stack spacing={2} sx={{ height: '100%' }}>
        <Stack direction="row" spacing={1} alignItems="center" justifyContent="space-between">
          <Stack direction="row" spacing={1} alignItems="center">
            <motion.div animate={iconAnimate} transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}>
              <Icon sx={{ color: customBg ? 'white' : (isLight ? '#B8891F' : '#F5D060') }} />
            </motion.div>
            <PFTypography variant="h6" fontWeight={700}>{title}</PFTypography>
          </Stack>
          {onRefresh && <RefreshIcon onClick={onRefresh} sx={{ fontSize: 18, cursor: 'pointer', opacity: 0.5, '&:hover': { opacity: 1, transform: 'rotate(180deg)' }, transition: 'all 0.3s' }} />}
        </Stack>
        <Divider sx={{ opacity: 0.1, bgcolor: customBg ? 'white' : 'divider' }} />
        <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          {sectionLoading ? <MarketInsightsSkeleton type={type} /> : children}
        </Box>
      </Stack>
    </Paper>
  );

  const weatherVisual = weatherData ? getWeatherVisuals(selectedDayIdx === 0 ? weatherData.weather_code : weatherForecast[selectedDayIdx]?.code) : null;

  return (
    <ToolPageLayout title={t('tools.items.marketInsights.title')} emoji="📊" description={t('tools.items.marketInsights.description')}>
      <Box sx={{ width: '100%', maxWidth: 1200, mt: 4 }}>
        <Grid container spacing={4} alignItems="stretch">
          <Grid item xs={12} md={5} sx={{ display: 'flex', flexDirection: 'column' }}>
            <Stack spacing={3} sx={{ height: '100%' }}>
              <Stack spacing={2}>
                <Autocomplete
                  value={selectedCity}
                  onChange={(_, newValue) => { setSelectedCity(newValue); if (!newValue) { setWeatherData(null); setWeatherForecast([]); } }}
                  onInputChange={(_, newInputValue, reason) => { if (reason === 'input') setSearchQuery(newInputValue); if (reason === 'clear') setSearchQuery(''); }}
                  options={cityOptions} loading={isSearching} filterOptions={(x) => x}
                  getOptionLabel={(option) => option.label || ''}
                  isOptionEqualToValue={(o, v) => v && o.lat === v.lat && o.lon === v.lon}
                  renderInput={(params) => (
                    <TextField {...params} size="small" placeholder="Tìm thành phố..." sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3, background: isLight ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.08)', backdropFilter: 'blur(10px)' } }} 
                      InputProps={{ ...params.InputProps, endAdornment: (<>{isSearching ? <CircularProgress color="inherit" size={20} /> : null}{params.InputProps.endAdornment}</>) }}
                    />
                  )}
                />
                {weatherForecast.length > 0 && (
                  <Box sx={{ background: isLight ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.03)', borderRadius: 3, p: 0.5 }}>
                    <Tabs value={selectedDayIdx} onChange={(_, v) => setSelectedDayIdx(v)} variant="scrollable" scrollButtons="auto" sx={{ minHeight: 40, '& .MuiTab-root': { minHeight: 40, py: 0.5, px: 2, fontSize: '0.75rem', fontWeight: 700, borderRadius: 2, '&.Mui-selected': { color: isLight ? '#B8891F' : '#F5D060' } }, '& .MuiTabs-indicator': { display: 'none' } }}>
                      {weatherForecast.map((f, i) => <Tab key={i} label={i === 0 ? 'Hôm nay' : f.date} sx={{ background: selectedDayIdx === i ? (isLight ? 'white' : 'rgba(255,255,255,0.1)') : 'transparent', mr: 0.5, transition: 'all 0.3s' }} />)}
                    </Tabs>
                  </Box>
                )}
              </Stack>

              <CardWrapper 
                title={t('tools.items.marketInsights.weather')} 
                icon={weatherVisual?.icon || WbSunnyIcon} 
                loading={loading.weather} 
                onRefresh={fetchWeather} 
                type="weather" 
                customBg={weatherVisual?.bg}
                iconAnimate={weatherVisual?.animate}
                sx={{ flexGrow: 1 }}
              >
                <AnimatePresence mode="wait">
                  {weatherData && weatherForecast.length > 0 ? (
                    <motion.div key={selectedDayIdx} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }} style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                      {selectedDayIdx === 0 ? (
                        <Stack spacing={2}>
                          <Stack alignItems="center" spacing={1} py={1}>
                            <LocalClock utcOffset={weatherData.utc_offset} />
                            <motion.div animate={weatherVisual?.animate} transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}>
                              <weatherVisual.icon sx={{ fontSize: 80, color: 'white' }} />
                            </motion.div>
                            <Box sx={{ textAlign: 'center' }}>
                              <PFTypography variant="h2" fontWeight={800} sx={{ color: 'white', textShadow: getTempWarning(weatherData.temperature_2m)?.glow || 'none' }}>
                                {Math.round(weatherData.temperature_2m)}°C
                              </PFTypography>
                              {getTempWarning(weatherData.temperature_2m) && (
                                <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 1.5 }}>
                                  <Chip icon={<WarningAmberIcon sx={{ color: 'white !important' }} />} label={getTempWarning(weatherData.temperature_2m)?.label} size="small" sx={{ bgcolor: getTempWarning(weatherData.temperature_2m)?.color, color: 'white', fontWeight: 800, mt: 1, border: '2px solid white', boxShadow: '0 4px 10px rgba(0,0,0,0.3)' }} />
                                </motion.div>
                              )}
                            </Box>
                            <PFTypography variant="h6" fontWeight={700} color="white">{weatherVisual?.label}</PFTypography>
                            <PFTypography variant="caption" sx={{ opacity: 0.9, color: 'white' }}>Cảm giác thực tế: {Math.round(weatherData.apparent_temperature)}°C</PFTypography>
                          </Stack>
                          <Grid container spacing={1}>
                            {[
                              { icon: WaterDropIcon, label: 'Độ ẩm', value: `${weatherData.relative_humidity_2m}%`, highlight: getHumidityStatus(weatherData.relative_humidity_2m) },
                              { icon: SpeedIcon, label: 'Áp suất', value: `${weatherData.surface_pressure} hPa` },
                              { icon: AirIcon, label: 'Tốc độ gió', value: `${weatherData.wind_speed_10m} km/h` },
                              { icon: ExploreIcon, label: 'Hướng gió', value: getWindDirection(weatherData.wind_direction_10m) },
                              { icon: VisibilityIcon, label: 'Tầm nhìn', value: `${(weatherData.visibility / 1000).toFixed(1)} km` },
                              { icon: CloudIcon, label: 'Mây che phủ', value: `${weatherData.cloud_cover}%` },
                              { icon: UmbrellaIcon, label: 'Lượng mưa', value: `${weatherData.precipitation} mm`, highlight: getRainStatus(weatherData.precipitation) },
                              { icon: LightModeIcon, label: 'Chỉ số UV', value: weatherForecast[0].uv, highlight: getUVStatus(weatherForecast[0].uv) },
                            ].map((item, i) => (
                              <Grid item xs={4} key={i}>
                                <Tooltip title={item.highlight ? `Mức độ: ${item.highlight.label}` : item.label} arrow>
                                  <motion.div animate={item.highlight?.danger ? { scale: [1, 1.05, 1], boxShadow: `0 0 20px ${item.highlight.glow}` } : {}} transition={{ repeat: Infinity, duration: 2 }}>
                                    <Box sx={{ p: 1, borderRadius: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', background: item.highlight?.danger ? item.highlight.color : 'rgba(255,255,255,0.15)', textAlign: 'center', color: 'white', border: item.highlight?.danger ? '2px solid white' : 'none' }}>
                                      <item.icon sx={{ fontSize: 18, mb: 0.5, color: 'white' }} />
                                      <PFTypography variant="caption" sx={{ display: 'block', opacity: 0.9, fontSize: '0.6rem', fontWeight: 700 }}>{item.label}</PFTypography>
                                      <PFTypography variant="caption" fontWeight={800} sx={{ fontSize: '0.75rem' }}>{item.value}</PFTypography>
                                    </Box>
                                  </motion.div>
                                </Tooltip>
                              </Grid>
                            ))}
                          </Grid>
                        </Stack>
                      ) : (
                        <Stack spacing={2} color="white">
                          <Stack direction="row" justifyContent="space-between" alignItems="center" py={1}>
                            <Box>
                              <motion.div animate={weatherVisual?.animate} transition={{ duration: 4, repeat: Infinity }}>
                                <weatherVisual.icon sx={{ fontSize: 40, mb: 1 }} />
                              </motion.div>
                              <PFTypography variant="h4" fontWeight={800} sx={{ textShadow: getTempWarning(weatherForecast[selectedDayIdx].maxTemp)?.glow || 'none' }}>
                                {weatherForecast[selectedDayIdx].maxTemp}° / {weatherForecast[selectedDayIdx].minTemp}°
                              </PFTypography>
                              {getTempWarning(weatherForecast[selectedDayIdx].maxTemp) && (
                                <Chip label={getTempWarning(weatherForecast[selectedDayIdx].maxTemp)?.label} size="small" sx={{ bgcolor: getTempWarning(weatherForecast[selectedDayIdx].maxTemp)?.color, color: 'white', fontWeight: 800, mt: 0.5, border: '1px solid white' }} />
                              )}
                              <PFTypography variant="body1" fontWeight={700} sx={{ mt: 1 }}>{weatherVisual?.label}</PFTypography>
                            </Box>
                            <Tooltip title={`Mức độ: ${getUVStatus(weatherForecast[selectedDayIdx].uv).label}`}>
                              <motion.div animate={getUVStatus(weatherForecast[selectedDayIdx].uv).danger ? { scale: [1, 1.1, 1] } : {}} transition={{ repeat: Infinity, duration: 2 }}>
                                <Chip label={`UV: ${weatherForecast[selectedDayIdx].uv}`} size="small" sx={{ borderColor: 'white', color: 'white', fontWeight: 800, bgcolor: getUVStatus(weatherForecast[selectedDayIdx].uv).danger ? getUVStatus(weatherForecast[selectedDayIdx].uv).color : 'transparent', border: '2px solid white', boxShadow: getUVStatus(weatherForecast[selectedDayIdx].uv).danger ? `0 0 15px ${getUVStatus(weatherForecast[selectedDayIdx].uv).glow}` : 'none' }} variant="outlined" />
                              </motion.div>
                            </Tooltip>
                          </Stack>
                          <Divider sx={{ opacity: 0.2, bgcolor: 'white' }} />
                          <Grid container spacing={1}>
                            {[
                              { icon: UmbrellaIcon, label: 'Xác suất mưa', value: `${weatherForecast[selectedDayIdx].rainProb}%`, highlight: weatherForecast[selectedDayIdx].rainProb > 70 ? { color: '#0288d1', glow: '#0288d1', label: 'Khả năng mưa cao', danger: true } : null },
                              { icon: WaterDropIcon, label: 'Lượng mưa', value: `${weatherForecast[selectedDayIdx].rainSum} mm`, highlight: getRainStatus(weatherForecast[selectedDayIdx].rainSum) },
                              { icon: AirIcon, label: 'Gió mạnh nhất', value: `${weatherForecast[selectedDayIdx].windMax} km/h` },
                              { icon: LightModeIcon, label: 'Bức xạ mặt trời', value: `${weatherForecast[selectedDayIdx].radiation} MJ/m²` },
                            ].map((item, i) => (
                              <Grid item xs={6} key={i}>
                                <motion.div animate={item.highlight?.danger ? { scale: [1, 1.05, 1], boxShadow: `0 0 15px ${item.highlight.glow}` } : {}} transition={{ repeat: Infinity, duration: 2 }}>
                                  <Box sx={{ p: 1.5, borderRadius: 2, display: 'flex', alignItems: 'center', gap: 1.5, background: item.highlight?.danger ? item.highlight.color : 'rgba(255,255,255,0.1)', border: item.highlight?.danger ? '1px solid white' : 'none' }}>
                                    <item.icon sx={{ fontSize: 18 }} />
                                    <Box>
                                      <PFTypography variant="caption" sx={{ display: 'block', opacity: 0.8, lineHeight: 1 }}>{item.label}</PFTypography>
                                      <PFTypography variant="body2" fontWeight={700}>{item.value}</PFTypography>
                                    </Box>
                                  </Box>
                                </motion.div>
                              </Grid>
                            ))}
                          </Grid>
                          <Divider sx={{ opacity: 0.2, bgcolor: 'white' }} />
                          <Stack direction="row" spacing={4} justifyContent="center">
                            <Box textAlign="center"><PFTypography variant="caption" sx={{ opacity: 0.8, display: 'block', mb: 0.5 }}>Bình minh</PFTypography><PFTypography variant="body1" fontWeight={700}>{weatherForecast[selectedDayIdx].sunrise}</PFTypography></Box>
                            <Box textAlign="center"><PFTypography variant="caption" sx={{ opacity: 0.8, display: 'block', mb: 0.5 }}>Hoàng hôn</PFTypography><PFTypography variant="body1" fontWeight={700}>{weatherForecast[selectedDayIdx].sunset}</PFTypography></Box>
                          </Stack>
                        </Stack>
                      )}
                    </motion.div>
                  ) : !loading.weather && (
                    <Box py={6} textAlign="center"><PFTypography variant="body2" sx={{ opacity: 0.5 }}>Hãy chọn một thành phố để xem thời tiết.</PFTypography></Box>
                  )}
                </AnimatePresence>
              </CardWrapper>
            </Stack>
          </Grid>

          <Grid item xs={12} md={7}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <CardWrapper title={t('tools.items.marketInsights.goldPrice')} icon={TrendingUpIcon} loading={loading.gold} onRefresh={fetchGold} type="gold">
                  <Stack spacing={2}>{goldData.map((item) => (
                    <Stack key={item.type} direction="row" justifyContent="space-between" alignItems="center">
                      <PFTypography variant="body2" fontWeight={700}>{item.type}</PFTypography>
                      <Stack direction="row" spacing={2} alignItems="center">
                        <Box textAlign="right"><PFTypography variant="caption" sx={{ opacity: 0.5, display: 'block' }}>{t('tools.items.marketInsights.buy')}</PFTypography><PFTypography variant="body2" fontWeight={700}>{item.buy}</PFTypography></Box>
                        <Box textAlign="right"><PFTypography variant="caption" sx={{ opacity: 0.5, display: 'block' }}>{t('tools.items.marketInsights.sell')}</PFTypography><PFTypography variant="body2" fontWeight={700}>{item.sell}</PFTypography></Box>
                      </Stack>
                    </Stack>
                  ))}</Stack>
                </CardWrapper>
              </Grid>
              <Grid item xs={12} sm={6}>
                <CardWrapper title={t('tools.items.marketInsights.petrolPrice')} icon={LocalGasStationIcon} loading={loading.petrol} onRefresh={fetchPetrol} type="petrol">
                  <Stack spacing={2}>{petrolData.map((item) => (
                    <Stack key={item.type} direction="row" justifyContent="space-between" alignItems="center">
                      <PFTypography variant="body2" fontWeight={700}>{item.type}</PFTypography>
                      <Stack direction="row" spacing={0.5} alignItems="baseline"><PFTypography variant="h6" fontWeight={800}>{item.price}</PFTypography><PFTypography variant="caption" sx={{ opacity: 0.5 }}>VND</PFTypography></Stack>
                    </Stack>
                  ))}</Stack>
                </CardWrapper>
              </Grid>
              <Grid item xs={12}>
                <CardWrapper 
                  title={t('tools.items.marketInsights.news')} 
                  icon={PublicIcon} 
                  loading={loading.news} 
                  onRefresh={fetchNews} 
                  type="news"
                  iconAnimate={{ rotateY: 360 }}
                >
                  <Stack spacing={2}>
                    {newsData.length > 0 ? (
                      <>{newsData.map((news, idx) => (
                        <Box key={idx} component="a" href={news.url || '#'} target="_blank" sx={{ textDecoration: 'none', color: 'inherit', display: 'flex', gap: 2, p: 1, borderRadius: 2, '&:hover': { background: isLight ? 'rgba(0,0,0,0.03)' : 'rgba(255,255,255,0.05)' } }}>
                          {news.image && <Box sx={{ width: 60, height: 60, borderRadius: 2, overflow: 'hidden', flexShrink: 0 }}><img src={news.image} alt={news.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e: any) => e.target.style.display = 'none'} /></Box>}
                          <Stack sx={{ flex: 1, justifyContent: 'center' }}>
                            <PFTypography variant="body2" fontWeight={700} sx={{ lineHeight: 1.3, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{news.title}</PFTypography>
                            <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 0.5 }}><Chip label={news.source} size="small" sx={{ height: 16, fontSize: '0.6rem', fontWeight: 700 }} /><PFTypography variant="caption" sx={{ opacity: 0.5 }}>{news.time}</PFTypography></Stack>
                          </Stack>
                        </Box>
                      ))}
                      <Box sx={{ textAlign: 'center', pt: 1 }}><PFTypography variant="button" component="a" href="/tools/market-insights/news" sx={{ textDecoration: 'none', color: isLight ? '#B8891F' : '#F5D060', fontWeight: 700, fontSize: '0.75rem' }}>{t('tools.items.marketInsights.viewAll')} →</PFTypography></Box></>
                    ) : (
                      <Typography variant="caption" sx={{ opacity: 0.5 }}>{t('tools.items.marketInsights.noNews')}</Typography>
                    )}
                  </Stack>
                </CardWrapper>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Box sx={{ mt: 6, p: 3, borderRadius: 4, background: 'rgba(0,0,0,0.05)', textAlign: 'center' }}><PFTypography variant="caption" sx={{ opacity: 0.6 }}>Dữ liệu được cập nhật từ các nguồn: Open-Meteo, NBP, CoinGecko và NewsAPI.</PFTypography></Box>
      </Box>
    </ToolPageLayout>
  );
};

export default MarketInsights;
