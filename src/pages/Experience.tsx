import { motion } from 'framer-motion';
import { Layout } from '@/components/layout/Layout';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Briefcase, Calendar, MapPin, ExternalLink } from 'lucide-react';

const experiences = [
  {
    id: 1,
    role: 'Senior Full-Stack Developer',
    company: 'Tech Innovators Inc.',
    location: 'San Francisco, CA',
    period: '2022 - Present',
    description: 'Leading development of enterprise-scale applications using React, Node.js, and AWS. Managing a team of 5 developers and architecting solutions for Fortune 500 clients.',
    technologies: ['React', 'Node.js', 'TypeScript', 'AWS', 'PostgreSQL', 'GraphQL'],
    highlights: [
      'Reduced application load time by 40% through performance optimization',
      'Led migration of legacy systems to modern microservices architecture',
      'Implemented CI/CD pipelines reducing deployment time by 60%',
    ],
  },
  {
    id: 2,
    role: 'Full-Stack Developer',
    company: 'Digital Solutions Co.',
    location: 'New York, NY',
    period: '2020 - 2022',
    description: 'Developed and maintained multiple web applications for diverse clients across fintech, healthcare, and e-commerce industries.',
    technologies: ['React', 'Python', 'Django', 'MongoDB', 'Docker', 'Redis'],
    highlights: [
      'Built real-time trading platform handling 10,000+ concurrent users',
      'Developed HIPAA-compliant healthcare data management system',
      'Mentored junior developers and conducted code reviews',
    ],
  },
  {
    id: 3,
    role: 'Frontend Developer',
    company: 'Creative Agency',
    location: 'Los Angeles, CA',
    period: '2019 - 2020',
    description: 'Created responsive, accessible web experiences for brands and startups. Focused on animation, interactivity, and performance.',
    technologies: ['React', 'Vue.js', 'GSAP', 'Three.js', 'Sass', 'Webpack'],
    highlights: [
      'Designed and developed award-winning interactive websites',
      'Improved accessibility scores from 60% to 98% across all projects',
      'Established component library used across 15+ projects',
    ],
  },
  {
    id: 4,
    role: 'Junior Developer',
    company: 'StartUp Hub',
    location: 'Remote',
    period: '2018 - 2019',
    description: 'Started career building MVPs for early-stage startups. Learned agile methodologies and rapid prototyping.',
    technologies: ['JavaScript', 'React', 'Node.js', 'Firebase', 'CSS'],
    highlights: [
      'Shipped 8 MVPs in 12 months',
      'Gained expertise in rapid prototyping and user testing',
      'Contributed to open-source projects',
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
            {/* Timeline Line */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" />

            {experiences.map((exp, i) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className={`relative mb-12 md:mb-16 ${
                  i % 2 === 0 ? 'md:pr-[50%] md:text-right' : 'md:pl-[50%] md:ml-auto'
                }`}
              >
                {/* Timeline Dot */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                  className={`absolute top-0 w-4 h-4 rounded-full bg-primary border-4 border-background z-10 ${
                    i % 2 === 0 ? 'left-0 md:left-1/2 md:-translate-x-1/2' : 'left-0 md:left-1/2 md:-translate-x-1/2'
                  }`}
                />

                {/* Content Card */}
                <div className={`ml-8 md:ml-0 ${i % 2 === 0 ? 'md:mr-12' : 'md:ml-12'}`}>
                  <div className="card-premium animated-border">
                    {/* Header */}
                    <div className={`flex flex-wrap items-start gap-4 mb-4 ${i % 2 === 0 ? 'md:justify-end' : ''}`}>
                      <div className="p-3 rounded-xl bg-primary/10 text-primary">
                        <Briefcase className="w-6 h-6" />
                      </div>
                      <div className={i % 2 === 0 ? 'md:text-right' : ''}>
                        <h3 className="heading-4 text-xl">{exp.role}</h3>
                        <p className="text-primary font-medium">{exp.company}</p>
                      </div>
                    </div>

                    {/* Meta */}
                    <div className={`flex flex-wrap gap-4 text-sm text-muted-foreground mb-4 ${i % 2 === 0 ? 'md:justify-end' : ''}`}>
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
                    <p className={`text-muted-foreground mb-4 ${i % 2 === 0 ? 'md:text-right' : ''}`}>
                      {exp.description}
                    </p>

                    {/* Highlights */}
                    <ul className={`space-y-2 mb-4 ${i % 2 === 0 ? 'md:text-right' : ''}`}>
                      {exp.highlights.map((highlight, hi) => (
                        <li key={hi} className="text-sm text-foreground">
                          • {highlight}
                        </li>
                      ))}
                    </ul>

                    {/* Technologies */}
                    <div className={`flex flex-wrap gap-2 ${i % 2 === 0 ? 'md:justify-end' : ''}`}>
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
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Experience;
