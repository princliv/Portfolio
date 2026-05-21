import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Award } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';

const milestones = [
  {
    id: 5,
    year: '2021',
    title: 'The Engineering Spark',
    subtitle: 'B.Tech CSE | Uttarakhand Technical University',
    description: 'Began B.Tech in Computer Science & Engineering at Uttarakhand Technical University. Laid deep foundations in algorithms, OOP, database systems, and computer architecture while building initial personal projects.',
    icon: '🎯',
    color: 'hsl(192, 91%, 50%)',
    details: [
      'Mastered Object Oriented Programming (C++, Java, Python).',
      'Explored system architecture, networking, and design patterns.',
      'Designed initial web application and automation projects.'
    ]
  },
  {
    id: 4,
    year: '2022',
    title: 'Career Break & Self-Directed Reskilling',
    subtitle: 'Independent Dev & Full-Stack Deep Dive',
    description: 'Took a deliberate career break to focus on intensive self-directed reskilling. Transitioned from theoretical coursework to hands-on software construction, modern web architecture, and AI foundations.',
    icon: '🌱',
    color: 'hsl(280, 87%, 65%)',
    details: [
      'Architected & built 10+ open-source full-stack React & Node.js projects.',
      'Deep-dived into AI integration, LLM APIs, and data science basics.',
      'Completed rigorous self-paced study in advanced data structures & algorithms.'
    ]
  },
  {
    id: 3,
    year: '2023',
    title: 'Blockchain & AI Systems Development',
    subtitle: 'BBN Campus Ambassador & Software Engineer',
    description: 'Selected as Campus Ambassador for Bharat Blockchain Network. Built full-stack AI-powered tools, promoted Web3 literacy, and bridged academic studies with industry-standard development.',
    icon: '⚡',
    color: 'hsl(192, 91%, 50%)',
    details: [
      'Designed decentralized frontend interfaces and custom Web3 tools.',
      'Integrated AI models into intuitive analytics dashboards.',
      'Won accolades in regional coding competitions & technical events.'
    ]
  },
  {
    id: 2,
    year: '2024',
    title: 'Trojan Club Leadership & Community Build',
    subtitle: 'Chairperson, Tech Lead & Developer',
    description: 'Led the campus technical community (Trojan Club), scaling it to 400+ active members. Organized 24h hackathons, peer-learning bootcamps, and developed club administration portals.',
    icon: '🚀',
    color: 'hsl(280, 87%, 65%)',
    details: [
      'Mentored and built a student coding community from the ground up.',
      'Organized major campus hackathons, coding contests, and workshops.',
      'Developed real-world portals for event registration and member tracking.'
    ]
  },
  {
    id: 1,
    year: '2025',
    title: 'Graduation & Hackathon Triumphs',
    subtitle: 'B.Tech CSE (Hons.) | Uttarakhand Technical University',
    description: 'Graduated with Honors from Uttarakhand Technical University. Named "Student of the Year" and presented research at SDMEL-2025. Secured 2nd position at the state-level UTKARSH 1.0 hackathon among 216 teams.',
    icon: '🎓',
    color: 'hsl(192, 91%, 50%)',
    details: [
      'Awarded "Student of the Year 2025" for academic & extracurricular excellence.',
      'Won 2nd place at UTKARSH state-level Hackathon with an AI public service app (₹30k prize).',
      'Secured Academic Excellence Award presented by Dr. Kiran Bedi.'
    ]
  }
];

// Map indexes to coordinate percentage for progress line animation
const getPercent = (id: number) => {
  if (id === 5) return 0;
  if (id === 4) return 25;
  if (id === 3) return 50;
  if (id === 2) return 75;
  return 100;
};

