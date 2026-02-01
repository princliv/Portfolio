import { memo } from 'react';
import { motion } from 'framer-motion';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { TechMarquee } from '@/components/ui/TechMarquee';
import { useCountUp } from '@/hooks/useCountUp';
import {
  Code2,
  Layers,
  Brain,
  BarChart3,
  Palette,
  Cloud,
} from 'lucide-react';

/* ---------------- ICON GROUPS ---------------- */

const techIcons = {
  programming: [
    'https://cdn.svgporn.com/logos/c.svg',
    'https://cdn.svgporn.com/logos/c-plusplus.svg',
    'https://cdn.svgporn.com/logos/java.svg',
    'https://cdn.svgporn.com/logos/python.svg',
    'https://cdn.svgporn.com/logos/javascript.svg',
    'https://cdn.svgporn.com/logos/typescript-icon.svg',
  ],

  fullstack: [
    'https://cdn.svgporn.com/logos/html-5.svg',
    'https://cdn.svgporn.com/logos/css-3.svg',
    'https://cdn.svgporn.com/logos/react.svg',
    'https://www.vectorlogo.zone/logos/nodejs/nodejs-icon.svg',
    'https://www.vectorlogo.zone/logos/firebase/firebase-icon.svg',
    'https://www.vectorlogo.zone/logos/mongodb/mongodb-icon.svg',
    'https://cdn.svgporn.com/logos/android-icon.svg',
    'https://cdn.svgporn.com/logos/flutter.svg',
    'https://www.vectorlogo.zone/logos/wordpress/wordpress-icon.svg',
    'https://www.vectorlogo.zone/logos/mysql/mysql-icon.svg',

  ],

  ai: [
    'https://www.vectorlogo.zone/logos/tensorflow/tensorflow-icon.svg',
    'https://www.vectorlogo.zone/logos/pytorch/pytorch-icon.svg',
    'https://www.vectorlogo.zone/logos/opencv/opencv-icon.svg',
    'https://cdn.svgporn.com/logos/pandas-icon.svg',
    'https://www.vectorlogo.zone/logos/numpy/numpy-icon.svg',
  ],

  analytics: [
    'https://www.vectorlogo.zone/logos/google_analytics/google_analytics-icon.svg',
    './assets/icons/clarity.png',
    './assets/icons/gsc.webp',
    './assets/icons/gtm.webp',
  ],

  uiux: [
    'https://www.vectorlogo.zone/logos/figma/figma-icon.svg',
    'https://www.vectorlogo.zone/logos/canva/canva-icon.svg',
  ],

  cloud: [
    'https://www.vectorlogo.zone/logos/amazon_aws/amazon_aws-icon.svg',
    'https://www.vectorlogo.zone/logos/microsoft_azure/microsoft_azure-icon.svg',
    'https://assets.vercel.com/image/upload/v1607554385/repositories/vercel/logo.png',
    'https://www.vectorlogo.zone/logos/netlify/netlify-icon.svg',
    'https://www.vectorlogo.zone/logos/github/github-icon.svg',
    'https://www.vectorlogo.zone/logos/git-scm/git-scm-icon.svg',
    'https://www.vectorlogo.zone/logos/linux/linux-icon.svg',
    './assets/icons/hostinger.png',
  ],
};

/* ---------------- CONTENT ---------------- */

const highlights = [
  {
    icon: Code2,
    title: 'Programming Languages',
    description:
      'Strong foundation in core programming languages with problem-solving, OOP, and performance-oriented coding.',
    tools: techIcons.programming,
  },
  {
    icon: Layers,
    title: 'Full-Stack & Mobile Development',
    description:
      'End-to-end development of scalable web and mobile applications using modern stacks and architectures.',
    tools: techIcons.fullstack,
  },
  {
    icon: Brain,
    title: 'AI, ML & Cybersecurity',
    description:
      'Building intelligent systems, computer vision solutions, and security-aware applications.',
    tools: techIcons.ai,
  },
  {
    icon: BarChart3,
    title: 'Analytical Tools',
    description:
      'Data-driven decision making using analytics, tracking, monitoring, and performance insights.',
    tools: techIcons.analytics,
  },
  {
    icon: Palette,
    title: 'UI / UX Design',
    description:
      'Crafting visually appealing, accessible, and user-centric interfaces with a product mindset.',
    tools: techIcons.uiux,
  },
  {
    icon: Cloud,
    title: 'Cloud / Hosting & Platforms',
    description:
      'Deploying, scaling, and optimizing applications using cloud infrastructure and DevOps tools.',
    tools: techIcons.cloud,
  },
];

/* ---------------- COMPONENT ---------------- */

export const AboutSection = function AboutSection() {
  return (
    <section
      className="relative z-20 pt-20 md:pt-12 lg:pt-20 pb-20 md:pb-12 lg:pb-20 rounded-t-[3rem] md:rounded-t-[4rem] lg:rounded-t-[5rem] bg-background/95 backdrop-blur-xl border-t border-border/40 shadow-2xl"
      style={{ marginTop: '100vh' }}
    >
      <div className="container-custom">
        <SectionHeader
          eyebrow="About Me"
          title="Engineering Scalable, Intelligent & Impactful Products"
          description="Software Developer specializing in full-stack systems, mobile apps, AI-driven solutions, analytics, cloud platforms, and refined UI/UX."
        />

        <TechMarquee />

        <div className="
            grid grid-cols-1
            md:grid-cols-2
            lg:grid-cols-3
            gap-6 lg:gap-8
          "
        >
          {highlights.map((item) => (
            <div
              key={item.title}
              className="
                group relative rounded-2xl
                border border-border/40
                bg-background/70 backdrop-blur-xl
                p-6 shadow-lg
                hover:shadow-2xl hover:-translate-y-1
                transition-all duration-300
                overflow-hidden
              "
            >
              {/* Cosmic glow effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/0 to-primary/0 group-hover:from-primary/5 group-hover:via-primary/10 group-hover:to-primary/5 transition-all duration-500 rounded-2xl" />
              <div className="relative z-10">
              {/* Header */}
              <div className="flex items-start gap-4 mb-4">
                <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <item.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="heading-4 text-lg mb-1">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Tools */}
              <div className="flex flex-wrap gap-3 mt-5">
                {item.tools.map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt="tech"
                    loading="lazy"
                    className="w-8 h-8 object-contain opacity-80 group-hover:opacity-100 transition-opacity hover:scale-110 hover:rotate-3 transition-transform duration-200"
                  />
                ))}
              </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { value: 1, suffix: '+', label: 'Years Professional Experience' },
            { value: 10, suffix: '+', label: 'Projects & Deployments' },
            { value: 40, suffix: '+', label: 'Certifications Earned' },
            { value: 3, suffix: '+', label: 'Major Awards & Recognitions' },
          ].map((stat, i) => {
            const { count, ref } = useCountUp({ 
              end: stat.value, 
              suffix: stat.suffix,
              duration: 2000 
            });
            
            return (
              <div
                key={stat.label}
                ref={ref}
                className="text-center group"
              >
                <div className="heading-2 gradient-text mb-2 cosmic-text relative inline-block">
                  {count}
                  <div
                    className="absolute -inset-4 bg-primary/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  />
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Cosmic floating orbs */}
      <div className="absolute top-20 right-10 w-64 h-64 cosmic-orb opacity-30" style={{ animationDelay: '0s' }} />
      <div className="absolute bottom-20 left-10 w-48 h-48 cosmic-orb opacity-20" style={{ animationDelay: '2s' }} />
    </section>
  );
};
