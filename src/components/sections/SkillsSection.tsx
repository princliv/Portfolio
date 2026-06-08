import React, { useState } from 'react';
import { SectionHeader } from '@/components/ui/SectionHeader';
import Cybersecurity from '../../../public/assets/icons/cybersecutrity.webp';
import Canva from '../../../public/assets/icons/Canva.png';
import Anaconda from '../../../public/assets/icons/Anaconda.png';

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

/* ------------------ MAIN ------------------ */
export const SkillsSection: React.FC<{ variant?: 'default' | 'page' }> = ({ variant = 'default' }) => {
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
            <SkillGroup
              key={group.title}
              group={group}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

/* ------------------ GROUP (PER SECTION) ------------------ */
function SkillGroup({
  group,
}: {
  group: (typeof SKILLS)[0];
}) {
  return (
    <div className="grid grid-cols-12 gap-6 items-start">
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
            index={i}
          />
        ))}
      </ul>
    </div>
  );
}

/* ------------------ SKILL PILL ------------------ */
function SkillPill({
  item,
  index,
}: {
  item: { name: string; icon: string | { src: string } };
  index: number;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <li
      onMouseLeave={() => setHovered(false)}
      onMouseEnter={() => setHovered(true)}
      tabIndex={0}
      className={`relative min-w-[180px] md:min-w-[220px] flex items-center gap-3 rounded-2xl px-4 py-3 bg-card/60 border backdrop-blur-md transition-all duration-300 hover:scale-[1.02] cursor-pointer ${
        hovered ? 'border-primary shadow-lg shadow-primary/10' : 'border-border shadow-sm'
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
        <span className={`font-medium transition-colors duration-300 ${hovered ? 'text-primary' : ''}`}>
          {item.name}
        </span>
        <div className="text-xs text-muted-foreground">
          {index % 2 === 0 ? 'Proficient' : 'Working Experience'}
        </div>
      </div>
    </li>
  );
}

export default SkillsSection;
