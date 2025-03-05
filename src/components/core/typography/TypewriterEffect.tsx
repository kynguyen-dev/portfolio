import { useEffect, useState } from 'react';

interface TypewriterEffectProps {
  text: string;
  speed?: number; // Typing speed in ms
}

export const TypewriterEffect = ({
  text,
  speed = 100,
}: TypewriterEffectProps) => {
  const [visibleText, setVisibleText] = useState('');

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setVisibleText(text.substring(0, index + 1));
      index++;
      if (index === text.length) clearInterval(interval);
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return <>{visibleText}</>;
};
