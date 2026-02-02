import React, { useState, useCallback, useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { SectionHeader } from '@/components/ui/SectionHeader';
import Cybersecurity from '../../../public/assets/icons/cybersecutrity.webp';
import Canva from '../../../public/assets/icons/Canva.png';
import Anaconda from '../../../public/assets/icons/Anaconda.png';

const viewportConfig = { once: false, amount: 0.25 } as const;
const cinematic = [0.16, 1, 0.3, 1];

/* ------------------ SCROLL DIRECTION ------------------ */
function useScrollDirection() {
  const lastY = useRef(0);
  const [direction, setDirection] = useState<'up' | 'down'>('down');

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      if (y > lastY.current) setDirection('down');
      else if (y < lastY.current) setDirection('up');
      lastY.current = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return direction;
}

/* ------------------ DATA ------------------ */
const SKILLS = [
  {
    title: 'Programming',
    subtitle: 'Languages & Core Logic',
    items: [
      { name: 'Python', icon: 'https://cdn.svgporn.com/logos/python.svg' },
      { name: 'Java', icon: 'https://cdn.svgporn.com/logos/java.svg' },
      { name: 'C', icon: 'https://cdn.svgporn.com/logos/c.svg' },
      { name: 'C++', icon: 'https://cdn.svgporn.com/logos/c-plusplus.svg' },
      { name: 'JavaScript', icon: 'https://cdn.simpleicons.org/javascript' },
      { name: 'TypeScript', icon: 'https://cdn.simpleicons.org/typescript' },
      { name: 'MERN', icon: 'https://cdn.svgporn.com/logos/react.svg' },
    ],
  },
  {
    title: 'Frameworks',
    subtitle: 'Libraries & Ecosystem',
    items: [
      { name: 'React JS', icon: 'https://cdn.svgporn.com/logos/react.svg' },
      { name: 'React Native', icon: 'https://cdn.svgporn.com/logos/react.svg' },
      { name: 'Node.js', icon: 'https://cdn.simpleicons.org/node.js' },
      { name: 'REST API', icon: 'https://cdn.simpleicons.org/postman' },
      { name: 'Django', icon: 'https://cdn.svgporn.com/logos/django-icon.svg' },
      { name: 'NumPy', icon: 'https://cdn.svgporn.com/logos/numpy.svg' },
      { name: 'Pandas', icon: 'https://cdn.svgporn.com/logos/pandas.svg' },
      { name: 'Tkinter', icon: 'https://cdn.svgporn.com/logos/python.svg' },
      { name: 'Jupyter', icon: 'https://cdn.svgporn.com/logos/jupyter.svg' },
    ],
  },
  {
    title: 'Databases',
    subtitle: 'Data & Storage',
    items: [
      { name: 'SQL', icon: 'https://cdn.svgporn.com/logos/mysql.svg' },
      { name: 'PostgreSQL', icon: 'https://cdn.svgporn.com/logos/postgresql.svg' },
      { name: 'MongoDB', icon: 'https://cdn.svgporn.com/logos/mongodb.svg' },
      { name: 'Firebase', icon: 'https://cdn.svgporn.com/logos/firebase.svg' },
    ],
  },
  {
    title: 'Technologies',
    subtitle: 'Domains & Expertise',
    items: [
      { name: 'Web Development', icon: 'https://cdn.svgporn.com/logos/html-5.svg' },
      { name: 'App Development', icon: 'https://cdn.svgporn.com/logos/android-icon.svg' },
      { name: 'Cybersecurity', icon: Cybersecurity },
      { name: 'Machine Learning', icon: 'https://cdn.svgporn.com/logos/tensorflow.svg' },
      { name: 'Data Analytics', icon: 'https://cdn.svgporn.com/logos/google-analytics.svg' },
      { name: 'Application Testing', icon: 'https://cdn.svgporn.com/logos/postman.svg' },
    ],
  },
  {
    title: 'Tools',
    subtitle: 'Workflow & Platforms',
    items: [
      { name: 'Git', icon: 'https://cdn.svgporn.com/logos/git-icon.svg' },
      { name: 'GitHub', icon: 'https://cdn.svgporn.com/logos/github-icon.svg' },
      { name: 'Android Studio', icon: 'https://cdn.svgporn.com/logos/android-icon.svg' },
      { name: 'Anaconda', icon: Anaconda },
      { name: 'Figma', icon: 'https://cdn.svgporn.com/logos/figma.svg' },
      { name: 'Canva', icon: Canva },
      { name: 'MS Office', icon: 'https://cdn.svgporn.com/logos/microsoft.svg' },
      { name: 'Jira', icon: 'https://cdn.svgporn.com/logos/jira.svg' },
      { name: 'ChatGPT', icon: 'https://cdn.svgporn.com/logos/openai-icon.svg' },
      { name: 'Windows', icon: 'https://cdn.svgporn.com/logos/microsoft-windows.svg' },
    ],
  },
  {
    title: 'Soft Skills',
    subtitle: 'Human Strengths',
    items: [
      { name: 'Problem Solving', icon: 'https://cdn.svgporn.com/logos/slack-icon.svg' },
      { name: 'Analytical Thinking', icon: 'https://cdn.svgporn.com/logos/slack-icon.svg' },
      { name: 'Communication', icon: 'https://cdn.svgporn.com/logos/slack-icon.svg' },
      { name: 'Team Collaboration', icon: 'https://cdn.svgporn.com/logos/slack-icon.svg' },
      { name: 'Adaptability', icon: 'https://cdn.svgporn.com/logos/slack-icon.svg' },
    ],
  },
];

/* ------------------ MAGNETIC TILT ------------------ */
function useMagneticTilt(active = true) {
  const [style, setStyle] = useState<Record<string, string>>({});

  const onMove = useCallback(
    (e: React.MouseEvent<HTMLLIElement>) => {
      if (!active) return;
      const el = e.currentTarget;
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      setStyle({
        transform: `perspective(800px) rotateX(${-y * 8}deg) rotateY(${x * 10}deg) translate3d(${x * 6}px, ${y * 6}px, 0)`,
      });
    },
    [active]
  );

  const onLeave = () =>
    setStyle({
      transform: 'perspective(800px) rotateX(0) rotateY(0) translate3d(0,0,0)',
    });

  return { style, onMove, onLeave };
}

/* ------------------ MAIN ------------------ */
export const SkillsSection: React.FC<{ variant?: 'default' | 'page' }> = ({ variant = 'default' }) => {
  const prefersReduced = useReducedMotion();

  return (
    <section
      className={`relative z-20 py-28 overflow-hidden ${variant === 'page' ? 'bg-transparent' : 'bg-background'}`}
    >
      <div className="container-custom relative z-10">
        <SectionHeader
          eyebrow="Expertise"
          title="What I Work With"
          description="A living set of skills shaped by real-world projects, systems, and experimentation."
        />

        <div className="mt-20 space-y-28">
          {SKILLS.map((group) => (
            <AnimatedGroup
              key={group.title}
              group={group}
              prefersReduced={prefersReduced}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

/* ------------------ GROUP (PER SECTION ANIMATION) ------------------ */
function AnimatedGroup({
  group,
  prefersReduced,
}: {
  group: (typeof SKILLS)[0];
  prefersReduced: boolean;
}) {
  const direction = useScrollDirection();
  const initialX = prefersReduced ? 0 : direction === 'down' ? 140 : -140;

  return (
    <motion.div
      initial={{ opacity: 0, x: initialX }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={viewportConfig}
      transition={{ duration: 0.9, ease: cinematic }}
      className="grid grid-cols-12 gap-6 items-start"
    >
      <div className="col-span-12 lg:col-span-4">
        <aside className="sticky top-28">
          <h3 className="text-4xl md:text-5xl font-semibold">{group.title}</h3>
          <p className="mt-4 text-muted-foreground">{group.subtitle}</p>
        </aside>
      </div>

      <ul className="col-span-12 lg:col-span-8 flex flex-wrap gap-4">
        {group.items.map((item, i) => (
          <SkillPill
            key={item.name}
            item={item}
            prefersReduced={prefersReduced}
            index={i}
          />
        ))}
      </ul>
    </motion.div>
  );
}

/* ------------------ SKILL PILL ------------------ */
function SkillPill({
  item,
  prefersReduced,
  index,
}: {
  item: { name: string; icon: string | { src: string } };
  prefersReduced: boolean;
  index: number;
}) {
  const { style, onMove, onLeave } = useMagneticTilt(!prefersReduced);
  const [hovered, setHovered] = useState(false);

  return (
    <motion.li
      style={style}
      onMouseMove={onMove}
      onMouseLeave={() => {
        onLeave();
        setHovered(false);
      }}
      onMouseEnter={() => setHovered(true)}
      tabIndex={0}
      className={`relative min-w-[180px] md:min-w-[220px] flex items-center gap-3 rounded-2xl px-4 py-3 bg-card/60 border backdrop-blur-md transition-colors ${
        hovered ? 'border-primary' : 'border-border'
      }`}
    >
      <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
        <img
          src={typeof item.icon === 'string' ? item.icon : item.icon.src}
          alt={item.name}
          className="h-5 w-auto"
        />
      </div>

      <div>
        <span className={`font-medium ${hovered ? 'text-primary' : ''}`}>
          {item.name}
        </span>
        <div className="text-xs text-muted-foreground">
          {index % 2 === 0 ? 'Proficient' : 'Working Experience'}
        </div>
      </div>
    </motion.li>
  );
}

export default SkillsSection;
