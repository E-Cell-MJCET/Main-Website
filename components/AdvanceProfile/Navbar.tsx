'use client';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { useState } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

import MenuItem from './menu-items';
import { GithubIcon, LinkedInIcon } from './social-icons';

const navItems = [
  { name: 'Projects', href: '#work' },
  { name: 'Skills', href: '#skills' },
  { name: 'Experience', href: '#experience' },
  { name: 'Contact', href: '#contact' },
];

const socialLinks = {
  github: "https://github.com/yourusername",
  linkedin: "https://linkedin.com/in/yourusername",
  twitter: "https://twitter.com/yourusername"
};

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setIsScrolled(latest > 50);
  });

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed z-50 w-full ${isScrolled
        ? 'bg-background/90 shadow-2xl shadow-primary/10 backdrop-blur-2xl'
        : 'bg-background/50 backdrop-blur-lg'
        } transition-all duration-300 ease-out`}
    >
      <div className="mx-auto max-w-7xl px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Logo Section */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="group flex items-center gap-2"
          >
            <div className="relative size-8 overflow-hidden rounded-full">
              <div className="to-tertiary animate-spin-slow absolute inset-0 bg-gradient-to-r from-primary [mask-image:linear-gradient(transparent,white)]" />
              <div className="absolute inset-[2px] flex items-center justify-center rounded-full bg-background">
                <span className="to-tertiary bg-gradient-to-r from-primary bg-clip-text font-bold text-transparent">
                  JS
                </span>
              </div>

            </div>
            <span className="text-content/90 font-semibold transition-colors group-hover:text-primary">
              John Smith
            </span>
          </motion.div>
          {/* Desktop Navigation */}
          <div className="hidden items-center gap-6 md:flex">
            <div className="flex items-center gap-6 rounded-full border border-white/5 
            bg-background/80 px-4 py-2 shadow-lg shadow-primary/5">
              {navItems.map((item, i) => (
                <MenuItem key={item.name} index={i} href={item.href}>
                  {item.name}
                </MenuItem>
              ))}
            </div>
            <div className="mx-2 h-6 w-px bg-white/10" />
            <div className="flex gap-3">
              <a
                href={socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-lg bg-white/5 p-2 transition-colors hover:bg-primary/10"
              >
                <GithubIcon className="text-content/80 size-5 transition-colors group-hover:text-primary" />
              </a>
              <a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-lg bg-white/5 p-2 transition-colors hover:bg-primary/10"
              >
                <LinkedInIcon className="text-content/80 size-5 transition-colors group-hover:text-primary" />
              </a>
            </div>
          </div>
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="rounded-lg bg-white/5 p-2 transition-colors hover:bg-primary/10 md:hidden"
          >
            {isMenuOpen ? (
              <XMarkIcon className="text-content/80 size-6" />
            ) : (
              <Bars3Icon className="text-content/80 size-6" />
            )}
          </button>
        </div>
        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 space-y-4 pb-4 md:hidden"
          >
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="text-content/80 block rounded-lg px-4 py-2 transition-colors 
                hover:bg-white/5 hover:text-primary"
              >
                {item.name}
              </a>
            ))}
            <div className="flex gap-4 border-t border-white/5 pt-4">
              <a
                href={socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-lg bg-white/5 p-2 transition-colors hover:bg-primary/10"
              >
                <GithubIcon className="text-content/80 size-5 transition-colors group-hover:text-primary" />
              </a>
              <a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-lg bg-white/5 p-2 transition-colors hover:bg-primary/10"
              >
                <LinkedInIcon className="text-content/80 size-5 transition-colors group-hover:text-primary" />
              </a>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}