import { useState, useEffect, useRef, useCallback } from 'react';
import { ArrowLeft } from 'lucide-react';
import ToolPageLayout from './ToolPageLayout';
import { PFTypography } from '@components/core';
import { useTranslation } from 'react-i18next';
import { useThemeMode } from '@contexts/theme-mode';

interface NewsItem {
  title: string;
  description: string;
  source: string;
  time: string;
  url: string;
  image?: string;
}

interface MarketNewsArticle {
  title: string;
  description: string;
  source: { name: string };
  publishedAt: string;
  url: string;
  urlToImage?: string;
}

interface MarketNewsResponse {
  articles?: MarketNewsArticle[];
}

const NewsCardSkeleton = () => {
  const { mode } = useThemeMode();
  const isLight = mode === 'light';

  return (
    <div
      className='h-full flex flex-col rounded-2xl overflow-hidden backdrop-blur-xl animate-pulse'
      style={{
        background: isLight ? 'rgba(255,255,255,0.4)' : 'rgba(11,13,46,0.4)',
        border: `1px solid ${isLight ? 'rgba(184,137,31,0.2)' : 'rgba(245,208,96,0.2)'}`,
      }}
    >
      <div className='h-[180px] bg-white/5' />
      <div className='flex-1 flex flex-col gap-3 p-4'>
        <div className='h-7 bg-white/5 rounded w-[90%]' />
        <div className='h-7 bg-white/5 rounded w-[80%]' />
        <div className='h-5 bg-white/5 rounded w-full' />
        <div className='h-5 bg-white/5 rounded w-full' />
        <div className='mt-auto pt-4'>
          <div className='flex justify-between items-center mb-4'>
            <div className='h-6 w-15 bg-white/5 rounded' />
            <div className='h-4 w-10 bg-white/5 rounded' />
          </div>
          <div className='h-9 bg-white/5 rounded-lg w-full' />
        </div>
      </div>
    </div>
  );
};

