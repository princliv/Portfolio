import { memo, useRef, useLayoutEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AnimatedText } from '@/components/ui/AnimatedText';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { HeroBackground } from '@/components/three/HeroBackground';

gsap.registerPlugin(ScrollTrigger);

const socialLinks = [
  { icon: Github, href: 'https://github.com/princliv', label: 'GitHub' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/ankit1990asap', label: 'LinkedIn' },
  { icon: Mail, href: 'mailto:ankitkumar1990asap@gmail.com', label: 'Email' },
];

export const HeroSection = memo(function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const designLayerRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const designContentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!sectionRef.current || window.innerWidth < 1024) return; // Only on desktop

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=800', // Shorter scroll distance for quicker reveal
          scrub: 0.5, // Smoother scrub value
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // 1. Hero content fades back with smooth ease
      tl.to(
        heroContentRef.current,
        {
          x: -120,
          opacity: 0.2,
          duration: 1,
          ease: 'power2.inOut',
        },
        0
      );

      // 2. Design layer slides in from right with smooth ease
      tl.to(
        designLayerRef.current,
        {
          x: '0%',
          ease: 'power3.inOut',
          duration: 1,
        },
        0
      );

      // 3. Design content appears smoothly
      tl.from(
        designContentRef.current,
        {
          x: 80,
          opacity: 0,
          duration: 0.9,
          ease: 'power2.out',
        },
        0.15
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToContent = () => {
    const scrollAmount = window.innerWidth >= 1024 ? window.innerHeight + 800 : window.innerHeight;
    window.scrollTo({ top: scrollAmount, behavior: 'smooth' });
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden"
    >
      <HeroBackground />

      {/* LAYER 1: HERO CONTENT (The Engineer) */}
      <div className="fixed top-0 left-0 w-full h-full z-[1]">
        <div
          ref={heroContentRef}
          className="relative z-10 h-full flex flex-col"
        >
          {/* Mobile layout */}
          <div className="lg:hidden h-full flex flex-col overflow-y-auto">
            <div className="container-custom flex-1 flex flex-col justify-center pt-32 sm:pt-28 pb-8 px-4">
              <motion.div
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex justify-center mb-6"
              >
                <div className="glass px-4 py-1.5 rounded-full flex items-center gap-2">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute h-full w-full rounded-full bg-green-400 opacity-75" />
                    <span className="relative h-1.5 w-1.5 rounded-full bg-green-500" />
                  </span>
                  <span className="text-xs font-medium tracking-wide">Open for opportunities</span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="flex flex-col gap-4"
              >
                <h1 className="text-3xl sm:text-4xl font-bold leading-tight tracking-tight">
                  <AnimatedText delay={0.1}>Hi, I'm</AnimatedText>
                  <motion.span
                    className="block gradient-text text-5xl sm:text-6xl"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.25 }}
                  >
                    Ankit Kumar
                  </motion.span>
                </h1>

                <p className="text-base sm:text-lg text-muted-foreground max-w-sm">
                  Full-Stack Developer & AI Engineer crafting immersive, high-performance digital products.
                </p>

                <div className="flex flex-row flex-nowrap gap-2 sm:gap-3 pt-2 justify-center">
                  <MagneticButton className="btn-primary text-sm sm:text-base shrink-0 !px-4 !py-2.5 sm:!px-8 sm:!py-4">
                    <Link to="/projects" className="block">View Projects</Link>
                  </MagneticButton>
                  <MagneticButton className="btn-outline text-sm sm:text-base shrink-0 !px-4 !py-2.5 sm:!px-8 sm:!py-4">
                    <Link to="/contact" className="block">Let's Collaborate</Link>
                  </MagneticButton>
                </div>

                <div className="flex items-center gap-4 pt-4 justify-center">
                  {socialLinks.map((link, i) => (
                    <motion.a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + i * 0.08 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-2.5 rounded-full bg-secondary/60 hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                      <link.icon className="w-5 h-5" />
                    </motion.a>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="flex justify-center mt-8 pb-4"
              >
                <img
                  src="/assets/hero_image.webp"
                  alt="Ankit Kumar"
                  className="h-[40vh] min-h-[200px] w-auto object-contain select-none"
                />
              </motion.div>
            </div>

            <motion.button
              onClick={scrollToContent}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-muted-foreground hover:text-foreground touch-manipulation"
            >
              <span className="text-[10px] tracking-widest uppercase">Scroll</span>
              <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.4, repeat: Infinity }}>
                <ArrowDown className="w-4 h-4" />
              </motion.div>
            </motion.button>
          </div>

          {/* Desktop layout */}
          <div className="relative z-10 hidden lg:flex container-custom min-h-screen flex-col justify-center pt-24 xl:pt-20">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex justify-center mb-8"
            >
              <div className="glass px-5 py-2 rounded-full flex items-center gap-3">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative h-2 w-2 rounded-full bg-green-500" />
                </span>
                <span className="text-sm font-medium tracking-wide">Open for opportunities</span>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 xl:gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -60 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col gap-6 xl:gap-8"
              >
                <h1 className="heading-1 leading-tight text-5xl xl:text-6xl 2xl:text-7xl">
                  <AnimatedText delay={0.2}>Hi, I'm</AnimatedText>
                  <motion.span
                    className="block gradient-text"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                  >
                    Ankit Kumar
                  </motion.span>
                </h1>

                <p className="text-xl xl:text-2xl 2xl:text-3xl font-display text-muted-foreground max-w-xl">
                  Full-Stack Developer & AI Engineer crafting immersive, high-performance digital products.
                </p>

                <div className="flex flex-wrap gap-5">
                  <MagneticButton className="btn-primary text-lg">
                    <Link to="/projects">View Projects</Link>
                  </MagneticButton>
                  <MagneticButton className="btn-outline text-lg">
                    <Link to="/contact">Let's Collaborate</Link>
                  </MagneticButton>
                </div>

                <div className="flex items-center gap-5 pt-4">
                  {socialLinks.map((link, i) => (
                    <motion.a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 + i * 0.1 }}
                      whileHover={{ y: -4, scale: 1.1 }}
                      className="p-3 rounded-full bg-secondary/60 hover:bg-primary hover:text-primary-foreground transition-all"
                    >
                      <link.icon className="w-5 h-5" />
                    </motion.a>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                className="absolute bottom-0 right-1/2 translate-x-1/2 lg:right-20 lg:translate-x-0 pointer-events-none z-0"
              >
                <img
                  src="/assets/hero_image.webp"
                  alt="Ankit Kumar"
                  className="h-[50vh] xl:h-[60vh] 2xl:h-[70vh] w-auto object-contain select-none"
                />
              </motion.div>
            </div>
          </div>

          {/* Desktop scroll indicator */}
          <motion.button
            onClick={scrollToContent}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground z-50"
          >
            <span className="text-xs tracking-widest uppercase">Scroll to Reveal</span>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.6, repeat: Infinity }}
            >
              <ArrowDown className="w-5 h-5" />
            </motion.div>
          </motion.button>
        </div>
      </div>

      {/* LAYER 2: ABOUT ME (The Visionary) - Desktop Only */}
      <div
        ref={designLayerRef}
        className="hidden lg:block absolute top-0 left-0 w-full h-full z-[5] translate-x-full will-change-transform bg-background/95 backdrop-blur-xl border-l border-border shadow-2xl"
      >
        {/* Animated Gradient Blob */}
        <div
          className="absolute top-1/2 -right-[20%] w-[80vh] h-[80vh] -translate-y-1/2 rounded-full -z-10 opacity-30 dark:opacity-40"
          style={{
            background:
              'radial-gradient(circle, hsl(var(--primary) / 0.6), hsl(var(--primary) / 0.3), transparent 70%)',
            filter: 'blur(80px)',
            animation: 'blob-pulse 10s infinite alternate',
          }}
        />

        <div
          ref={designContentRef}
          className="absolute top-0 left-0 w-screen h-screen flex items-center px-[6vw] py-20 overflow-y-auto"
        >
          <div className="w-full max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-16">
            {/* Left Column - Main Content */}
            <div className="flex flex-col justify-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-block mb-6 font-mono text-sm text-primary tracking-[0.15em] uppercase"
              >
                ━━ About Me
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-4xl xl:text-5xl 2xl:text-6xl font-extrabold leading-[1.1] mb-6 text-foreground tracking-tight"
              >
                Crafting Digital <br />
                <span className="relative inline-block">
                  <span className="font-['Times_New_Roman',serif] italic font-light gradient-text">
                    Excellence
                  </span>
                  <svg className="absolute -bottom-2 left-0 w-full h-3" viewBox="0 0 200 10" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="underlineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" className="[stop-color:hsl(var(--primary))]" stopOpacity="0.6" />
                        <stop offset="50%" className="[stop-color:hsl(var(--primary))]" stopOpacity="1" />
                        <stop offset="100%" className="[stop-color:hsl(var(--primary))]" stopOpacity="0.6" />
                      </linearGradient>
                      <filter id="glowUnderline">
                        <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
                        <feMerge>
                          <feMergeNode in="coloredBlur"/>
                          <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                      </filter>
                    </defs>
                    
                    {/* Glow layer */}
                    <motion.path
                      d="M0,5 C50,2 80,2 100,5 C120,8 150,8 200,5"
                      stroke="url(#underlineGradient)"
                      strokeWidth="4"
                      strokeLinecap="round"
                      fill="none"
                      opacity="0.3"
                      filter="url(#glowUnderline)"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 0.3 }}
                      transition={{ delay: 0.5, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                    />
                    
                    {/* Main smooth wave */}
                    <motion.path
                      d="M0,5 C50,2 80,2 100,5 C120,8 150,8 200,5"
                      stroke="url(#underlineGradient)"
                      strokeWidth="2"
                      strokeLinecap="round"
                      fill="none"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ delay: 0.5, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </svg>
                </span>
                <br />
                Through Innovation.
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-base xl:text-lg text-muted-foreground leading-relaxed mb-8"
              >
                A full-stack engineer specializing in building intelligent, scalable systems that merge 
                cutting-edge technology with intuitive design. From AI-driven solutions to seamless user 
                experiences, I transform complex challenges into elegant digital products.
              </motion.p>

              {/* Stats Grid */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="grid grid-cols-3 gap-4 mb-8"
              >
                {[
                  { value: '3+', label: 'Years' },
                  { value: '25+', label: 'Projects' },
                  { value: '40+', label: 'Certificates' },
                ].map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 + i * 0.1 }}
                    className="relative group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="relative p-4 rounded-xl border border-border backdrop-blur-sm bg-card/50">
                      <div className="text-2xl xl:text-3xl font-bold mb-1 text-primary">
                        {stat.value}
                      </div>
                      <div className="text-xs text-muted-foreground uppercase tracking-wide">
                        {stat.label}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="flex flex-wrap gap-4"
              >
                <MagneticButton className="btn-primary text-base !px-8 !py-4">
                  <Link to="/projects" className="flex items-center gap-2">
                    Explore My Work
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </MagneticButton>
                <MagneticButton className="btn-outline text-base !px-8 !py-4">
                  <Link to="/contact" className="flex items-center gap-2">
                    Let's Connect
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </Link>
                </MagneticButton>
              </motion.div>
            </div>

            {/* Right Column - Highlights Grid */}
            <div className="flex flex-col justify-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="grid grid-cols-1 gap-4"
              >
                {[
                  { icon: '🎯', title: 'Strategic Problem Solver', desc: 'Architecting scalable solutions for complex challenges with precision and foresight' },
                  { icon: '⚡', title: 'Performance Driven', desc: 'Optimizing every pixel and line of code for maximum speed and efficiency' },
                  { icon: '🚀', title: 'Innovation First', desc: 'Leveraging cutting-edge technologies for competitive advantage and growth' },
                  { icon: '🎨', title: 'Design Conscious', desc: 'Balancing aesthetics with functional excellence for delightful experiences' },
                  { icon: '🔒', title: 'Security Focused', desc: 'Building robust systems with security and privacy at the core' },
                  { icon: '📊', title: 'Data Informed', desc: 'Making strategic decisions based on analytics and user insights' },
                ].map((item, i) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + i * 0.1 }}
                    className="flex items-start gap-4 p-5 rounded-xl bg-card/40 backdrop-blur-sm border border-border hover:border-primary/30 hover:bg-card/60 transition-all group"
                  >
                    <span className="text-3xl group-hover:scale-110 transition-transform flex-shrink-0">{item.icon}</span>
                    <div>
                      <h3 className="text-base font-semibold text-foreground mb-2">{item.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Bottom Badge */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4 }}
                className="mt-6 p-4 rounded-xl bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20"
              >
                <div className="flex items-center gap-3 text-sm">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-foreground font-medium">Available for freelance & full-time opportunities</span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes blob-pulse {
          0% {
            transform: translateY(-50%) scale(1);
          }
          100% {
            transform: translateY(-50%) scale(1.2) rotate(10deg);
          }
        }
      `}</style>
    </section>
  );
});
