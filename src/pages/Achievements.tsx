import { motion } from 'framer-motion';
import { Layout } from '@/components/layout/Layout';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Trophy, Award, Medal, Star, ExternalLink } from 'lucide-react';

const achievements = [
  {
    id: 1,
    title: 'Awwwards Site of the Day',
    organization: 'Awwwards',
    date: '2024',
    description: 'Recognized for exceptional web design and user experience on a client project.',
    icon: Trophy,
    type: 'Award',
    link: 'https://awwwards.com',
  },
  {
    id: 2,
    title: 'Google Developer Expert',
    organization: 'Google',
    date: '2023',
    description: 'Recognized as a Google Developer Expert in Web Technologies.',
    icon: Star,
    type: 'Certification',
    link: 'https://developers.google.com/experts',
  },
  {
    id: 3,
    title: 'AWS Solutions Architect',
    organization: 'Amazon Web Services',
    date: '2023',
    description: 'Professional certification for designing distributed systems on AWS.',
    icon: Award,
    type: 'Certification',
    link: 'https://aws.amazon.com/certification',
  },
  {
    id: 4,
    title: 'TechCrunch Hackathon Winner',
    organization: 'TechCrunch Disrupt',
    date: '2023',
    description: 'First place for developing an AI-powered accessibility tool in 24 hours.',
    icon: Trophy,
    type: 'Hackathon',
    link: 'https://techcrunch.com',
  },
  {
    id: 5,
    title: 'CSS Design Awards',
    organization: 'CSSDA',
    date: '2022',
    description: 'Best UI Design and Best Innovation awards for portfolio website.',
    icon: Medal,
    type: 'Award',
    link: 'https://cssdesignawards.com',
  },
  {
    id: 6,
    title: 'Open Source Contributor',
    organization: 'GitHub',
    date: '2022',
    description: 'Arctic Code Vault Contributor for contributions to open source projects.',
    icon: Star,
    type: 'Recognition',
    link: 'https://github.com',
  },
  {
    id: 7,
    title: 'Microsoft Certified',
    organization: 'Microsoft',
    date: '2021',
    description: 'Azure Developer Associate certification for cloud development.',
    icon: Award,
    type: 'Certification',
    link: 'https://microsoft.com/learn',
  },
  {
    id: 8,
    title: 'Product Hunt Golden Kitty',
    organization: 'Product Hunt',
    date: '2021',
    description: 'Finalist in Developer Tools category for an open-source project.',
    icon: Trophy,
    type: 'Award',
    link: 'https://producthunt.com',
  },
];

const typeColors: Record<string, string> = {
  Award: 'bg-yellow-500/20 text-yellow-500',
  Certification: 'bg-blue-500/20 text-blue-500',
  Hackathon: 'bg-purple-500/20 text-purple-500',
  Recognition: 'bg-green-500/20 text-green-500',
};

const Achievements = () => {
  return (
    <Layout>
      <section className="pt-32 pb-12">
        <div className="container-custom">
          <SectionHeader
            eyebrow="Achievements"
            title="Recognition & Awards"
            description="A collection of certifications, awards, and recognitions that highlight my contributions to the tech community."
          />
        </div>
      </section>

      <section className="pb-24">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {achievements.map((achievement, i) => (
              <motion.a
                key={achievement.id}
                href={achievement.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -4 }}
                className="card-premium group block"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <achievement.icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${typeColors[achievement.type]}`}>
                        {achievement.type}
                      </span>
                      <span className="text-xs text-muted-foreground">{achievement.date}</span>
                    </div>
                    <h3 className="heading-4 text-lg mb-1 group-hover:text-primary transition-colors">
                      {achievement.title}
                    </h3>
                    <p className="text-sm text-primary mb-2">{achievement.organization}</p>
                    <p className="text-sm text-muted-foreground">{achievement.description}</p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Achievements;
