import { ReactNode } from 'react';
import { Navigation } from './Navigation';
import { Footer } from './Footer';
import { CustomCursor } from '@/components/ui/CustomCursor';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  useSmoothScroll();

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
      <main className="flex-1 relative z-10 px-4 sm:px-6 lg:px-4">{children}</main>
      <Footer />
    </div>
  );
}
