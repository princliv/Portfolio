import { motion, Variants } from 'framer-motion';
import { ReactNode } from 'react';

interface AnimatedTextProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  type?: 'words' | 'chars' | 'lines';
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: (delay = 0) => ({
    opacity: 1,
    transition: {
      staggerChildren: 0.03,
      delayChildren: delay,
    },
  }),
};

const childVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export function AnimatedText({ children, className = '', delay = 0, type = 'words' }: AnimatedTextProps) {
  if (typeof children !== 'string') {
    return <span className={className}>{children}</span>;
  }

  const elements = type === 'chars' 
    ? children.split('') 
    : type === 'words' 
      ? children.split(' ') 
      : children.split('\n');

  return (
    <motion.span
      className={className}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      custom={delay}
    >
      {elements.map((element, i) => (
        <motion.span
          key={i}
          variants={childVariants}
          className="inline-block"
        >
          {element}
          {type === 'words' && i < elements.length - 1 ? '\u00A0' : ''}
        </motion.span>
      ))}
    </motion.span>
  );
}
