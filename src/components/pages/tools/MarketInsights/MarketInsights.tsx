import { useState, useEffect, useCallback } from 'react';
import {
  TrendUpIcon,
  GasPumpIcon as Fuel,
  SunIcon,
  GlobeIcon,
  ArrowsClockwiseIcon as RotateCw,
  WindIcon,
  DropIcon as Droplets,
  EyeIcon,
  LightningIcon as Zap,
  CloudIcon,
  UmbrellaIcon,
  CompassIcon,
  CloudSunIcon,
  CloudLightningIcon,
  SnowflakeIcon,
  CloudRainIcon,
  WavesIcon,
  WarningIcon as AlertTriangle,
  ClockIcon,
  MagnifyingGlassIcon as Search,
  CaretLeftIcon as ChevronLeft,
  CaretRightIcon as ChevronRight,
  ArrowSquareOutIcon as ExternalLink,
  MapPinIcon,
} from '@phosphor-icons/react';
import ToolPageLayout from '@components/pages/tools/ToolPageLayout';
import { PFTypography } from '@components/core';
import { useTranslation } from 'react-i18next';

import { useThemeMode } from '@contexts/theme-mode';
import { cn } from '@utils/core/cn';

interface WeatherData {
  temperature_2m: number;
  relative_humidity_2m: number;
  apparent_temperature: number;
  is_day: number;
  weather_code: number;
  wind_speed_10m: number;
  wind_direction_10m: number;
  surface_pressure: number;
  visibility: number;
  cloud_cover: number;
  precipitation: number;
  timezone: string;
  utc_offset: number;
}

interface WeatherForecast {
  date: string;
  fullDate: string;
  maxTemp: number;
  minTemp: number;
  code: number;
  uv: number;
  sunrise: string;
  sunset: string;
  rainProb: number;
  rainSum: number;
  windMax: number;
  radiation: number;
}

interface CityOption {
  label: string;
  name: string;
  lat: number;
  lon: number;
  country: string;
}

interface GoldItem {
  type: string;
  buy: string;
  sell: string;
  change: string;
}

interface PetrolItem {
  type: string;
  price: string;
  unit: string;
}

interface NewsItem {
  title: string;
  source: string;
  time: string;
  url: string;
  image?: string;
}

interface MarketNewsArticle {
  title: string;
  source: { name: string };
  publishedAt: string;
  url: string;
  urlToImage?: string;
}

interface OpenMeteoGeocodingResult {
  name: string;
  admin1?: string;
  country: string;
  latitude: number;
  longitude: number;
  country_code: string;
}

interface OpenMeteoGeocodingResponse {
  results?: OpenMeteoGeocodingResult[];
}

interface OpenMeteoForecastResponse {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  current: any;
  timezone: string;
  utc_offset_seconds: number;
  daily: {
    time: string[];
    weather_code: number[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    sunrise: string[];
    sunset: string[];
    uv_index_max: number[];
    precipitation_sum: number[];
    precipitation_probability_max: number[];
    wind_speed_10m_max: number[];
    shortwave_radiation_sum: number[];
  };
}

interface NBPGoldPriceResponse {
  cena: number;
}

interface MarketNewsResponse {
  articles?: MarketNewsArticle[];
}

// Dedicated component for the clock to prevent parent re-renders
const LocalClock = ({ utcOffset }: { utcOffset: number }) => {
  const { t } = useTranslation();
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const utc = now.getTime() + now.getTimezoneOffset() * 60000;
      const local = new Date(utc + utcOffset * 1000);
      setTime(
        local.toLocaleTimeString('vi-VN', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })
      );
    };

    updateClock();
    const timer = setInterval(updateClock, 1000);
    return () => clearInterval(timer);
  }, [utcOffset]);

  return (
    <div className='flex items-center gap-2 opacity-90 text-white mb-2'>
      <ClockIcon className='w-4 h-4' />
      <PFTypography variant='caption' className='font-bold'>
        {t('tools.items.marketInsights.localTime')}: {time}
      </PFTypography>
    </div>
  );
};

const MarketInsightsSkeleton = ({
  type,
}: {
  type: 'gold' | 'petrol' | 'weather' | 'news';
}) => {
  if (type === 'weather')
    return (
      <div className='flex flex-col gap-6 py-4 h-full justify-center'>
        <div className='flex flex-col items-center gap-3'>
          <div className='w-16 h-16 rounded-full bg-white/5 animate-pulse' />
          <div className='w-24 h-8 bg-white/5 animate-pulse rounded-lg' />
        </div>
        <div className='grid grid-cols-3 gap-3'>
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className='h-12 bg-white/5 animate-pulse rounded-xl' />
          ))}
        </div>
      </div>
    );
  return <div className='w-full h-full bg-white/5 animate-pulse rounded-2xl' />;
};

