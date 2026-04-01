import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';
import { useThemeMode } from '@contexts/theme-mode';
import type { CharacterStats } from '@constants/three-kingdoms';
import { STAT_LABELS, STAT_KEYS } from '@constants/three-kingdoms';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip);

interface StatsRadarChartProps {
  stats: CharacterStats;
  color: string;
  label: string;
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
  const { mode } = useThemeMode();
  const isLight = mode === 'light';

  const labels = STAT_KEYS.map(k => STAT_LABELS[k].en);
  const values = STAT_KEYS.map(k => stats[k]);

  const datasets = [
    {
      label,
      data: values,
      backgroundColor: `${color}40`,
      borderColor: color,
      borderWidth: 3,
      pointBackgroundColor: color,
      pointBorderColor: '#fff',
      pointRadius: 5,
      pointHoverRadius: 7,
      tension: 0.1,
    },
  ];

  if (compareStats && compareLabel) {
    datasets.push({
      label: compareLabel,
      data: STAT_KEYS.map(k => compareStats[k]),
      backgroundColor: `${compareColor}40`,
      borderColor: compareColor,
      borderWidth: 3,
      pointBackgroundColor: compareColor,
      pointBorderColor: '#fff',
      pointRadius: 5,
      pointHoverRadius: 7,
      tension: 0.1,
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
              backdropColor: 'transparent',
            },
            grid: {
              color: isLight ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.06)',
              circular: true,
            },
            angleLines: {
              color: isLight ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.1)',
              lineWidth: 1,
            },
            pointLabels: {
              color: isLight ? '#10141a' : '#dfe2eb',
              font: {
                size: 10,
                weight: 'bold' as const,
                family: "'Space Grotesk Variable', sans-serif",
              },
              padding: 15,
            },
          },
        },
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            backgroundColor: isLight
              ? 'rgba(255,255,255,0.9)'
              : 'rgba(16,20,26,0.9)',
            titleColor: isLight ? '#10141a' : '#dfe2eb',
            bodyColor: isLight ? '#10141a' : '#dfe2eb',
            borderColor: isLight ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.1)',
            borderWidth: 1,
            padding: 12,
            cornerRadius: 12,
            displayColors: true,
            callbacks: {
              label: ctx => ` ${ctx.dataset.label}: ${ctx.parsed.r}`,
            },
          },
        },
      }}
    />
  );
};
