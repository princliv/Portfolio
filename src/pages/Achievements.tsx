import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { SectionHeader } from '@/components/ui/SectionHeader';

/* =========================
   ACHIEVEMENTS DATA
========================= */

const achievements = [
  {
    id: 1,
    title: '2nd Position at UTKARSH 1.0 Hackathon',
    organization: 'Uttarakhand Technical University',
    date: 'May 2025',
    description:
      'Recognized for exceptional visual design, interaction quality, and refined user experience on a premium client project.',
    image: '../../assets/achievement/hutu.png',
    link: 'https://www.linkedin.com/posts/ankit1990asap_hackathon-ai-artificialintelligence-activity-7329004270576394240-n1ba',
  },
  {
    id: 2,
    title: 'Student of the Year',
    organization: 'Roorkee College of Engineering',
    date: 'May 2025',
    description:
      'Recognized for exceptional visual design, interaction quality, and refined user experience on a premium client project.',
    image: '../../assets/achievement/soty.png',
    link: 'https://www.linkedin.com/posts/ankit1990asap_studentoftheyear-haridwaruniversity-btechcse-activity-7327741770513952770-KVdU',
  },
  {
    id: 3,
    title: 'Academic Excellence Award',
    organization: 'Roorkee College of Engineering',
    date: 'April 2025',
    description:
      'Professional certification validating real-world experience in architecting scalable and secure cloud systems.',
    image: '../../assets/achievement/aea.png',
    link: 'https://www.linkedin.com/posts/ankit1990asap_academicexcellence-awardwinner-btechcse-activity-7324465234138607616-_VPC',
  },
  {
    id: 4,
    title: 'Vice Chairperson',
    organization: 'Trojan Club @ Roorkee College of Engineering',
    date: '2025',
    description:
      'First place winner for building an AI-powered accessibility platform under extreme time constraints.',
    image: '../../assets/achievement/vcp.png',
    link: 'https://www.linkedin.com/posts/ankit1990asap_leadership-innovation-hackathon-activity-7374740185026260992-7BUj',
  },
  {
    id: 5,
    title: 'Winner in at SDMEL-2025',
    organization: 'Haridwar University',
    date: '2025',
    description:
      '1st position in the UG/PG category, along with a cash prize of ₹2000 at 1st International Conference on Sustainable Development in Management, Engineering, and Life Sciences (SDMEL-2025)',
    image: '../../assets/achievement/sdmel.png',
    link: 'https://www.linkedin.com/posts/ankit1990asap_sdmel2025-haridwaruniversity-internationalconference-activity-7345733607098937359-lKaS',
  },
  {
    id: 6,
    title: '2nd Position at TechSangram',
    organization: 'Haridwar University',
    date: '2025',
    description:
      'Recognized for impactful open-source contributions adopted by developers worldwide.',
    image: '../../assets/achievement/ts.png',
    link: 'https://www.linkedin.com/posts/ankit1990asap_techsangram2025-projectpresentation-skillindia-activity-7328476780581867520-L_r2',
  },
  {
    id: 7,
    title: 'Campus Ambassador for IDS Blockchain',
    organization: 'Roorkee College of Engineering',
    date: '2023',
    description:
      'Recognized for impactful open-source contributions adopted by developers worldwide.',
    image: '../../assets/achievement/ca.png',
    link: 'https://www.linkedin.com/posts/ankit1990asap_techsangram2025-projectpresentation-skillindia-activity-7328476780581867520-L_r2',
  },
  
];

/* =========================
   PAGE COMPONENT
========================= */

const Achievements = () => {
  return (
    <Layout>
      {/* PAGE HEADER */}
      <section className="pt-32 pb-24">
        <div className="container-custom max-w-5xl">
          <SectionHeader
            eyebrow="Achievements"
            title="Achievements & Honors"
            description="A curated collection of awards, certifications, and recognitions that reflect excellence, innovation, and real-world impact."
          />
        </div>
      </section>

      {/* AWARDS STYLE ALTERNATING SECTIONS */}
      <section className="pb-36">
        <div className="container-custom space-y-40">
          {achievements.map((item, index) => {
            const reverse = index % 2 !== 0;

            return (
              <motion.section
                key={item.id}
                initial={{ opacity: 0, y: 80 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-120px' }}
                transition={{ duration: 0.9, ease: 'easeOut' }}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-20 items-center ${
                  reverse ? 'lg:[&>*:first-child]:order-2' : ''
                }`}
              >
                {/* IMAGE BLOCK */}
                <motion.a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.06 }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                  className="group relative block overflow-hidden rounded-[2.5rem]"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-[480px] object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                </motion.a>

                {/* TEXT BLOCK */}
                <div className="max-w-xl">
                  <span className="text-sm uppercase tracking-wider text-primary">
                    {item.organization} · {item.date}
                  </span>

                  <h2 className="heading-2 mt-5 mb-6">
                    {item.title}
                  </h2>

                  <p className="text-muted-foreground leading-relaxed text-lg mb-10">
                    {item.description}
                  </p>

                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 text-sm font-medium text-primary hover:underline"
                  >
                    View Recognition
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </motion.section>
            );
          })}
        </div>
      </section>
    </Layout>
  );
};

export default Achievements;
