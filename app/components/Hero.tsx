"use client";
import { motion } from "framer-motion";
import Floating from "./floating";
import Navbar from "./Navbar";
import Top from "./top";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { HiArrowLongDown } from "react-icons/hi2";

const Hero = () => {
  return (
    <div className="relative z-40">
      {/* Animated Heading */}
      <Floating />
      {/* <Top /> */}
      <Navbar />

      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.2, duration: 1.4, ease: "easeInOut" }}
        className="absolute top-[20%] md:top-[40%] left-1 text-center md:text-left md:left-20 transform -translate-y-1/2 max-w-xl z-20"
      >
        <h1 className="text-6xl md:text-5xl font-[400] text-white">
        Your One-Stop Shop for Tech Accessories
        </h1>
        <div className="flex items-center justify-center md:justify-start text-center pt-5 gap-5 ">
          <p className="border border-black bg-black hover:scale-110 transition-all duration-200 ease-in-out text-white rounded-xl flex items-center px-10 py-3">Shop Now <MdOutlineArrowForwardIos className="text-3xl px-2"/></p>
        </div>

        <div className="w-10 mt-44 hidden h-14 md:flex justify-center rounded-2xl items-center border-2xl py-2 px-3  bg-[#BCA9AB] border border-gray-600">
        <HiArrowLongDown className="text-4xl"/>
        </div>
      </motion.div>

      <motion.div
        initial={{ filter: "blur(10px)", opacity: 0 }}
        animate={{ filter: "blur(0px)", opacity: 1 }}
        transition={{ delay: 1.2, duration: 1.2, ease: "easeInOut" }}
        className="relative z-10"
      >
        <img
          src="https://images.pexels.com/photos/8001222/pexels-photo-8001222.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt="Image"
          className="h-[50rem] w-full object-cover"
        />
      </motion.div>
    </div>
  );
};

export default Hero;
