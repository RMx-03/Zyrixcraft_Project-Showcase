import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import type { Project } from '../data/projects';

interface SplitLayoutProps {
  currentProject: Project;
}

const SplitLayout: React.FC<SplitLayoutProps> = React.memo(({ currentProject }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  // Memoize grid items to prevent unnecessary re-renders
  const gridItems = useMemo(() => 
    Array.from({ length: 36 }, (_, i) => (
      <div
        key={i}
        className="border border-white/10"
      />
    )), []
  );

  // Memoize stats data
  const statsData = useMemo(() => [
    { value: "10+", label: "Projects Delivered" },
    { value: "95%", label: "Client Satisfaction" }, 
    { value: "2.5x", label: "Average ROI" }
  ], []);

  return (
    <div className="fixed inset-0 flex z-0">
      {/* Left half */}
      <div className="w-1/2 bg-zyrix-dark flex flex-col justify-center px-12 lg:px-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-6 relative z-10"
        >
          {/* Title - Reduced size with text adjustments */}
          <div>
            <h1 className="text-3xl lg:text-5xl xl:text-6xl font-display font-bold text-white leading-tight">
              We Transform
              <br />
              <span className="text-gradient">Ideas</span> Into
              <br />
              <span className="text-gradient">Impactful</span> Digital
              <br />
              Experiences.
            </h1>
          </div>

          {/* Subtitle with line breaks */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-lg lg:text-xl text-gray-300 font-light max-w-lg">
              A Digital Agency for Growth, UI/UX
              <br />
              & Innovation
            </p>
          </motion.div>

          {/* Stats - Moved up and adjusted */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-3 gap-6 pt-6"
          >
            {statsData.map((stat, index) => (
              <div key={index}>
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-xs text-gray-400">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Right half with enhanced grainy and dusty effect */}
      <div className="w-1/2 relative overflow-hidden">
        <motion.div
          key={currentProject.id}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0"
        >
          {/* Optimized image with loading states */}
          <div className="relative w-full h-full">
            {!imageLoaded && (
              <div className="absolute inset-0 bg-gray-800 animate-pulse" />
            )}
            <img
              src={currentProject.image}
              alt={currentProject.title}
              className={`w-full h-full object-cover transition-opacity duration-200 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              loading="eager"
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageLoaded(true)}
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-black/20 to-black/40" />
          
          {/* Project overlay */}
          <div className="absolute bottom-8 left-8 right-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="bg-black/70 backdrop-blur-md p-6"
            >
              <h3 className="text-2xl font-display font-semibold text-orange-500 mb-2">
                {currentProject.title}
              </h3>
              <p className="text-orange-400 mb-3">
                {currentProject.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {currentProject.techStack.slice(0, 3).map((tech, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 text-sm bg-orange-500 text-white"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Enhanced grainy and dusty effect - Layer 1: Fine grain */}
        <div 
          className="absolute inset-0 opacity-50 mix-blend-overlay pointer-events-none z-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter1'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.2' numOctaves='5' stitchTiles='stitch' seed='1'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter1)'/%3E%3C/svg%3E")`,
            backgroundSize: '120px 120px',
          }}
        />

        {/* Enhanced grainy and dusty effect - Layer 2: Coarse dust */}
        <div 
          className="absolute inset-0 opacity-35 mix-blend-soft-light pointer-events-none z-11"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter2'%3E%3CfeTurbulence type='turbulence' baseFrequency='0.6' numOctaves='3' stitchTiles='stitch' seed='42'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter2)'/%3E%3C/svg%3E")`,
            backgroundSize: '200px 200px',
          }}
        />

        {/* Enhanced grainy and dusty effect - Layer 3: Large dust particles */}
        <div 
          className="absolute inset-0 opacity-25 mix-blend-multiply pointer-events-none z-12"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter3'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.3' numOctaves='2' stitchTiles='stitch' seed='123'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter3)'/%3E%3C/svg%3E")`,
            backgroundSize: '300px 300px',
          }}
        />

        {/* Optimized Grid - reduced from 144 to 36 items */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="grid grid-cols-6 grid-rows-6 h-full">
            {gridItems}
          </div>
        </div>
      </div>
    </div>
  );
});

SplitLayout.displayName = 'SplitLayout';

export default SplitLayout; 