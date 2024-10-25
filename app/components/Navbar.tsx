"use client";
import React, { useContext, useEffect, useState } from "react";
import { BsFillArrowUpRightCircleFill, BsMinecart } from "react-icons/bs";
import { RiSearch2Line, RiUser4Line } from "react-icons/ri";
import { useShoppingCart } from "use-shopping-cart";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { contextReader } from "../context/ContextProvider";

interface NavbarProps {
  heroHeight: number;
}

const Navbar: React.FC<NavbarProps> = ({ heroHeight }) => {
  const { cartCount } = useShoppingCart();
  const [isScrolledPastHero, setIsScrolledPastHero] = useState(false);
  const router = useRouter();
  const contextUse = useContext(contextReader);

  if (!contextUse) {
    throw new Error("Error getting context");
  }

  const { toggleModal } = contextUse;

  const toggleCart = () => {
    router.push("/cart");
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      setIsScrolledPastHero(currentScrollPos > heroHeight);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [heroHeight]);

  return (
    <>
      {/* Transparent Navbar */}
      {!isScrolledPastHero && (
        <motion.div
        initial={{ filter: "blur(10px)", opacity: 0 }}
        animate={{ filter: "blur(0px)", opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6, ease: "easeInOut" }}
          className="absolute top-3 left-1/2 items-center justify-center transform -translate-x-1/2 h-14 z-50 w-full px-20 text-white bg-transparent transition-all duration-300"
        >
          <div className="flex items-center justify-center gap-10">
            <Link href="/">
              <BsFillArrowUpRightCircleFill className="text-2xl border border-black text-black bg-white rounded-full" />
            </Link>
            <div className="hidden md:flex items-center gap-4 text-xs font-light">
              <Link href="/" className="hover:scale-105">Shop</Link>
              <Link href="/about" className="hover:scale-105">About Us</Link>
              <Link href="/collaborate" className="hover:scale-105">Seller</Link>
              <Link href="/blog" className="hover:scale-105">Blog</Link>
              <Link href="/contact" className="hover:scale-105">Contact & FAQ</Link>
            </div>
            <div className="flex items-center gap-4">
              <RiUser4Line
                onClick={toggleModal}
                className="text-lg cursor-pointer hover:scale-150 transition-transform"
              />
              <RiSearch2Line className="text-md cursor-pointer hover:scale-150 transition-transform" />
              <div className="relative" onClick={toggleCart}>
                <BsMinecart className="text-md cursor-pointer hover:scale-150 transition-transform" />
                <span className="absolute top-[-5px] right-[-10px] text-xs bg-black text-white font-black rounded-full px-1">
                  {cartCount}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Fixed White Navbar */}
      {isScrolledPastHero && (
        <motion.div
          initial={{ filter: "blur(10px)", opacity: 0 }}
          animate={{ filter: "blur(0px)", opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6, ease: "easeInOut" }}
          className="fixed left-1/2 items-center justify-center transform -translate-x-1/2 h-14 z-50 w-full px- py-4 bg-white text-black border-b transition-all duration-300"
        >
          <div className="flex items-center justify-center gap-10">
            <Link href="/">
              <BsFillArrowUpRightCircleFill className="text-2xl border border-black text-black bg-white rounded-full" />
            </Link>
            <div className="hidden md:flex items-center gap-4 text-xs font-light">
              <Link href="/" className="hover:scale-105">Shop</Link>
              <Link href="/about" className="hover:scale-105">About Us</Link>
              <Link href="/collaborate" className="hover:scale-105">Seller</Link>
              <Link href="/blog" className="hover:scale-105">Blog</Link>
              <Link href="/contact" className="hover:scale-105">Contact & FAQ</Link>
            </div>
            <div className="flex items-center gap-4">
              <RiUser4Line
                onClick={toggleModal}
                className="text-lg cursor-pointer hover:scale-150 transition-transform"
              />
              <RiSearch2Line className="text-md cursor-pointer hover:scale-150 transition-transform" />
              <div className="relative" onClick={toggleCart}>
                <BsMinecart className="text-md cursor-pointer hover:scale-150 transition-transform" />
                <span className="absolute top-[-5px] right-[-10px] text-xs bg-black text-white font-black rounded-full px-1">
                  {cartCount}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default Navbar;
