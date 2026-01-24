import { ReactNode } from 'react';
import { Navigation } from './Navigation';
import { Footer } from './Footer';
import { CustomCursor } from '@/components/ui/CustomCursor';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <CustomCursor />
      <div className="noise-overlay" />
      <Navigation />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
