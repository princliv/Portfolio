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

/* ---------------- COMPONENT ---------------- */

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

      {/* Marquee wrapper */}
      <div className="group/marquee">
        <div
          className="flex items-center gap-2 animate-marquee"
          style={{
            height: '350px', // increased height
            willChange: 'transform',
            animationDuration: '18s',
          }}
        >
          {marqueeImages.map((src, i) => (
            <div key={`first-${i}`} className="flex-shrink-0 h-full flex items-center">
              <img
                src={src}
                alt={`Tech showcase ${i + 1}`}
                loading="lazy"
                className="h-full w-auto object-contain max-w-none"
              />
            </div>
          ))}

          {marqueeImages.map((src, i) => (
            <div
              key={`second-${i}`}
              className="flex-shrink-0 h-full flex items-center"
              aria-hidden="true"
            >
              <img
                src={src}
                alt=""
                loading="lazy"
                className="h-full w-auto object-contain max-w-none"
              />
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
