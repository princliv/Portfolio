import { useEffect } from 'react';
import { Layout } from '@/components/layout/Layout';
import { HeroSection } from '@/components/sections/HeroSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { ProjectsSection } from '@/components/sections/ProjectsSection';
import { SkillsSection } from '@/components/sections/SkillsSection';
import { ProfilesSection } from '@/components/sections/ProfilesSection';
import { GitHubSection } from '@/components/sections/GitHubSection';
import { ContactSection } from '@/components/sections/ContactSection';

const Index = () => {
  useEffect(() => {
    document.documentElement.classList.add('home-scroll-snap');
    return () => {
      document.documentElement.classList.remove('home-scroll-snap');
    };
  }, []);

  return (
    <Layout>
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <ProfilesSection />
      {/* <SkillsSection /> */}
      <GitHubSection />
      <ContactSection />
    </Layout>
  );
};

export default Index;
