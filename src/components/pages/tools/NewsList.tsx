import { useState, useEffect, useRef, useCallback } from 'react';
import {
  CaretLeft,
  NewspaperClipping,
  CircleNotch,
} from '@phosphor-icons/react';
import ToolPageLayout from './ToolPageLayout';
import { PFTypography } from '@components/core';
import { useTranslation } from 'react-i18next';

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
  return (
    <div className='h-full flex flex-col rounded-2xl overflow-hidden glass-panel animate-pulse border-ct-outline-variant/10'>
      <div className='h-[180px] bg-ct-surface-container-high/30' />
      <div className='flex-1 flex flex-col gap-3 p-6'>
        <div className='h-6 bg-ct-surface-container-high/30 rounded w-[90%]' />
        <div className='h-6 bg-ct-surface-container-high/30 rounded w-[80%]' />
        <div className='h-4 bg-ct-surface-container-high/20 rounded w-full' />
        <div className='h-4 bg-ct-surface-container-high/20 rounded w-full' />
        <div className='mt-auto pt-6'>
          <div className='flex justify-between items-center mb-4'>
            <div className='h-5 w-20 bg-ct-surface-container-high/30 rounded-full' />
            <div className='h-3 w-16 bg-ct-surface-container-high/20 rounded' />
          </div>
          <div className='h-10 bg-ct-surface-container-high/30 rounded-lg w-full' />
        </div>
      </div>
    </div>
  );
};

const NewsList = () => {
  const { t } = useTranslation();

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

  return (
    <ToolPageLayout
      title={t('tools.items.marketInsights.latestFinancialNews')}
      emoji='📰'
      description={t('tools.items.marketInsights.description')}
    >
      <div className='w-full max-w-[1200px] mt-8 mx-auto px-4 md:px-0'>
        <div className='flex justify-start mb-8'>
          <a
            href='/tools/market-insights'
            className='inline-flex items-center gap-2 font-black text-[10px] tracking-[0.2em] uppercase text-ct-secondary hover:text-ct-secondary-light transition-colors group'
          >
            <CaretLeft
              size={14}
              weight='bold'
              className='group-hover:-translate-x-1 transition-transform'
            />
            {t('tools.items.marketInsights.backToDashboard')}
          </a>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8'>
          {loading && news.length === 0
            ? [1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => <NewsCardSkeleton key={i} />)
            : news.map((item, idx) => (
                <div
                  key={`${item.url}-${idx}`}
                  className='h-full flex flex-col rounded-2xl overflow-hidden glass-panel border-ct-outline-variant/10 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:border-ct-secondary/30 group'
                >
                  {item.image && (
                    <div className='h-[200px] overflow-hidden relative'>
                      <img
                        src={item.image}
                        alt={item.title}
                        className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-110'
                        onError={(e: React.SyntheticEvent<HTMLImageElement>) =>
                          ((
                            e.target as HTMLImageElement
                          ).parentElement!.style.display = 'none')
                        }
                      />
                      <div className='absolute inset-0 bg-gradient-to-t from-ct-bg/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500' />
                    </div>
                  )}
                  <div className='flex-1 flex flex-col gap-4 p-6'>
                    <div className='flex items-center gap-2 text-ct-secondary opacity-60'>
                      <NewspaperClipping size={16} weight='duotone' />
                      <span className='text-[10px] font-black tracking-widest uppercase'>
                        {item.source}
                      </span>
                    </div>
                    <PFTypography
                      variant='body1'
                      fontWeight={700}
                      className='line-clamp-2 leading-[1.4] font-serif-display group-hover:text-primary-main transition-colors'
                    >
                      {item.title}
                    </PFTypography>
                    <PFTypography
                      variant='body2'
                      className='opacity-60 line-clamp-3 text-sm leading-relaxed'
                    >
                      {item.description}
                    </PFTypography>
                    <div className='mt-auto pt-4'>
                      <div className='flex justify-between items-center mb-6'>
                        <span className='text-[10px] font-label-grotesk text-ct-on-surface-variant/40 uppercase tracking-tighter'>
                          {item.time}
                        </span>
                      </div>
                      <a
                        href={item.url}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='block w-full text-center py-3 rounded-xl font-black text-xs uppercase tracking-[0.2em] transition-all duration-300 border border-ct-outline-variant/20 hover:bg-ct-secondary hover:text-ct-on-secondary hover:border-ct-secondary hover:shadow-[0_0_20px_rgba(78,222,163,0.3)] text-ct-on-surface'
                      >
                        Execute Read //
                      </a>
                    </div>
                  </div>
                </div>
              ))}
        </div>

        <div
          ref={lastElementRef}
          className='h-[150px] flex flex-col justify-center items-center mt-12 gap-4'
        >
          {hasMore && news.length > 0 && (
            <>
              <CircleNotch
                className='w-8 h-8 text-ct-secondary animate-spin'
                weight='bold'
              />
              <span className='text-[10px] font-black tracking-[0.3em] uppercase text-ct-on-surface-variant/40'>
                Synchronizing More Data...
              </span>
            </>
          )}
          {!hasMore && news.length > 0 && (
            <div className='flex items-center gap-4 opacity-30'>
              <div className='h-[1px] w-12 bg-ct-on-surface-variant' />
              <span className='text-[10px] font-black tracking-[0.3em] uppercase'>
                End of Transmission
              </span>
              <div className='h-[1px] w-12 bg-ct-on-surface-variant' />
            </div>
          )}
        </div>
      </div>
    </ToolPageLayout>
  );
};

export default NewsList;
