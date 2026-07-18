import Lenis from 'lenis';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

let lenis: Lenis | null = null;
let refCount = 0;
let tickerFn: ((time: number) => void) | null = null;

export function getOrCreateLenis(): Lenis {
  if (!lenis) {
    lenis = new Lenis({ autoRaf: false, smoothWheel: true });
    lenis.on('scroll', ScrollTrigger.update);

    tickerFn = (time: number) => lenis?.raf(time * 1000);
    gsap.ticker.add(tickerFn);
    gsap.ticker.lagSmoothing(0);
  }

  refCount++;
  return lenis;
}

export function releaseLenis() {
  refCount = Math.max(0, refCount - 1);
  if (refCount === 0 && lenis) {
    if (tickerFn) gsap.ticker.remove(tickerFn);
    lenis.destroy();
    lenis = null;
    tickerFn = null;
  }
}
