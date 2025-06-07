import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import ProjectCard from './ProjectCard';
import SplitLayout from './SplitLayout';
import { projects } from '../data/projects';

const ProjectsScroller: React.FC = () => {
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Reset scroll position on mount to fix refresh issues
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Transform scroll progress to project index
  const projectIndex = useTransform(
    scrollYProgress,
    [0, 0.17, 0.33, 0.50, 0.67, 0.83, 1],
    [0, 1, 2, 3, 4, 5, 5]
  );

  useEffect(() => {
    const unsubscribe = projectIndex.onChange((latest) => {
      const index = Math.max(0, Math.min(Math.floor(latest + 0.1), projects.length - 1));
      if (index !== activeProjectIndex) {
        setActiveProjectIndex(index);
      }
    });

    return () => unsubscribe();
  }, [projectIndex, activeProjectIndex]);

  return (
    <>
      {/* Split Layout Background */}
      <SplitLayout currentProject={projects[activeProjectIndex]} />

      {/* Scrolling Container */}
      <div 
        ref={containerRef}
        className="relative z-20"
        style={{ height: `${projects.length * 100}vh` }}
      >
        {/* Fixed Center Card Container */}
        <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-20">
          <div className="pointer-events-none z-20 w-full max-w-md px-4">
            {projects.map((project, index) => (
              <div
                key={project.id}
                className={`absolute inset-0 transition-opacity duration-500 ${
                  index === activeProjectIndex ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <ProjectCard
                  project={project}
                  isActive={index === activeProjectIndex}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Invisible Scroll Sections */}
        {projects.map((project, index) => (
          <div
            key={project.id}
            id={`project-${index}`}
            className="h-screen flex items-center justify-center"
            style={{ minHeight: '100vh' }}
          >
            {/* This div helps with scroll detection but is invisible */}
            <div className="w-full h-full opacity-0" />
          </div>
        ))}

        {/* Scroll Indicator */}
        <motion.div
          className="fixed right-8 top-1/3 -translate-y-1/2 z-60"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.5 }}
        >
          <div className="bg-black/70 backdrop-blur-md px-3 py-4 flex flex-col gap-4">
            {projects.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => {
                  const targetElement = document.getElementById(`project-${index}`);
                  if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
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

        {/* Progress Bar */}
        <motion.div
          className="fixed bottom-0 left-0 h-1 bg-gradient-to-r from-orange-500 to-orange-400 z-60"
          style={{
            width: "50vw",
            scaleX: useTransform(scrollYProgress, [0, 1], [0, 1]),
            transformOrigin: "0%"
          }}
        />

        {/* Floating Action Hint */}
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