export const InteractiveTimeline = () => {
  const [activeId, setActiveId] = useState<number>(1);
  const { resolvedTheme } = useTheme();
  const isDarkMode = resolvedTheme === 'dark';
  const activeMilestone = milestones.find((m) => m.id === activeId) || milestones[0];

  return (
    <div className="relative w-full flex flex-col gap-6 py-1">
      {/* Horizontal Nav Track */}
      <div className="relative w-full flex justify-between items-center px-4 md:px-8 py-5 bg-slate-50/60 dark:bg-card/25 border border-slate-200/80 dark:border-border/40 backdrop-blur-md rounded-2xl">
        {/* Track connector path */}
        <div className="absolute left-[10%] right-[10%] top-1/2 -translate-y-1/2 h-[2px] bg-slate-200 dark:bg-border/30" />

        {/* Active connector line */}
        <motion.div
          className="absolute left-[10%] top-1/2 -translate-y-1/2 h-[2px] bg-gradient-to-r from-blue-600 to-indigo-500 dark:from-primary dark:to-accent origin-left"
          initial={{ scaleX: 0 }}
          animate={{
            scaleX: getPercent(activeId) / 100,
          }}
          transition={{ type: 'spring', stiffness: 70, damping: 15 }}
          style={{ width: '80%' }}
        />

        {milestones.slice().reverse().map((milestone) => {
          const isActive = activeId === milestone.id;

          return (
            <button
              key={milestone.id}
              onClick={() => setActiveId(milestone.id)}
              className="relative z-10 flex flex-col items-center gap-1.5 group focus:outline-none"
            >
              {/* Year indicator above node */}
              <span
                className={`text-[11px] font-mono font-semibold tracking-wider transition-colors duration-300 ${
                  isActive 
                    ? (isDarkMode ? 'text-primary' : 'text-blue-600')
                    : 'text-slate-500 group-hover:text-slate-900 dark:text-muted-foreground dark:group-hover:text-foreground'
                }`}
              >
                {milestone.year}
              </span>

              {/* Year Node Circle */}
              <div className="relative w-11 h-11 flex items-center justify-center">
                {/* Node Ring background */}
                <motion.div
                  className="absolute inset-0 rounded-full border-2 bg-white dark:bg-background/90 transition-colors duration-300"
                  animate={{
                    borderColor: isActive ? milestone.color : (isDarkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'),
                    boxShadow: isActive
                      ? `0 0 15px 0px ${milestone.color}60`
                      : '0 0 0px 0px transparent',
                  }}
                />
                
                {/* Hover ring pulse */}
                <div className="absolute inset-0 rounded-full border border-primary/20 scale-110 opacity-0 group-hover:opacity-100 transition-all duration-300 animate-pulse" />

                {/* Node Inner Icon */}
                <span className="text-base select-none relative z-10">{milestone.icon}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Details Display Card */}
      <div className="relative min-h-[220px] md:min-h-[180px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeId}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="p-5 rounded-2xl border border-blue-200/80 bg-white/95 dark:border-primary/20 dark:bg-card/60 backdrop-blur-sm shadow-xl glow flex flex-col justify-between h-full"
            style={{
              boxShadow: `0 8px 30px -10px ${activeMilestone.color}15`
            }}
          >
            <div>
              {/* Title & Calendar */}
              <div className="flex items-center justify-between gap-4 mb-1.5">
                <span
                  className="font-display text-[10px] font-semibold tracking-wider px-2.5 py-0.5 rounded-full"
                  style={{
                    background: isDarkMode ? `${activeMilestone.color}15` : (activeMilestone.color.includes('192') ? 'rgba(14, 116, 144, 0.1)' : 'rgba(109, 40, 217, 0.1)'),
                    color: isDarkMode ? activeMilestone.color : (activeMilestone.color.includes('192') ? 'hsl(200, 95%, 35%)' : 'hsl(280, 85%, 45%)'),
                  }}
                >
                  {activeMilestone.year} Journey
                </span>
                <div className="flex items-center gap-1 text-[9px] text-slate-500 dark:text-muted-foreground">
                  <Calendar className="w-3 h-3" />
                  <span>Story Timeline</span>
                </div>
              </div>

              {/* Title and Subtitle */}
              <h3 className="heading-4 text-base font-bold text-slate-900 dark:text-foreground mb-0.5">
                {activeMilestone.title}
              </h3>
              <p className="text-[11px] text-blue-700 dark:text-primary/80 font-medium mb-2.5">{activeMilestone.subtitle}</p>
              
              {/* Description */}
              <p className="text-xs text-slate-600 dark:text-muted-foreground leading-relaxed mb-3">
                {activeMilestone.description}
              </p>
            </div>

            {/* Achievements List */}
            <div className="border-t border-slate-200 dark:border-border/30 pt-3 mt-auto">
              <h4 className="text-[10px] font-mono uppercase tracking-wider text-slate-500 dark:text-muted-foreground mb-1.5">
                Key Accomplishments
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5">
                {activeMilestone.details.map((detail, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ x: -10, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: idx * 0.08 }}
                    className="flex items-start gap-1.5 text-xs text-slate-600 dark:text-muted-foreground leading-relaxed"
                  >
                    <span className="text-blue-600 dark:text-primary shrink-0 mt-0.5">•</span>
                    <span>{detail}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
