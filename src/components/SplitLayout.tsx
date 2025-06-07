import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import LetsTalkModal from './LetsTalkModal';
import type { Project } from '../data/projects';

interface SplitLayoutProps {
  currentProject: Project;
}

const SplitLayout: React.FC<SplitLayoutProps> = ({ currentProject }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="fixed inset-0 flex z-0">
        {/* Left Half - Dark Side */}
        <div className="w-1/2 bg-zyrix-dark flex flex-col justify-center px-12 lg:px-16 relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8 relative z-10"
          >
            {/* Main Title */}
            <div>
              <h1 className="text-4xl lg:text-6xl xl:text-7xl font-display font-bold text-white leading-tight">
                We Transform
                <br />
                <span className="text-gradient">Ideas Into</span>
                <br />
                Impactful Digital
                <br />
                Experiences.
              </h1>
            </div>

            {/* Subheading */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <p className="text-xl lg:text-2xl text-gray-300 font-light max-w-lg">
                A Digital Agency for Growth, UI/UX & Web Innovation
              </p>
            </motion.div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <button
                onClick={() => setIsModalOpen(true)}
                className="group glass-morph px-8 py-4 rounded-full text-white font-medium text-lg hover-glow flex items-center space-x-3"
              >
                <span>Let's Talk</span>
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
              className="grid grid-cols-3 gap-8 pt-8"
            >
              <div>
                <div className="text-3xl font-bold text-white">50+</div>
                <div className="text-sm text-gray-400">Projects Delivered</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white">95%</div>
                <div className="text-sm text-gray-400">Client Satisfaction</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white">3x</div>
                <div className="text-sm text-gray-400">Average ROI</div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Right Half - Dynamic Project Display */}
        <div className="w-1/2 relative overflow-hidden">
          <motion.div
            key={currentProject.id}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <img
              src={currentProject.image}
              alt={currentProject.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-transparent via-black/20 to-black/40" />
            
            {/* Project Title Overlay */}
            <div className="absolute bottom-8 left-8 right-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
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

          {/* Decorative Grid */}
          <div className="absolute inset-0 opacity-10">
            <div className="grid grid-cols-12 grid-rows-12 h-full">
              {Array.from({ length: 144 }, (_, i) => (
                <div
                  key={i}
                  className="border border-white/10"
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <LetsTalkModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default SplitLayout; 