'use client';
import React from 'react';

const items = [
    "Latest iPhone Models Available Now!",
    "Check Out Our New Laptops!",
    "Get Your Gaming Console Today!",
    "Samsung Galaxy S23 - Get Yours Today!",
    "MacBook Pro Deals - Limited Time Offer!",
    "PlayStation 5 - Stock Available Now!",
    "Dell XPS 13 - Unmatched Performance!",
    "Exclusive Discounts on Gaming Accessories!",
    "Grab Your Samsung Tablets at Amazing Prices!",
    "Explore Our Collection of Smart Watches!",
    "Unleash Your Creativity with Microsoft Surface!",
    "Best Deals on Home Theater Systems!",
    "Shop the Latest Tech Gadgets - Don’t Miss Out!",
    "Upgrade Your Audio Experience with High-Quality Speakers!",
    "Discover the Future of Smart Home Devices!",
];

const Floating = () => {
  return (
    <div className="relative w-full bg-blue-500 overflow-hidden">
      <div className="flex whitespace-nowrap animate-marquee">
        {items.concat(items, items, items).map((item, index) => ( // Duplicating items multiple times for continuous scrolling
          <p key={index} className='uppercase text-white px-4 text-xs py-2'>
            {item}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Floating;
