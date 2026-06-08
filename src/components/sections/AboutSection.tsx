import { memo, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { TechMarquee } from '@/components/ui/TechMarquee';
import { useCountUp } from '@/hooks/useCountUp';
import {
  Code2,
  Layers,
  Brain,
  BarChart3,
  Palette,
  Cloud,
  Terminal,
  Cpu,
  Shield,
  Activity,
  Globe,
  Fingerprint,
  Award,
} from 'lucide-react';

/* ---------------- ICON GROUPS ---------------- */

const techIcons = {
  programming: [
    'https://cdn.svgporn.com/logos/c.svg',
    'https://cdn.svgporn.com/logos/c-plusplus.svg',
    'https://cdn.svgporn.com/logos/java.svg',
    'https://cdn.svgporn.com/logos/python.svg',
    'https://cdn.svgporn.com/logos/javascript.svg',
    'https://cdn.svgporn.com/logos/typescript-icon.svg',
  ],

  fullstack: [
    'https://cdn.svgporn.com/logos/html-5.svg',
    'https://cdn.svgporn.com/logos/css-3.svg',
    'https://cdn.svgporn.com/logos/react.svg',
    'https://www.vectorlogo.zone/logos/nodejs/nodejs-icon.svg',
    'https://www.vectorlogo.zone/logos/firebase/firebase-icon.svg',
    'https://www.vectorlogo.zone/logos/mongodb/mongodb-icon.svg',
    'https://cdn.svgporn.com/logos/android-icon.svg',
    'https://cdn.svgporn.com/logos/flutter.svg',
    'https://www.vectorlogo.zone/logos/wordpress/wordpress-icon.svg',
    'https://www.vectorlogo.zone/logos/mysql/mysql-icon.svg',
  ],

  ai: [
    'https://www.vectorlogo.zone/logos/tensorflow/tensorflow-icon.svg',
    'https://www.vectorlogo.zone/logos/pytorch/pytorch-icon.svg',
    'https://www.vectorlogo.zone/logos/opencv/opencv-icon.svg',
    'https://cdn.svgporn.com/logos/pandas-icon.svg',
    'https://www.vectorlogo.zone/logos/numpy/numpy-icon.svg',
  ],

  analytics: [
    'https://www.vectorlogo.zone/logos/google_analytics/google_analytics-icon.svg',
    './assets/icons/clarity.png',
    './assets/icons/gsc.webp',
    './assets/icons/gtm.webp',
  ],

  uiux: [
    'https://www.vectorlogo.zone/logos/figma/figma-icon.svg',
    'https://www.vectorlogo.zone/logos/canva/canva-icon.svg',
  ],

  cloud: [
    'https://www.vectorlogo.zone/logos/amazon_aws/amazon_aws-icon.svg',
    'https://www.vectorlogo.zone/logos/microsoft_azure/microsoft_azure-icon.svg',
    'https://assets.vercel.com/image/upload/v1607554385/repositories/vercel/logo.png',
    'https://www.vectorlogo.zone/logos/netlify/netlify-icon.svg',
    'https://www.vectorlogo.zone/logos/github/github-icon.svg',
    'https://www.vectorlogo.zone/logos/git-scm/git-scm-icon.svg',
    'https://www.vectorlogo.zone/logos/linux/linux-icon.svg',
    './assets/icons/hostinger.png',
  ],
};

/* ---------------- HIGHLIGHTS WITH BENTO & GLOW CONFIGS ---------------- */

const highlights = [
  {
    icon: Code2,
    title: 'Programming Languages',
    description:
      'Strong foundation in core programming languages with problem-solving, OOP, and performance-oriented coding.',
    tools: techIcons.programming,
    colSpan: 'lg:col-span-2',
    glowColor: 'group-hover:shadow-[0_0_35px_-5px_rgba(6,182,212,0.3)] group-hover:border-cyan-500/50',
    accentClass: 'text-cyan-500 dark:text-cyan-400 bg-cyan-500/10',
    customGraphic: () => (
      <div className="w-full h-24 bg-zinc-950/80 rounded-lg p-3 font-mono text-[10px] text-zinc-400 border border-zinc-800/80 overflow-hidden flex flex-col justify-between">
        <div className="flex items-center justify-between border-b border-zinc-800/80 pb-1.5 mb-1">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-red-500/80" />
            <span className="w-2 h-2 rounded-full bg-yellow-500/80" />
            <span className="w-2 h-2 rounded-full bg-green-500/80" />
            <span className="ml-1 text-[9px] text-zinc-500">main.cpp</span>
          </div>
          <Terminal className="w-3.5 h-3.5 text-zinc-600" />
        </div>
        <div className="flex-1 space-y-1">
          <div className="text-cyan-400"><span className="text-purple-400">#include</span> &lt;iostream&gt;</div>
          <div className="text-zinc-500"><span className="text-purple-400">int</span> main() {'{'}</div>
          <div className="pl-3 text-emerald-400"><span className="text-orange-400">std::cout</span> &lt;&lt; <span className="text-amber-300">"Building elegant systems..."</span>;</div>
          <div className="text-zinc-500">{'}'}</div>
        </div>
      </div>
    ),
  },
  {
    icon: Layers,
    title: 'Full-Stack & Mobile',
    description:
      'End-to-end development of scalable web and mobile applications using modern stacks and architectures.',
    tools: techIcons.fullstack,
    colSpan: 'lg:col-span-1',
    glowColor: 'group-hover:shadow-[0_0_35px_-5px_rgba(249,115,22,0.3)] group-hover:border-orange-500/50',
    accentClass: 'text-orange-500 dark:text-orange-400 bg-orange-500/10',
    customGraphic: () => (
      <div className="w-full h-24 flex items-center justify-around bg-gradient-to-tr from-orange-500/5 to-amber-500/5 rounded-lg border border-orange-500/10 p-2 overflow-hidden">
        <div className="relative flex flex-col items-center">
          <div className="px-2 py-0.5 rounded bg-orange-500/10 border border-orange-500/20 text-[9px] text-orange-400 font-mono">App.tsx</div>
          <div className="h-3 w-px bg-orange-500/20 my-0.5" />
          <div className="px-2 py-0.5 rounded bg-yellow-500/10 border border-yellow-500/20 text-[9px] text-yellow-500 font-mono">REST API</div>
          <div className="h-3 w-px bg-yellow-500/20 my-0.5" />
          <div className="px-2 py-0.5 rounded bg-red-500/10 border border-red-500/20 text-[9px] text-red-400 font-mono">DB.sql</div>
        </div>
        <div className="w-14 h-20 border border-orange-500/20 rounded bg-zinc-950/20 relative p-1">
          <div className="w-full h-1 bg-orange-500/30 rounded-full mb-1" />
          <div className="w-full h-12 rounded bg-orange-500/10 flex flex-col justify-around p-1">
            <span className="w-full h-1 bg-orange-500/40 rounded-full" />
            <span className="w-6 h-1 bg-orange-500/30 rounded-full" />
            <span className="w-8 h-1 bg-orange-500/20 rounded-full" />
          </div>
          <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full border border-orange-500/20" />
        </div>
      </div>
    ),
  },
  {
    icon: Brain,
    title: 'AI, ML & Cybersecurity',
    description:
      'Building intelligent systems, computer vision solutions, and security-aware applications.',
    tools: techIcons.ai,
    colSpan: 'lg:col-span-1',
    glowColor: 'group-hover:shadow-[0_0_35px_-5px_rgba(168,85,247,0.3)] group-hover:border-purple-500/50',
    accentClass: 'text-purple-500 dark:text-purple-400 bg-purple-500/10',
    customGraphic: () => (
      <div className="w-full h-24 bg-zinc-950/50 rounded-lg border border-purple-500/10 relative overflow-hidden flex items-center justify-center p-2">
        <svg className="w-full h-full" viewBox="0 0 150 80">
          <line x1="20" y1="20" x2="60" y2="15" stroke="rgba(168, 85, 247, 0.2)" strokeWidth="1" />
          <line x1="20" y1="20" x2="60" y2="40" stroke="rgba(168, 85, 247, 0.2)" strokeWidth="1" />
          <line x1="20" y1="50" x2="60" y2="40" stroke="rgba(168, 85, 247, 0.2)" strokeWidth="1" />
          <line x1="20" y1="50" x2="60" y2="65" stroke="rgba(168, 85, 247, 0.2)" strokeWidth="1" />
          <line x1="60" y1="15" x2="110" y2="30" stroke="rgba(168, 85, 247, 0.2)" strokeWidth="1" />
          <line x1="60" y1="40" x2="110" y2="30" stroke="rgba(168, 85, 247, 0.2)" strokeWidth="1" />
          <line x1="60" y1="40" x2="110" y2="55" stroke="rgba(168, 85, 247, 0.2)" strokeWidth="1" />
          <line x1="60" y1="65" x2="110" y2="55" stroke="rgba(168, 85, 247, 0.2)" strokeWidth="1" />
          <line x1="110" y1="30" x2="140" y2="42" stroke="rgba(168, 85, 247, 0.3)" strokeWidth="1" />
          <line x1="110" y1="55" x2="140" y2="42" stroke="rgba(168, 85, 247, 0.3)" strokeWidth="1" />
          <circle cx="20" cy="20" r="3" fill="#a855f7" />
          <circle cx="20" cy="50" r="3" fill="#a855f7" />
          <circle cx="60" cy="15" r="4" fill="#d946ef" />
          <circle cx="60" cy="40" r="4" fill="#a855f7" />
          <circle cx="60" cy="65" r="4" fill="#a855f7" />
          <circle cx="110" cy="30" r="3.5" fill="#c084fc" />
          <circle cx="110" cy="55" r="3.5" fill="#a855f7" />
          <circle cx="140" cy="42" r="5" fill="#e879f9" className="animate-pulse" />
        </svg>
      </div>
    ),
  },
  {
    icon: BarChart3,
    title: 'Analytical Tools',
    description:
      'Data-driven decision making using analytics, tracking, monitoring, and performance insights.',
    tools: techIcons.analytics,
    colSpan: 'lg:col-span-1',
    glowColor: 'group-hover:shadow-[0_0_35px_-5px_rgba(234,179,8,0.3)] group-hover:border-amber-500/50',
    accentClass: 'text-amber-500 dark:text-amber-400 bg-amber-500/10',
    customGraphic: () => (
      <div className="w-full h-24 bg-zinc-950/50 rounded-lg border border-amber-500/10 p-2 flex flex-col justify-between overflow-hidden">
        <div className="flex justify-between items-center text-[8px] font-mono text-zinc-500">
          <span>ENGAGEMENT METRIC</span>
          <span className="text-emerald-500 font-bold">+12.4%</span>
        </div>
        <div className="flex-1 flex items-end relative mt-1 h-12">
          <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20">
            <div className="w-full h-px bg-zinc-700" />
            <div className="w-full h-px bg-zinc-700" />
            <div className="w-full h-px bg-zinc-700" />
          </div>
          <svg className="w-full h-full overflow-visible" viewBox="0 0 100 40">
            <path
              d="M0 35 Q15 28 30 30 T60 12 T90 5 T100 2"
              fill="none"
              stroke="#eab308"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M0 35 Q15 28 30 30 T60 12 T90 5 T100 2 L100 40 L0 40 Z"
              fill="url(#analyticsGradient)"
              opacity="0.1"
            />
            <defs>
              <linearGradient id="analyticsGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#eab308" />
                <stop offset="100%" stopColor="transparent" />
              </linearGradient>
            </defs>
            <circle cx="100" cy="2" r="3" fill="#eab308" />
          </svg>
        </div>
      </div>
    ),
  },
  {
    icon: Palette,
    title: 'UI / UX Design',
    description:
      'Crafting visually appealing, accessible, and user-centric interfaces with a product mindset.',
    tools: techIcons.uiux,
    colSpan: 'lg:col-span-1',
    glowColor: 'group-hover:shadow-[0_0_35px_-5px_rgba(236,72,153,0.3)] group-hover:border-pink-500/50',
    accentClass: 'text-pink-500 dark:text-pink-400 bg-pink-500/10',
    customGraphic: () => (
      <div className="w-full h-24 bg-zinc-950/50 rounded-lg border border-pink-500/10 relative overflow-hidden p-2 flex items-center justify-center">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(236,72,153,0.05),transparent_80%)]" />
        <svg className="w-full h-full overflow-visible" viewBox="0 0 120 70">
          <path
            d="M10 55 C 30 10, 80 15, 110 35"
            fill="none"
            stroke="#ec4899"
            strokeWidth="1.5"
            strokeDasharray="4 2"
          />
          <rect x="7" y="52" width="6" height="6" fill="#ffffff" stroke="#ec4899" strokeWidth="1.5" />
          <circle cx="55" cy="12.5" r="3.5" fill="#ffffff" stroke="#ec4899" strokeWidth="1.5" />
          <rect x="107" y="32" width="6" height="6" fill="#ffffff" stroke="#ec4899" strokeWidth="1.5" />
          <polygon
            points="80,25 92,30 87,33 93,42 90,43 84,35 80,38"
            fill="#ec4899"
            stroke="#ffffff"
            strokeWidth="0.5"
          />
          <text x="96" y="52" fill="#ec4899" fontSize="8" fontFamily="sans-serif">Pen Tool</text>
        </svg>
      </div>
    ),
  },
  {
    icon: Cloud,
    title: 'Cloud & Platforms',
    description:
      'Deploying, scaling, and optimizing applications using cloud infrastructure and DevOps tools.',
    tools: techIcons.cloud,
    colSpan: 'lg:col-span-2',
    glowColor: 'group-hover:shadow-[0_0_35px_-5px_rgba(59,130,246,0.3)] group-hover:border-blue-500/50',
    accentClass: 'text-blue-500 dark:text-blue-400 bg-blue-500/10',
    customGraphic: () => (
      <div className="w-full h-24 flex items-center justify-between bg-zinc-950/50 rounded-lg border border-blue-500/10 p-3 relative overflow-hidden">
        <div className="flex flex-col items-center">
          <div className="w-8 h-8 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
            <Cloud className="w-4 h-4 text-blue-400" />
          </div>
          <span className="text-[8px] text-zinc-500 font-mono mt-1">AWS CLOUD</span>
        </div>
        <div className="flex-1 flex items-center justify-center px-4">
          <svg className="w-full h-6" viewBox="0 0 100 20">
            <line x1="0" y1="10" x2="100" y2="10" stroke="rgba(59, 130, 246, 0.2)" strokeWidth="1" strokeDasharray="3 3" />
            <circle cx="20" cy="10" r="3" fill="#3b82f6" className="animate-pulse" />
            <circle cx="50" cy="10" r="3" fill="#60a5fa" />
            <circle cx="80" cy="10" r="3" fill="#3b82f6" className="animate-pulse" style={{ animationDelay: '1s' }} />
          </svg>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-8 h-8 rounded bg-blue-500/10 border border-blue-500/20 flex items-center justify-center font-mono text-[9px] text-blue-400">
            DEPLOY
          </div>
          <span className="text-[8px] text-zinc-500 font-mono mt-1">VERCEL</span>
        </div>
      </div>
    ),
  },
];

