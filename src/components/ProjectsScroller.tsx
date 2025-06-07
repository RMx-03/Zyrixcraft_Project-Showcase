import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { motion, useScroll } from 'framer-motion';
import ProjectCard from './ProjectCard';
import SplitLayout from './SplitLayout';
import { projects } from '../data/projects';

// Throttle function for performance
const throttle = <T extends unknown[]>(
  func: (...args: T) => void, 
  delay: number
) => {
  let timeoutId: number | undefined;
  let lastExecTime = 0;
  return function (...args: T) {
    const currentTime = Date.now();
    
    if (currentTime - lastExecTime > delay) {
      func(...args);
      lastExecTime = currentTime;
    } else {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = window.setTimeout(() => {
        func(...args);
        lastExecTime = Date.now();
      }, delay - (currentTime - lastExecTime));
    }
  };
};

const ProjectsScroller: React.FC = React.memo(() => {
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const [isManualNavigation, setIsManualNavigation] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Memoize section size calculation
  const sectionSize = useMemo(() => 1 / projects.length, []);

  // Memoize container height
  const containerHeight = useMemo(() => `${projects.length * 100}vh`, []);

  // Memoize sections array
  const sections = useMemo(() => 
    projects.map((_, index) => ({
      id: `project-section-${index}`,
      index
    })), []
  );

  // Preload next/previous images for better UX
  useEffect(() => {
    const preloadImage = (src: string) => {
      const img = new Image();
      img.src = src;
    };

    // Preload current, next, and previous images
    const prevIndex = Math.max(0, activeProjectIndex - 1);
    const nextIndex = Math.min(projects.length - 1, activeProjectIndex + 1);
    
    preloadImage(projects[activeProjectIndex].image);
    if (prevIndex !== activeProjectIndex) preloadImage(projects[prevIndex].image);
    if (nextIndex !== activeProjectIndex) preloadImage(projects[nextIndex].image);
  }, [activeProjectIndex]);

  // Throttled scroll progress handler with manual navigation protection
  const handleScrollProgress = useMemo(
    () => throttle((progress: number) => {
      // Don't update if user is manually navigating
      if (isManualNavigation) return;
      
      const newIndex = Math.min(
        Math.floor(progress / sectionSize), 
        projects.length - 1
      );
      
      if (newIndex !== activeProjectIndex) {
        setActiveProjectIndex(newIndex);
      }
    }, 16), // ~60fps (slowed down from 8ms/120fps to 16ms/60fps)
    [sectionSize, activeProjectIndex, isManualNavigation]
  );

  // Project switching
  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange(handleScrollProgress);
    return () => unsubscribe();
  }, [scrollYProgress, handleScrollProgress]);

  // Reset scroll
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleDotClick = useCallback((index: number) => {
    // Prevent glitchy transitions by managing manual navigation state
    setIsManualNavigation(true);
    
    // Immediately update the active project for instant visual feedback
    setActiveProjectIndex(index);
    
    // Smooth scroll to the section
    const element = document.getElementById(`project-section-${index}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    
    // Re-enable automatic scroll tracking after transition completes
    setTimeout(() => {
      setIsManualNavigation(false);
    }, 1000); // Allow time for smooth scroll to complete
  }, []);

  // Memoize current project
  const currentProject = useMemo(() => projects[activeProjectIndex], [activeProjectIndex]);

  return (
    <>
      {/* Background */}
      <SplitLayout currentProject={currentProject} />

      {/* Main container */}
      <div 
        ref={containerRef}
        className="relative z-20"
        style={{ height: containerHeight }}
      >
        {/* Active card */}
        <div className="fixed inset-0 flex items-center justify-center z-20 pointer-events-none">
          <div className="w-full max-w-md px-4 pointer-events-auto">
            <ProjectCard
              key={`active-${activeProjectIndex}`}
              project={currentProject}
              isActive={true}
            />
          </div>
        </div>

        {/* Scroll sections */}
        {sections.map((section) => (
          <div
            key={section.id}
            id={section.id}
            className="h-screen"
            style={{ minHeight: '100vh' }}
          />
        ))}

        {/* Dot nav */}
        <motion.div
          className="fixed right-8 top-1/3 -translate-y-1/2 z-[9998]"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          style={{ pointerEvents: 'auto' }}
        >
          <div className="bg-black/70 backdrop-blur-md px-3 py-4 flex flex-col gap-4" style={{ pointerEvents: 'auto' }}>
            {projects.map((_, index) => (
              <motion.button
                key={`dot-${index}`}
                onClick={() => handleDotClick(index)}
                className={`w-3 h-3 transition-all duration-150 cursor-pointer hover:scale-125 relative z-[9998] ${
                  index === activeProjectIndex 
                    ? 'bg-orange-500 shadow-lg shadow-orange-500/50' 
                    : 'bg-orange-500/30 hover:bg-orange-500/60'
                }`}
                whileHover={{ scale: 1.3 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                title={`Go to project ${index + 1}`}
                style={{ pointerEvents: 'auto' }}
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
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* Scroll hint */}
        <motion.div
          className="fixed bottom-8 left-8 z-60"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="text-orange-500 text-sm font-light border-b border-orange-500/30 pb-1">
            Scroll
          </div>
        </motion.div>
      </div>
    </>
  );
});

ProjectsScroller.displayName = 'ProjectsScroller';

export default ProjectsScroller; 