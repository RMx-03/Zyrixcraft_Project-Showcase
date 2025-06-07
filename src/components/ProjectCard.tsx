import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import type { Project } from '../data/projects';

interface ProjectCardProps {
  project: Project;
  isActive: boolean;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, isActive }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ 
        opacity: isActive ? 1 : 0.8, 
        y: isActive ? 0 : 20,
        scale: isActive ? 1 : 0.95
      }}
      transition={{ 
        duration: 0.6, 
        ease: [0.23, 1, 0.32, 1]
      }}
      className="relative w-full max-w-md mx-auto flex items-center justify-center min-h-screen pointer-events-none"
    >
      <div className="glass-morph p-6 hover-glow group pointer-events-auto">
        {/* Project Image */}
        <div className="relative overflow-hidden mb-4">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-auto object-contain transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        </div>

        {/* Action Button */}
        <div className="flex justify-center">
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all duration-300 group-hover:translate-x-1"
            onClick={(e) => {
              console.log('Navigating to:', project.liveUrl, 'for project:', project.title);
            }}
          >
            <span className="text-sm font-medium">View Project</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        {/* Decorative Elements */}
        <div className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full opacity-60 animate-pulse" />
        <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-gradient-to-br from-green-400 to-blue-500 rounded-full opacity-40 animate-pulse" style={{ animationDelay: '1s' }} />
      </div>
    </motion.div>
  );
};

export default ProjectCard; 