"use client";
import React, { useContext, useEffect, useState } from "react";
import { BsFillArrowUpRightCircleFill, BsMinecart } from "react-icons/bs";
import { RiSearch2Line, RiUser4Line } from "react-icons/ri";
import { useShoppingCart } from "use-shopping-cart";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { contextReader } from "../context/ContextProvider";
import { LuArrowUpRightFromCircle } from "react-icons/lu";
import { FaCircle } from "react-icons/fa6";

const NavbarCart = () => {
  const { cartCount } = useShoppingCart();
  const [isFixed, setIsFixed] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const router = useRouter();
  
  const contextUse= useContext(contextReader);

  if (!contextUse){
    throw new Error('Error gotten')
  }

  const { toggleModal } = contextUse



  const toggleCart = () => {
    router.push("/cart");
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setIsFixed(currentScrollPos > 0); // Make navbar fixed after scrolling starts
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos]);

  return (
    <motion.div
      initial={{ filter: "blur(10px)", opacity: 0 }}
      animate={{ filter: "blur(0px)", opacity: 1 }}
      transition={{ delay: 1.2, duration: 1.4, ease: "easeInOut" }}
      className={`fixed top-16 left-1/2 items-center justify-center transform -translate-x-1/2 h-14 mt-4  z-50 w-[55%] md:w-[80%] transition-all duration-300 ${
        isFixed ? "bg-white/30 mt-0 text-black backdrop-blur-2xl shadow-lg" : "text-black bg-  "
      } px-4  py-4`}
    >
      <div className="flex items-center justify-between">
        {/* Left Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-light">
          <Link href="/" className="hover:underline">
            Shop
          </Link>
          <Link href="/about" className="hover:underline">
            About Us
          </Link>
          <Link href="/collaborate" className="hover:underline">
            Seller
          </Link>
          <Link href="/blog" className="hover:underline">
            Blog
          </Link>
        </div>

        {/* Logo */}
        <Link href="/">
        <BsFillArrowUpRightCircleFill className="text-3xl text-black border border-white"/>
        </Link>

        {/* Right Icons */}
        <div className="flex items-center gap-8">
          <Link href="/contact" className="hidden md:block text-sm hover:underline">
            Contact & FAQ
          </Link>
          <RiUser4Line
            onClick={toggleModal}
            className="text-xl cursor-pointer hover:scale-110 transition-transform"
          />
          <RiSearch2Line className="text-xl cursor-pointer hover:scale-110 transition-transform" />
          <div className="relative" onClick={toggleCart}>
            <BsMinecart className="text-xl cursor-pointer hover:scale-110 transition-transform" />
            <span className="absolute top-[-5px] right-[-10px] text-xs bg-blue-500 text-white rounded-full px-2 py-1">
              {cartCount}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default NavbarCart;
