import { motion } from 'framer-motion';

interface LoadingSpinnerProps {
  progress?: number;
}

export function LoadingSpinner({ progress }: LoadingSpinnerProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-xl">
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-16 h-16">
          <motion.div
            className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          />
          {progress !== undefined && (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xs font-medium text-primary">{progress}%</span>
            </div>
          )}
        </div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-sm text-muted-foreground font-medium"
        >
          Loading...
        </motion.p>
      </div>
    </div>
  );
}

