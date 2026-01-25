import { motion } from 'framer-motion';
import { Layout } from '@/components/layout/Layout';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Briefcase, Calendar, MapPin } from 'lucide-react';

const experiences = [
  {
    id: 1,
    role: 'Software Developer',
    company: 'Creditor Academy',
    location: 'Roorkee, India',
    period: 'May 2025 - Present',
    description:
      'Developing and optimizing modern frontend interfaces with a strong focus on clean UI, responsiveness, and user engagement.',
    technologies: [
      'Next.js',
      'ReactJS',
      'Node.js',
      'REST APIs',
      'AWS',
      'Figma',
      'Canva',
      'Hostinger',
      'Jira',
      'Vercel',
      'Netlify',
      'Git',
      'GitHub',
      'Clarity Analytics',
      'Google Search Console',
      'Google Analytics',
    ],
    highlights: [
      'Built and integrated REST APIs for seamless frontend–backend data flow',
      'Implemented gamification features to boost user engagement',
      'Designed responsive and visually consistent user interfaces',
    ],
  },
  {
    id: 2,
    role: 'Android Developer Intern',
    company: 'EduSkills (AICTE NEAT | Google for Developers)',
    location: 'Remote',
    period: 'Apr 2024 - Jun 2024',
    description:
      'Completed a 10-week virtual internship focused on advanced Android application development with hands-on projects.',
    technologies: ['Android Studio', 'Kotlin', 'Java', 'Firebase'],
    highlights: [
      'Designed and built efficient Android applications',
      'Strengthened expertise in Java and Kotlin',
      'Achieved an "Excellent" grade for outstanding performance',
    ],
  },
  {
    id: 3,
    role: 'Software Development Engineer Intern',
    company: 'Uma Robotics PVT Ltd.',
    location: 'Haridwar, India',
    period: 'Jan 2024 - Apr 2024',
    description:
      'Worked on software and web development for mobile robots, focusing on application enhancement and rigorous testing.',
    technologies: [
      'React Native',
      'NodeJS',
      'MongoDB',
      'Python',
      'Figma',
      'Canva',
    ],
    highlights: [
      'Enhanced mobile app for monitoring robotic systems',
      'Ensured application stability through extensive testing',
      'Highly recommended by the organization for future roles',
    ],
  },
  {
    id: 4,
    role: 'Android Developer Intern',
    company: 'Bharat Intern',
    location: 'Remote',
    period: 'Aug 2023 - Sept 2023',
    description:
      'Developed real-world Android applications while collaborating with industry professionals.',
    technologies: ['Android Studio', 'Java', 'Kotlin', 'Firebase'],
    highlights: [
      'Built a temperature unit converter application',
      'Developed an interactive quiz application',
      'Gained hands-on experience in real-world app development',
    ],
  },
  {
    id: 5,
    role: 'Cybersecurity Intern',
    company: 'IBM SkillsBuild (AICTE & Edunet Foundation)',
    location: 'Remote',
    period: 'Jun 2023 - Jul 2023',
    description:
      'Completed an intensive cybersecurity internship focused on practical security concepts and automation.',
    technologies: ['Python', 'SQL', 'Tkinter', 'Pillow'],
    highlights: [
      'Trained in core cybersecurity concepts and tools',
      'Automated cybersecurity tasks using Python',
      'Prepared to handle real-world digital security challenges',
    ],
  },
];

const Experience = () => {
  return (
    <Layout>
      <section className="pt-32 pb-12">
        <div className="container-custom">
          <SectionHeader
            eyebrow="Experience"
            title="Professional Journey"
            description="A timeline of my career growth, from junior developer to senior full-stack engineer and team lead."
          />
        </div>
      </section>

      <section className="pb-24">
        <div className="container-custom">
          <div className="relative">
            {/* Center Timeline Line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-1/2" />

            {experiences.map((exp, i) => {
              const isLeft = i % 2 === 0;

              return (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.6, delay: i * 0.08 }}
                  className="relative mb-16"
                >
                  {/* Timeline Dot (perfectly centered on line) */}
                  <span className="absolute left-4 md:left-1/2 top-6 -translate-x-1/2 z-10">
                    <span className="block w-4 h-4 rounded-full bg-primary border-4 border-background" />
                  </span>

                  {/* Card Wrapper */}
                  <div
                    className={`ml-12 md:ml-0 md:w-1/2 ${
                      isLeft
                        ? 'md:pr-12 md:mr-auto md:text-left'
                        : 'md:pl-12 md:ml-auto'
                    }`}
                  >
                    <div className="card-premium animated-border">
                      {/* Header */}
                      <div
                        className={`flex items-start gap-4 mb-4 ${
                          isLeft ? 'md:justify-start' : ''
                        }`}
                      >
                        <div className="p-3 rounded-xl bg-primary/10 text-primary shrink-0">
                          <Briefcase className="w-6 h-6" />
                        </div>
                        <div className={isLeft ? 'md:text-left' : ''}>
                          <h3 className="heading-4 text-xl">{exp.role}</h3>
                          <p className="text-primary font-medium">{exp.company}</p>
                        </div>
                      </div>

                      {/* Meta */}
                      <div
                        className={`flex flex-wrap gap-4 text-sm text-muted-foreground mb-4 ${
                          isLeft ? 'md:justify-start' : ''
                        }`}
                      >
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {exp.period}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {exp.location}
                        </span>
                      </div>

                      {/* Description */}
                      <p
                        className={`text-muted-foreground mb-4 ${
                          isLeft ? 'md:text-left' : ''
                        }`}
                      >
                        {exp.description}
                      </p>

                      {/* Highlights */}
                      <ul
                        className={`space-y-2 mb-4 ${
                          isLeft ? 'md:text-left' : ''
                        }`}
                      >
                        {exp.highlights.map((h, hi) => (
                          <li key={hi} className="text-sm">
                            • {h}
                          </li>
                        ))}
                      </ul>

                      {/* Technologies */}
                      <div
                        className={`flex flex-wrap gap-2 ${
                          isLeft ? 'md:justify-start' : ''
                        }`}
                      >
                        {exp.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 text-xs font-medium rounded-full bg-secondary text-secondary-foreground"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Experience;
