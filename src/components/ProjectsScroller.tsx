import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import ProjectCard from './ProjectCard';
import SplitLayout from './SplitLayout';
import { projects } from '../data/projects';

const ProjectsScroller: React.FC = () => {
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Project switching
  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((progress) => {
      const sectionSize = 1 / projects.length;
      const newIndex = Math.min(
        Math.floor(progress / sectionSize), 
        projects.length - 1
      );
      
      if (newIndex !== activeProjectIndex) {
        setActiveProjectIndex(newIndex);
      }
    });

    return () => unsubscribe();
  }, [scrollYProgress, activeProjectIndex]);

  // Reset scroll
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleDotClick = (index: number) => {
    const element = document.getElementById(`project-section-${index}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Background */}
      <SplitLayout currentProject={projects[activeProjectIndex]} />

      {/* Main container */}
      <div 
        ref={containerRef}
        className="relative z-20"
        style={{ height: `${projects.length * 100}vh` }}
      >
        {/* Active card */}
        <div className="fixed inset-0 flex items-center justify-center z-20">
          <div className="w-full max-w-md px-4">
            <ProjectCard
              key={`active-${activeProjectIndex}`}
              project={projects[activeProjectIndex]}
              isActive={true}
            />
          </div>
        </div>

        {/* Scroll sections */}
        {projects.map((_, index) => (
          <div
            key={`section-${index}`}
            id={`project-section-${index}`}
            className="h-screen"
            style={{ minHeight: '100vh' }}
          />
        ))}

        {/* Dot nav */}
        <motion.div
          className="fixed right-8 top-1/3 -translate-y-1/2 z-60"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.5 }}
        >
          <div className="bg-black/70 backdrop-blur-md px-3 py-4 flex flex-col gap-4">
            {projects.map((_, index) => (
              <motion.button
                key={`dot-${index}`}
                onClick={() => handleDotClick(index)}
                className={`w-3 h-3 transition-all duration-300 cursor-pointer ${
                  index === activeProjectIndex 
                    ? 'bg-orange-500' 
                    : 'bg-orange-500/30'
                }`}
                whileHover={{ scale: 1.3 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>
        </motion.div>

        {/* Progress bar */}
        <motion.div
          className="fixed bottom-0 left-0 h-1 bg-gradient-to-r from-orange-500 to-orange-400 z-60"
          style={{
            width: "calc(50vw - 1px)",
            scaleX: scrollYProgress,
            transformOrigin: "0%"
          }}
        />

        {/* Scroll hint */}
        <motion.div
          className="fixed bottom-8 left-8 z-60"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.6 }}
        >
          <div className="text-orange-500 text-sm font-light border-b border-orange-500/30 pb-1">
            Scroll
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default ProjectsScroller; 