import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { label: 'Home', href: 'https://zyrixcraft.in/' },
    { label: 'Services', href: 'https://zyrixcraft.in/' },
    { label: 'Portfolio', href: 'https://zyrixcraft.in/' },
    { label: 'Contact', href: 'https://zyrixcraft.in/' },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 p-6">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-2xl font-display font-bold text-white">
              ZyrixCraft
            </h1>
          </motion.div>

          {/* Hamburger Menu */}
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="bg-black/70 backdrop-blur-md p-3 hover:bg-black/80 transition-all duration-300"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-orange-500" />
            ) : (
              <Menu className="w-6 h-6 text-orange-500" />
            )}
          </motion.button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-lg"
            onClick={() => setIsMenuOpen(false)}
          >
            <motion.div
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -100, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="flex flex-col items-center justify-center h-full space-y-8"
              onClick={(e) => e.stopPropagation()}
            >
              {menuItems.map((item, index) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.2 }}
                  whileHover={{ scale: 1.05, color: "#d1d5db" }}
                  whileTap={{ scale: 0.95 }}
                  className="text-4xl font-display font-light text-white transition-none"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </motion.a>
              ))}
              
              {/* Become A Client Button */}
              <motion.a
                href="https://zyrixcraft.in/"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: menuItems.length * 0.1 + 0.3 }}
                whileHover={{ scale: 1.05, color: "#fb923c" }}
                whileTap={{ scale: 0.95 }}
                className="mt-8 text-4xl font-display font-light text-orange-500 transition-none"
                onClick={() => setIsMenuOpen(false)}
              >
                Become A Client
              </motion.a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar; 