export interface CharacterStats {
  /** 武力 — Martial prowess (0-100) */
  might: number;
  /** 智力 — Strategic intelligence (0-100) */
  intelligence: number;
  /** 政治 — Political acumen (0-100) */
  politics: number;
  /** 魅力 — Charisma & charm (0-100) */
  charisma: number;
  /** 統率 — Leadership & command (0-100) */
  leadership: number;
}

export type Kingdom = 'shu' | 'wei' | 'wu' | 'other';

export interface ThreeKingdomsCharacter {
  id: string;
  name: {
    cn: string;
    en: string;
    vi: string;
  };
  kingdom: Kingdom;
  stats: CharacterStats;
  weapon: string;
  hometown: string;
  bio: string;
}

export interface KingdomMeta {
  id: Kingdom;
  name: { cn: string; en: string; vi: string };
  color: string;
  emoji: string;
}

export type StatKey = keyof CharacterStats;

export const STAT_LABELS: Record<
  StatKey,
  { cn: string; en: string; vi: string }
> = {
  might: { cn: '武力', en: 'Might', vi: 'Võ lực' },
  intelligence: { cn: '智力', en: 'Intelligence', vi: 'Trí tuệ' },
  politics: { cn: '政治', en: 'Politics', vi: 'Chính trị' },
  charisma: { cn: '魅力', en: 'Charisma', vi: 'Mị lực' },
  leadership: { cn: '統率', en: 'Leadership', vi: 'Thống soái' },
};