const NewsList = () => {
  const { mode } = useThemeMode();
  const { t } = useTranslation();
  const isLight = mode === 'light';

  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef<IntersectionObserver | null>(null);
  const pageRef = useRef(1);

  const fetchNews = useCallback(
    async (pageNum: number) => {
      if (loading && pageNum !== 1) return;
      try {
        if (pageNum === 1) setLoading(true);
        const apiKey = import.meta.env.VITE_NEWS_API_KEY;
        if (!apiKey) return;

        const pageSize = 9;
        const date = new Date();
        date.setDate(date.getDate() - 28);
        const fromDate = date.toISOString().split('T')[0];
        const query = encodeURIComponent('kinh tế Việt Nam');
        const url = `https://newsapi.org/v2/everything?q=${query}&from=${fromDate}&sortBy=publishedAt&pageSize=${pageSize}&page=${pageNum}&apiKey=${apiKey}`;

        const res = await fetch(url);
        const data = (await res.json()) as MarketNewsResponse;

        if (data.articles && data.articles.length > 0) {
          const newArticles = (data.articles as MarketNewsArticle[]).map(a => ({
            title: a.title,
            description: a.description,
            source: a.source.name || 'News',
            time: new Date(a.publishedAt).toLocaleDateString('vi-VN', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            }),
            url: a.url,
            image: a.urlToImage,
          }));
          setNews(prev =>
            pageNum === 1 ? newArticles : [...prev, ...newArticles]
          );
          if (newArticles.length < pageSize || pageNum * pageSize >= 100)
            setHasMore(false);
        } else if (pageNum === 1) {
          const topRes = await fetch(
            `https://newsapi.org/v2/top-headlines?country=vn&category=business&pageSize=${pageSize}&apiKey=${apiKey}`
          );
          const topData = (await topRes.json()) as MarketNewsResponse;
          if (topData.articles && topData.articles.length > 0) {
            setNews(
              (topData.articles as MarketNewsArticle[]).map(a => ({
                title: a.title,
                description: a.description,
                source: a.source.name || 'News',
                time: new Date(a.publishedAt).toLocaleDateString('vi-VN'),
                url: a.url,
                image: a.urlToImage,
              }))
            );
          } else {
            setHasMore(false);
          }
        } else {
          setHasMore(false);
        }
      } catch (error) {
        console.error(error);
        setHasMore(false);
      } finally {
        if (pageNum === 1) setLoading(false);
      }
    },
    [loading]
  );

  useEffect(() => {
    fetchNews(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const lastElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && hasMore) {
          pageRef.current += 1;
          fetchNews(pageRef.current);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore, fetchNews]
  );

  const accentColor = isLight ? '#B8891F' : '#F5D060';
  const borderClr = isLight ? 'rgba(184,137,31,0.2)' : 'rgba(245,208,96,0.2)';

  return (
    <ToolPageLayout
      title={t('tools.items.marketInsights.latestFinancialNews')}
      emoji='📰'
      description={t('tools.items.marketInsights.description')}
    >
      <div className='w-full max-w-[1200px] mt-8 mx-auto'>
        <a
          href='/tools/market-insights'
          className='inline-flex items-center gap-2 mb-8 font-bold text-sm transition-colors hover:opacity-80'
          style={{ color: accentColor }}
        >
          <ArrowLeft size={16} />
          {t('tools.items.marketInsights.backToDashboard')}
        </a>

        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
          {loading && news.length === 0
            ? [1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => <NewsCardSkeleton key={i} />)
            : news.map((item, idx) => (
                <div
                  key={`${item.url}-${idx}`}
                  className='h-full flex flex-col rounded-2xl overflow-hidden backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-xl'
                  style={{
                    background: isLight
                      ? 'rgba(255,255,255,0.4)'
                      : 'rgba(11,13,46,0.4)',
                    border: `1px solid ${borderClr}`,
                  }}
                >
                  {item.image && (
                    <div className='h-[180px] overflow-hidden'>
                      <img
                        src={item.image}
                        alt={item.title}
                        className='w-full h-full object-cover'
                        onError={(e: React.SyntheticEvent<HTMLImageElement>) =>
                          ((e.target as HTMLImageElement).style.display =
                            'none')
                        }
                      />
                    </div>
                  )}
                  <div className='flex-1 flex flex-col gap-3 p-4'>
                    <PFTypography
                      variant='body1'
                      fontWeight={700}
                      className='line-clamp-2 leading-[1.4]'
                    >
                      {item.title}
                    </PFTypography>
                    <PFTypography
                      variant='body2'
                      className='opacity-70 line-clamp-3'
                    >
                      {item.description}
                    </PFTypography>
                    <div className='mt-auto'>
                      <div className='flex justify-between items-center mb-4'>
                        <span
                          className='text-xs font-bold px-2 py-0.5 rounded-full'
                          style={{
                            background: `${accentColor}18`,
                            color: accentColor,
                          }}
                        >
                          {item.source}
                        </span>
                        <PFTypography variant='caption' className='opacity-60'>
                          {item.time}
                        </PFTypography>
                      </div>
                      <a
                        href={item.url}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='block w-full text-center py-2 rounded-lg font-bold text-sm transition-colors'
                        style={{
                          border: `1px solid ${isLight ? 'rgba(184,137,31,0.3)' : 'rgba(245,208,96,0.3)'}`,
                          color: accentColor,
                        }}
                      >
                        Đọc tiếp
                      </a>
                    </div>
                  </div>
                </div>
              ))}
        </div>

        <div
          ref={lastElementRef}
          className='h-[100px] flex justify-center items-center mt-8'
        >
          {hasMore && news.length > 0 && (
            <div
              className='w-8 h-8 border-2 border-t-transparent rounded-full animate-spin'
              style={{
                borderColor: accentColor,
                borderTopColor: 'transparent',
              }}
            />
          )}
          {!hasMore && news.length > 0 && (
            <PFTypography variant='caption' className='opacity-50'>
              Đã hiển thị tất cả tin tức có sẵn.
            </PFTypography>
          )}
        </div>
      </div>
    </ToolPageLayout>
  );
};

export default NewsList;
