import { ReactNode, useEffect } from 'react';
import { Navigation } from './Navigation';
import { Footer } from './Footer';
import { CustomCursor } from '@/components/ui/CustomCursor';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  useEffect(() => {
    // Smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Add parallax effect on scroll
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const parallaxElements = document.querySelectorAll('[data-parallax]');
      
      parallaxElements.forEach((element) => {
        const speed = parseFloat(element.getAttribute('data-speed') || '0.5');
        const yPos = -(scrolled * speed);
        (element as HTMLElement).style.transform = `translateY(${yPos}px)`;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col relative">
      <CustomCursor />
      <div className="noise-overlay" />
      
      {/* Cosmic background particles */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary rounded-full opacity-40 animate-constellation-twinkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>
      
      <Navigation />
      <main className="flex-1 relative z-10">{children}</main>
      <Footer />
    </div>
  );
}
