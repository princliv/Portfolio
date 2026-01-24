import { motion } from 'framer-motion';
import { Layout } from '@/components/layout/Layout';
import { Home, ArrowLeft } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { MagneticButton } from '@/components/ui/MagneticButton';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <Layout>
      <section className="min-h-screen flex items-center justify-center">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="heading-1 gradient-text mb-4"
            >
              404
            </motion.div>
            <h1 className="heading-3 mb-4">Page Not Found</h1>
            <p className="body-large text-muted-foreground mb-8 max-w-md mx-auto">
              Oops! The page you're looking for doesn't exist or has been moved.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <MagneticButton className="btn-primary">
                <Link to="/" className="flex items-center gap-2">
                  <Home className="w-5 h-5" />
                  Back to Home
                </Link>
              </MagneticButton>
              <MagneticButton className="btn-outline">
                <button onClick={() => window.history.back()} className="flex items-center gap-2">
                  <ArrowLeft className="w-5 h-5" />
                  Go Back
                </button>
              </MagneticButton>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default NotFound;
