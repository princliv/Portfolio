import { memo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
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

export const SkillsSection = memo(function SkillsSection() {
  const { scrollYProgress } = useScroll();
  const x = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);

  return (
    <section className="relative z-20 py-32 overflow-hidden bg-background">
      {/* Cosmic background effects */}
      <div className="absolute top-1/4 left-0 w-96 h-96 rounded-full bg-primary/10 blur-3xl animate-nebula-pulse" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 rounded-full bg-purple-500/10 blur-3xl animate-nebula-pulse" style={{ animationDelay: '2s' }} />
      
      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <SectionHeader
            eyebrow="Expertise"
            title="What I Work With"
            description="A living set of skills shaped by real-world projects, systems, and experimentation."
          />
        </motion.div>

        <div className="mt-28 space-y-36">
          {SKILLS.map((group, index) => (
            <motion.div
              key={group.title}
              style={{ x: index % 2 === 0 ? x : undefined }}
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{
                duration: 0.9,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="grid grid-cols-12 gap-6 items-start"
            >
              <div className="col-span-12 lg:col-span-4 sticky top-32">
                <motion.h3 
                  className="text-5xl md:text-6xl font-semibold leading-none tracking-tight cosmic-text"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  {group.title}
                </motion.h3>
                <motion.p 
                  className="mt-4 text-muted-foreground max-w-sm"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  {group.subtitle}
                </motion.p>
              </div>

              <div className="col-span-12 lg:col-span-8">
                <motion.ul
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={{
                    visible: { transition: { staggerChildren: 0.06 } },
                  }}
                  className="flex flex-wrap gap-x-10 gap-y-8"
                >
                  {group.items.map((item) => (
                    <motion.li
                      key={item.name}
                      variants={{
                        hidden: { opacity: 0, y: 20, scale: 0.9 },
                        visible: {
                          opacity: 1,
                          y: 0,
                          scale: 1,
                          transition: {
                            duration: 0.6,
                            ease: [0.22, 1, 0.36, 1],
                          },
                        },
                      }}
                      whileHover={{ 
                        scale: 1.05, 
                        x: 5,
                        transition: { duration: 0.2 }
                      }}
                      className="flex items-center gap-3 text-lg md:text-xl font-medium tracking-wide group/item cursor-default"
                    >
                      <motion.img
                        src={item.icon}
                        alt={item.name}
                        className="h-7 w-auto opacity-80 group-hover/item:opacity-100 transition-opacity"
                        loading="lazy"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      />
                      <span className="group-hover/item:text-primary transition-colors">{item.name}</span>
                    </motion.li>
                  ))}
                </motion.ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="pointer-events-none absolute -top-40 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]" />
    </section>
  );
});
