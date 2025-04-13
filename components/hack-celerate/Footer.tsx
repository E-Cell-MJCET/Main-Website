'use client';
import React, { useEffect, useRef } from 'react';
import { animate } from 'animejs';
import Link from 'next/link';
import { FaTwitter, FaGithub, FaLinkedinIn, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  const textRef = useRef<HTMLDivElement>(null);
    
  useEffect(() => {
    const text = 'Hack-Celerate';
    const container = textRef.current;

    if (container) {
      // Clear any existing content
      container.innerHTML = '';

      // Split the text into individual characters and wrap each in a span
      text.split('').forEach((char) => {
        const span = document.createElement('span');
        span.textContent = char;
        span.classList.add('inline-block');
        container.appendChild(span);
      });

      // Animate each span using Anime.js
      animate('span', {
        // Property keyframes
        y: [
          { to: '-2.75rem', ease: 'outExpo', duration: 600 },
          { to: 0, ease: 'outBounce', duration: 800, delay: 100 }
        ],
        // Property specific parameters
        rotate: {
          from: '-1turn',
          delay: 0
        },
        delay: (_:any, i:any) => i * 50, // Function based value
        ease: 'inOutCirc',
        loopDelay: 1000,
        loop: true
      });
    }
  }, []);

  return (
    <footer className="bg-[#0e0e0e] text-gray-300 py-12 px-6 md:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="flex flex-col">
          <div
            ref={textRef}
            className="text-2xl sm:text-3xl md:text-4xl font-bold">
            {/* Animation content will be inserted here by useEffect */}
          </div>
          {/* Short description paragraph */}
          <p className="text-sm mt-4 mb-3">
            Accelerating innovation through collaborative hacking and creative problem-solving.
          </p>
          {/* Social Icons using react-icons */}
          <div className="flex space-x-4 mt-1">
            <Link href="#" className="text-gray-300 hover:text-white transition-colors">
              <FaTwitter size={20} />
            </Link>
            <Link href="#" className="text-gray-300 hover:text-white transition-colors">
              <FaGithub size={20} />
            </Link>
            <Link href="#" className="text-gray-300 hover:text-white transition-colors">
              <FaLinkedinIn size={20} />
            </Link>
            <Link href="#" className="text-gray-300 hover:text-white transition-colors">
              <FaInstagram size={20} />
            </Link>
          </div>
        </div>
        {/* Quick Links */}
        <div>
          <h4 className="text-white font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="#" className="hover:underline">Home</Link></li>
            <li><Link href="#" className="hover:underline">About</Link></li>
            <li><Link href="#" className="hover:underline">Timeline</Link></li>
            <li><Link href="#" className="hover:underline">Prizes</Link></li>
            <li><Link href="#" className="hover:underline">Sponsors</Link></li>
          </ul>
        </div>
        {/* Resources */}
        <div>
          <h4 className="text-white font-semibold mb-4">Resources</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="#" className="hover:underline">Venue Guide</Link></li>
            <li><Link href="#" className="hover:underline">Hacker's Guide</Link></li>
            <li><Link href="#" className="hover:underline">Code of Conduct</Link></li>
            <li><Link href="#" className="hover:underline">Discord</Link></li>
            <li><Link href="#" className="hover:underline">FAQ</Link></li>
          </ul>
        </div>
        {/* Subscribe */}
        <div>
          <h4 className="text-white font-semibold mb-4">Stay Updated</h4>
          <p className="text-sm mb-4">
            Subscribe to our newsletter for updates and announcements.
          </p>
          <div className="flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-2 rounded-l-md bg-[#1e1e1e] text-white border border-[#333] outline-none"
            />
            <button className="bg-red-500 text-white px-4 rounded-r-md hover:bg-red-600">
              Subscribe
            </button>
          </div>
        </div>
      </div>
      <div className="mt-12 text-center text-xs text-gray-500">
        Designed with ❤️ by the <Link href={'https://ecellmjcet.com'}> E-Cell MJCET </Link> Tech Team | Powered by innovation and creativity
      </div>
    </footer>
  );
};

export default Footer;