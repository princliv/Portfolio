import { Suspense, lazy } from 'react';
import { Layout } from '@/components/layout/Layout';
import { SuspenseFallback } from '@/components/ui/SuspenseFallback';

// Lazy load sections with proper named export handling
const HeroSection = lazy(() => 
  import('@/components/sections/HeroSection').then(module => ({ default: module.HeroSection }))
);
const AboutSection = lazy(() => 
  import('@/components/sections/AboutSection').then(module => ({ default: module.AboutSection }))
);
const ProjectsSection = lazy(() => 
  import('@/components/sections/ProjectsSection').then(module => ({ default: module.ProjectsSection }))
);
const SkillsSection = lazy(() => 
  import('@/components/sections/SkillsSection').then(module => ({ default: module.SkillsSection }))
);
const ContactSection = lazy(() => 
  import('@/components/sections/ContactSection').then(module => ({ default: module.ContactSection }))
);

const Index = () => {
  return (
    <Layout>
      <Suspense fallback={<SuspenseFallback />}>
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <SkillsSection />
        <ContactSection />
      </Suspense>
    </Layout>
  );
};

export default Index;
