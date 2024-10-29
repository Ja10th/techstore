"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import { BsFillArrowUpRightCircleFill, BsMinecart } from "react-icons/bs";
import { RiSearch2Line, RiUser4Line } from "react-icons/ri";
import { useShoppingCart } from "use-shopping-cart";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { contextReader } from "../context/ContextProvider";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { CiSearch } from "react-icons/ci";
import { PiArrowRightThin } from "react-icons/pi";

interface NavbarProps {
  heroHeight: number;
}

const Navbar: React.FC<NavbarProps> = ({ heroHeight }) => {
  const { cartCount } = useShoppingCart();
  const [isScrolledPastHero, setIsScrolledPastHero] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const router = useRouter();
  const contextUse = useContext(contextReader);
  const [query, setQuery] = useState("");

  const searchRef = useRef<HTMLDivElement | null>(null);

  const handleSearchOpen = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const handleSearch = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!query) return;
    router.push(`/search-results?query=${query}`);
  };

  const closeSearch = () => {
    setIsSearchOpen(false);
  };

  // Handle outside clicks
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        closeSearch();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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

  if (!contextUse) {
    throw new Error("Error getting context");
  }

  const { toggleModal } = contextUse;

  const toggleCart = () => {
    router.push("/cart");
  };

  return (
    <>
      {/* Transparent Navbar */}
      {!isScrolledPastHero && (
        <motion.div
          initial={{ filter: "blur(10px)", opacity: 0 }}
          animate={{ filter: "blur(0px)", opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.4, ease: "easeInOut" }}
          className="absolute top-24 flex left-1/2 items-center justify-center transform -translate-x-1/2 h-14 z-50 w-full px-20 text-black bg-white transition-all duration-300"
        >
          <div className="flex items-center justify-center gap-10">
            <Link href="/">
              <p>Infoworld Global</p>
            </Link>
            <div className="hidden md:flex items-center gap-4 text-xs font-light">
              <Link href="/category/all" className="hover:scale-105">
                Shop
              </Link>
              <Link href="/about" className="hover:scale-105">
                About Us
              </Link>
              <Link href="/collaborate" className="hover:scale-105">
                Seller
              </Link>
              <Link href="/blog" className="hover:scale-105">
                Blog
              </Link>
              <Link href="/contact" className="hover:scale-105">
                Contact & FAQ
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/login">
                <RiUser4Line className="text-2xl md:text-lg cursor-pointer hover:scale-150 transition-transform" />
              </Link>
              <RiSearch2Line
                className="text-md cursor-pointer hover:scale-150 transition-transform"
                onClick={() => setIsSearchOpen(true)} // Open search modal
              />
              <div className="relative" onClick={toggleCart}>
                <HiOutlineShoppingBag className="text-md cursor-pointer hover:scale-150 transition-transform" />
                <span className="absolute top-[-5px] right-[-10px] text-xs bg-black text-white font-black rounded-full px-1">
                  {cartCount}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
      {isScrolledPastHero && (
        <motion.div
          initial={{ filter: "blur(10px)", opacity: 0 }}
          animate={{ filter: "blur(0px)", opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6, ease: "easeInOut" }}
          className="fixed top-0 left-1/2 items-center justify-center transform -translate-x-1/2 h-14 z-50 w-full px- py-4 bg-white text-black border-b transition-all duration-300"
        >
          <div className="flex items-center justify-center gap-10">
            <Link href="/">
              <p>Infoworld Global</p>
            </Link>
            <div className="hidden md:flex items-center gap-4 text-xs font-light">
              <Link href="/" className="hover:scale-105">
                Shop
              </Link>
              <Link href="/about" className="hover:scale-105">
                About Us
              </Link>
              <Link href="/collaborate" className="hover:scale-105">
                Seller
              </Link>
              <Link href="/blog" className="hover:scale-105">
                Blog
              </Link>
              <Link href="/contact" className="hover:scale-105">
                Contact & FAQ
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/login">
                <RiUser4Line className="text-2xl md:text-lg cursor-pointer hover:scale-150 transition-transform" />
              </Link>
              <RiSearch2Line
                className="text-2xl md:text-lg cursor-pointer hover:scale-150 transition-transform"
                onClick={handleSearchOpen} // Open search modal
              />
              <div className="relative" onClick={toggleCart}>
                <HiOutlineShoppingBag className="text-2xl md:text-lg cursor-pointer hover:scale-150 transition-transform" />
                <span className="absolute top-[-5px] right-[-10px] text-xs bg-black text-white font-black rounded-full px-1">
                  {cartCount}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
      {isSearchOpen && (
        <motion.div
          ref={searchRef}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="absolute top-14 border-t border-b border border-black left-0 h-[300px] bg-white py-5 w-full z-50"
        >
          <div className="max-w-md mx-auto">
            <form onSubmit={handleSearch} className="flex items-center w-full">
              <span>
                <CiSearch className="text-2xl" />
              </span>
              <input
                type="text"
                className="flex-grow p-2 text-md focus:outline-none"
                placeholder="Search for products..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyUp={(e) => {
                  if (e.key === "Enter") {
                    handleSearch(e);
                  }
                }}
              />
            </form>
            <div className="pt-5">
              <p className="text-xs py-4 font-extralight">Quick Links</p>
              <p className="flex items-center gap-3 py-1 text-xs font-medium">
                <PiArrowRightThin />
                Find a store
              </p>
              <p className="flex items-center gap-3 py-1 text-xs font-medium">
                <PiArrowRightThin />
                Laptops
              </p>
              <p className="flex items-center gap-3 py-1 text-xs font-medium">
                <PiArrowRightThin />
                Wifi
              </p>
              <p className="flex items-center gap-3 py-1 text-xs font-medium">
                <PiArrowRightThin />
                Gift Ideas
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default Navbar;
