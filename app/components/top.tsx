'use client'
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const messages = [
  'Subscribe & save 15 %',
  'Free shipping for products over NGN 500,000',
  'iPhone 16 is in stock',
  'PS4 is in stock'
];

const Top = () => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessageIndex((prevIndex) =>
        prevIndex === messages.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000); // Change message every 4 seconds

    return () => clearInterval(interval); // Cleanup the interval on unmount
  }, []);

  return (
    <div className="h-14 w-full bg-black text-white text-xs flex items-center justify-center">
      <motion.p
        key={currentMessageIndex} // Use key to trigger re-mounting of the component
        initial={{ opacity: 0 }} // Initial opacity
        animate={{ opacity: 1 }} // Animate to full opacity
        exit={{ opacity: 0 }} // Fade out on exit
        transition={{ duration: 1 }} // Duration of the fade effect
      >
        {messages[currentMessageIndex]}
      </motion.p>
    </div>
  );
};

export default Top;
