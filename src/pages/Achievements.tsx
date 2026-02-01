import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { SectionHeader } from '@/components/ui/SectionHeader';
import achievementsData from '@/data/achievements.json';

const Achievements = () => {
  return (
    <Layout>
      {/* PAGE HEADER */}
      <section className="pt-32 pb-24">
        <div className="container-custom max-w-5xl">
          <SectionHeader
            eyebrow={achievementsData.header.eyebrow}
            title={achievementsData.header.title}
            description={achievementsData.header.description}
          />
        </div>
      </section>

      {/* AWARDS STYLE ALTERNATING SECTIONS */}
      <section className="pb-36">
        <div className="container-custom space-y-40">
          {achievementsData.items.map((item, index) => {
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
