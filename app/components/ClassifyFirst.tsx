"use client";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";

const ClassifyFirst = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="w-full pb-20">
      <motion.div
        initial={{ filter: "blur(10px)", opacity: 0 }}
        whileInView={{ filter: "blur(0px)", opacity: 1 }}
        transition={{ delay: 1.2, duration: 1.2, ease: "easeInOut" }}
        className="flex flex-col md:flex-row h-[1000px] relative"
      >
        {/* Image Section */}
        <div className="relative flex-1 group bg-black overflow-hidden">
          {/* Image Section */}
          <img
            src="https://images.pexels.com/photos/5234774/pexels-photo-5234774.jpeg?auto=compress&cs=tinysrgb&w=800"
            alt="Phone Collection"
            className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-50"
          />

          {/* Sticky Text for Image */}
          <div
            className="absolute top-0 left-1/2 transform -translate-x-1/2 text-center"
            style={{
              top: `${scrollPosition * 0.5}px`, // Adjust the multiplier to control speed
              transition: "top 0.1s ease-out",
            }}
          >
            <a
              href="/shop-phones"
              className="text-white underline py-3 px-6 rounded-xl  hover:no-underline text-lg"
            >
              Shop Phones
            </a>
          </div>
        </div>

        {/* Video Section */}
        <div className="relative flex-1 overflow-hidden">
          {/* Video Section */}
          <video
            src="phone.mp4"
            className="w-full h-full object-cover object-center"
            autoPlay
            loop
            muted
          />

          {/* Sticky Moving Text */}
          <div
            className="absolute top-0 left-1/2 transform -translate-x-1/2 text-center"
            style={{
              top: `${scrollPosition * 0.5}px`, // Adjust the multiplier to control speed
              transition: "top 0.1s ease-out",
            }}
          >
            <a
              href="/shop-phones"
              className="text-black underline py-3 px-6 rounded-xl hover:bg-green-600 text-lg"
            >
              Shop Phones
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ClassifyFirst;
