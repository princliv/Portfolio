import { motion } from 'framer-motion';

/* ---------------- IMAGE ARRAY ---------------- */

const marqueeImages = [
  '/assets/about-marquee/1.png',
  '/assets/about-marquee/2.png',
  '/assets/about-marquee/3.png',
  '/assets/about-marquee/4.jpeg',
  '/assets/about-marquee/5.jpeg',
  '/assets/about-marquee/6.jpeg',
  '/assets/about-marquee/7.png',
  '/assets/about-marquee/8.png',
  '/assets/about-marquee/9.png',
  '/assets/about-marquee/10.png',
  '/assets/about-marquee/11.png',
  '/assets/about-marquee/12.png',
  '/assets/about-marquee/13.png',
  '/assets/about-marquee/14.jpeg',
  '/assets/about-marquee/15.jpeg',
  '/assets/about-marquee/34.png',
];

const MARQUEE_HEIGHT = 280;
const CARD_MIN_WIDTH = 200;

/* ---------------- COMPONENT ---------------- */

function MarqueeTrack({ images, trackId }: { images: string[]; trackId: string }) {
  return (
    <div
      className="marquee-track flex flex-shrink-0 items-center gap-4"
      style={{ height: MARQUEE_HEIGHT }}
      aria-hidden={trackId === 'copy'}
    >
      {images.map((src, i) => (
        <div
          key={`${trackId}-${i}`}
          className="flex flex-shrink-0 items-center justify-center rounded-lg border border-border/40 bg-muted/30 overflow-hidden"
          style={{
            minWidth: CARD_MIN_WIDTH,
            height: MARQUEE_HEIGHT - 24,
            padding: 4,
          }}
        >
          <img
            src={src}
            alt={`Marquee ${i + 1}`}
            loading="lazy"
            className="h-full w-full object-contain"
            draggable={false}
          />
        </div>
      ))}
    </div>
  );
}

export function TechMarquee() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-full my-20 md:my-28 lg:my-32 overflow-hidden"
    >
      {/* Gradient fade masks */}
      <div className="absolute left-0 top-0 bottom-0 w-40 md:w-56 lg:w-72 z-10 pointer-events-none bg-gradient-to-r from-background via-background/80 to-transparent" />
      <div className="absolute right-0 top-0 bottom-0 w-40 md:w-56 lg:w-72 z-10 pointer-events-none bg-gradient-to-l from-background via-background/80 to-transparent" />

      {/* Marquee: two identical tracks so -50% = one full loop */}
      <div className="marquee-wrapper overflow-hidden cursor-default py-3">
        <div className="marquee-content flex flex-nowrap w-max">
          <MarqueeTrack images={marqueeImages} trackId="original" />
          <MarqueeTrack images={marqueeImages} trackId="copy" />
        </div>
      </div>
    </motion.div>
  );
}