/* ---------------- DEVELOPER CARD (ISOLATED PERFORMANCE WIDGET) ---------------- */

const DeveloperCard = memo(function DeveloperCard() {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    // Normalize coordinates between -1 and 1
    const xPct = x / (rect.width / 2);
    const yPct = y / (rect.height / 2);
    
    // Max rotation 10 degrees
    const rotateX = -yPct * 10;
    const rotateY = xPct * 10;
    
    el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    el.style.transition = 'transform 0.05s ease-out';
  };

  const handleMouseLeave = () => {
    const el = cardRef.current;
    if (!el) return;
    el.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    el.style.transition = 'transform 0.4s ease-out';
  };

  return (
    <div
      ref={cardRef}
      className="will-change-transform w-full max-w-[340px] aspect-[8.5/13.5] rounded-2xl border border-slate-200/80 dark:border-zinc-800/80 bg-white/40 dark:bg-zinc-950/40 backdrop-blur-xl shadow-2xl p-6 relative overflow-hidden flex flex-col justify-between cursor-pointer select-none group"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Card glossy reflection hover sweep */}
      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/10 dark:via-white/5 to-transparent transition-transform duration-1000 ease-in-out pointer-events-none" />
      
      {/* Card glow background */}
      <div className="absolute -inset-10 bg-gradient-to-tr from-primary/10 to-accent/5 blur-2xl rounded-full opacity-40 group-hover:opacity-75 transition-opacity pointer-events-none" />

      {/* Holographic grid scanline effect */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.15)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-[size:100%_4px,6px_100%] opacity-20 pointer-events-none" />

      {/* ID Card Top Header */}
      <div className="flex justify-between items-center border-b border-slate-200 dark:border-zinc-800/60 pb-4 relative z-10">
        <div className="flex flex-col">
          <span className="text-[10px] font-mono tracking-[0.25em] text-primary">ANKIT_KUMAR</span>
          <span className="text-[7px] font-mono text-slate-400 dark:text-zinc-500 uppercase tracking-widest mt-0.5">SECURITY ACCESS: L-1</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500"></span>
          </span>
          <span className="text-[8px] font-mono text-emerald-500 tracking-wider">LIVE_PASS</span>
        </div>
      </div>

      {/* Stylized Hologram Profile SVG / Photo Slot */}
      <div className="flex-1 flex flex-col justify-center items-center py-6 relative z-10">
        <div className="w-24 h-24 rounded-full border-2 border-primary/40 bg-zinc-950/80 flex items-center justify-center relative overflow-hidden shadow-inner group-hover:border-primary transition-all duration-300">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.15),transparent_80%)]" />
          
          {/* Rotating futuristic orbit rings */}
          <svg className="w-20 h-20 absolute animate-spin" style={{ animationDuration: '10s' }} viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" stroke="rgba(6, 182, 212, 0.2)" strokeWidth="1" fill="none" strokeDasharray="10 20" />
            <circle cx="50" cy="50" r="40" stroke="rgba(168, 85, 247, 0.15)" strokeWidth="1" fill="none" strokeDasharray="30 10" />
          </svg>
          
          {/* Abstract glowing core */}
          <Cpu className="w-10 h-10 text-primary opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300" />
        </div>
        
        <div className="text-center mt-3">
          <span className="text-xs font-mono font-bold tracking-widest text-slate-700 dark:text-zinc-200">ANKIT KUMAR</span>
          <p className="text-[9px] font-mono text-slate-400 dark:text-zinc-500 uppercase tracking-widest mt-0.5">SYS_DEV // AI_ENG</p>
        </div>
      </div>

      {/* ID Card Footer - Barcode / Tech Details */}
      <div className="border-t border-slate-200 dark:border-zinc-800/60 pt-4 flex flex-col justify-end gap-3 relative z-10">
        <div className="grid grid-cols-2 gap-2 text-[8px] font-mono text-slate-400 dark:text-zinc-500 uppercase">
          <div>
            <span className="block text-[6px] text-slate-400 dark:text-zinc-600">ID NO</span>
            <span className="text-slate-600 dark:text-zinc-300">AK-990-ASAP</span>
          </div>
          <div>
            <span className="block text-[6px] text-slate-400 dark:text-zinc-600">LOC</span>
            <span className="text-slate-600 dark:text-zinc-300">DELHI, IND</span>
          </div>
        </div>

        <div className="flex items-center justify-between mt-1.5">
          {/* Mock Barcode */}
          <div className="flex items-center gap-0.5 h-6">
            <span className="w-[1.5px] h-full bg-slate-700 dark:bg-zinc-600" />
            <span className="w-[3px] h-full bg-slate-700 dark:bg-zinc-600" />
            <span className="w-[1px] h-full bg-slate-700 dark:bg-zinc-600" />
            <span className="w-[2px] h-full bg-slate-700 dark:bg-zinc-600" />
            <span className="w-[1px] h-full bg-slate-700 dark:bg-zinc-600" />
            <span className="w-[3px] h-full bg-slate-700 dark:bg-zinc-600" />
            <span className="w-[1.5px] h-full bg-slate-700 dark:bg-zinc-600" />
            <span className="w-[1px] h-full bg-slate-700 dark:bg-zinc-600" />
            <span className="w-[4px] h-full bg-slate-700 dark:bg-zinc-600" />
            <span className="w-[2px] h-full bg-slate-700 dark:bg-zinc-600" />
            <span className="w-[1px] h-full bg-slate-700 dark:bg-zinc-600" />
          </div>
          {/* Security chip visual */}
          <div className="w-8 h-6 rounded bg-gradient-to-tr from-amber-500/80 to-yellow-400/80 flex items-center justify-center p-1 border border-amber-600/30 opacity-70 group-hover:opacity-100 transition-opacity">
            <div className="w-full h-full border border-amber-800/20 rounded-sm bg-amber-500/10 flex flex-wrap justify-between p-0.5">
              <span className="w-2.5 h-[1px] bg-amber-900/40" />
              <span className="w-2.5 h-[1px] bg-amber-900/40" />
              <span className="w-2.5 h-[1px] bg-amber-900/40" />
              <span className="w-2.5 h-[1px] bg-amber-900/40" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

