import { memo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { GraduationCap, BookOpen, Users, Award, ExternalLink, Calendar, TrendingUp } from 'lucide-react';
import educationDataJson from '@/data/education.json';

interface EducationItem {
  id: number;
  title: string;
  branch?: string;                 // ✅ NEW
  institution: string;
  institutionLogo?: string;        // ✅ NEW
  period: string;
  description?: string;
  grade?: string;
  link?: string;
  tags?: string[];
}

const educationData: EducationItem[] = educationDataJson.education as EducationItem[];

const coursesData: EducationItem[] = [
  {
    id: 1,
    title: 'Google AI Essentials',
    institution: 'Coursera',
    institutionLogo: 'https://www.vectorlogo.zone/logos/google/google-icon.svg',
    period: 'February 2025',
    description: 'Comprehensive course covering AI, Machine Learning, and Deep Learning with Google AI.',
    link: 'https://example.com',
    tags: ['AI', 'Machine Learning', 'Deep Learning', 'Google AI'],
  },
  {
    id: 2,
    title: 'AWS Cloud Technical Essentials',
    institution: 'Coursera',
    institutionLogo: 'https://www.vectorlogo.zone/logos/google/google-icon.svg',
    period: 'February 2025',
    description: 'Comprehensive course covering AWS Cloud Technical Essentials, covering AWS services, and AWS architecture.',
    link: 'https://example.com',
    tags: ['AWS', 'Cloud Computing', 'AWS Services', 'AWS Architecture', 'AWS Cloud', 'AWS Cloud Computing'],
  },
  {
    id: 3,
    title: 'Google Data Analytics',
    institution: 'Coursera',
    institutionLogo: 'https://www.vectorlogo.zone/logos/google/google-icon.svg',
    period: 'November 2024',
    description: 'Comprehensive specialization covering Google Data Analytics, covering Google Data Analytics tools, and Google Data Analytics architecture.',
    link: 'https://example.com',
    tags: ['Google Data Analytics', 'Data Analytics', 'Google Data Analytics', 'Google Data Analytics Tools', 'Google Data Analytics Architecture', 'R Programming', 'Python', 'SQL'],
  },
  {
    id: 4,
    title: 'Google Cybersecurity',
    institution: 'Coursera',
    institutionLogo: 'https://www.vectorlogo.zone/logos/google/google-icon.svg',
    period: 'September 2024',
    description: 'Comprehensive specialization covering Google Cybersecurity, covering Google Cybersecurity tools, and Google Cybersecurity architecture.',
    link: 'https://example.com',
    tags: ['Google Cybersecurity', 'Cybersecurity', 'Google Cybersecurity', 'Google Cybersecurity Tools', 'Google Cybersecurity Architecture', 'Linux', 'SQL'],
  },
  {
    id: 5,
    title: 'Industry Certification Program in Information Technology',
    institution: 'L&T EduTech',
    institutionLogo: 'https://www.vectorlogo.zone/logos/l&tedutech/l&tedutech-icon.svg',
    period: 'April 2024 - July 2024',
    description: 'A 10-week offline course on Information Technology, covering HTML, CSS, JavaScript, and React. I have also learned about Data Structures and Algorithms, and Spring Boot.',
    link: 'https://example.com',
    tags: ['Information Technology', 'HTML', 'CSS', 'JavaScript', 'React', 'Bootstrap', 'MySQL', 'PHP', 'Java', 'C++', 'C', 'DSA', 'Data Structures', 'Algorithms', 'Spring Boot', 'Aptitude', 'Reasoning', 'Communication Skills', 'Logical Reasoning', 'Programming', 'Writing Skills'],
  },
  {
    id: 7,
    title: 'Web Development',
    institution: 'Internshala',
    institutionLogo: 'https://www.vectorlogo.zone/logos/internshala/internshala-icon.svg',
    period: 'July 2022 - September 2022',
    description: 'A 3 months training on Web Development, covering HTML, CSS, JavaScript, and React with online projects.',
    link: 'https://example.com',
    tags: ['Web Development', 'HTML', 'CSS', 'JavaScript', 'React', 'Bootstrap', 'MySQL', 'PHP'],
  },
  {
    id: 6,
    title: 'Web Technology',
    institution: 'Smart Brains',
    institutionLogo: 'https://www.vectorlogo.zone/logos/smartbrains/smartbrains-icon.svg',
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
    institutionLogo: 'https://www.vectorlogo.zone/logos/google/google-icon.svg',
    period: 'April 2025',
    description: 'Hands-on workshop on Cloud Computing and Cloud Platforms.',
    tags: ['Cloud Computing', 'Cloud Platforms', 'Google Cloud'],
  },
  {
    id: 2,
    title: 'AI Day for Startups',
    institution: 'Google',
    institutionLogo: 'https://www.vectorlogo.zone/logos/google/google-icon.svg',
    period: 'March 2024',
    description: 'A day-long event focused on AI for startups, featuring talks, workshops, and networking opportunities.',
    tags: ['AI', 'AI for Startups', 'Google', 'Cloud Computing'],
  },
  {
    id: 3,
    title: 'Innovative Design: Ideation to Realization',
    institution: 'IIT Roorkee',
    institutionLogo: 'https://www.vectorlogo.zone/logos/iitroorkee/iitroorkee-icon.svg',
    period: 'May 2023',
    description: 'A workshop on innovative design, featuring talks, workshops, and networking opportunities.',
    tags: ['Design', 'Innovative Design', 'DIC'],
  },
];

const certificationsData: EducationItem[] = [
  {
    id: 1,
    title: 'Alteryx Foundation',
    institution: 'Alteryx',
    institutionLogo: 'https://www.vectorlogo.zone/logos/alteryx/alteryx-icon.svg',
    period: '7 days',
    description: 'Foundation-level training in data analytics using Alteryx.',
    link: 'https://example.com',
    tags: ['Alteryx', 'Data Analytics'],
  },
  {
    id: 2,
    title: 'AWS Certified Security – Specialty',
    institution: 'Cybrary',
    institutionLogo: 'https://www.vectorlogo.zone/logos/cybrary/cybrary-icon.svg',
    period: '7 days',
    description: 'Specialized training in securing AWS workloads and infrastructure.',
    link: 'https://example.com',
    tags: ['AWS', 'Cloud Security'],
  },
  {
    id: 3,
    title: 'L&T Industry Certification Program',
    institution: 'L&T EduTech',
    period: '120 days',
    description: 'Industry-oriented technical training program.',
    link: 'https://example.com',
    tags: ['Industry Training'],
  },
  {
    id: 4,
    title: 'Android Developer Internship',
    institution: 'Google for Developers',
    institutionLogo: 'https://www.vectorlogo.zone/logos/google/google-icon.svg',
    period: '90 days',
    description: 'Hands-on internship focused on Android application development.',
    link: 'https://example.com',
    tags: ['Android', 'Mobile Development'],
  },
  {
    id: 5,
    title: 'NSE 3 Network Security Associate',
    institution: 'Fortinet',
    period: '90 days',
    description: 'Certification covering core network security concepts.',
    link: 'https://example.com',
    tags: ['Network Security', 'Fortinet'],
  },
  {
    id: 6,
    title: 'Web Development Training',
    institution: 'Internshala',
    period: '56 days',
    description: 'Comprehensive training in frontend and backend web development.',
    link: 'https://example.com',
    tags: ['Web Development'],
  },
  {
    id: 7,
    title: 'Cybersecurity Internship',
    institution: 'IBM SkillsBuild',
    institutionLogo: 'https://www.vectorlogo.zone/logos/ibm/ibm-icon.svg',
    period: '42 days',
    description: 'Practical exposure to cybersecurity fundamentals and tools.',
    link: 'https://example.com',
    tags: ['Cybersecurity'],
  },
  {
    id: 8,
    title: 'Placement Preparation Training',
    institution: 'Offline',
    period: '90 days',
    description: 'Aptitude, technical, and interview preparation program.',
    link: 'https://example.com',
    tags: ['Placement', 'Career'],
  },
  {
    id: 9,
    title: 'Fundamentals of Cybersecurity',
    institution: 'Coursera',
    institutionLogo: 'https://www.vectorlogo.zone/logos/coursera/coursera-icon.svg',
    period: '30 days',
    description: 'Introduction to cybersecurity concepts and practices.',
    link: 'https://example.com',
    tags: ['Cybersecurity'],
  },
  {
    id: 10,
    title: 'Play It Safe: Manage Security Risks',
    institution: 'Coursera',
    institutionLogo: 'https://www.vectorlogo.zone/logos/coursera/coursera-icon.svg',
    period: '30 days',
    description: 'Risk management and security control strategies.',
    link: 'https://example.com',
    tags: ['Security', 'Risk Management'],
  },
  {
    id: 11,
    title: 'Connect and Protect: Networks and Network Security',
    institution: 'Coursera',
    institutionLogo: 'https://www.vectorlogo.zone/logos/coursera/coursera-icon.svg',
    period: '30 days',
    description: 'Networking fundamentals with a focus on security.',
    link: 'https://example.com',
    tags: ['Networking', 'Security'],
  },
  {
    id: 12,
    title: 'Tools of the Trade: Linux and SQL',
    institution: 'Coursera',
    institutionLogo: 'https://www.vectorlogo.zone/logos/coursera/coursera-icon.svg',
    period: '30 days',
    description: 'Practical skills in Linux and SQL for security roles.',
    link: 'https://example.com',
    tags: ['Linux', 'SQL'],
  },
  {
    id: 13,
    title: 'Sound the Alarm: Detection and Response',
    institution: 'Coursera',
    institutionLogo: 'https://www.vectorlogo.zone/logos/coursera/coursera-icon.svg',
    period: '30 days',
    description: 'Threat detection and incident response fundamentals.',
    link: 'https://example.com',
    tags: ['Incident Response'],
  },
  {
    id: 14,
    title: 'Put It to Work: Prepare for Cybersecurity Jobs',
    institution: 'Coursera',
    institutionLogo: 'https://www.vectorlogo.zone/logos/coursera/coursera-icon.svg',
    period: '30 days',
    description: 'Job readiness and applied cybersecurity skills.',
    link: 'https://example.com',
    tags: ['Cybersecurity', 'Career'],
  },
  {
    id: 15,
    title: 'Assets, Threats, and Vulnerabilities',
    institution: 'Coursera',
    institutionLogo: 'https://www.vectorlogo.zone/logos/coursera/coursera-icon.svg',
    period: '30 days',
    description: 'Core concepts of threats, assets, and vulnerabilities.',
    link: 'https://example.com',
    tags: ['Security Fundamentals'],
  },
  {
    id: 16,
    title: 'Automate Cybersecurity Tasks with Python',
    institution: 'Coursera',
    institutionLogo: 'https://www.vectorlogo.zone/logos/coursera/coursera-icon.svg',
    period: '30 days',
    description: 'Automation of security tasks using Python.',
    link: 'https://example.com',
    tags: ['Python', 'Cybersecurity'],
  },
  {
    id: 17,
    title: 'Foundations: Data, Data, Everywhere',
    institution: 'Coursera',
    institutionLogo: 'https://www.vectorlogo.zone/logos/coursera/coursera-icon.svg',
    period: '30 days',
    description: 'Introduction to data analytics concepts.',
    link: 'https://example.com',
    tags: ['Data Analytics'],
  },
  {
    id: 18,
    title: 'AI Day for Startup',
    institution: 'Google for Startups, IIT Roorkee',
    institutionLogo: 'https://www.vectorlogo.zone/logos/google/google-icon.svg',
    period: '1 day',
    description: 'Exposure to AI innovation and startup ecosystem.',
    link: 'https://example.com',
    tags: ['AI', 'Startup'],
  },
  {
    id: 19,
    title: 'Data Analysis with Python',
    institution: 'IBM',
    institutionLogo: 'https://www.vectorlogo.zone/logos/ibm/ibm-icon.svg',
    period: '30 days',
    description: 'Data analysis using Python libraries.',
    link: 'https://example.com',
    tags: ['Python', 'Data Analysis'],
  },
  {
    id: 20,
    title: 'Data Visualization with Python',
    institution: 'IBM',
    institutionLogo: 'https://www.vectorlogo.zone/logos/ibm/ibm-icon.svg',
    period: '30 days',
    description: 'Visualization techniques using Python.',
    link: 'https://example.com',
    tags: ['Data Visualization', 'Python'],
  },
  {
    id: 21,
    title: 'Introduction to Cloud Computing',
    institution: 'Simplilearn',
    institutionLogo: 'https://www.vectorlogo.zone/logos/simplilearn/simplilearn-icon.svg',
    period: '15 days',
    description: 'Cloud computing fundamentals.',
    link: 'https://example.com',
    tags: ['Cloud'],
  },
  {
    id: 22,
    title: 'Introduction to Data Science',
    institution: 'Infosys',
    institutionLogo: 'https://www.vectorlogo.zone/logos/infosys/infosys-icon.svg',
    period: '30 days',
    description: 'Basics of data science and analytics.',
    link: 'https://example.com',
    tags: ['Data Science'],
  },
  {
    id: 23,
    title: 'Web Technology',
    institution: 'NSDC',
    institutionLogo: 'https://www.vectorlogo.zone/logos/nsdc/nsdc-icon.svg',
    period: '15 days',
    description: 'Core web technologies and concepts.',
    link: 'https://example.com',
    tags: ['Web'],
  },
  {
    id: 24,
    title: 'ChatGPT Masterclass',
    institution: 'Udemy',
    institutionLogo: 'https://www.vectorlogo.zone/logos/udemy/udemy-icon.svg',
    period: '15 days',
    description: 'Practical usage of ChatGPT and prompt engineering.',
    link: 'https://example.com',
    tags: ['AI', 'ChatGPT'],
  },
  {
    id: 25,
    title: 'Java and C++',
    institution: 'Udemy',
    institutionLogo: 'https://www.vectorlogo.zone/logos/udemy/udemy-icon.svg',
    period: '45 days',
    description: 'Programming fundamentals in Java and C++.',
    link: 'https://example.com',
    tags: ['Java', 'C++'],
  },
  {
    id: 26,
    title: 'Quantum Computing Fundamentals',
    institution: 'Udemy',
    institutionLogo: 'https://www.vectorlogo.zone/logos/udemy/udemy-icon.svg',
    period: '30 days',
    description: 'Introduction to quantum computing concepts.',
    link: 'https://example.com',
    tags: ['Quantum Computing'],
  },
  {
    id: 27,
    title: 'Blockchain Bootcamp',
    institution: 'IDS',
    institutionLogo: 'https://www.vectorlogo.zone/logos/ids/ids-icon.svg',
    period: '15 hours',
    description: 'Hands-on blockchain fundamentals.',
    link: 'https://example.com',
    tags: ['Blockchain'],
  },
  {
    id: 28,
    title: 'Python for Data Science',
    institution: 'IBM',
    institutionLogo: 'https://www.vectorlogo.zone/logos/ibm/ibm-icon.svg',
    period: '30 days',
    description: 'Python programming for data science.',
    link: 'https://example.com',
    tags: ['Python', 'Data Science'],
  },
  {
    id: 29,
    title: 'Android Application Development',
    institution: 'Great Learning',
    institutionLogo: 'https://www.vectorlogo.zone/logos/greatlearning/greatlearning-icon.svg',
    period: '30 days',
    description: 'Android app development fundamentals.',
    link: 'https://example.com',
    tags: ['Android'],
  },
  {
    id: 30,
    title: 'Code Hack 2023',
    institution: 'Unstop',
    institutionLogo: 'https://www.vectorlogo.zone/logos/unstop/unstop-icon.svg',
    period: '',
    description: 'Participation in competitive coding event.',
    link: 'https://example.com',
    tags: ['Hackathon'],
  },
  {
    id: 31,
    title: 'Use Canva to Design Digital Course Collateral',
    institution: 'Coursera',
    institutionLogo: 'https://www.vectorlogo.zone/logos/canva/canva-icon.svg',
    period: '15 days',
    description: 'Designing digital assets using Canva.',
    link: 'https://example.com',
    tags: ['Design', 'Canva'],
  },
  {
    id: 32,
    title: 'SQL',
    institution: 'LetsUpgrade',
    period: '15 days',
    description: 'Database querying using SQL.',
    link: 'https://example.com',
    tags: ['SQL'],
  },
  {
    id: 33,
    title: 'HTML',
    institution: 'SoloLearn',
    period: '30 days',
    description: 'HTML fundamentals for web development.',
    link: 'https://example.com',
    tags: ['HTML'],
  },
  {
    id: 34,
    title: 'Python for Beginners',
    institution: 'SoloLearn',
    period: '30 days',
    description: 'Beginner-level Python programming.',
    link: 'https://example.com',
    tags: ['Python'],
  },
  {
    id: 35,
    title: 'C Language',
    institution: 'SoloLearn',
    period: '30 days',
    description: 'Fundamentals of C programming.',
    link: 'https://example.com',
    tags: ['C'],
  },
  {
    id: 36,
    title: 'C++ Language',
    institution: 'SoloLearn',
    period: '30 days',
    description: 'Core concepts of C++ programming.',
    link: 'https://example.com',
    tags: ['C++'],
  },
  {
    id: 37,
    title: 'Spoken Tutorial C',
    institution: 'IIT Bombay',
    period: '30 days',
    description: 'C programming via spoken tutorials.',
    link: 'https://example.com',
    tags: ['C'],
  },
  {
    id: 38,
    title: 'Certificate of Internship',
    institution: 'TechLearn',
    period: '60 days',
    description: 'Internship completion certificate.',
    link: 'https://example.com',
    tags: ['Internship'],
  },
  {
    id: 39,
    title: 'Git Pilot Fundamental',
    institution: 'Microsoft',
    period: '15 days',
    description: 'Version control fundamentals with Git.',
    link: 'https://example.com',
    tags: ['Git'],
  },
  {
    id: 40,
    title: 'Internet of Things',
    institution: 'IBM SkillsBuild',
    period: '10 days',
    description: 'Introduction to IoT concepts and applications.',
    link: 'https://example.com',
    tags: ['IoT'],
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
                              {item.institutionLogo && (
                                <img
                                  src={item.institutionLogo}
                                  alt={item.institution}
                                  className="w-14 h-14 rounded-xl object-contain bg-white p-2 border"
                                />
                              )}
                              <h3 className={`
                                font-bold mb-2
                                ${isLarge ? 'text-2xl md:text-3xl' : 'text-xl md:text-2xl'}
                              `}>
                                {item.title}
                              </h3>
                              {item.branch && (
                                <p className="text-sm font-semibold mt-1">
                                  {item.branch}
                                </p>
                              )}
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
