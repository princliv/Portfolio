import { memo, useRef, useState } from 'react'
import { motion, useScroll, useMotionValueEvent } from 'framer-motion'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Github, ExternalLink } from 'lucide-react'
import udyampath from '../../../public/assets/about-marquee/1.png'
import mentora from '../../../public/assets/about-marquee/13.png'

const featuredProjects = [
  {
    id: 1,
    title: 'UdyamPath',
    description: 'A platform for startups to get funding and support from the government.',
    tags: ['React', 'Firebase', 'GitHub', 'JSON', 'Canva'],
    image: udyampath,
    github: 'https://github.com/princliv/UdyAmPath',
    live: 'https://example.com',
  },
  {
    id: 2,
    title: 'Mentora',
    description: 'A mobile and web app designed to promote mental well-being and productivity with 4 core features.',
    tags: ['React', 'Firebase', 'GitHub', 'Netlify'],
    image: mentora,
    github: 'https://github.com',
    live: 'https://example.com',
  },
  {
    id: 3,
    title: 'Mobile Banking App',
    description: 'Secure fintech application with biometric authentication and instant transfers.',
    tags: ['React Native', 'Node.js', 'MongoDB', 'AWS'],
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200&fit=crop',
    github: 'https://github.com',
    live: 'https://example.com',
  },
  {
    id: 4,
    title: 'NURA Marketing Website',
    description: 'Modern marketing website with immersive visuals and smooth transitions.',
    tags: ['React', 'Framer Motion', 'Three.js', 'GSAP'],
    image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=1200&fit=crop',
    github: 'https://github.com',
    live: 'https://example.com',
  },
]

export const ProjectsSection = memo(function ProjectsSection() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ['start start', 'end end'],
  })

  // ✅ Convert scroll progress → index (smooth & stable)
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const index = Math.min(
      featuredProjects.length - 1,
      Math.floor(latest * featuredProjects.length)
    )
    setActiveIndex(index)
  })

  return (
    <section className="relative z-20 bg-background/95 backdrop-blur-xl border-t border-border/40">
      {/* Header */}
      <div className="container-custom pt-14 md:pt-22 lg:pt-30 pb-10">
        <SectionHeader
          eyebrow="Projects"
          title="Featured Work"
          description="A selection of projects that showcase my expertise in building modern, scalable applications."
        />
      </div>

      {/* Awwwards Layout */}
      <div
        ref={wrapperRef}
        className="relative grid grid-cols-1 lg:grid-cols-[30%_70%] min-h-screen"
      >
        {/* LEFT — Sticky Counter */}
        <div className="hidden lg:block">
          <div className="sticky top-0 h-screen flex items-start pt-24 pl-12">
            <motion.div
              key={activeIndex}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="text-[10rem] xl:text-[12rem] 2xl:text-[14rem] font-extrabold leading-none text-foreground/20 select-none"
            >
              {String(activeIndex + 1).padStart(2, '0')}
            </motion.div>
          </div>
        </div>

        {/* RIGHT — Natural Scroll Content */}
        <div className="px-4 md:px-8 lg:px-12 xl:px-16">
          <div className="max-w-5xl mx-auto py-[15vh] space-y-[30vh]">
            {featuredProjects.map((project) => (
              <section
                key={project.id}
                className="min-h-[80vh] flex items-center"
              >
                <div className="w-full">
                  {/* Image */}
                  <div className="relative overflow-hidden rounded-2xl mb-10 group">
                    <motion.img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-[40vh] md:h-[50vh] object-cover"
                      whileHover={{ scale: 1.04 }}
                      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />

                    <motion.div
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      className="absolute inset-0 bg-primary/90 flex items-center justify-center gap-6"
                    >
                      <motion.a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.15 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-5 rounded-full bg-background text-foreground shadow-2xl"
                      >
                        <Github className="w-6 h-6" />
                      </motion.a>

                      <motion.a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.15 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-5 rounded-full bg-background text-foreground shadow-2xl"
                      >
                        <ExternalLink className="w-6 h-6" />
                      </motion.a>
                    </motion.div>
                  </div>

                  {/* Info */}
                  <div className="space-y-6">
                    <h3 className="heading-2 text-3xl md:text-4xl lg:text-5xl">
                      {project.title}
                    </h3>

                    <p className="body-large text-muted-foreground max-w-2xl">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 pt-2">
                      {project.tags.map(tag => (
                        <span
                          key={tag}
                          className="px-4 py-2 text-sm font-medium rounded-full bg-secondary/50 text-secondary-foreground border border-border/40"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
})