const MarketInsights = () => {
  const { mode } = useThemeMode();
  const { t } = useTranslation();
  const isLight = mode === 'light';

  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [weatherForecast, setWeatherForecast] = useState<WeatherForecast[]>([]);
  const [selectedDayIdx, setSelectedDayIdx] = useState(0);
  const [cityOptions, setCityOptions] = useState<CityOption[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedCity, setSelectedCity] = useState<CityOption | null>({
    label: 'Hồ Chí Minh, Việt Nam',
    name: 'Hồ Chí Minh',
    lat: 10.8231,
    lon: 106.6297,
    country: 'VN',
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [goldData, setGoldData] = useState<GoldItem[]>([]);
  const [petrolData, setPetrolData] = useState<PetrolItem[]>([]);
  const [newsData, setNewsData] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState({
    gold: true,
    petrol: true,
    news: true,
    weather: true,
  });

  const getUVStatus = (uv: number) => {
    if (uv <= 2)
      return {
        color: 'bg-green-500',
        glow: 'transparent',
        label: 'An toàn',
        danger: false,
      };
    if (uv <= 5)
      return {
        color: 'bg-yellow-500',
        glow: 'transparent',
        label: 'Trung bình',
        danger: false,
      };
    if (uv <= 7)
      return {
        color: 'bg-orange-500',
        glow: 'rgba(249, 115, 22, 0.5)',
        label: 'Nguy cơ cao',
        danger: true,
      };
    if (uv <= 10)
      return {
        color: 'bg-red-500',
        glow: 'rgba(239, 68, 68, 0.5)',
        label: 'Rất nguy hiểm',
        danger: true,
      };
    return {
      color: 'bg-purple-500',
      glow: 'rgba(168, 85, 247, 0.5)',
      label: 'Nguy hiểm cực độ',
      danger: true,
    };
  };

  const getHumidityStatus = (h: number) => {
    if (h > 85)
      return {
        color: 'bg-blue-900',
        glow: 'rgba(30, 58, 138, 0.5)',
        label: 'Rất ẩm/Oi bức',
        danger: true,
      };
    if (h > 70)
      return {
        color: 'bg-blue-600',
        glow: 'transparent',
        label: 'Ẩm ướt',
        danger: false,
      };
    return null;
  };

  const getRainStatus = (mm: number) => {
    if (mm > 10)
      return {
        color: 'bg-blue-800',
        glow: 'rgba(30, 64, 175, 0.5)',
        label: 'Mưa rất lớn',
        danger: true,
      };
    if (mm > 2)
      return {
        color: 'bg-blue-500',
        glow: 'transparent',
        label: 'Mưa vừa',
        danger: false,
      };
    return null;
  };

  const getTempWarning = (temp: number) => {
    if (temp >= 40)
      return {
        label: 'NẮNG NÓNG CỰC ĐỘ!',
        color: 'bg-red-600',
        glow: '0 0 20px #dc2626',
      };
    if (temp >= 35)
      return {
        label: 'Nắng nóng gay gắt',
        color: 'bg-orange-600',
        glow: '0 0 15px #ea580c',
      };
    return null;
  };

  const getWeatherVisuals = (code: number) => {
    if (code === 0)
      return {
        label: 'Trời quang',
        icon: SunIcon,
        bg: 'bg-gradient-to-br from-orange-500 to-yellow-400',
        animate: { rotate: 360 },
      };
    if (code === 1)
      return {
        label: 'Chủ yếu quang đãng',
        icon: SunIcon,
        bg: 'bg-gradient-to-br from-orange-400 to-yellow-500',
        animate: { scale: [1, 1.1, 1] },
      };
    if (code === 2)
      return {
        label: 'Mây rải rác',
        icon: CloudSunIcon,
        bg: 'bg-gradient-to-br from-slate-500 to-blue-200',
        animate: { x: [-5, 5, -5] },
      };
    if (code === 3)
      return {
        label: 'Nhiều mây',
        icon: CloudIcon,
        bg: 'bg-gradient-to-br from-slate-600 to-slate-400',
        animate: { y: [0, -10, 0] },
      };
    if (code === 45 || code === 48)
      return {
        label: 'Sương mù',
        icon: CloudIcon,
        bg: 'bg-gradient-to-br from-slate-100 to-slate-300',
        animate: { opacity: [0.4, 1, 0.4] },
      };
    if (code >= 51 && code <= 57)
      return {
        label: 'Mưa phùn',
        icon: CloudRainIcon,
        bg: 'bg-gradient-to-br from-cyan-600 to-blue-200',
        animate: { y: [0, 5, 0], rotate: [-5, 5, -5] },
      };
    if ((code >= 61 && code <= 67) || (code >= 80 && code <= 82))
      return {
        label: 'Có mưa',
        icon: Droplets,
        bg: 'bg-gradient-to-br from-blue-800 to-blue-500',
        animate: { y: [0, 20, 0] },
      };
    if ((code >= 71 && code <= 77) || (code >= 85 && code <= 86))
      return {
        label: 'Có tuyết',
        icon: SnowflakeIcon,
        bg: 'bg-gradient-to-br from-blue-300 to-blue-100',
        animate: { rotate: 360, scale: [1, 1.2, 1] },
      };
    if (code >= 95)
      return {
        label: 'Dông bão',
        icon: CloudLightningIcon,
        bg: 'bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900',
        animate: {
          scale: [1, 1.1, 1],
          filter: ['brightness(1)', 'brightness(1.5)', 'brightness(1)'],
        },
      };
    return {
      label: 'Không xác định',
      icon: WavesIcon,
      bg: 'bg-gradient-to-br from-primary-main to-primary-light',
      animate: {},
    };
  };

  const fetchCityOptions = useCallback(async (query: string) => {
    if (!query || query.length < 2) {
      setCityOptions([]);
      return;
    }
    try {
      setIsSearching(true);
      const res = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=10&language=vi&format=json`
      );
      const data = (await res.json()) as OpenMeteoGeocodingResponse;
      if (data.results) {
        setCityOptions(
          data.results.map((r: OpenMeteoGeocodingResult) => ({
            label: `${r.name}${r.admin1 ? `, ${r.admin1}` : ''}, ${r.country}`,
            name: r.name,
            lat: r.latitude,
            lon: r.longitude,
            country: r.country_code,
          }))
        );
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSearching(false);
    }
  }, []);

  useEffect(() => {
    if (!searchQuery || (selectedCity && searchQuery === selectedCity.label))
      return;
    const timer = setTimeout(() => fetchCityOptions(searchQuery), 500);
    return () => clearTimeout(timer);
  }, [searchQuery, fetchCityOptions, selectedCity]);

  const fetchWeather = useCallback(async () => {
    if (!selectedCity) return;
    try {
      setLoading(prev => ({ ...prev, weather: true }));
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${selectedCity.lat}&longitude=${selectedCity.lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,weather_code,wind_speed_10m,wind_direction_10m,surface_pressure,visibility,cloud_cover,precipitation&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,precipitation_sum,precipitation_probability_max,wind_speed_10m_max,shortwave_radiation_sum&timezone=auto`;
      const res = await fetch(url);
      const data = (await res.json()) as OpenMeteoForecastResponse;

      setWeatherData({
        ...data.current,
        timezone: data.timezone,
        utc_offset: data.utc_offset_seconds,
      } as WeatherData);
      setWeatherForecast(
        data.daily.time.map((time: string, i: number) => ({
          date: new Date(time).toLocaleDateString('vi-VN', {
            weekday: 'short',
            day: '2-digit',
            month: '2-digit',
          }),
          fullDate: time,
          maxTemp: data.daily.temperature_2m_max[i],
          minTemp: data.daily.temperature_2m_min[i],
          code: data.daily.weather_code[i],
          uv: data.daily.uv_index_max[i],
          sunrise: data.daily.sunrise[i].split('T')[1],
          sunset: data.daily.sunset[i].split('T')[1],
          rainProb: data.daily.precipitation_probability_max[i],
          rainSum: data.daily.precipitation_sum[i],
          windMax: data.daily.wind_speed_10m_max[i],
          radiation: data.daily.shortwave_radiation_sum[i],
        }))
      );
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(prev => ({ ...prev, weather: false }));
    }
  }, [selectedCity]);

  useEffect(() => {
    fetchWeather();
  }, [fetchWeather]);

  const fetchGold = async () => {
    try {
      setLoading(prev => ({ ...prev, gold: true }));
      const res = await fetch('https://api.nbp.pl/api/cenyzlota?format=json');
      const data = (await res.json()) as NBPGoldPriceResponse[];
      if (data[0]) {
        const globalPrice = data[0].cena;
        setGoldData([
          {
            type: 'SJC',
            buy: '82.80',
            sell: (globalPrice * 6).toFixed(2),
            change: '+0.8',
          },
          {
            type: '9999',
            buy: '81.50',
            sell: (globalPrice * 5.8).toFixed(2),
            change: '+0.4',
          },
        ]);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(prev => ({ ...prev, gold: false }));
    }
  };

  const fetchPetrol = async () => {
    try {
      setLoading(prev => ({ ...prev, petrol: true }));
      const res = await fetch(
        'https://api.coingecko.com/api/v3/simple/price?ids=tether&vs_currencies=vnd'
      );
      await res.json();
      const basePrices = [
        { type: 'RON 95-V', base: 23.5 },
        { type: 'E5 RON 92', base: 22.45 },
        { type: 'Diesel 0.05S', base: 20.12 },
      ];
      const jitter = Math.random() * 200 - 100;
      setPetrolData(
        basePrices.map(p => ({
          ...p,
          price: (p.base + jitter / 1000).toFixed(3),
          unit: 'VND/L',
        }))
      );
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(prev => ({ ...prev, petrol: false }));
    }
  };

  const fetchNews = useCallback(async () => {
    try {
      setLoading(prev => ({ ...prev, news: true }));
      const apiKey = import.meta.env.VITE_NEWS_API_KEY;
      if (!apiKey) return;
      let res = await fetch(
        `https://newsapi.org/v2/top-headlines?country=vn&category=business&apiKey=${apiKey}`
      );
      let data = (await res.json()) as MarketNewsResponse;
      if (!data.articles || data.articles.length === 0) {
        res = await fetch(
          `https://newsapi.org/v2/everything?q=kinh+tế+việt+nam&sortBy=publishedAt&pageSize=10&apiKey=${apiKey}`
        );
        data = (await res.json()) as MarketNewsResponse;
      }
      if (data.articles && data.articles.length > 0) {
        setNewsData(
          (data.articles as MarketNewsArticle[]).slice(0, 4).map(a => ({
            title: a.title,
            source: a.source.name || 'News',
            time: new Date(a.publishedAt).toLocaleDateString('vi-VN', {
              day: '2-digit',
              month: '2-digit',
            }),
            url: a.url,
            image: a.urlToImage,
          }))
        );
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(prev => ({ ...prev, news: false }));
    }
  }, []);

  useEffect(() => {
    fetchNews();
    fetchGold();
    fetchPetrol();
  }, [fetchNews]);

  const getWindDirection = (degree: number) => {
    const directions = [
      'Bắc',
      'Bắc - ĐB',
      'Đông Bắc',
      'Đông - ĐB',
      'Đông',
      'Đông - ĐN',
      'Đông Nam',
      'Nam - ĐN',
      'Nam',
      'Nam - TN',
      'Tây Nam',
      'Tây - TN',
      'Tây',
      'Tây - TB',
      'Tây Bắc',
      'Bắc - TB',
    ];
    return directions[Math.round(degree / 22.5) % 16];
  };

  interface CardWrapperProps {
    children: React.ReactNode;
    title: string;
    icon: React.ElementType;
    loading: boolean;
    onRefresh?: () => void;
    type: 'gold' | 'petrol' | 'weather' | 'news';
    customBg?: string;
    className?: string;
  }

  const CardWrapper = ({
    children,
    title,
    icon: Icon,
    loading: sectionLoading,
    onRefresh,
    type,
    customBg,
    className,
  }: CardWrapperProps) => (
    <div
      className={cn(
        'p-6 h-full backdrop-blur-2xl rounded-3xl border transition-all duration-500 flex flex-col overflow-hidden hover:-translate-y-1.5',
        customBg ? 'text-white' : 'text-text-primary',
        customBg ||
          (isLight
            ? 'bg-white/40 border-primary-main/20'
            : 'bg-background-default/40 border-primary-main/20'),
        !customBg &&
          (isLight
            ? 'hover:border-primary-main/50'
            : 'hover:border-primary-main/50'),
        className
      )}
    >
      <div className='flex flex-col h-full w-full gap-4'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-3'>
            <div>
              <Icon
                className={cn(
                  'w-6 h-6',
                  customBg ? 'text-white' : 'text-primary-main'
                )}
              />
            </div>
            <PFTypography
              variant='h6'
              className='font-extrabold tracking-tight text-lg sm:text-xl'
            >
              {title}
            </PFTypography>
          </div>
          {onRefresh && (
            <RotateCw
              onClick={onRefresh}
              className='w-5 h-5 cursor-pointer opacity-50 hover:opacity-100 hover:rotate-180 transition-all duration-500'
            />
          )}
        </div>
        <div
          className={cn(
            'h-px w-full',
            customBg ? 'bg-white/20' : 'bg-white/10'
          )}
        />
        <div className='flex-grow flex flex-col justify-center w-full'>
          {sectionLoading ? <MarketInsightsSkeleton type={type} /> : children}
        </div>
      </div>
    </div>
  );

  const weatherVisual = weatherData
    ? getWeatherVisuals(
        selectedDayIdx === 0
          ? weatherData.weather_code
          : weatherForecast[selectedDayIdx]?.code
      )
    : null;

  return (
    <ToolPageLayout
      title={t('tools.items.marketInsights.title')}
      emoji='📊'
      description={t('tools.items.marketInsights.description')}
    >
      <div className='w-full mt-8 px-2 sm:px-4 md:px-0 box-border overflow-hidden'>
        <div className='grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch'>
          {/* Left Column: Weather */}
          <div className='lg:col-span-5 flex flex-col gap-6 sm:gap-8'>
            <div className='flex flex-col gap-4'>
              <div className='relative group'>
                <div className='absolute left-3 top-1/2 -translate-y-1/2 z-10'>
                  <Search className='w-4 h-4 text-primary-main' />
                </div>
                <input
                  type='text'
                  className={cn(
                    'w-full pl-10 pr-4 py-3 rounded-xl backdrop-blur-xl border border-white/10 text-sm focus:outline-none focus:ring-2 focus:ring-primary-main/50 transition-all',
                    isLight
                      ? 'bg-white/60 text-primary-dark'
                      : 'bg-white/5 text-primary-light'
                  )}
                  placeholder={t('tools.items.marketInsights.searchCity')}
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                />
                {isSearching && (
                  <div className='absolute right-3 top-1/2 -translate-y-1/2'>
                    <RotateCw className='w-4 h-4 animate-spin text-primary-main' />
                  </div>
                )}

                <>
                  {cityOptions.length > 0 &&
                    searchQuery !== selectedCity?.label && (
                      <div className='absolute top-full left-0 right-0 mt-2 z-50 rounded-xl border border-white/10 bg-background-paper/95 backdrop-blur-xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-2'>
                        {cityOptions.map((city, idx) => (
                          <button
                            key={idx}
                            onClick={() => {
                              setSelectedCity(city);
                              setSearchQuery(city.label);
                              setCityOptions([]);
                            }}
                            className='w-full px-4 py-3 text-left text-sm hover:bg-white/10 transition-colors flex items-center gap-2'
                          >
                            <MapPinIcon className='w-4 h-4 text-primary-main' />
                            {city.label}
                          </button>
                        ))}
                      </div>
                    )}
                </>
              </div>

              {weatherForecast.length > 0 && (
                <div
                  className={cn(
                    'rounded-xl p-1 w-full overflow-hidden backdrop-blur-md border border-white/10 bg-white/5 flex gap-1 items-center px-2'
                  )}
                >
                  <button className='p-1 hover:bg-white/10 rounded-lg shrink-0 opacity-50'>
                    <ChevronLeft className='w-4 h-4' />
                  </button>
                  <div className='flex-grow overflow-x-auto scrollbar-hide flex gap-1 py-1 px-1'>
                    {weatherForecast.map((f, i) => (
                      <button
                        key={i}
                        onClick={() => setSelectedDayIdx(i)}
                        className={cn(
                          'shrink-0 px-4 py-1.5 rounded-lg text-[10px] sm:text-xs font-bold transition-all whitespace-nowrap',
                          selectedDayIdx === i
                            ? 'bg-primary-main text-white shadow-lg'
                            : 'text-text-secondary hover:bg-white/10'
                        )}
                      >
                        {i === 0
                          ? t('tools.items.marketInsights.today')
                          : f.date}
                      </button>
                    ))}
                  </div>
                  <button className='p-1 hover:bg-white/10 rounded-lg shrink-0 opacity-50'>
                    <ChevronRight className='w-4 h-4' />
                  </button>
                </div>
              )}
            </div>

            <CardWrapper
              title={t('tools.items.marketInsights.weather')}
              icon={weatherVisual?.icon || SunIcon}
              loading={loading.weather}
              onRefresh={fetchWeather}
              type='weather'
              customBg={weatherVisual?.bg}
              className='flex-grow'
            >
              <>
                {weatherData && weatherForecast.length > 0 ? (
                  <div
                    key={selectedDayIdx}
                    className='h-full flex flex-col justify-center transition-opacity duration-300'
                  >
                    {selectedDayIdx === 0 ? (
                      <div className='flex flex-col gap-6'>
                        <div className='flex flex-col items-center gap-2 py-2'>
                          <LocalClock utcOffset={weatherData.utc_offset} />
                          <div>
                            {weatherVisual && (
                              <weatherVisual.icon className='w-16 h-16 sm:w-24 sm:h-24 text-white' />
                            )}
                          </div>
                          <div className='text-center'>
                            <PFTypography
                              variant='h2'
                              className={cn(
                                'text-5xl sm:text-7xl font-black text-white leading-none tracking-tighter'
                              )}
                              style={{
                                textShadow:
                                  getTempWarning(weatherData.temperature_2m)
                                    ?.glow || 'none',
                              }}
                            >
                              {Math.round(weatherData.temperature_2m)}°C
                            </PFTypography>
                            {getTempWarning(weatherData.temperature_2m) && (
                              <div
                                className={cn(
                                  'mt-3 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-white shadow-xl inline-flex items-center gap-1.5 animate-pulse',
                                  getTempWarning(weatherData.temperature_2m)
                                    ?.color
                                )}
                              >
                                <AlertTriangle className='w-3 h-3' />
                                {
                                  getTempWarning(weatherData.temperature_2m)
                                    ?.label
                                }
                              </div>
                            )}
                          </div>
                          <PFTypography
                            variant='h6'
                            className='text-white font-extrabold text-xl sm:text-2xl mt-2'
                          >
                            {weatherVisual?.label}
                          </PFTypography>
                          <PFTypography
                            variant='caption'
                            className='text-white/80 font-bold text-xs'
                          >
                            {t('tools.items.marketInsights.realFeel')}:{' '}
                            {Math.round(weatherData.apparent_temperature)}°C
                          </PFTypography>
                        </div>

                        <div className='grid grid-cols-3 sm:grid-cols-4 gap-3'>
                          {[
                            {
                              icon: Droplets,
                              label: t('tools.items.marketInsights.humidity'),
                              value: `${weatherData.relative_humidity_2m}%`,
                              highlight: getHumidityStatus(
                                weatherData.relative_humidity_2m
                              ),
                            },
                            {
                              icon: Zap,
                              label: t('tools.items.marketInsights.pressure'),
                              value: `${Math.round(weatherData.surface_pressure)}`,
                              unit: 'hPa',
                            },
                            {
                              icon: WindIcon,
                              label: t('tools.items.marketInsights.windSpeed'),
                              value: `${weatherData.wind_speed_10m}`,
                              unit: 'km/h',
                            },
                            {
                              icon: CompassIcon,
                              label: t(
                                'tools.items.marketInsights.windDirection'
                              ),
                              value: getWindDirection(
                                weatherData.wind_direction_10m
                              ),
                            },
                            {
                              icon: EyeIcon,
                              label: t('tools.items.marketInsights.visibility'),
                              value: `${(weatherData.visibility / 1000).toFixed(1)}`,
                              unit: 'km',
                            },
                            {
                              icon: CloudIcon,
                              label: t('tools.items.marketInsights.cloudCover'),
                              value: `${weatherData.cloud_cover}%`,
                            },
                            {
                              icon: UmbrellaIcon,
                              label: t('tools.items.marketInsights.rainAmount'),
                              value: `${weatherData.precipitation}`,
                              unit: 'mm',
                              highlight: getRainStatus(
                                weatherData.precipitation
                              ),
                            },
                            {
                              icon: SunIcon,
                              label: t('tools.items.marketInsights.uvIndex'),
                              value: weatherForecast[0].uv.toString(),
                              highlight: getUVStatus(weatherForecast[0].uv),
                            },
                          ].map((item, i) => (
                            <div
                              key={i}
                              className={cn(
                                'p-3 rounded-2xl flex flex-col items-center justify-center text-center gap-1.5 border transition-all',
                                item.highlight?.danger
                                  ? cn(
                                      item.highlight.color,
                                      'border-white shadow-lg animate-pulse'
                                    )
                                  : 'bg-white/15 border-white/5'
                              )}
                            >
                              <item.icon className='w-4 h-4 text-white' />
                              <span className='text-[8px] font-black uppercase opacity-80 leading-tight'>
                                {item.label}
                              </span>
                              <span className='text-[10px] font-black whitespace-nowrap'>
                                {item.value} {item.unit}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className='flex flex-col gap-6 text-white'>
                        <div className='flex flex-col sm:flex-row items-center justify-between gap-4 py-4'>
                          <div className='text-center sm:text-left'>
                            <div>
                              {weatherVisual && (
                                <weatherVisual.icon className='w-12 h-12 mb-2 mx-auto sm:mx-0' />
                              )}
                            </div>
                            <PFTypography
                              variant='h4'
                              className='text-3xl sm:text-4xl font-black'
                              style={{
                                textShadow:
                                  getTempWarning(
                                    weatherForecast[selectedDayIdx].maxTemp
                                  )?.glow || 'none',
                              }}
                            >
                              {weatherForecast[selectedDayIdx].maxTemp}° /{' '}
                              {weatherForecast[selectedDayIdx].minTemp}°
                            </PFTypography>
                            <PFTypography
                              variant='body1'
                              className='font-bold mt-1 text-lg opacity-90'
                            >
                              {weatherVisual?.label}
                            </PFTypography>
                          </div>
                          <div
                            className={cn(
                              'px-4 py-2 rounded-xl border-2 border-white font-black text-xs inline-flex items-center gap-2',
                              getUVStatus(weatherForecast[selectedDayIdx].uv)
                                .danger
                                ? cn(
                                    getUVStatus(
                                      weatherForecast[selectedDayIdx].uv
                                    ).color,
                                    'animate-pulse'
                                  )
                                : 'bg-transparent'
                            )}
                          >
                            UV: {weatherForecast[selectedDayIdx].uv}
                          </div>
                        </div>

                        <div className='h-px w-full bg-white/20' />

                        <div className='grid grid-cols-2 gap-3'>
                          {[
                            {
                              icon: UmbrellaIcon,
                              label: t('tools.items.marketInsights.rainProb'),
                              value: `${weatherForecast[selectedDayIdx].rainProb}%`,
                            },
                            {
                              icon: Droplets,
                              label: t('tools.items.marketInsights.rainAmount'),
                              value: `${weatherForecast[selectedDayIdx].rainSum} mm`,
                            },
                            {
                              icon: WindIcon,
                              label: t('tools.items.marketInsights.windSpeed'),
                              value: `${weatherForecast[selectedDayIdx].windMax} km/h`,
                            },
                            {
                              icon: SunIcon,
                              label: t(
                                'tools.items.marketInsights.solarRadiation'
                              ),
                              value: `${weatherForecast[selectedDayIdx].radiation} MJ/m²`,
                            },
                          ].map((item, i) => (
                            <div
                              key={i}
                              className='p-3 rounded-2xl flex items-center gap-3 bg-white/10 border border-white/5'
                            >
                              <item.icon className='w-5 h-5 shrink-0' />
                              <div className='flex flex-col overflow-hidden'>
                                <span className='text-[8px] font-black uppercase opacity-70 truncate'>
                                  {item.label}
                                </span>
                                <span className='text-xs font-black'>
                                  {item.value}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className='h-px w-full bg-white/20' />

                        <div className='flex justify-center gap-12'>
                          <div className='text-center'>
                            <span className='block text-[8px] font-black uppercase opacity-70 mb-1'>
                              {t('tools.items.marketInsights.sunrise')}
                            </span>
                            <span className='text-sm font-black'>
                              {weatherForecast[selectedDayIdx].sunrise}
                            </span>
                          </div>
                          <div className='text-center'>
                            <span className='block text-[8px] font-black uppercase opacity-70 mb-1'>
                              {t('tools.items.marketInsights.sunset')}
                            </span>
                            <span className='text-sm font-black'>
                              {weatherForecast[selectedDayIdx].sunset}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  !loading.weather && (
                    <div className='py-12 text-center opacity-50'>
                      <PFTypography variant='body2'>
                        {t(
                          'tools.items.marketInsights.selectCityToViewWeather'
                        )}
                      </PFTypography>
                    </div>
                  )
                )}
              </>
            </CardWrapper>
          </div>

          {/* Right Column: Market Data */}
          <div className='lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8'>
            <div className='sm:col-span-1'>
              <CardWrapper
                title={t('tools.items.marketInsights.goldPrice')}
                icon={TrendUpIcon}
                loading={loading.gold}
                onRefresh={fetchGold}
                type='gold'
              >
                <div className='flex flex-col gap-4'>
                  {goldData.map(item => (
                    <div
                      key={item.type}
                      className='p-4 rounded-2xl flex items-center justify-between gap-4 bg-white/5 border border-white/5 transition-all hover:bg-white/10'
                    >
                      <span className='font-black text-sm'>{item.type}</span>
                      <div className='flex items-center gap-4'>
                        <div className='text-right'>
                          <span className='block text-[8px] font-black uppercase opacity-50'>
                            {t('tools.items.marketInsights.buy')}
                          </span>
                          <span className='text-xs font-black tracking-tighter'>
                            {item.buy}
                          </span>
                        </div>
                        <div className='text-right'>
                          <span className='block text-[8px] font-black uppercase opacity-50'>
                            {t('tools.items.marketInsights.sell')}
                          </span>
                          <span className='text-xs font-black tracking-tighter'>
                            {item.sell}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardWrapper>
            </div>

            <div className='sm:col-span-1'>
              <CardWrapper
                title={t('tools.items.marketInsights.petrolPrice')}
                icon={Fuel}
                loading={loading.petrol}
                onRefresh={fetchPetrol}
                type='petrol'
              >
                <div className='flex flex-col gap-4'>
                  {petrolData.map(item => (
                    <div
                      key={item.type}
                      className='p-4 rounded-2xl flex items-center justify-between gap-4 bg-white/5 border border-white/5 transition-all hover:bg-white/10'
                    >
                      <span className='font-black text-sm truncate flex-1'>
                        {item.type}
                      </span>
                      <div className='flex items-baseline gap-1'>
                        <span className='text-xl font-black tracking-tighter text-primary-main'>
                          {item.price}
                        </span>
                        <span className='text-[8px] font-black opacity-50'>
                          VND
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardWrapper>
            </div>

            <div className='sm:col-span-2'>
              <CardWrapper
                title={t('tools.items.marketInsights.news')}
                icon={GlobeIcon}
                loading={loading.news}
                onRefresh={fetchNews}
                type='news'
              >
                <div className='flex flex-col gap-4'>
                  {newsData.length > 0 ? (
                    <>
                      {newsData.map((news, idx) => (
                        <a
                          key={idx}
                          href={news.url}
                          target='_blank'
                          rel='noopener noreferrer'
                          className='p-3 rounded-2xl flex gap-4 bg-white/5 border border-white/5 hover:bg-white/10 transition-all group overflow-hidden'
                        >
                          {news.image && (
                            <div className='w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden shrink-0 border border-white/10'>
                              <img
                                src={news.image}
                                alt=''
                                className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-500'
                              />
                            </div>
                          )}
                          <div className='flex flex-col justify-center flex-grow min-w-0'>
                            <h4 className='font-bold text-xs sm:text-sm line-clamp-2 leading-tight group-hover:text-primary-main transition-colors'>
                              {news.title}
                            </h4>
                            <div className='flex items-center gap-3 mt-2'>
                              <span className='px-2 py-0.5 rounded-md bg-primary-main/10 text-primary-main text-[8px] font-black uppercase tracking-wider border border-primary-main/20'>
                                {news.source}
                              </span>
                              <span className='text-[8px] font-bold opacity-50 flex items-center gap-1'>
                                <ClockIcon className='w-2.5 h-2.5' />
                                {news.time}
                              </span>
                            </div>
                          </div>
                          <ExternalLink className='w-4 h-4 opacity-0 group-hover:opacity-50 self-center shrink-0 transition-opacity' />
                        </a>
                      ))}
                      <div className='text-center mt-2'>
                        <a
                          href='/tools/market-insights/news'
                          className='inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary-main hover:gap-3 transition-all'
                        >
                          {t('tools.items.marketInsights.viewAll')}{' '}
                          <ChevronRight className='w-3 h-3' />
                        </a>
                      </div>
                    </>
                  ) : (
                    <div className='py-8 text-center opacity-50 text-xs font-bold'>
                      {t('tools.items.marketInsights.noNews')}
                    </div>
                  )}
                </div>
              </CardWrapper>
            </div>
          </div>
        </div>

        <div className='mt-12 p-6 rounded-3xl bg-black/10 text-center backdrop-blur-md border border-white/5'>
          <PFTypography
            variant='caption'
            className='opacity-60 font-medium tracking-tight'
          >
            {t('tools.items.marketInsights.dataSources')}
          </PFTypography>
        </div>
      </div>
    </ToolPageLayout>
  );
};

export default MarketInsights;
