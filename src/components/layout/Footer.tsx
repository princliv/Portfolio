import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, ArrowUpRight, Instagram } from 'lucide-react';
import logo from '../../../public/assets/logodark.webp';

const socialLinks = [
  { icon: Mail, href: 'mailto:ankitkumar1990asap@gmail.com', label: 'Email' },
  { icon: Github, href: 'https://github.com/princliv', label: 'GitHub' },
  { icon: Linkedin, href: 'www.linkedin.com/in/ankit1990asap', label: 'LinkedIn' },
  { icon: Instagram, href: 'https://www.instagram.com/princliv_', label: 'Instagram' },
];

export function Footer() {
  return (
    <footer className="relative z-20 glass py-12 border-t border-border/40">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo & Copyright */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <img src={logo} alt="Logo" className="h-10" />
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Ankit Kumar. All rights reserved.
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9 }}
                className="p-3 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-colors"
                aria-label={link.label}
              >
                <link.icon className="w-5 h-5" />
              </motion.a>
            ))}
          </div>

          {/* Status */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="flex items-center gap-2 text-sm"
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
        </div>
      </div>
    </footer>
  );
}
