import { useEffect } from 'react';
import Snap from 'lenis/snap';
import { getOrCreateLenis, releaseLenis } from '@/lib/lenis';

/**
 * Snaps scroll position to the start of each given section id, desktop only.
 * Touch devices and prefers-reduced-motion keep native free scrolling.
 */
export function useSectionSnap(sectionIds: string[]) {
  useEffect(() => {
    const isDesktop = window.matchMedia('(pointer: fine)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!isDesktop || prefersReducedMotion) return;

    const lenis = getOrCreateLenis();
    const snap = new Snap(lenis, {
      type: 'proximity',
      duration: 0.5,
    });

    const removers = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el)
      .map((el) => snap.addElement(el, { align: 'start' }));

    return () => {
      removers.forEach((remove) => remove());
      snap.destroy();
      releaseLenis();
    };
  }, [sectionIds]);
}
