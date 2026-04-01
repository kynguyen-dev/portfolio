import type { KingdomMeta } from './types';

export const KINGDOMS: KingdomMeta[] = [
  {
    id: 'shu',
    name: { cn: '蜀漢', en: 'Shu Han', vi: 'Thục Hán' },
    color: '#C41E3A',
    emoji: '🔴',
  },
  {
    id: 'wei',
    name: { cn: '曹魏', en: 'Cao Wei', vi: 'Tào Ngụy' },
    color: '#2E5090',
    emoji: '🔵',
  },
  {
    id: 'wu',
    name: { cn: '東吳', en: 'Eastern Wu', vi: 'Đông Ngô' },
    color: '#D4A843',
    emoji: '🟡',
  },
  {
    id: 'other',
    name: { cn: '群雄', en: 'Independent', vi: 'Quần hùng' },
    color: '#6B7280',
    emoji: '⚪',
  },
];

export const getKingdomMeta = (id: string): KingdomMeta =>
  KINGDOMS.find(k => k.id === id) ?? KINGDOMS[3];
