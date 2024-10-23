'use client';
import React, { useEffect, useState } from "react";
import { BsMinecart } from "react-icons/bs";
import { RiSearch2Line, RiUser4Line } from "react-icons/ri";
import { useShoppingCart } from "use-shopping-cart";
import { useRouter } from 'next/navigation';
import Link from "next/link";

const Navbar = () => {
  const { cartCount } = useShoppingCart();
  const [isFixed, setIsFixed] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const router = useRouter();

  const toggleCart = () => {
    // Navigate to the shopping cart page
    router.push('/cart');
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setIsFixed(prevScrollPos < currentScrollPos); // If scrolling down, set isFixed to true
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos]);

  return (
    <div className={`border-b transition-all duration-300 ${isFixed ? 'fixed top-0 left-0 right-0 z-50 bg-white ' : 'relative bg-transparent'}`}>
      <div className="flex items-center justify-between px-10 md:px-20 h-24">
        <div className="hidden md:flex items-center gap-10 text-sm font-light">
          <p className="text-sm font-light ">Shop</p>
          <p className="text-sm font-light hover:border-b border-black">About Us</p>
          <p className="text-sm font-light hover:border-b border-black">Collaborate</p>
          <p className="text-sm font-light hover:border-b border-black">Blog</p>
        </div>
        <Link
        href='/'
        >
          <img
            src="infologo.png"
            alt="Infoworld logo"
            className="w-44 h-auto object-contain"
          />
        </Link>
        <div className="flex items-center font-light gap-8">
          <p className="text-sm hover:border-b hidden md:flex border-black">Contact & FAQ</p>
          <p>
            <RiUser4Line className="text-2xl hover:scale-125 transition ease-in-out" />
          </p>
          <p>
            <RiSearch2Line className="text-2xl hover:scale-125 transition ease-in-out" />
          </p>
          <p className="flex relative" onClick={toggleCart}>
            <BsMinecart className="text-2xl hover:scale-125 transition ease-in-out" />
            <span className="absolute text-[10px] -right-3 bg-blue-500 text-white rounded-full p-1 px-2 -top-3">{cartCount}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
