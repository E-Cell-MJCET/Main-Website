import React from 'react';
import { motion } from 'framer-motion';

const Loading = () => {
  // Animation variants for the pulsing dots
  const dotVariants = {
    initial: { scale: 0.5, opacity: 0.5 },
    animate: {
      scale: [0.8, 1.2, 0.8], // Pulsating effect
      opacity: [0.7, 1, 0.7],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  };

  // Animation variants for the text
  const textVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        repeat: Infinity,
        repeatType: 'reverse' as const,
      },
    },
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background: 'linear-gradient(135deg, #1a1a1a, #0d0d0d)', // Dark gradient background
        color: '#fff',
        flexDirection: 'column',
      }}
    >
      {/* Pulsating Dot Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '20px',
        }}
      >
        {[...Array(9)].map((_, index) => (
          <motion.div
            key={index}
            style={{
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              backgroundColor:
                index % 3 === 0
                  ? '#00ccff' // Blue
                  : index % 3 === 1
                  ? '#ff0066' // Red
                  : '#00ffcc', // Green
            }}
            variants={dotVariants}
            initial="initial"
            animate="animate"
          />
        ))}
      </div>
      {/* Loading Text with Gradient Color */}
      <motion.p
        style={{
          marginTop: '40px',
          fontSize: '1.5rem',
          fontWeight: 'bold',
          background: 'linear-gradient(90deg, #00ccff, #ff0066, #00ffcc)',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          color: 'transparent',
        }}
        variants={textVariants}
        initial="initial"
        animate="animate"
      >
        Loading your experience...
      </motion.p>
    </div>
  );
}

export default Loading;