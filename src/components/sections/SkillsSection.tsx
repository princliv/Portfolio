import { memo } from 'react';
import { motion } from 'framer-motion';
import { SectionHeader } from '@/components/ui/SectionHeader';

const skillCategories = [
  {
    title: 'Frontend',
    skills: [
      { name: 'React', level: 95 },
      { name: 'TypeScript', level: 90 },
      { name: 'Next.js', level: 88 },
      { name: 'Tailwind CSS', level: 92 },
    ],
  },
  {
    title: 'Backend',
    skills: [
      { name: 'Node.js', level: 90 },
      { name: 'Python', level: 85 },
      { name: 'PostgreSQL', level: 88 },
      { name: 'GraphQL', level: 82 },
    ],
  },
  {
    title: 'AI & ML',
    skills: [
      { name: 'TensorFlow', level: 80 },
      { name: 'PyTorch', level: 75 },
      { name: 'OpenAI', level: 85 },
      { name: 'LangChain', level: 78 },
    ],
  },
  {
    title: 'Tools',
    skills: [
      { name: 'Git', level: 95 },
      { name: 'Docker', level: 85 },
      { name: 'AWS', level: 80 },
      { name: 'Figma', level: 75 },
    ],
  },
];

export const SkillsSection = memo(function SkillsSection() {
  return (
    <section className="relative z-20 pt-20 md:pt-12 lg:pt-20 pb-20 md:pb-12 lg:pb-20 rounded-t-[3rem] md:rounded-t-[4rem] lg:rounded-t-[5rem] bg-background/95 backdrop-blur-xl border-t border-border/40 shadow-2xl">
      <div className="container-custom">
        <SectionHeader
          eyebrow="Skills"
          title="Technical Expertise"
          description="A comprehensive overview of my technical skills and proficiency levels."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              className="card-premium"
            >
              <h3 className="heading-4 text-xl mb-6 gradient-text">{category.title}</h3>
              <div className="space-y-6">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skill.name}>
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">{skill.name}</span>
                      <span className="text-muted-foreground">{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 1,
                          delay: categoryIndex * 0.1 + skillIndex * 0.1,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="h-full rounded-full"
                        style={{
                          background: 'linear-gradient(90deg, hsl(192, 91%, 50%), hsl(280, 87%, 65%))',
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
});
