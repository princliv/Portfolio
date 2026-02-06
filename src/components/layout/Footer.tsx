import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, ArrowUpRight, Instagram } from 'lucide-react';
import logo from '../../../public/assets/logodark.webp';
import logoLight from '../../../public/assets/logolight.webp';
import { useTheme } from '@/hooks/useTheme';

const socialLinks = [
  { icon: Mail, href: 'mailto:ankitkumar1990asap@gmail.com', label: 'Email' },
  { icon: Github, href: 'https://github.com/princliv', label: 'GitHub' },
  { icon: Linkedin, href: 'www.linkedin.com/in/ankit1990asap', label: 'LinkedIn' },
  { icon: Instagram, href: 'https://www.instagram.com/princliv_', label: 'Instagram' },
];

export function Footer() {
  const { resolvedTheme } = useTheme();
  return (
    <footer className="relative z-20 glass py-12 border-t border-border/40 overflow-hidden px-4 sm:px-6 md:px-8">
      {/* Cosmic glow effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-primary/5 blur-3xl opacity-50" />
      
      <div className="container-custom relative z-10">
        <motion.div 
          className="flex flex-col md:flex-row items-center justify-between gap-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Logo & Copyright */}
          <motion.div 
            className="flex flex-col items-center md:items-start gap-2"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.img 
              src={resolvedTheme === 'dark' ? logo : logoLight} 
              alt="Logo" 
              className="h-10"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            />
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Ankit Kumar. All rights reserved.
            </p>
          </motion.div>

          {/* Social Links */}
          <motion.div 
            className="flex items-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {socialLinks.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.2 + i * 0.1 }}
                whileHover={{ scale: 1.15, y: -3, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                className="p-3 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-colors relative group"
                aria-label={link.label}
              >
                <link.icon className="w-5 h-5 relative z-10" />
                <motion.div
                  className="absolute inset-0 bg-primary/20 rounded-full blur-xl opacity-0 group-hover:opacity-100"
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            ))}
          </motion.div>

          {/* Status */}
          <motion.div
            className="flex items-center gap-2 text-sm"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-muted-foreground">Available for opportunities</span>
            <a 
              href="/contact" 
              className="text-primary hover:underline inline-flex items-center gap-1"
            >
              Let's talk <ArrowUpRight className="w-3 h-3" />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
}
