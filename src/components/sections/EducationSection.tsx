import { memo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { GraduationCap, BookOpen, Users, Award, ExternalLink, Calendar, TrendingUp } from 'lucide-react';

interface EducationItem {
  id: number;
  title: string;
  institution: string;
  period: string;
  description?: string;
  grade?: string;
  link?: string;
  tags?: string[];
}

const educationData: EducationItem[] = [
  {
    id: 1,
    title: 'Bachelor of Technology',
    institution: 'Your University Name',
    period: '2020 - 2024',
    description: 'Computer Science & Engineering with focus on software development, algorithms, and system design.',
    grade: 'CGPA: 8.5/10',
    tags: ['Computer Science', 'Software Engineering', 'Algorithms'],
  },
  {
    id: 2,
    title: 'High School Diploma',
    institution: 'Your School Name',
    period: '2018 - 2020',
    description: 'Science stream with Mathematics, Physics, Chemistry, and Computer Science.',
    grade: 'Percentage: 92%',
    tags: ['Science', 'Mathematics', 'Physics'],
  },
];

const coursesData: EducationItem[] = [
  {
    id: 1,
    title: 'Full Stack Web Development',
    institution: 'Coursera / Udemy',
    period: '2023',
    description: 'Comprehensive course covering React, Node.js, MongoDB, and deployment strategies.',
    link: 'https://example.com',
    tags: ['React', 'Node.js', 'MongoDB', 'Full Stack'],
  },
  {
    id: 2,
    title: 'Machine Learning Specialization',
    institution: 'Stanford University (Coursera)',
    period: '2022',
    description: 'Deep dive into machine learning algorithms, neural networks, and practical applications.',
    link: 'https://example.com',
    tags: ['Machine Learning', 'Neural Networks', 'Python'],
  },
  {
    id: 3,
    title: 'Cloud Computing Fundamentals',
    institution: 'AWS / Google Cloud',
    period: '2023',
    description: 'Understanding cloud infrastructure, services, and best practices for scalable applications.',
    link: 'https://example.com',
    tags: ['AWS', 'Cloud Computing', 'DevOps'],
  },
  {
    id: 4,
    title: 'UI/UX Design Principles',
    institution: 'Interaction Design Foundation',
    period: '2022',
    description: 'Mastering user-centered design, wireframing, prototyping, and design systems.',
    link: 'https://example.com',
    tags: ['UI/UX', 'Design', 'Figma'],
  },
];

const workshopsData: EducationItem[] = [
  {
    id: 1,
    title: 'React Advanced Patterns Workshop',
    institution: 'React Summit',
    period: '2024',
    description: 'Hands-on workshop on advanced React patterns, performance optimization, and state management.',
    tags: ['React', 'Performance', 'Advanced Patterns'],
  },
  {
    id: 2,
    title: 'AI & Ethics in Software Development',
    institution: 'Tech Conference',
    period: '2023',
    description: 'Exploring ethical considerations in AI development and responsible technology practices.',
    tags: ['AI Ethics', 'Responsible Tech'],
  },
  {
    id: 3,
    title: 'DevOps & CI/CD Pipeline Workshop',
    institution: 'DevOps Community',
    period: '2023',
    description: 'Practical workshop on setting up CI/CD pipelines, containerization, and automation.',
    tags: ['DevOps', 'CI/CD', 'Docker'],
  },
];

const certificationsData: EducationItem[] = [
  {
    id: 1,
    title: 'AWS Certified Solutions Architect',
    institution: 'Amazon Web Services',
    period: '2024',
    description: 'Validated expertise in designing distributed systems on AWS.',
    link: 'https://example.com',
    tags: ['AWS', 'Cloud Architecture'],
  },
  {
    id: 2,
    title: 'Google Analytics Certified',
    institution: 'Google',
    period: '2023',
    description: 'Certified in web analytics, data analysis, and performance tracking.',
    link: 'https://example.com',
    tags: ['Analytics', 'Data Analysis'],
  },
  {
    id: 3,
    title: 'Meta Front-End Developer',
    institution: 'Meta (Coursera)',
    period: '2023',
    description: 'Professional certificate in front-end development with React and modern web technologies.',
    link: 'https://example.com',
    tags: ['Frontend', 'React', 'Web Development'],
  },
  {
    id: 4,
    title: 'Cybersecurity Fundamentals',
    institution: 'IBM (Coursera)',
    period: '2023',
    description: 'Understanding security threats, vulnerabilities, and best practices for secure applications.',
    link: 'https://example.com',
    tags: ['Cybersecurity', 'Security'],
  },
  {
    id: 5,
    title: 'MongoDB Certified Developer',
    institution: 'MongoDB University',
    period: '2022',
    description: 'Expertise in MongoDB database design, querying, and optimization.',
    link: 'https://example.com',
    tags: ['MongoDB', 'Database'],
  },
];

type Category = 'education' | 'courses' | 'workshops' | 'certifications';

const categoryConfig = {
  education: {
    label: 'Education',
    icon: GraduationCap,
    data: educationData,
    gradient: 'from-blue-500/20 via-cyan-500/20 to-teal-500/20',
    borderColor: 'border-blue-500/30',
    iconColor: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
  },
  courses: {
    label: 'Courses & Specializations',
    icon: BookOpen,
    data: coursesData,
    gradient: 'from-purple-500/20 via-pink-500/20 to-rose-500/20',
    borderColor: 'border-purple-500/30',
    iconColor: 'text-purple-500',
    bgColor: 'bg-purple-500/10',
  },
  workshops: {
    label: 'Workshops',
    icon: Users,
    data: workshopsData,
    gradient: 'from-green-500/20 via-emerald-500/20 to-teal-500/20',
    borderColor: 'border-green-500/30',
    iconColor: 'text-green-500',
    bgColor: 'bg-green-500/10',
  },
  certifications: {
    label: 'Certifications',
    icon: Award,
    data: certificationsData,
    gradient: 'from-orange-500/20 via-amber-500/20 to-yellow-500/20',
    borderColor: 'border-orange-500/30',
    iconColor: 'text-orange-500',
    bgColor: 'bg-orange-500/10',
  },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export const EducationSection = memo(function EducationSection() {
  const [activeCategory, setActiveCategory] = useState<Category>('education');
  const currentConfig = categoryConfig[activeCategory];
  const currentData = currentConfig.data;

  return (
    <section className="relative z-20 bg-background/95 backdrop-blur-xl border-t border-border/40 min-h-screen">
      {/* Header */}
      <div className="container-custom pt-24 md:pt-32 lg:pt-40 pb-16">
        <SectionHeader
          eyebrow="Education & Learning"
          title="Continuous Growth & Development"
          description="A journey of formal education, specialized courses, hands-on workshops, and industry-recognized certifications that shape my expertise."
        />
      </div>

      {/* Main Content Area */}
      <div className="container-custom pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 lg:gap-12">
          {/* Sidebar - Category Navigation & Stats */}
          <aside className="lg:sticky lg:top-24 h-fit">
            <div className="space-y-6">
              {/* Category Selector */}
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                  Categories
                </h3>
                {(Object.keys(categoryConfig) as Category[]).map((category) => {
                  const config = categoryConfig[category];
                  const Icon = config.icon;
                  const isActive = activeCategory === category;

                  return (
                    <motion.button
                      key={category}
                      onClick={() => setActiveCategory(category)}
                      className={`
                        w-full group relative flex items-center gap-3 px-4 py-3 rounded-xl
                        font-medium text-sm transition-all duration-300
                        ${isActive
                          ? `${config.bgColor} ${config.borderColor} border-2 text-foreground`
                          : 'bg-secondary/30 border-2 border-transparent text-muted-foreground hover:bg-secondary/50 hover:text-foreground'
                        }
                      `}
                      whileHover={{ x: 4 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Icon className={`w-5 h-5 ${isActive ? config.iconColor : ''}`} />
                      <span className="flex-1 text-left">{config.label}</span>
                      {isActive && (
                        <motion.div
                          layoutId="activeCategory"
                          className={`absolute inset-0 rounded-xl ${config.bgColor} ${config.borderColor} border-2`}
                          initial={false}
                          transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                        />
                      )}
                      <span className={`text-xs px-2 py-0.5 rounded-full ${isActive ? 'bg-background/50' : 'bg-secondary'}`}>
                        {config.data.length}
                      </span>
                    </motion.button>
                  );
                })}
              </div>

              {/* Stats Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className={`
                  relative overflow-hidden rounded-2xl p-6
                  border-2 ${currentConfig.borderColor}
                  bg-gradient-to-br ${currentConfig.gradient}
                  backdrop-blur-sm
                `}
              >
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`p-2 rounded-lg ${currentConfig.bgColor}`}>
                      <TrendingUp className={`w-5 h-5 ${currentConfig.iconColor}`} />
                    </div>
                    <h4 className="font-semibold">Total Achievements</h4>
                  </div>
                  <div className="space-y-3">
                    {Object.entries(categoryConfig).map(([key, config]) => (
                      <div key={key} className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">{config.label}</span>
                        <span className="font-bold">{config.data.length}</span>
                      </div>
                    ))}
                    <div className="pt-3 border-t border-border/40">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold">Total</span>
                        <span className="text-2xl font-bold">
                          {Object.values(categoryConfig).reduce((sum, config) => sum + config.data.length, 0)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </aside>

          {/* Main Grid Content */}
          <div className="flex-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                {currentData.map((item, index) => {
                  // Alternate card sizes for visual interest
                  const isLarge = index % 3 === 0;
                  
                  return (
                    <motion.div
                      key={item.id}
                      variants={itemVariants}
                      className={isLarge ? 'md:col-span-2' : ''}
                    >
                      <motion.div
                        className={`
                          group relative h-full rounded-2xl
                          border-2 ${currentConfig.borderColor}
                          bg-background/70 backdrop-blur-xl
                          p-6 md:p-8
                          overflow-hidden
                          transition-all duration-500
                          hover:shadow-2xl hover:-translate-y-2
                        `}
                        whileHover={{ scale: 1.02 }}
                      >
                        {/* Gradient Background on Hover */}
                        <div className={`
                          absolute inset-0 opacity-0 group-hover:opacity-100
                          bg-gradient-to-br ${currentConfig.gradient}
                          transition-opacity duration-500
                          pointer-events-none
                        `} />

                        {/* Content */}
                        <div className="relative z-10">
                          {/* Header */}
                          <div className="flex items-start justify-between gap-4 mb-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-3">
                                <div className={`p-2 rounded-lg ${currentConfig.bgColor}`}>
                                  <currentConfig.icon className={`w-4 h-4 ${currentConfig.iconColor}`} />
                                </div>
                                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                  {currentConfig.label}
                                </span>
                              </div>
                              <h3 className={`
                                font-bold mb-2
                                ${isLarge ? 'text-2xl md:text-3xl' : 'text-xl md:text-2xl'}
                              `}>
                                {item.title}
                              </h3>
                              <p className="text-sm font-medium text-muted-foreground">
                                {item.institution}
                              </p>
                            </div>

                            {item.link && (
                              <motion.a
                                href={item.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`
                                  shrink-0 p-3 rounded-xl
                                  ${currentConfig.bgColor} ${currentConfig.iconColor}
                                  hover:scale-110 transition-transform duration-300
                                `}
                                whileHover={{ rotate: 45 }}
                                whileTap={{ scale: 0.9 }}
                              >
                                <ExternalLink className="w-4 h-4" />
                              </motion.a>
                            )}
                          </div>

                          {/* Period & Grade */}
                          <div className="flex flex-wrap items-center gap-3 mb-4 text-sm">
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <Calendar className="w-4 h-4" />
                              <span>{item.period}</span>
                            </div>
                            {item.grade && (
                              <span className={`
                                px-3 py-1 rounded-full font-medium
                                ${currentConfig.bgColor} ${currentConfig.iconColor}
                              `}>
                                {item.grade}
                              </span>
                            )}
                          </div>

                          {/* Description */}
                          {item.description && (
                            <p className={`
                              text-muted-foreground mb-5 leading-relaxed
                              ${isLarge ? 'text-base' : 'text-sm'}
                            `}>
                              {item.description}
                            </p>
                          )}

                          {/* Tags */}
                          {item.tags && item.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 pt-4 border-t border-border/40">
                              {item.tags.map((tag) => (
                                <span
                                  key={tag}
                                  className="px-3 py-1 text-xs font-medium rounded-full bg-secondary/50 text-secondary-foreground border border-border/40"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Decorative Corner Element */}
                        <div className={`
                          absolute top-0 right-0 w-32 h-32
                          bg-gradient-to-br ${currentConfig.gradient}
                          opacity-0 group-hover:opacity-20
                          transition-opacity duration-500
                          rounded-bl-full
                          pointer-events-none
                        `} />
                      </motion.div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
});
