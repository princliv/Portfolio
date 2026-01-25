import { useEffect, useState, useRef } from 'react';
import { useInView } from 'framer-motion';

interface UseCountUpOptions {
  duration?: number;
  start?: number;
  end: number;
  decimals?: number;
  suffix?: string;
  prefix?: string;
}

export function useCountUp({ 
  duration = 2000, 
  start = 0, 
  end, 
  decimals = 0,
  suffix = '',
  prefix = ''
}: UseCountUpOptions) {
  const [count, setCount] = useState(start);
  const [isCounting, setIsCounting] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    if (!isInView || isCounting) return;

    setIsCounting(true);
    const startTime = Date.now();
    const startValue = start;
    const endValue = end;

    const animate = () => {
      const now = Date.now();
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function (ease-out)
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = startValue + (endValue - startValue) * easeOut;

      setCount(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(endValue);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, duration, start, end, isCounting]);

  const formattedCount = count.toFixed(decimals);
  const displayValue = `${prefix}${formattedCount}${suffix}`;

  return { count: displayValue, ref };
}

