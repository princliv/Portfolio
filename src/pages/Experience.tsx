import { motion } from 'framer-motion';
import { Layout } from '@/components/layout/Layout';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Briefcase, Calendar, MapPin } from 'lucide-react';
import experienceData from '@/data/experience.json';

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

            {experienceData.items.map((exp, i) => {
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
                        <div className="w-14 h-14 rounded-xl bg-muted/50 border border-border flex items-center justify-center shrink-0 overflow-hidden">
                          {exp.logo ? (
                            <img
                              src={`/assets/logo/${exp.logo}`}
                              alt={exp.company}
                              className="w-9 h-9 object-contain"
                            />
                          ) : (
                            <Briefcase className="w-6 h-6 text-primary" />
                          )}
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
