import React, { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Phone, MessageCircle } from 'lucide-react';

interface LetsTalkModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LetsTalkModal: React.FC<LetsTalkModalProps> = React.memo(({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    project: '',
    message: ''
  });

  // Memoize contact options to prevent re-creation
  const contactOptions = useMemo(() => [
    {
      icon: Mail,
      label: 'Email',
      value: 'hello@zyrixcraft.com',
      color: 'text-blue-400'
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+1 (555) 123-4567',
      color: 'text-green-400'
    },
    {
      icon: MessageCircle,
      label: 'Schedule',
      value: 'Book a call',
      color: 'text-purple-400'
    }
  ], []);

  // Memoize project options
  const projectOptions = useMemo(() => [
    { value: '', label: 'Select a project type' },
    { value: 'web-development', label: 'Web Development' },
    { value: 'mobile-app', label: 'Mobile App' },
    { value: 'ui-ux-design', label: 'UI/UX Design' },
    { value: 'branding', label: 'Branding' },
    { value: 'other', label: 'Other' }
  ], []);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    onClose();
  }, [formData, onClose]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }, []);

  const stopPropagation = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
  }, []);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="glass-morph rounded-2xl p-8 w-full max-w-2xl relative"
            onClick={stopPropagation}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition-colors"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            {/* Header */}
            <div className="text-center mb-8">
              <h2 className="text-3xl font-display font-bold text-white mb-2">
                Let's Talk
              </h2>
              <p className="text-gray-300">
                Ready to transform your vision into reality? Let's discuss your project.
              </p>
            </div>

            {/* Contact Options */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {contactOptions.map((option, index) => {
                const Icon = option.icon;
                return (
                  <div key={index} className="flex items-center space-x-3 p-4 rounded-lg bg-white/5">
                    <Icon className={`w-5 h-5 ${option.color}`} />
                    <div>
                      <p className="text-sm text-gray-400">{option.label}</p>
                      <p className="text-white">{option.value}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-white/30 transition-colors"
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-white/30 transition-colors"
                    placeholder="john@example.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Project Type
                </label>
                <select
                  name="project"
                  value={formData.project}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-white/30 transition-colors"
                  required
                >
                  {projectOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Project Details
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-white/30 transition-colors resize-none"
                  placeholder="Tell us about your project, goals, and timeline..."
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 px-6 rounded-lg bg-white text-black font-medium hover:bg-gray-100 transition-colors"
              >
                Send Message
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
});

LetsTalkModal.displayName = 'LetsTalkModal';

export default LetsTalkModal; 