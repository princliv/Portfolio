import { Layout } from '@/components/layout/Layout';
import { HeroSection } from '@/components/sections/HeroSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { ProjectsSection } from '@/components/sections/ProjectsSection';
import { ProfilesSection } from '@/components/sections/ProfilesSection';
import { GitHubSection } from '@/components/sections/GitHubSection';
import { ContactSection } from '@/components/sections/ContactSection';
import { useSectionSnap } from '@/hooks/useSectionSnap';

const LANDING_SECTION_IDS = [
  'hero-top-section',
  'skills-section',
  'projects-section',
  'profiles-section',
  'github',
  'contact-section',
];

const Index = () => {
  useSectionSnap(LANDING_SECTION_IDS);

  return (
    <Layout>
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <ProfilesSection />
      <GitHubSection />
      <ContactSection />
    </Layout>
  );
};

export default Index;
