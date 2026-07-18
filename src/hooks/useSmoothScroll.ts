import { useEffect } from 'react';
import { getOrCreateLenis, releaseLenis } from '@/lib/lenis';

export function useSmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    getOrCreateLenis();
    return () => releaseLenis();
  }, []);
}
