import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layout } from '@/components/layout/Layout';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Github, ExternalLink, X } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: 'AI Dashboard Pro',
    description: 'Real-time analytics platform with machine learning predictions and interactive visualizations.',
    longDescription: 'A comprehensive analytics dashboard that leverages machine learning to provide predictive insights. Features real-time data streaming, interactive charts, and customizable widgets. Built for enterprise scale with role-based access control.',
    tags: ['React', 'TensorFlow', 'Node.js', 'PostgreSQL', 'WebSocket'],
    category: 'AI',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
    github: 'https://github.com',
    live: 'https://example.com',
    year: '2024',
  },
  {
    id: 2,
    title: 'E-Commerce Platform',
    description: 'Full-stack marketplace with payment processing, inventory management, and real-time notifications.',
    longDescription: 'A modern e-commerce solution supporting multiple vendors, real-time inventory tracking, and seamless payment integration with Stripe. Includes admin dashboard, analytics, and automated marketing tools.',
    tags: ['Next.js', 'Stripe', 'Prisma', 'Redis', 'AWS'],
    category: 'Full-Stack',
    image: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=600&fit=crop',
    github: 'https://github.com',
    live: 'https://example.com',
    year: '2023',
  },
  {
    id: 3,
    title: 'Mobile Banking App',
    description: 'Secure fintech application with biometric authentication and instant transfers.',
    longDescription: 'A banking application built with security as the primary focus. Features biometric login, real-time fraud detection, and instant peer-to-peer transfers. Compliant with financial regulations.',
    tags: ['React Native', 'Node.js', 'MongoDB', 'AWS', 'Plaid'],
    category: 'Mobile',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=600&fit=crop',
    github: 'https://github.com',
    live: 'https://example.com',
    year: '2023',
  },
  {
    id: 4,
    title: 'Healthcare Portal',
    description: 'HIPAA-compliant patient management system with telemedicine capabilities.',
    longDescription: 'A comprehensive healthcare management platform enabling secure patient-doctor communication, appointment scheduling, and electronic health records. Includes video consultation features.',
    tags: ['React', 'Python', 'Django', 'PostgreSQL', 'WebRTC'],
    category: 'Full-Stack',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop',
    github: 'https://github.com',
    live: 'https://example.com',
    year: '2022',
  },
  {
    id: 5,
    title: 'Smart Home IoT',
    description: 'IoT platform for smart home device management with voice control integration.',
    longDescription: 'An IoT ecosystem connecting various smart home devices with centralized control. Features voice commands via Alexa/Google Home, automation rules, and energy usage analytics.',
    tags: ['React', 'Node.js', 'MQTT', 'Raspberry Pi', 'AWS IoT'],
    category: 'IoT',
    image: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=800&h=600&fit=crop',
    github: 'https://github.com',
    live: 'https://example.com',
    year: '2022',
  },
  {
    id: 6,
    title: 'Social Media Analytics',
    description: 'Real-time social media monitoring and sentiment analysis tool.',
    longDescription: 'A social media intelligence platform that tracks brand mentions, analyzes sentiment, and provides actionable insights. Uses NLP for sentiment analysis and supports multiple platforms.',
    tags: ['React', 'Python', 'FastAPI', 'NLP', 'Redis'],
    category: 'AI',
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=600&fit=crop',
    github: 'https://github.com',
    live: 'https://example.com',
    year: '2021',
  },
];

const categories = ['All', 'AI', 'Full-Stack', 'Mobile', 'IoT'];

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter(p => p.category === activeCategory);

  return (
    <Layout>
      <section className="pt-32 pb-12">
        <div className="container-custom">
          <SectionHeader
            eyebrow="Projects"
            title="Featured Work"
            description="A curated selection of projects showcasing my expertise across different domains and technologies."
          />

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setActiveCategory(category)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                  activeCategory === category
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary hover:bg-secondary/80 text-secondary-foreground'
                }`}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-24">
        <div className="container-custom">
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => setSelectedProject(project)}
                  className="group cursor-pointer"
                >
                  <div className="relative overflow-hidden rounded-2xl bg-card animated-border">
                    <div className="relative aspect-video overflow-hidden">
                      <motion.img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.6 }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                      <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-background/80 backdrop-blur-sm text-xs font-medium">
                        {project.year}
                      </div>
                    </div>
                    <div className="p-6">
                      <span className="text-xs font-medium text-primary uppercase tracking-wider">
                        {project.category}
                      </span>
                      <h3 className="heading-4 text-xl mt-2 mb-2 group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 text-xs rounded-md bg-secondary text-secondary-foreground"
                          >
                            {tag}
                          </span>
                        ))}
                        {project.tags.length > 3 && (
                          <span className="px-2 py-1 text-xs rounded-md bg-secondary text-secondary-foreground">
                            +{project.tags.length - 3}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-xl"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-card rounded-3xl shadow-2xl"
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="w-full aspect-video object-cover rounded-t-3xl"
              />

              <div className="p-8">
                <span className="text-sm font-medium text-primary uppercase tracking-wider">
                  {selectedProject.category} • {selectedProject.year}
                </span>
                <h2 className="heading-3 mt-2 mb-4">{selectedProject.title}</h2>
                <p className="text-muted-foreground mb-6">{selectedProject.longDescription}</p>

                <div className="flex flex-wrap gap-2 mb-8">
                  {selectedProject.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-sm rounded-full bg-secondary text-secondary-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4">
                  <a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline flex items-center gap-2"
                  >
                    <Github className="w-5 h-5" />
                    View Code
                  </a>
                  <a
                    href={selectedProject.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary flex items-center gap-2"
                  >
                    <ExternalLink className="w-5 h-5" />
                    Live Demo
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
};

export default Projects;
