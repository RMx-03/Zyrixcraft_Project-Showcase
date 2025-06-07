import React, { lazy, Suspense, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Loader from './components/Loader';
import ErrorBoundary from './components/ErrorBoundary';
import './index.css';

// Lazy load the heavy ProjectsScroller component
const ProjectsScroller = lazy(() => import('./components/ProjectsScroller'));

const App: React.FC = React.memo(() => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate app initialization time + loader duration
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 4500); // 2.5s progress + 2s delay

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <ErrorBoundary>
      <div className="relative min-h-screen bg-black overflow-x-hidden" style={{ pointerEvents: 'auto' }}>
        {/* ZyrixCraft Title - Aligned with Let's Talk button vertically and Scroll text horizontally */}
        <motion.div 
          className="fixed top-8 left-8 z-40"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          style={{ pointerEvents: 'none' }}
        >
          <h1 className="text-2xl font-display font-bold text-orange-500">
            ZyrixCraft
          </h1>
        </motion.div>

        {/* Let's Talk Button - Clean and working */}
        <div 
          className="fixed top-8 right-8"
          style={{ 
            zIndex: 999999,
            pointerEvents: 'auto',
            position: 'fixed'
          }}
        >
          <button
            onClick={() => {
              window.open('https://zyrixcraft.in/', '_blank', 'noopener,noreferrer');
            }}
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              backdropFilter: 'blur(12px)',
              color: 'white',
              padding: '16px 24px',
              border: 'none',
              cursor: 'pointer',
              zIndex: 999999,
              position: 'relative',
              pointerEvents: 'auto'
            }}
            className="flex items-center space-x-3 hover:bg-black/80 transition-all duration-200 hover-glow group"
          >
            <span style={{ color: '#f97316', fontSize: '18px', fontWeight: '600' }}>
              Let's Talk
            </span>
            <ArrowRight className="w-5 h-5 text-orange-500 transition-transform duration-200 group-hover:translate-x-1" />
          </button>
        </div>

        <Suspense fallback={<div className="min-h-screen bg-black" />}>
          <ProjectsScroller />
        </Suspense>
      </div>
    </ErrorBoundary>
  );
});

App.displayName = 'App';

export default App;
