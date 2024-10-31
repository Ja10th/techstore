"use client";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import Floating from "./FloatingTwo";

const ClassifyFirst = () => {
  return (
    <div className="w-full">
      <Floating />
      <motion.div
        initial={{ filter: "blur(10px)", opacity: 0 }}
        whileInView={{ filter: "blur(0px)", opacity: 1 }}
        transition={{ delay: 1.2, duration: 1.2, ease: "easeInOut" }}
        className="flex flex-col md:flex-row h-[2200px] md:h-[500px] relative"
      >
        {/* Image Section */}
        <div className="relative flex-1 group bg-black overflow-hidden">
          {/* Image Section */}
          <img
            src="https://images.pexels.com/photos/16149966/pexels-photo-16149966/free-photo-of-get-ready-for-the-future-with-samsung-galaxy-s23.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="Phone Collection"
            className="w-full h-full object-cover border-b border-t border-black  opacity-80 group-hover:scale-125 overflow-hidden transition-all duration-500 ease-in-out"
          />

          {/* Sticky Text for Image */}
          <div className="absolute bottom-4 bg-white border group-hover:bg-black  border-black rounded-2xl py-2 px-4  left-1/2 transform -translate-x-1/2 text-center">
            <a
              href="/category/phones"
              className="text-black group-hover:text-white no-underline py-3 px-6 rounded-xl  hover:underline text-sm"
            >
              Shop Phones
            </a>
          </div>
        </div>
        <div className="relative flex-1 group bg-black overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-50 pointer-events-none"></div>
          {/* Image Section */}
          <img
            src="https://images.pexels.com/photos/3945659/pexels-photo-3945659.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="Phone Collection"
            className="w-full h-full object-cover border-b border-t border-black   opacity-80 group-hover:scale-125 overflow-hidden transition-all duration-500 ease-in-out"
          />

          {/* Sticky Text for Image */}
          <div className="absolute bottom-4 bg-white group-hover:bg-black border border-black rounded-2xl py-2 px-4  left-1/2 transform -translate-x-1/2 text-center">
            <a
              href="/category/consoles"
              className="text-black group-hover:text-white no-underline py-3 px-6 rounded-xl  hover:underline text-sm"
            >
              Order Consoles
            </a>
          </div>
        </div>
        <div className="relative flex-1 group bg-black overflow-hidden">
          {/* Black Overlay */}
          <div className="absolute inset-0 bg-black opacity-50 pointer-events-none"></div>

          {/* Image Section */}
          <img
            src="https://images.pexels.com/photos/2528118/pexels-photo-2528118.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="Phone Collection"
            className="w-full h-full object-cover opacity-80 transition-transform duration-500 ease-in-out group-hover:scale-110"
          />

          {/* Sticky Text Button */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white border border-black rounded-2xl py-2 px-4 text-center transition-colors duration-300 ease-in-out group-hover:bg-black">
            <a
              href="/category/laptop"
              className="text-black group-hover:text-white no-underline py-3 px-6 rounded-xl hover:underline text-sm"
            >
              Buy Laptops
            </a>
          </div>
        </div>

        {/* Video Section */}
        <div className="relative flex-1 overflow-hidden group bg-black">
          {/* Video Section */}
          <img
            src="https://images.pexels.com/photos/7772548/pexels-photo-7772548.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            className="w-full h-full object-cover border-b border-t border-black opacity-80 object-center  group-hover:scale-125 overflow-hidden transition-all duration-500 ease-in-out"
            alt="Phone Collection"
          />

          {/* Sticky Moving Text */}
          <div className="absolute bottom-4 bg-white group-hover:bg-black border border-black py-2 px-4 rounded-2xl left-1/2 transform -translate-x-1/2 text-center">
            <a
              href="/category/headset"
              className="text-black group-hover:text-white no-underline py-3 px-6 rounded-xl hover:underline text-sm"
            >
              Shop Headset
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ClassifyFirst;
