'use client'
import { motion } from "framer-motion";
import React from "react";

const ClassifyFirst = () => {
  return (
    <div className="w-full pb-20">
      <motion.div
        initial={{ filter: "blur(10px)", opacity: 0 }}
        whileInView={{ filter: "blur(0px)", opacity: 1 }}
        transition={{ delay: 1.2, duration: 1.2, ease: "easeInOut" }}
        className="flex flex-col md:flex-row h-[1000px] relative"
      >
        {/* Image Section */}
        <div className="relative flex-1">
          <img
            src="https://images.pexels.com/photos/5234774/pexels-photo-5234774.jpeg?auto=compress&cs=tinysrgb&w=800"
            alt="Phone Collection"
            className="w-full h-full object-cover"
          />
          {/* Sticky Text for Image */}
          <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
            <a
              href="/shop-phones"
              className="bg-blue-500 text-white py-3 px-6 rounded-xl hover:bg-blue-600 text-lg"
            >
              Shop Phones
            </a>
          </div>
        </div>

        {/* Video Section */}
        <div className="relative flex-1">
          <video
            src="phone.mp4"
            className="w-full h-full object-cover object-center"
            autoPlay
            loop
            muted
          />
          {/* Sticky Text for Video */}
          <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
            <a
              href="/shop-phones"
              className="bg-green-500 text-white py-3 px-6 rounded-xl hover:bg-green-600 text-lg"
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
