"use client";
import { motion } from "framer-motion";
import React from "react";

const items = [
  "Latest iPhone Models Available Now!",
  "Infoworld Global Enterprises",
  "Check Out Our New Laptops!",
  "Infoworld Global Enterprises",
  "Get Your Gaming Console Today!",
  "Infoworld Global Enterprises",
  "Samsung Galaxy S23 - Get Yours Today!",
  "Infoworld Global Enterprises",
  "MacBook Pro Deals - Limited Time Offer!",
  "Infoworld Global Enterprises",
  "PlayStation 5 - Stock Available Now!",
  "Infoworld Global Enterprises",
  "Dell XPS 13 - Unmatched Performance!",
  "Infoworld Global Enterprises",
  "Exclusive Discounts on Gaming Accessories!",
  "Infoworld Global Enterprises",
  "Grab Your Samsung Tablets at Amazing Prices!",
  "Infoworld Global Enterprises",
  "Explore Our Collection of Smart Watches!",
  "Infoworld Global Enterprises",
  "Unleash Your Creativity with Microsoft Surface!",
  "Infoworld Global Enterprises",
  "Best Deals on Home Theater Systems!",
  "Infoworld Global Enterprises",
  "Shop the Latest Tech Gadgets - Don’t Miss Out!",
  "Infoworld Global Enterprises",
  "Upgrade Your Audio Experience with High-Quality Speakers!",
  "Infoworld Global Enterprises",
  "Discover the Future of Smart Home Devices!",
];

const Floating = () => {
  return (
    <motion.div
      initial={{ filter: "blur(10px)", opacity: 0 }}
      animate={{ filter: "blur(0px)", opacity: 1 }}
      transition={{ delay: 1.2, duration: 1.4, ease: "easeInOut" }}
      className=" relative w-full bg-black overflow-hidden"
    >
      <div className="flex whitespace-nowrap animate-marqueer">
        {items.concat(items, items, items).map(
          (
            item,
            index // Duplicating items multiple times for continuous scrolling
          ) => (
            <p key={index} className="uppercase text-white px-4 text-xs py-4">
              {item}
            </p>
          )
        )}
      </div>
    </motion.div>
  );
};

export default Floating;
