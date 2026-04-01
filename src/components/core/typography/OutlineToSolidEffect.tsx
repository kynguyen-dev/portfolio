import { animated, useSpring } from '@react-spring/web';
import { CSSProperties, ReactNode } from 'react';

interface OutlineToSolidEffectProps {
  children: ReactNode;
  style?: CSSProperties;
}

export const OutlineToSolidEffect = ({
  children,
  style,
}: OutlineToSolidEffectProps) => {
  const spring = useSpring({
    from: { opacity: 0.7 },
    to: async next => {
      // eslint-disable-next-line no-constant-condition
      while (true) {
        await next({ opacity: 1 });
        await next({ opacity: 0.7 });
      }
    },
    config: { duration: 1500 },
  });

  return (
    <animated.div
      style={{
        display: 'inline-block',
        WebkitTextStroke: '0px rgba(0,0,0,0)',
        WebkitTextFillColor: '#FFF3E0',
        ...style,
        ...spring,
      }}
    >
      {children}
    </animated.div>
  );
};
