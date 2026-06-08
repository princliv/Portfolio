import { useState, useRef, useEffect, useCallback, memo } from 'react';
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { useTheme } from '@/hooks/useTheme';
import { ArrowUpRight, Award, Trophy, Code, BookOpen, ShieldCheck, Cpu, ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';
import profilesData from '@/data/profiles.json';

/* ------------------ HELPERS ------------------ */

const getHighlightIcon = (text: string) => {
  const lowercase = text.toLowerCase();
  if (lowercase.includes('android')) return Cpu;
  if (lowercase.includes('cloud') || lowercase.includes('azure') || lowercase.includes('firebase')) return BookOpen;
  if (lowercase.includes('cybersecurity') || lowercase.includes('verified')) return ShieldCheck;
  if (lowercase.includes('hackathon') || lowercase.includes('place') || lowercase.includes('runner')) return Trophy;
  if (lowercase.includes('structures') || lowercase.includes('programming') || lowercase.includes('sql') || lowercase.includes('database')) return Code;
  return Award;
};

const PlatformIcon = ({ id }: { id: string }) => {
  switch (id) {
    case 'google':
      return (
        <svg viewBox="0 0 24 24" className="w-12 h-12" fill="none">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
        </svg>
      );
    case 'microsoft':
      return (
        <svg viewBox="0 0 23 23" className="w-12 h-12">
          <rect x="0" y="0" width="10.5" height="10.5" fill="#F25022" />
          <rect x="11.5" y="0" width="10.5" height="10.5" fill="#7FBA00" />
          <rect x="0" y="11.5" width="10.5" height="10.5" fill="#00A4EF" />
          <rect x="11.5" y="11.5" width="10.5" height="10.5" fill="#FFB900" />
        </svg>
      );
    case 'credly':
      return (
        <svg viewBox="0 0 24 24" className="w-12 h-12" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 15a6 6 0 1 0 0-12 6 6 0 0 0 0 12z" fill="url(#credlyGrad3)" stroke="none" />
          <path d="M8.2 14L7 22l5-3 5 3-1.2-8" stroke="#FF5F00" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12 7l1 2.5h2.5l-2 1.5.8 2.5-2.3-1.5-2.3 1.5.8-2.5-2-1.5H11L12 7z" fill="#fff" stroke="none" />
          <defs>
            <linearGradient id="credlyGrad3" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FF5F00" />
              <stop offset="100%" stopColor="#FF8800" />
            </linearGradient>
          </defs>
        </svg>
      );
    case 'unstop':
      return (
        <svg viewBox="0 0 24 24" className="w-12 h-12" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" stroke="#1D9BF0" strokeLinecap="round" />
          <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" stroke="#1D9BF0" strokeLinecap="round" />
          <path d="M4 22h16" stroke="#1D9BF0" strokeLinecap="round" />
          <path d="M10 14.66V17c0 .55-.45 1-1 1H4v2h16v-2h-5c-.55 0-1-.45-1-1v-2.34" stroke="#1D9BF0" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12 2a4 4 0 0 0-4 4v7h8V6a4 4 0 0 0-4-4z" fill="url(#unstopGrad3)" stroke="none" />
          <defs>
            <linearGradient id="unstopGrad3" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1D9BF0" />
              <stop offset="100%" stopColor="#00C6FF" />
            </linearGradient>
          </defs>
        </svg>
      );
    case 'leetcode':
      return (
        <svg viewBox="0 0 24 24" className="w-12 h-12" fill="currentColor">
          <path d="M13.483 0a1.374 1.374 0 0 0-.961.411L7.11 5.826a1.374 1.374 0 0 0-.013 1.945c.47.472 1.243.472 1.713.001L13.22 3.36a.344.344 0 0 1 .483.003l7.107 7.105a.344.344 0 0 1 .003.483l-3.322 3.322a.344.344 0 0 1-.483-.003l-7.107-7.105a.344.344 0 0 1-.003-.483l2.846-2.847a1.374 1.374 0 0 0-.013-1.945 1.374 1.374 0 0 0-1.945.013L6.059 9.176a2.063 2.063 0 0 0-.02 2.917l7.107 7.105c.404.404.939.605 1.473.605s1.069-.201 1.473-.605l7.107-7.105a2.063 2.063 0 0 0 .02-2.917l-7.107-7.105A1.374 1.374 0 0 0 13.483 0zm-8.877 7.108a1.374 1.374 0 0 0-.013 1.945c.47.472 1.243.472 1.713.001l2.417-2.417a1.374 1.374 0 0 0-.013-1.945 1.374 1.374 0 0 0-1.945.013l-2.159 2.163z" fill="#FFA116" />
        </svg>
      );
    default:
      return null;
  }
};

/* ------------------ PLAYING CARD COMPONENT ------------------ */

interface ProfileCardProps {
  profile: typeof profilesData.profiles[0];
  index: number;
  activeIndex: number;
  setActiveIndex: (idx: number | ((prev: number) => number)) => void;
  isMobile: boolean;
  direction: 'forward' | 'backward';
}

const ProfileCard = ({ profile, index, activeIndex, setActiveIndex, isMobile, direction }: ProfileCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();
  const isDarkMode = resolvedTheme === 'dark';
  
  // Calculate stack depth relative to active card
  const offsetIndex = (index - activeIndex + 5) % 5;
  const isFront = offsetIndex === 0;

  const prevOffsetIndexRef = useRef(offsetIndex);
  useEffect(() => {
    prevOffsetIndexRef.current = offsetIndex;
  }, [offsetIndex]);
  const prevOffsetIndex = prevOffsetIndexRef.current;
  const isJustSwiped = prevOffsetIndex === 0 && offsetIndex > 0;

  // Track the last drag release position to prevent visual snapping
  const lastDragX = useRef(0);
  useEffect(() => {
    if (isFront) {
      lastDragX.current = 0;
    }
  }, [isFront]);

  // Track cursor position inside card for 3D tilt & glare shimmer
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Glare position values
  const glareX = useTransform(mouseX, [-0.5, 0.5], ['30%', '70%']);
  const glareY = useTransform(mouseY, [-0.5, 0.5], ['30%', '70%']);

  // Convert coordinate factors to 3D rotation degrees
  const rotateX = useTransform(mouseY, [-0.5, 0.5], [12, -12]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-12, 12]);

  // Spring values to damp animations smoothly
  const springConfig = { damping: 25, stiffness: 220, mass: 0.6 };
  const rotateXSpring = useSpring(rotateX, springConfig);
  const rotateYSpring = useSpring(rotateY, springConfig);

  // Drag Motion Values (Only applicable on the top active card)
  const dragX = useMotionValue(0);
  const dragRotate = useTransform(dragX, [-200, 200], [-25, 25]);
  const dragScale = useTransform(dragX, [-200, 0, 200], [0.95, 1, 0.95]);

  // Reset drag position if it ceases to be active
  useEffect(() => {
    if (!isFront) {
      dragX.set(0);
    }
  }, [isFront, dragX]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isFront || !cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    const relativeX = (e.clientX - rect.left) / width - 0.5;
    const relativeY = (e.clientY - rect.top) / height - 0.5;
    
    mouseX.set(relativeX);
    mouseY.set(relativeY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Peeking Offsets: Shift cards horizontally and vertically so they "peek"
  const baseX = isFront ? 0 : offsetIndex * (isMobile ? 12 : 24);
  const baseY = -offsetIndex * (isMobile ? 6 : 10);
  const baseZ = -offsetIndex * 30;
  const baseScale = 1 - offsetIndex * 0.04;
  const baseRotate = offsetIndex * (isMobile ? 2 : 3.5); // Alternates/clockwise tilt

  const cardTag = `SYS-P0${index + 1}`;
  const cardPrimaryMetric = profile.metrics[0];

  return (
    <motion.div
      ref={cardRef}
      style={{
        x: isFront ? dragX : undefined,
        scale: isFront ? dragScale : undefined,
        rotate: isFront ? dragRotate : undefined,
        rotateX: isFront ? rotateXSpring : 0,
        rotateY: isFront ? rotateYSpring : 0,
        transformStyle: 'preserve-3d',
        zIndex: 50 - offsetIndex,
      }}
      animate={{
        x: isFront ? 0 : (isJustSwiped ? [lastDragX.current, direction === 'forward' ? (isMobile ? 240 : 360) : (isMobile ? -240 : -360), baseX] : baseX),
        y: isFront ? 0 : baseY,
        z: isFront ? 0 : baseZ,
        scale: isFront ? 1 : baseScale,
        rotate: isFront ? 0 : baseRotate,
      }}
      transition={{
        x: isJustSwiped ? {
          type: 'keyframes',
          duration: 0.6,
          ease: [0.25, 1, 0.5, 1]
        } : {
          type: 'spring',
          stiffness: 220,
          damping: 25,
          mass: 0.6
        },
        default: {
          type: 'spring',
          stiffness: 220,
          damping: 25,
          mass: 0.6
        }
      }}
      drag={isFront ? 'x' : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.6}
      onDragEnd={(_, info) => {
        if (!isFront) return;
        lastDragX.current = dragX.get();
        const swipeThreshold = 100;
        if (info.offset.x < -swipeThreshold) {
          // Swipe Left -> Rotate backwards (reverse flow)
          setActiveIndex((prev) => (prev - 1 + 5) % 5);
        } else if (info.offset.x > swipeThreshold) {
          // Swipe Right -> Rotate forwards (reverse flow)
          setActiveIndex((prev) => (prev + 1) % 5);
        } else {
          lastDragX.current = 0;
        }
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => {
        if (!isFront) {
          setActiveIndex(index);
        } else {
          window.open(profile.url, '_blank', 'noopener,noreferrer');
        }
      }}
      className={`absolute w-[245px] h-[330px] md:w-[280px] md:h-[380px] rounded-2xl border bg-[#0b0b0e] cursor-pointer select-none p-6 shadow-2xl flex flex-col justify-between overflow-hidden transition-colors duration-300 group
        ${isFront ? 'border-white/15' : 'border-white/5 hover:border-white/10'}`}
    >
      {/* Dynamic Cybernetic Corner Grid Lines (For front card) */}
      {isFront && (
        <>
          <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-white/20 pointer-events-none" />
          <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-white/20 pointer-events-none" />
          <div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-white/20 pointer-events-none" />
          <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-white/20 pointer-events-none" />
          <div 
            className="absolute inset-[1px] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{
              background: profile.gradient,
              maskImage: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              maskComposite: 'exclude',
              WebkitMaskComposite: 'xor',
              padding: '1px',
            }}
          />
        </>
      )}

      {/* Holographic light reflect overlay on hover */}
      {isFront && (
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-40 transition-opacity duration-700 pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.15) 0%, transparent 60%), linear-gradient(115deg, transparent 20%, ${profile.color}44 40%, ${profile.secondaryColor}44 50%, transparent 70%)`,
            mixBlendMode: 'color-dodge',
          }}
        />
      )}

      {/* Card Header (Platform ID Tag & Action) */}
      <div className="flex items-center justify-between" style={{ transform: 'translateZ(10px)' }}>
        <span className="text-[10px] font-mono tracking-widest text-muted-foreground/60">
          {cardTag}
        </span>
        <span 
          className="w-2.5 h-2.5 rounded-full animate-pulse shadow-glow" 
          style={{ 
            backgroundColor: profile.color,
            boxShadow: `0 0 10px ${profile.color}` 
          }} 
          title="Status Indicator"
        />
      </div>

      {/* Card Body (Emblem Display) */}
      <div className="flex flex-col items-center justify-center py-6" style={{ transform: 'translateZ(20px)' }}>
        <div 
          className="w-22 h-22 md:w-24 md:h-24 rounded-full flex items-center justify-center bg-white/[0.02] border border-white/5 shadow-inner transition-transform group-hover:scale-105 duration-500"
          style={{
            boxShadow: isFront ? `0 0 40px -15px ${profile.glowColor || 'rgba(255,255,255,0.1)'}` : 'none'
          }}
        >
          <PlatformIcon id={profile.id} />
        </div>
      </div>

      {/* Card Footer (Platform Name & Primary Stat Pill) */}
      <div className="space-y-3" style={{ transform: 'translateZ(15px)' }}>
        <div>
          <h4 className="text-lg font-bold tracking-tight text-white/90 leading-tight">
            {profile.name}
          </h4>
          <p className="text-[10px] font-mono mt-0.5" style={{ color: profile.color }}>
            {profile.username}
          </p>
        </div>

        {/* Small Metric Pill */}
        <div 
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.03] border border-white/5 text-xs text-foreground/95"
          style={{ borderLeftColor: profile.color, borderLeftWidth: '2px' }}
        >
          <span className="text-[10px] text-muted-foreground font-mono">{cardPrimaryMetric.label}:</span>
          <span className="font-extrabold">{cardPrimaryMetric.value}</span>
        </div>
      </div>

      {/* Dynamic overlay to dim background cards */}
      <div 
        className="absolute inset-0 bg-[#070709] transition-opacity duration-300 pointer-events-none" 
        style={{ 
          opacity: isFront ? 0 : offsetIndex * 0.22,
          transform: 'translateZ(25px)'
        }}
      />
    </motion.div>
  );
};

/* ------------------ MAIN SECTION COMPONENT ------------------ */

export const ProfilesSection = memo(function ProfilesSection() {
  const [state, setState] = useState({ activeIndex: 0, direction: 'forward' as 'forward' | 'backward' });
  const { activeIndex, direction } = state;
  const [isMobile, setIsMobile] = useState(false);
  const { resolvedTheme } = useTheme();
  const isDarkMode = resolvedTheme === 'dark';

  const setActiveIndex = useCallback((newVal: number | ((prev: number) => number)) => {
    setState((prev) => {
      const nextIndex = typeof newVal === 'function' ? newVal(prev.activeIndex) : newVal;
      if (nextIndex === prev.activeIndex) return prev;
      
      const diff = (nextIndex - prev.activeIndex + 5) % 5;
      let nextDir = prev.direction;
      if (diff === 1) {
        nextDir = 'forward';
      } else if (diff === 4) {
        nextDir = 'backward';
      } else if (diff !== 0) {
        nextDir = diff <= 2 ? 'forward' : 'backward';
      }
      return { activeIndex: nextIndex, direction: nextDir };
    });
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Autoplay Rotation Timer: Cycles activeIndex automatically every 6 seconds.
  // Including activeIndex as dependency clears & resets interval on manual hover/click/swipe.
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % 5);
    }, 6000);

    return () => clearInterval(timer);
  }, [activeIndex]);

  const activeProfile = profilesData.profiles[activeIndex];

  return (
    <section className="relative z-20 bg-white dark:bg-background/95 border-t border-slate-200/80 dark:border-border/40 section-padding overflow-hidden">
      {/* Outer ambient decorative mesh glows */}
      <div 
        className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[600px] rounded-full blur-[140px] opacity-10 pointer-events-none -z-10 transition-colors duration-700" 
        style={{ backgroundColor: activeProfile.color }}
      />
      <div className="absolute top-10 right-10 w-96 h-96 bg-purple-500/5 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="container-custom px-4 lg:px-2">
        <SectionHeader
          eyebrow={profilesData.header.eyebrow}
          title={profilesData.header.title}
          description={profilesData.header.description}
          centered={true}
        />

        {/* Cyber Grid Splitting Card Stack vs Info Console */}
        <div className="grid grid-cols-1 lg:grid-cols-[42%_58%] gap-12 lg:gap-16 items-center mt-12 max-w-5xl mx-auto">
          
          {/* LEFT: 3D Perspective Card Stack */}
          <div className="flex flex-col items-center">
            {/* The absolute container with specified layout heights - offset to center the peeking stack */}
            <div className="relative w-full h-[360px] md:h-[400px] lg:h-[440px] flex items-center justify-center lg:-translate-x-6 md:-translate-x-3">
              {profilesData.profiles.map((profile, index) => (
                <ProfileCard
                  key={profile.id}
                  profile={profile}
                  index={index}
                  activeIndex={activeIndex}
                  setActiveIndex={setActiveIndex}
                  isMobile={isMobile}
                  direction={direction}
                />
              ))}
            </div>

            {/* Pagination Controls */}
            <div className="flex flex-col items-center gap-3 mt-6 select-none">
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setActiveIndex((prev) => (prev - 1 + 5) % 5)}
                  className="p-2.5 rounded-full bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 text-slate-600 dark:text-muted-foreground hover:text-slate-900 dark:hover:text-foreground hover:bg-slate-100 dark:hover:bg-white/[0.06] active:scale-95 transition-all shadow-md"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                
                {/* Dots */}
                <div className="flex gap-2">
                  {profilesData.profiles.map((p, idx) => (
                    <button
                      key={p.id}
                      onClick={() => setActiveIndex(idx)}
                      className="h-2.5 rounded-full transition-all duration-300"
                      style={{
                        width: idx === activeIndex ? '20px' : '8px',
                        backgroundColor: idx === activeIndex ? activeProfile.color : (isDarkMode ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)'),
                        boxShadow: idx === activeIndex ? `0 0 10px ${activeProfile.color}` : 'none'
                      }}
                    />
                  ))}
                </div>
                
                <button 
                  onClick={() => setActiveIndex((prev) => (prev + 1) % 5)}
                  className="p-2.5 rounded-full bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 text-slate-600 dark:text-muted-foreground hover:text-slate-900 dark:hover:text-foreground hover:bg-slate-100 dark:hover:bg-white/[0.06] active:scale-95 transition-all shadow-md"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              
              <p className="text-[11px] font-mono text-slate-500 dark:text-muted-foreground/60 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" style={{ color: activeProfile.color }} />
                Drag card to swipe, click back cards to swap
              </p>
            </div>
          </div>

          {/* RIGHT: Cybernetic Console Detailed Panel */}
          <div className="h-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="relative rounded-2xl border border-slate-200/80 dark:border-white/5 bg-slate-50/75 dark:bg-[#0e0e11]/60 p-6 md:p-8 backdrop-blur-xl overflow-hidden shadow-2xl flex flex-col justify-between h-full text-slate-900 dark:text-white"
              >
                {/* Ambient glow matching current profile accent */}
                <div 
                  className="absolute -top-24 -right-24 w-52 h-52 rounded-full blur-[90px] opacity-15 transition-colors duration-700 pointer-events-none -z-10"
                  style={{ backgroundColor: activeProfile.color }}
                />

                <div>
                  {/* Category Type */}
                  <span 
                    className="text-[10px] font-mono tracking-widest uppercase font-bold"
                    style={{ color: activeProfile.color }}
                  >
                    {activeProfile.id === 'leetcode' ? 'Problem Solving' : 
                     activeProfile.id === 'unstop' ? 'Competitive Arena' : 
                     activeProfile.id === 'credly' ? 'Verified Credentials' : 'Learning Network'}
                  </span>
                  
                  {/* Title & Clickable Monospace User Link */}
                  <h3 className="text-3xl font-extrabold tracking-tight mt-1 mb-2 font-display text-slate-900 dark:text-white">
                    {activeProfile.name}
                  </h3>
                  
                  <a 
                    href={activeProfile.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-200/50 dark:bg-white/[0.03] border border-slate-300/60 dark:border-white/5 text-xs font-mono text-slate-600 dark:text-muted-foreground hover:text-slate-900 dark:hover:text-foreground hover:bg-slate-200 dark:hover:bg-white/[0.06] transition-all"
                  >
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: activeProfile.color }} />
                    {activeProfile.username}
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>

                  {/* Profile Pitch Description */}
                  <p className="text-slate-600 dark:text-muted-foreground/90 leading-relaxed text-sm mt-5 font-light">
                    {activeProfile.description}
                  </p>

                  <div className="h-[1px] w-full my-6 bg-slate-200 dark:bg-white/[0.04]" />

                  {/* Dynamic Metrics Readouts */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-500 dark:text-muted-foreground/80">Ecosystem Metrics</h4>
                    <div className="grid grid-cols-3 gap-3 md:gap-4">
                      {activeProfile.metrics.map((metric, idx) => (
                        <div key={idx} className="p-3.5 rounded-xl bg-slate-100/50 dark:bg-white/[0.01] border border-slate-200 dark:border-white/[0.03] flex flex-col justify-between">
                          <span className="text-[9px] md:text-[10px] font-mono text-slate-500 dark:text-muted-foreground/70 uppercase tracking-wider mb-2">
                            {metric.label}
                          </span>
                          <span 
                            className="text-lg md:text-xl font-extrabold tracking-tight" 
                            style={{ color: idx === 0 ? activeProfile.color : (isDarkMode ? '#ffffff' : '#0f172a') }}
                          >
                            {metric.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Accomplishment highlights list */}
                  <div className="mt-6">
                    <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-500 dark:text-muted-foreground/80">Key Accomplishments</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-3">
                      {activeProfile.highlights.map((highlight, idx) => {
                        const HighlightIcon = getHighlightIcon(highlight);
                        return (
                          <div key={idx} className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-100/50 dark:bg-white/[0.01] border border-slate-200 dark:border-white/[0.03]">
                            <div className="p-2 rounded-lg bg-slate-200/60 dark:bg-white/[0.03] text-slate-600 dark:text-muted-foreground/80 flex-shrink-0">
                              <HighlightIcon className="w-4 h-4" style={{ color: activeProfile.color }} />
                            </div>
                            <span className="text-[11px] text-slate-600 dark:text-muted-foreground leading-tight">
                              {highlight}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Primary CTA */}
                <div className="mt-8 flex justify-end">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => window.open(activeProfile.url, '_blank', 'noopener,noreferrer')}
                    className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl font-bold text-xs transition-all duration-300 shadow-lg text-white"
                    style={{ 
                      background: activeProfile.gradient,
                      boxShadow: `0 8px 30px -8px ${activeProfile.glowColor || 'rgba(255,255,255,0.1)'}` 
                    }}
                  >
                    <span>View Live Profile</span>
                    <ArrowUpRight className="w-4.5 h-4.5" />
                  </motion.button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
});
