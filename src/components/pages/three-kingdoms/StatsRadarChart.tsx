import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';
import { useTheme } from '@mui/material';
import type { CharacterStats } from '@constants/three-kingdoms';
import { STAT_LABELS, STAT_KEYS } from '@constants/three-kingdoms';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip);

interface StatsRadarChartProps {
  stats: CharacterStats;
  color: string;
  label: string;
  /** Optional second dataset for comparison overlay */
  compareStats?: CharacterStats;
  compareColor?: string;
  compareLabel?: string;
}

export const StatsRadarChart = ({
  stats,
  color,
  label,
  compareStats,
  compareColor = '#6B7280',
  compareLabel,
}: StatsRadarChartProps) => {
  const { palette } = useTheme();
  const isLight = palette.mode === 'light';

  const labels = STAT_KEYS.map(k => STAT_LABELS[k].en);
  const values = STAT_KEYS.map(k => stats[k]);

  const datasets = [
    {
      label,
      data: values,
      backgroundColor: `${color}30`,
      borderColor: color,
      borderWidth: 2,
      pointBackgroundColor: color,
      pointBorderColor: '#fff',
      pointRadius: 4,
    },
  ];

  if (compareStats && compareLabel) {
    datasets.push({
      label: compareLabel,
      data: STAT_KEYS.map(k => compareStats[k]),
      backgroundColor: `${compareColor}30`,
      borderColor: compareColor,
      borderWidth: 2,
      pointBackgroundColor: compareColor,
      pointBorderColor: '#fff',
      pointRadius: 4,
    });
  }

  return (
    <Radar
      data={{ labels, datasets }}
      options={{
        responsive: true,
        maintainAspectRatio: true,
        scales: {
          r: {
            min: 0,
            max: 100,
            beginAtZero: true,
            ticks: {
              stepSize: 20,
              display: false,
            },
            grid: {
              color: isLight ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.1)',
            },
            angleLines: {
              color: isLight ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.1)',
            },
            pointLabels: {
              color: isLight ? '#5C4A32' : '#FFE4B5',
              font: { size: 12, weight: 'bold' as const },
            },
          },
        },
        plugins: {
          tooltip: {
            callbacks: {
              label: ctx => `${ctx.dataset.label}: ${ctx.parsed.r}`,
            },
          },
        },
      }}
    />
  );
};
