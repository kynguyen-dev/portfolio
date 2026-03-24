import { animated, useSpring } from '@react-spring/web';
import { Gauge, Cpu, Image, Eye } from 'lucide-react';
import { useThemeMode } from '@contexts/theme-mode';

interface StatsBarProps {
  totalPhotos: number;
  renderedPhotos: number;
  fps: number;
}

export const StatsBar = ({
  totalPhotos,
  renderedPhotos,
  fps,
}: StatsBarProps) => {
  const { mode } = useThemeMode();
  const isLight = mode === 'light';

  const memSaved =
    totalPhotos > 0
      ? `${Math.round(((totalPhotos - renderedPhotos) / totalPhotos) * 100)}%`
      : '0%';

  const fpsColor = fps >= 55 ? '#4caf50' : fps >= 30 ? '#ff9800' : '#f44336';
  const iconColor = isLight ? '#B8891F' : '#F5D060';
  const labelColor = isLight ? '#8B7355' : '#C8B88A';
  const valueColor = isLight ? '#5C4A32' : '#FFE4B5';

  const stats = [
    {
      icon: <Image size={14} color={iconColor} />,
      label: 'Total',
      value: totalPhotos.toLocaleString(),
    },
    {
      icon: <Eye size={14} color={iconColor} />,
      label: 'In DOM',
      value: renderedPhotos.toString(),
    },
    {
      icon: <Gauge size={14} color={iconColor} />,
      label: 'FPS',
      value: fps.toString(),
      color: fpsColor,
    },
    {
      icon: <Cpu size={14} color={iconColor} />,
      label: 'DOM Saved',
      value: memSaved,
      color: '#4caf50',
    },
  ];

  const spring = useSpring({
    from: { opacity: 0, y: -20 },
    to: { opacity: 1, y: 0 },
    delay: 500,
    config: { duration: 400 },
  });

  return (
    <animated.div style={spring}>
      <div className='flex flex-wrap gap-2 justify-center mb-6'>
        {stats.map(stat => (
          <span
            key={stat.label}
            className='inline-flex items-center gap-1.5 h-8 px-3 rounded-full text-xs border backdrop-blur-sm'
            style={{
              background: isLight
                ? 'rgba(255,248,240,0.85)'
                : 'rgba(11,13,46,0.6)',
              borderColor: isLight
                ? 'rgba(184,137,31,0.2)'
                : 'rgba(245,208,96,0.2)',
            }}
          >
            {stat.icon}
            <span
              className='font-medium'
              style={{ color: labelColor, fontSize: '0.7rem' }}
            >
              {stat.label}
            </span>
            <span
              className='font-bold font-mono'
              style={{ color: stat.color ?? valueColor, fontSize: '0.75rem' }}
            >
              {stat.value}
            </span>
          </span>
        ))}
      </div>
    </animated.div>
  );
};
