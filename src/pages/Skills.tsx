import { motion } from 'framer-motion';
import { Layout } from '@/components/layout/Layout';
import { SectionHeader } from '@/components/ui/SectionHeader';

const skillCategories = [
  {
    title: 'Frontend Development',
    description: 'Building beautiful, responsive, and performant user interfaces',
    skills: [
      { name: 'React', level: 95, icon: '⚛️' },
      { name: 'TypeScript', level: 92, icon: '📘' },
      { name: 'Next.js', level: 88, icon: '▲' },
      { name: 'Tailwind CSS', level: 94, icon: '🎨' },
      { name: 'Framer Motion', level: 85, icon: '✨' },
      { name: 'Three.js', level: 75, icon: '🎮' },
    ],
  },
  {
    title: 'Backend Development',
    description: 'Creating scalable and secure server-side applications',
    skills: [
      { name: 'Node.js', level: 90, icon: '🟢' },
      { name: 'Python', level: 85, icon: '🐍' },
      { name: 'PostgreSQL', level: 88, icon: '🐘' },
      { name: 'GraphQL', level: 82, icon: '◈' },
      { name: 'Redis', level: 78, icon: '🔴' },
      { name: 'Docker', level: 85, icon: '🐳' },
    ],
  },
  {
    title: 'AI & Machine Learning',
    description: 'Implementing intelligent solutions with cutting-edge ML',
    skills: [
      { name: 'TensorFlow', level: 80, icon: '🧠' },
      { name: 'PyTorch', level: 75, icon: '🔥' },
      { name: 'OpenAI API', level: 88, icon: '🤖' },
      { name: 'LangChain', level: 78, icon: '🔗' },
      { name: 'Scikit-learn', level: 82, icon: '📊' },
      { name: 'Computer Vision', level: 72, icon: '👁️' },
    ],
  },
  {
    title: 'Mobile Development',
    description: 'Crafting native-like mobile experiences',
    skills: [
      { name: 'React Native', level: 85, icon: '📱' },
      { name: 'Expo', level: 82, icon: '🚀' },
      { name: 'Flutter', level: 65, icon: '🦋' },
      { name: 'iOS/Swift', level: 60, icon: '🍎' },
    ],
  },
  {
    title: 'DevOps & Cloud',
    description: 'Managing infrastructure and deployments',
    skills: [
      { name: 'AWS', level: 82, icon: '☁️' },
      { name: 'Vercel', level: 90, icon: '▲' },
      { name: 'GitHub Actions', level: 88, icon: '⚡' },
      { name: 'Kubernetes', level: 70, icon: '☸️' },
    ],
  },
  {
    title: 'Tools & Design',
    description: 'Design and collaboration essentials',
    skills: [
      { name: 'Git', level: 95, icon: '📚' },
      { name: 'Figma', level: 80, icon: '🎨' },
      { name: 'VS Code', level: 95, icon: '💻' },
      { name: 'Notion', level: 88, icon: '📝' },
    ],
  },
];

const Skills = () => {
  return (
    <Layout>
      <section className="pt-32 pb-12">
        <div className="container-custom">
          <SectionHeader
            eyebrow="Skills"
            title="Technical Arsenal"
            description="A comprehensive breakdown of my technical expertise across various domains and technologies."
          />
        </div>
      </section>

      <section className="pb-24">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {skillCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
                className="card-premium"
              >
                <div className="mb-6">
                  <h3 className="heading-4 text-xl gradient-text mb-2">{category.title}</h3>
                  <p className="text-sm text-muted-foreground">{category.description}</p>
                </div>

                <div className="space-y-5">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skill.name}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{skill.icon}</span>
                          <span className="font-medium">{skill.name}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">{skill.level}%</span>
                      </div>
                      <div className="relative h-2 bg-secondary rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 1,
                            delay: categoryIndex * 0.1 + skillIndex * 0.05,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          className="absolute inset-y-0 left-0 rounded-full"
                          style={{
                            background: `linear-gradient(90deg, 
                              hsl(192, 91%, 50%) 0%, 
                              hsl(${192 + skill.level * 0.9}, 87%, 55%) 100%)`,
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
    </Layout>
  );
};

export default Skills;