/* ---------------- MAIN COMPONENT ---------------- */

export const AboutSection = memo(function AboutSection() {
  return (
    <section
      id="skills-section"
      className="scroll-snap-section relative z-20 pt-24 pb-24 rounded-t-[3rem] md:rounded-t-[4rem] lg:rounded-t-[5rem] bg-[#f5f5f7] dark:bg-background/95 backdrop-blur-xl border-t border-border/40 shadow-2xl overflow-hidden"
      style={{ marginTop: '5vh' }}
    >
      {/* Visual background overlays */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-70" />
      <div className="absolute top-1/4 left-1/4 -translate-y-1/2 w-80 h-80 rounded-full bg-gradient-to-tr from-primary/10 via-primary/5 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-y-1/2 w-96 h-96 rounded-full bg-gradient-to-tr from-accent/10 via-accent/5 to-transparent blur-3xl pointer-events-none" />

      <div className="container-custom px-4 sm:px-6 lg:px-8">
        
        {/* Dual Column Narrative Intro */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          
          {/* Narrative Text & Quote */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left">
            <div className="inline-block text-xs font-semibold text-primary uppercase tracking-[0.2em] mb-4">
              ABOUT THE ENGINEER
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 dark:text-foreground mb-4 leading-tight">
              I turn complex ideas into <br />
              <span className="relative inline-block whitespace-nowrap">
                <span className="font-['Playfair_Display',serif] italic font-normal gradient-text">
                  elegant
                </span>
                <svg
                  className="absolute -bottom-1 left-0 w-full h-3"
                  viewBox="0 0 200 10"
                  preserveAspectRatio="none"
                  aria-hidden
                >
                  <defs>
                    <linearGradient id="aboutUnderlineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="hsl(192, 91%, 50%)" stopOpacity="0.5" />
                      <stop offset="50%" stopColor="hsl(220, 90%, 60%)" stopOpacity="1" />
                      <stop offset="100%" stopColor="hsl(280, 87%, 65%)" stopOpacity="0.5" />
                    </linearGradient>
                  </defs>
                  <motion.path
                    d="M0,5 C50,2 80,2 100,5 C120,8 150,8 200,5"
                    stroke="url(#aboutUnderlineGradient)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                  />
                </svg>
              </span>{' '}
              digital experiences.
            </h2>
            
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary mb-6">
              Full-Stack Developer &amp; AI Engineer
            </p>
            
            <p className="text-slate-600 dark:text-muted-foreground text-base sm:text-lg leading-relaxed mb-6">
              I am a software engineer driven by the pursuit of building high-performance, intelligent digital products. With experience spanning full-stack systems, artificial intelligence, and interactive UI/UX, I bridge the gap between complex backend logic and pixel-perfect user experiences.
            </p>

            <div className="flex items-center gap-6 border-t border-slate-200 dark:border-zinc-800 pt-6">
              <div className="flex flex-col">
                <span className="text-xs text-slate-400 dark:text-muted-foreground/60 uppercase font-mono tracking-widest">FOCUS AREAS</span>
                <span className="text-sm font-semibold text-slate-800 dark:text-foreground mt-1">Full-Stack Architecture & AI Integration</span>
              </div>
              <div className="h-8 w-px bg-slate-200 dark:bg-zinc-800" />
              <div className="flex flex-col">
                <span className="text-xs text-slate-400 dark:text-muted-foreground/60 uppercase font-mono tracking-widest">PHILOSOPHY</span>
                <span className="text-sm font-semibold text-slate-800 dark:text-foreground mt-1">Clean Code, Exceptional Performance</span>
              </div>
            </div>
          </div>

          {/* Interactive Developer Card */}
          <div className="lg:col-span-5 flex justify-center">
            <DeveloperCard />
          </div>
        </div>

        {/* Section Title */}
        <SectionHeader
          eyebrow="Skills & Core Stack"
          title="Engineering Scalable, Intelligent & Impactful Products"
          description="A curated overview of tech fields and ecosystems shaped by real-world projects, systems engineering, and continuous experimentation."
        />

        <TechMarquee />

        {/* Asymmetric Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mt-12">
          {highlights.map((item) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5 }}
              className={`
                group relative rounded-2xl
                border border-slate-200/60 dark:border-zinc-800/60
                bg-white/50 dark:bg-zinc-900/50 backdrop-blur-xl
                p-6 shadow-md hover:shadow-xl
                transition-all duration-300
                overflow-hidden flex flex-col justify-between
                ${item.colSpan} ${item.glowColor}
              `}
            >
              {/* Background gradient subtle flare on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/0 to-primary/0 group-hover:from-primary/5 group-hover:via-primary/10 group-hover:to-primary/5 transition-all duration-500 rounded-2xl pointer-events-none" />

              <div className="relative z-10 flex-1 flex flex-col justify-between">
                
                {/* Upper row: Icon + Title + Description */}
                <div>
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`p-3 rounded-xl ${item.accentClass} text-slate-800 dark:text-foreground transition-all duration-300`}>
                      <item.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="heading-4 text-lg mb-1 text-slate-900 dark:text-foreground font-semibold">
                        {item.title}
                      </h3>
                      <p className="text-slate-600 dark:text-muted-foreground text-sm leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Middle row: Custom high-tech SVG graphic */}
                <div className="my-6">
                  {item.customGraphic()}
                </div>

                {/* Lower row: Tech Logos list */}
                <div className="border-t border-slate-200/50 dark:border-zinc-800/50 pt-4">
                  <span className="text-[9px] font-mono uppercase tracking-widest text-slate-400 dark:text-zinc-500 block mb-2">Ecosystem tools</span>
                  <div className="flex flex-wrap gap-2.5">
                    {item.tools.map((src, i) => (
                      <div
                        key={i}
                        className="w-8 h-8 rounded-lg bg-slate-100/50 dark:bg-zinc-950/40 border border-slate-200/40 dark:border-zinc-800/40 flex items-center justify-center p-1.5 hover:scale-110 hover:-translate-y-0.5 transition-all duration-200"
                        title="tech logo"
                      >
                        <img
                          src={src}
                          alt="tech"
                          loading="lazy"
                          className="w-full h-full object-contain opacity-85 group-hover:opacity-100 transition-opacity"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Redesigned Premium Stats Section */}
        <div className="mt-28 border-t border-slate-200/50 dark:border-zinc-800/50 pt-16">
          <div className="text-center mb-10">
            <span className="text-xs font-semibold text-primary uppercase tracking-[0.2em]">BY THE NUMBERS</span>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-foreground mt-2">Delivering Quality at Scale</h3>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {[
              { value: 1, suffix: '+', label: 'Years Experience', desc: 'Enterprise & startup systems', glow: 'from-cyan-500/10' },
              { value: 15, suffix: '+', label: 'Projects Deployed', desc: 'AI, web & mobile apps', glow: 'from-orange-500/10' },
              { value: 40, suffix: '+', label: 'Certifications', desc: 'Advanced specializations', glow: 'from-purple-500/10' },
              { value: 5, suffix: '+', label: 'Major Awards', desc: 'Recognitions & hackathons', glow: 'from-amber-500/10' },
            ].map((stat, i) => {
              const { count, ref } = useCountUp({
                end: stat.value,
                suffix: stat.suffix,
                duration: 2000
              });

              return (
                <motion.div
                  key={stat.label}
                  ref={ref}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="group relative rounded-xl border border-slate-200/60 dark:border-zinc-800/60 bg-white/40 dark:bg-zinc-950/40 backdrop-blur-xl p-6 text-center hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                >
                  <div className={`absolute -inset-10 bg-gradient-to-tr ${stat.glow} to-transparent blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />
                  
                  <div className="heading-2 gradient-text mb-2 cosmic-text relative inline-block font-extrabold text-5xl">
                    {count}
                  </div>
                  <div className="text-sm text-slate-800 dark:text-foreground font-semibold tracking-wide mt-1">
                    {stat.label}
                  </div>
                  <div className="text-[11px] text-slate-600 dark:text-muted-foreground mt-1.5 leading-relaxed font-medium">
                    {stat.desc}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
});
