import { memo } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AnimatedText } from '@/components/ui/AnimatedText';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { HeroBackground } from '@/components/three/HeroBackground';

const socialLinks = [
  { icon: Github, href: 'https://github.com/princliv', label: 'GitHub' },
  { icon: Linkedin, href: 'www.linkedin.com/in/ankit1990asap', label: 'LinkedIn' },
  { icon: Mail, href: 'mailto:ankitkumar1990asap@gmail.com', label: 'Email' },
];

export const HeroSection = memo(function HeroSection() {
  const scrollToContent = () => {
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
  };

  return (
    <section className="fixed top-0 left-0 w-full h-screen z-10 overflow-hidden">
      <HeroBackground />

      <div className="relative z-10 container-custom min-h-screen flex flex-col justify-center">
        {/* Top Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center mb-10"
        >
          <div className="glass px-5 py-2 rounded-full flex items-center gap-3">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative h-2 w-2 rounded-full bg-green-500" />
            </span>
            <span className="text-sm font-medium tracking-wide">
              Open for opportunities
            </span>
          </div>
        </motion.div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-8"
          >
            <h1 className="heading-1 leading-tight">
              <AnimatedText delay={0.2}>Hi, I’m</AnimatedText>
              <span className="block gradient-text glow-text">
                Ankit Kumar
              </span>
            </h1>

            <p className="text-2xl md:text-3xl font-display text-muted-foreground max-w-xl">
              Full-Stack Developer & AI Engineer crafting immersive, high-performance digital products.
            </p>

            <div className="flex flex-wrap gap-5">
              <MagneticButton className="btn-primary text-lg">
                <Link to="/projects">View Projects</Link>
              </MagneticButton>

              <MagneticButton className="btn-outline text-lg">
                <Link to="/contact">Let’s Collaborate</Link>
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

          {/* Right Visual */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="
              absolute 
              bottom-0 
              right-1/2 
              translate-x-1/2 
              lg:right-20 
              lg:translate-x-0
              pointer-events-none
              z-0
            "
          >
            <img
              src="/assets/hero_image.webp"
              alt="Ankit Kumar"
              className="
                h-[55vh] 
                md:h-[65vh] 
                xl:h-[75vh]
                w-auto 
                object-contain
                select-none
              "
            />
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.button
        onClick={scrollToContent}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground"
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.6, repeat: Infinity }}
        >
          <ArrowDown className="w-5 h-5" />
        </motion.div>
      </motion.button>
    </section>
  );
});
