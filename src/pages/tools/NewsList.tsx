import { useState, useEffect, useRef, useCallback } from 'react';
import {
  Grid,
  Box,
  Stack,
  useTheme,
  Card,
  CardContent,
  Chip,
  Button,
  CircularProgress,
  Skeleton,
} from '@mui/material';
import ToolPageLayout from './ToolPageLayout';
import { PFTypography } from '@components/core';
import { useTranslation } from 'react-i18next';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const NewsCardSkeleton = () => {
  const isLight = useTheme().palette.mode === 'light';
  const skeletonColor = isLight ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.05)';
  
  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        background: isLight ? 'rgba(255, 255, 255, 0.4)' : 'rgba(11, 13, 46, 0.4)',
        backdropFilter: 'blur(20px)',
        borderRadius: 4,
        border: `1px solid ${isLight ? 'rgba(184,137,31,0.2)' : 'rgba(245,208,96,0.2)'}`,
      }}
    >
      <Skeleton variant="rectangular" height={180} sx={{ bgcolor: skeletonColor }} />
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
        <Skeleton variant="text" width="90%" height={28} sx={{ bgcolor: skeletonColor }} />
        <Skeleton variant="text" width="80%" height={28} sx={{ bgcolor: skeletonColor }} />
        <Skeleton variant="text" width="100%" height={20} sx={{ bgcolor: skeletonColor }} />
        <Skeleton variant="text" width="100%" height={20} sx={{ bgcolor: skeletonColor }} />
        <Box sx={{ mt: 'auto', pt: 2 }}>
          <Stack direction="row" justifyContent="space-between" sx={{ mb: 2 }}>
            <Skeleton variant="rectangular" width={60} height={24} sx={{ borderRadius: 1, bgcolor: skeletonColor }} />
            <Skeleton variant="text" width={40} sx={{ bgcolor: skeletonColor }} />
          </Stack>
          <Skeleton variant="rectangular" width="100%" height={36} sx={{ borderRadius: 2, bgcolor: skeletonColor }} />
        </Box>
      </CardContent>
    </Card>
  );
};

const NewsList = () => {
  const { palette } = useTheme();
  const { t } = useTranslation();
  const isLight = palette.mode === 'light';
  
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef<IntersectionObserver | null>(null);
  const pageRef = useRef(1);

  const fetchNews = useCallback(async (pageNum: number) => {
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
      const data = await res.json();
      
      if (data.articles && data.articles.length > 0) {
        const newArticles = data.articles.map((a: any) => ({
          title: a.title,
          description: a.description,
          source: a.source.name || 'News',
          time: new Date(a.publishedAt).toLocaleDateString('vi-VN', {
            day: '2-digit', month: '2-digit', year: 'numeric',
            hour: '2-digit', minute: '2-digit'
          }),
          url: a.url,
          image: a.urlToImage
        }));

        setNews(prev => (pageNum === 1 ? newArticles : [...prev, ...newArticles]));
        if (newArticles.length < pageSize || (pageNum * pageSize) >= 100) setHasMore(false);
      } else if (pageNum === 1) {
        const topRes = await fetch(`https://newsapi.org/v2/top-headlines?country=vn&category=business&pageSize=${pageSize}&apiKey=${apiKey}`);
        const topData = await topRes.json();
        if (topData.articles && topData.articles.length > 0) {
          setNews(topData.articles.map((a: any) => ({
            title: a.title, description: a.description, source: a.source.name || 'News',
            time: new Date(a.publishedAt).toLocaleDateString('vi-VN'),
            url: a.url, image: a.urlToImage
          })));
        } else { setHasMore(false); }
      } else { setHasMore(false); }
    } catch (error) { 
      console.error(error); 
      setHasMore(false);
    } finally { 
      if (pageNum === 1) setLoading(false); 
    }
  }, []);

  useEffect(() => {
    fetchNews(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const lastElementRef = useCallback((node: HTMLDivElement) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        pageRef.current += 1;
        fetchNews(pageRef.current);
      }
    });
    if (node) observer.current.observe(node);
  }, [loading, hasMore, fetchNews]);

  return (
    <ToolPageLayout title={t('tools.items.marketInsights.latestFinancialNews')} emoji="📰" description={t('tools.items.marketInsights.description')}>
      <Box sx={{ width: '100%', maxWidth: 1200, mt: 4 }}>
        <Button startIcon={<ArrowBackIcon />} href="/tools/market-insights" sx={{ mb: 4, color: isLight ? '#B8891F' : '#F5D060', fontWeight: 700, '&:hover': { background: 'rgba(184,137,31,0.1)' } }}>
          {t('tools.items.marketInsights.backToDashboard')}
        </Button>

        <Grid container spacing={3}>
          {loading && news.length === 0 ? (
            [1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
              <Grid item xs={12} sm={6} md={4} key={i}><NewsCardSkeleton /></Grid>
            ))
          ) : (
            news.map((item, idx) => (
              <Grid item xs={12} sm={6} md={4} key={`${item.url}-${idx}`}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', background: isLight ? 'rgba(255, 255, 255, 0.4)' : 'rgba(11, 13, 46, 0.4)', backdropFilter: 'blur(20px)', borderRadius: 4, border: `1px solid ${isLight ? 'rgba(184,137,31,0.2)' : 'rgba(245,208,96,0.2)'}`, transition: 'all 0.3s ease', '&:hover': { transform: 'translateY(-8px)', borderColor: isLight ? 'rgba(184,137,31,0.5)' : 'rgba(245,208,96,0.5)', boxShadow: '0 12px 24px rgba(0,0,0,0.1)' } }}>
                  {item.image && <Box sx={{ height: 180, overflow: 'hidden' }}><img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e: any) => e.target.style.display = 'none'} /></Box>}
                  <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                    <PFTypography variant="body1" fontWeight={700} sx={{ lineHeight: 1.4, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{item.title}</PFTypography>
                    <PFTypography variant="body2" sx={{ opacity: 0.7, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{item.description}</PFTypography>
                    <Box sx={{ mt: 'auto' }}>
                      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                        <Chip label={item.source} size="small" sx={{ background: isLight ? 'rgba(184,137,31,0.1)' : 'rgba(245,208,96,0.1)', color: isLight ? '#B8891F' : '#F5D060', fontWeight: 700 }} />
                        <PFTypography variant="caption" sx={{ opacity: 0.6 }}>{item.time}</PFTypography>
                      </Stack>
                      <Button variant="outlined" fullWidth href={item.url} target="_blank" sx={{ borderRadius: 2, borderColor: isLight ? 'rgba(184,137,31,0.3)' : 'rgba(245,208,96,0.3)', color: isLight ? '#B8891F' : '#F5D060', fontWeight: 700, '&:hover': { borderColor: isLight ? '#B8891F' : '#F5D060', background: 'transparent' } }}>Đọc tiếp</Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))
          )}
        </Grid>

        <Box ref={lastElementRef} sx={{ height: 100, display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 4 }}>
          {hasMore && news.length > 0 && (
            <CircularProgress size={32} sx={{ color: isLight ? '#B8891F' : '#F5D060' }} />
          )}
          {!hasMore && news.length > 0 && (
            <PFTypography variant="caption" sx={{ opacity: 0.5 }}>Đã hiển thị tất cả tin tức có sẵn.</PFTypography>
          )}
        </Box>
      </Box>
    </ToolPageLayout>
  );
};

export default NewsList;
