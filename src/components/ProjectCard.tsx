import React, { useState, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import type { Project } from '../data/projects';

interface ProjectCardProps {
  project: Project;
  isActive: boolean;
}

const ProjectCard: React.FC<ProjectCardProps> = React.memo(({ project, isActive }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleImageLoad = useCallback(() => {
    setImageLoaded(true);
  }, []);

  const handleImageError = useCallback(() => {
    setImageLoaded(true); // Still show card even if image fails
  }, []);

  const handleCardClick = useCallback(() => {
    window.open(project.liveUrl, '_blank', 'noopener,noreferrer');
  }, [project.liveUrl]);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
    document.body.style.cursor = 'none';
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    document.body.style.cursor = 'auto';
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  }, []);

  useEffect(() => {
    return () => {
      document.body.style.cursor = 'auto';
    };
  }, []);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ 
          opacity: isActive ? 1 : 0.8, 
          y: isActive ? 0 : 20,
          scale: isActive ? (isHovered ? 3 : 1.2) : (isHovered ? 2.4 : 0.95)
        }}
        transition={{ 
          duration: isHovered ? 0.4 : 0.5, 
          ease: [0.16, 1, 0.3, 1],
          opacity: { duration: 0.3 },
          scale: { duration: isHovered ? 0.4 : 0.5 },
          y: { duration: 0.5 }
        }}
        className="relative w-full max-w-md mx-auto flex items-center justify-center min-h-screen"
      >
        <div 
          className="glass-morph p-4 hover-glow group relative overflow-hidden"
          onClick={handleCardClick}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onMouseMove={handleMouseMove}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleCardClick();
            }
          }}
          aria-label={`Open ${project.title} project`}
          style={{
            width: '320px',
            height: '240px',
          }}
        >
          {/* Image container - centered with equal margins on all sides */}
          <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
            {!imageLoaded && (
              <div className="absolute inset-0 bg-gray-800 animate-pulse" />
            )}
            <img
              src={project.image}
              alt={project.title}
              className={`max-w-full max-h-full object-contain transition-all duration-300 ${
                imageLoaded 
                  ? 'opacity-100' 
                  : 'opacity-0'
              }`}
              loading="lazy"
              onLoad={handleImageLoad}
              onError={handleImageError}
              style={{
                filter: isHovered ? 'brightness(1.1)' : 'brightness(1)',
              }}
            />
          </div>
        </div>
      </motion.div>

      {/* Custom Cursor */}
      {isHovered && (
        <div
          className="fixed pointer-events-none z-[9999]"
          style={{
            left: mousePosition.x,
            top: mousePosition.y,
            transform: 'translate(-50%, -50%)',
          }}
        >
          <div className="relative w-28 h-28">
            {/* Rotating text - using Framer Motion for reliable animation */}
            <motion.div
              className="absolute inset-0"
              animate={{ rotate: 360 }}
              transition={{
                duration: 8,
                ease: "linear",
                repeat: Infinity,
              }}
            >
              <svg viewBox="0 0 128 128" className="w-full h-full">
                <defs>
                  <path
                    id="circle-path"
                    d="M 64, 64 m -50, 0 a 50,50 0 1,1 100,0 a 50,50 0 1,1 -100,0"
                  />
                </defs>
                <text className="text-xs font-large fill-orange-500" style={{ letterSpacing: '3.85px' }}>
                  <textPath href="#circle-path" startOffset="0%">
                    VIEW PROJECT • VIEW PROJECT • 
                  </textPath>
                </text>
              </svg>
            </motion.div>
            
            {/* Center arrow */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 bg-orange-500 flex items-center justify-center">
                <svg 
                  width="16" 
                  height="16" 
                  viewBox="0 0 16 16" 
                  fill="none" 
                  className="text-white"
                >
                  <path 
                    d="M1 15L15 1M15 1H6M15 1V10" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
});

ProjectCard.displayName = 'ProjectCard';

export default ProjectCard; 