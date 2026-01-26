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
    title: 'B.Tech (Hons.) in Computer Science & Engineering',
    institution: 'Uttarakhand Technical University',
    period: '2021 - 2025',
    description: 'Computer Science & Engineering with focus on software development, algorithms, and system design.',
    grade: 'CGPA: 8.5/10',
    tags: ['Computer Science', 'Software Engineering', 'Algorithms', 'Data Structures', 'Database Management System', 'Operating System', 'Computer Networks', 'Computer Architecture'],
  },
  {
    id: 2,
    title: 'Intermediate',
    institution: 'Kendriya Vidyalaya Danapur Cantt, Patna',
    period: '2018 - 2020',
    description: 'Science stream with Mathematics, Physics, Chemistry, and Computer Science.',
    grade: 'Percentage: 81%',
    tags: ['Mathematics', 'Physics', 'Chemistry', 'English', 'Hindi', 'Computer Science'],
  },
  {
    id: 3,
    title: 'Secondary School',
    institution: 'Kendriya Vidyalaya Danapur Cantt, Patna',
    period: '2016 - 2018',
    description: 'Secondary School with Mathematics, Science, and Social Studies.',
    grade: 'Percentage: 81%',
    tags: ['Mathematics', 'Science', 'Social Studies', 'English', 'Hindi'],
  },
];

const coursesData: EducationItem[] = [
  {
    id: 1,
    title: 'Google AI Essentials',
    institution: 'Coursera',
    period: 'February 2025',
    description: 'Comprehensive course covering AI, Machine Learning, and Deep Learning with Google AI.',
    link: 'https://example.com',
    tags: ['AI', 'Machine Learning', 'Deep Learning', 'Google AI'],
  },
  {
    id: 2,
    title: 'AWS Cloud Technical Essentials',
    institution: 'Coursera',
    period: 'February 2025',
    description: 'Comprehensive course covering AWS Cloud Technical Essentials, covering AWS services, and AWS architecture.',
    link: 'https://example.com',
    tags: ['AWS', 'Cloud Computing', 'AWS Services', 'AWS Architecture', 'AWS Cloud', 'AWS Cloud Computing'],
  },
  {
    id: 3,
    title: 'Google Data Analytics',
    institution: 'Coursera',
    period: 'November 2024',
    description: 'Comprehensive specialization covering Google Data Analytics, covering Google Data Analytics tools, and Google Data Analytics architecture.',
    link: 'https://example.com',
    tags: ['Google Data Analytics', 'Data Analytics', 'Google Data Analytics', 'Google Data Analytics Tools', 'Google Data Analytics Architecture', 'R Programming', 'Python', 'SQL'],
  },
  {
    id: 4,
    title: 'Google Cybersecurity',
    institution: 'Coursera',
    period: 'September 2024',
    description: 'Comprehensive specialization covering Google Cybersecurity, covering Google Cybersecurity tools, and Google Cybersecurity architecture.',
    link: 'https://example.com',
    tags: ['Google Cybersecurity', 'Cybersecurity', 'Google Cybersecurity', 'Google Cybersecurity Tools', 'Google Cybersecurity Architecture', 'Linux', 'SQL'],
  },
  {
    id: 5,
    title: 'Industry Certification Program in Information Technology',
    institution: 'L&T EduTech',
    period: 'April 2024 - July 2024',
    description: 'A 10-week offline course on Information Technology, covering HTML, CSS, JavaScript, and React. I have also learned about Data Structures and Algorithms, and Spring Boot.',
    link: 'https://example.com',
    tags: ['Information Technology', 'HTML', 'CSS', 'JavaScript', 'React', 'Bootstrap', 'MySQL', 'PHP', 'Java', 'C++', 'C', 'DSA', 'Data Structures', 'Algorithms', 'Spring Boot', 'Aptitude', 'Reasoning', 'Communication Skills', 'Logical Reasoning', 'Programming', 'Writing Skills'],
  },
  {
    id: 7,
    title: 'Web Development',
    institution: 'Internshala',
    period: 'July 2022 - September 2022',
    description: 'A 3 months training on Web Development, covering HTML, CSS, JavaScript, and React with online projects.',
    link: 'https://example.com',
    tags: ['Web Development', 'HTML', 'CSS', 'JavaScript', 'React', 'Bootstrap', 'MySQL', 'PHP'],
  },
  {
    id: 6,
    title: 'Web Technology',
    institution: 'Smart Brains',
    period: 'January 2022',
    description: 'A 10-week online course on Web Technology, covering HTML, CSS, JavaScript, and React.',
    link: 'https://example.com',
    tags: ['HTML', 'CSS', 'JavaScript', 'React', 'Bootstrap', 'MySQL', 'PHP'],
  }
];

const workshopsData: EducationItem[] = [
  {
    id: 1,
    title: 'Cloud Technical Series - Learn. Build. Grow',
    institution: 'Google Cloud',
    period: 'April 2025',
    description: 'Hands-on workshop on Cloud Computing and Cloud Platforms.',
    tags: ['Cloud Computing', 'Cloud Platforms', 'Google Cloud'],
  },
  {
    id: 2,
    title: 'AI Day for Startups',
    institution: 'Google',
    period: 'March 2024',
    description: 'A day-long event focused on AI for startups, featuring talks, workshops, and networking opportunities.',
    tags: ['AI', 'AI for Startups', 'Google', 'Cloud Computing'],
  },
  {
    id: 3,
    title: 'Innovative Design: Ideation to Realization',
    institution: 'IIT Roorkee',
    period: 'May 2023',
    description: 'A workshop on innovative design, featuring talks, workshops, and networking opportunities.',
    tags: ['Design', 'Innovative Design', 'DIC'],
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
