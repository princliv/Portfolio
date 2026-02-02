import { Layout } from '@/components/layout/Layout';
import { SkillsSection } from '@/components/sections/SkillsSection';

const STAR_COUNT = 24;
const starPositions = Array.from({ length: STAR_COUNT }, (_, i) => ({
  id: i,
  left: ((i * 17 + 31) % 100),
  top: ((i * 23 + 7) % 100),
  delay: (i % 8) / 3,
  opacity: 0.35 + (i % 5) / 12,
}));

const SHOOTING_STAR_COUNT = 5;
const shootingStars = Array.from({ length: SHOOTING_STAR_COUNT }, (_, i) => ({
  id: i,
  left: [15, 45, 70, 85, 25][i],
  top: [10, 30, 55, 75, 40][i],
  delay: i * 3.2,
  duration: 1.4 + (i % 3) * 0.4,
}));

const Skills = () => {
  return (
    <Layout>
      {/* Cosmic universe animated background — full page */}
      <div className="relative min-h-screen overflow-hidden">
        {/* Base gradient: deep space */}
        <div
          className="fixed inset-0 -z-10"
          style={{
            background:
              'linear-gradient(180deg, hsl(240 30% 6%) 0%, hsl(250 40% 8%) 30%, hsl(260 50% 6%) 60%, hsl(240 35% 4%) 100%)',
          }}
        />
        {/* Animated nebula orbs */}
        <div
          className="fixed -left-40 -top-40 h-[500px] w-[500px] rounded-full opacity-40 -z-10 animate-nebula-pulse"
          style={{
            background: 'radial-gradient(circle, hsl(192 91% 50% / 0.35), transparent 65%)',
            filter: 'blur(60px)',
          }}
        />
        <div
          className="fixed bottom-0 right-0 h-[450px] w-[450px] translate-x-1/4 translate-y-1/4 rounded-full opacity-30 -z-10 animate-nebula-pulse"
          style={{
            animationDelay: '2s',
            background: 'radial-gradient(circle, hsl(280 87% 65% / 0.4), transparent 65%)',
            filter: 'blur(70px)',
          }}
        />
        <div
          className="fixed left-1/2 top-1/3 h-[400px] w-[400px] -translate-x-1/2 rounded-full opacity-20 -z-10 animate-cosmic-float"
          style={{
            animationDelay: '1s',
            background: 'radial-gradient(circle, hsl(192 91% 50% / 0.25), transparent 60%)',
            filter: 'blur(80px)',
          }}
        />
        {/* Starfield: subtle twinkling dots (reduced) */}
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none" aria-hidden>
          {starPositions.map((star) => (
            <div
              key={star.id}
              className="absolute w-1 h-1 rounded-full bg-white animate-constellation-twinkle"
              style={{
                left: `${star.left}%`,
                top: `${star.top}%`,
                animationDelay: `${star.delay}s`,
                opacity: star.opacity,
              }}
            />
          ))}
          {/* Shooting stars */}
          {shootingStars.map((s) => (
            <div
              key={s.id}
              className="absolute w-1 h-1 rounded-full bg-white animate-shooting-star"
              style={{
                left: `${s.left}%`,
                top: `${s.top}%`,
                animationDelay: `${s.delay}s`,
                animationDuration: `${s.duration}s`,
              }}
            />
          ))}
        </div>
        {/* Content */}
        <div className="relative pt-32">
          <SkillsSection variant="page" />
        </div>
      </div>
    </Layout>
  );
};

export default Skills;
