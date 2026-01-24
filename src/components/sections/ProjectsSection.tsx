import { memo } from 'react';
import { motion } from 'framer-motion';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { ArrowUpRight, Github, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

const featuredProjects = [
  {
    id: 1,
    title: 'AI Dashboard',
    description: 'Real-time analytics platform with machine learning predictions and interactive visualizations.',
    tags: ['React', 'TensorFlow', 'Node.js', 'PostgreSQL'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
    github: 'https://github.com',
    live: 'https://example.com',
  },
  {
    id: 2,
    title: 'E-Commerce Platform',
    description: 'Full-stack marketplace with payment processing, inventory management, and real-time notifications.',
    tags: ['Next.js', 'Stripe', 'Prisma', 'Redis'],
    image: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=600&fit=crop',
    github: 'https://github.com',
    live: 'https://example.com',
  },
  {
    id: 3,
    title: 'Mobile Banking App',
    description: 'Secure fintech application with biometric authentication and instant transfers.',
    tags: ['React Native', 'Node.js', 'MongoDB', 'AWS'],
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=600&fit=crop',
    github: 'https://github.com',
    live: 'https://example.com',
  },
];

export const ProjectsSection = memo(function ProjectsSection() {
  return (
    <section className="relative z-20 pt-20 md:pt-12 lg:pt-20 pb-20 md:pb-12 lg:pb-20 bg-background/95 backdrop-blur-xl border-t border-border/40 shadow-2xl">
      <div className="container-custom">
        <SectionHeader
          eyebrow="Projects"
          title="Featured Work"
          description="A selection of projects that showcase my expertise in building modern, scalable applications."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {featuredProjects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group relative overflow-hidden rounded-2xl bg-card"
            >
              {/* Project Image */}
              <div className="relative aspect-video overflow-hidden">
                <motion.img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.6 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                
                {/* Hover Overlay */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  className="absolute inset-0 bg-primary/90 flex items-center justify-center gap-4"
                >
                  <motion.a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-4 rounded-full bg-background text-foreground"
                  >
                    <Github className="w-6 h-6" />
                  </motion.a>
                  <motion.a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-4 rounded-full bg-background text-foreground"
                  >
                    <ExternalLink className="w-6 h-6" />
                  </motion.a>
                </motion.div>
              </div>

              {/* Project Info */}
              <div className="p-6">
                <h3 className="heading-4 text-xl mb-2 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-muted-foreground mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs font-medium rounded-full bg-secondary text-secondary-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12"
        >
          <Link to="/projects" className="btn-outline inline-flex items-center gap-2">
            View All Projects
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
});
