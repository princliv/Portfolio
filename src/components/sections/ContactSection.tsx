import { memo } from 'react';
import { motion } from 'framer-motion';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { ArrowUpRight, Download } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ContactSection = memo(function ContactSection() {
  return (
    <section className="relative z-20 pt-20 md:pt-12 lg:pt-20 pb-20 md:pb-12 lg:pb-20 bg-background/95 backdrop-blur-xl border-t border-border/40 shadow-2xl">
      <div className="container-custom">
        <div
          className="relative overflow-hidden rounded-3xl p-12 md:p-16 lg:p-20 text-center"
          style={{
            background: 'linear-gradient(135deg, hsl(192, 91%, 50%, 0.1), hsl(280, 87%, 65%, 0.1))',
          }}
        >
          {/* Background Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl opacity-20"
            style={{
              background: 'radial-gradient(circle, hsl(192, 91%, 50%), transparent 70%)',
            }}
          />
          
          <div className="relative z-10">
            <span
              className="inline-block text-sm font-medium text-primary uppercase tracking-widest mb-4"
            >
              Let's Connect
            </span>
            
            <h2 className="heading-2 mb-6">
              Have a Project in Mind?
            </h2>
            
            <p className="body-large text-muted-foreground max-w-2xl mx-auto mb-10">
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision. Let's create something amazing together.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <MagneticButton className="btn-primary text-lg">
                <Link to="/contact" className="flex items-center gap-2">
                  Get in Touch
                  <ArrowUpRight className="w-5 h-5" />
                </Link>
              </MagneticButton>
              <MagneticButton className="btn-outline text-lg">
                <a href="#" className="flex items-center gap-2">
                  <Download className="w-5 h-5" />
                  Download Resume
                </a>
              </MagneticButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});
