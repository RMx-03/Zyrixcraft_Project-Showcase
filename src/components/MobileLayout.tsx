import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { PanInfo } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { projects } from '../data/projects';

const MobileLayout: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const currentProject = projects[currentIndex];

  // Solid color palette for different projects (no gradients)
  const cardColors = [
    'bg-blue-600',
    'bg-purple-600', 
    'bg-green-600',
    'bg-orange-600',
    'bg-pink-600',
    'bg-indigo-600'
  ];

  // Stats data from desktop version
  const statsData = [
    { value: "10+", label: "Projects Delivered" },
    { value: "95%", label: "Client Satisfaction" }, 
    { value: "2.5x", label: "Average ROI" }
  ];

  const handleSwipe = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const swipeThreshold = 50;
    
    if (info.offset.x > swipeThreshold) {
      // Swipe right - previous project
      if (currentIndex > 0) {
        setDirection(-1);
        setCurrentIndex(currentIndex - 1);
      }
    } else if (info.offset.x < -swipeThreshold) {
      // Swipe left - next project
      if (currentIndex < projects.length - 1) {
        setDirection(1);
        setCurrentIndex(currentIndex + 1);
      }
    }
  };

  const handleDotClick = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  const handleCardClick = () => {
    window.open(currentProject.liveUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center p-6">
        <h1 className="text-2xl font-display font-bold text-orange-500">
          ZyrixCraft
        </h1>
        <button
          onClick={() => window.open('https://zyrixcraft.in/', '_blank', 'noopener,noreferrer')}
          className="bg-black/70 backdrop-blur-md px-4 py-2 text-white flex items-center space-x-2 hover:bg-black/80 transition-colors"
        >
          <span className="text-orange-500 font-semibold">Let's Talk</span>
          <ArrowRight className="w-4 h-4 text-orange-500" />
        </button>
      </div>

      {/* Upper Half - Title and Statistics */}
      <div className="flex-1 flex flex-col justify-center px-6 pb-1">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="text-center space-y-4"
        >
          {/* Main Title */}
          <div>
            <h1 className="text-4xl font-display font-bold text-white leading-tight">
              We Transform
              <br />
              <span className="text-gradient">Ideas</span> Into <span className="text-gradient">Digital</span>
              <br />
              Experiences
            </h1>
          </div>

          {/* Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-lg text-gray-300 font-light">
              A Digital Agency for Growth,
              <br />
              UI/UX & Innovation
            </p>
          </motion.div>

          {/* Statistics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-3 gap-4 pt-2 max-w-sm mx-auto"
          >
            {statsData.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-xl font-bold text-white">{stat.value}</div>
                <div className="text-xs text-gray-400 leading-tight">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Lower Half - Project Cards */}
      <div className="flex-1 flex flex-col justify-center px-6 pt-1">
        {/* Project Cards Container - Further increased height */}
        <div className="relative w-full h-96 mb-4">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              initial={{ opacity: 0, x: direction > 0 ? 300 : -300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction > 0 ? -300 : 300 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={handleSwipe}
              onClick={handleCardClick}
              className="absolute inset-0 cursor-pointer"
            >
              {/* Card with Screenshot */}
              <div className="h-full bg-white shadow-2xl overflow-hidden">
                {/* Screenshot */}
                <div className="h-3/5 relative overflow-hidden">
                  <img
                    src={currentProject.image}
                    alt={currentProject.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Card Info Section */}
                <div className={`h-2/5 ${cardColors[currentIndex]} p-4 flex flex-col justify-between`}>
                  <div>
                    <h2 className="text-lg font-bold text-white mb-2 leading-tight">
                      {currentProject.title}
                    </h2>
                    <p className="text-white/90 text-sm leading-relaxed">
                      {currentProject.description.length > 120 
                        ? currentProject.description.substring(0, 120) + '...'
                        : currentProject.description
                      }
                    </p>
                  </div>

                  {/* Category */}
                  <div className="flex justify-between items-end">
                    <span className="px-3 py-1 text-xs bg-white/30 text-white">
                      {currentProject.category}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center space-x-3 mb-4">
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`w-3 h-3 transition-all duration-200 ${
                index === currentIndex
                  ? 'bg-orange-500 scale-125'
                  : 'bg-white/30 hover:bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MobileLayout; 