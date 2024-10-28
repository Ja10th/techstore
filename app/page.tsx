'use client'
import { useRef, useEffect, useState } from "react";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import ProductList from "./components/ProductLust";
import Floating from "./components/floating";
import ClassifyFirst from "./components/ClassifyFirst";
import ProductOne from "./components/ProductOne";
import Top from "./components/top";

export default function Home() {
  const heroRef = useRef<HTMLDivElement | null>(null); // Specify type for the ref
  const [heroHeight, setHeroHeight] = useState<number>(0); // Set initial state type to number

  useEffect(() => {
    if (heroRef.current) {
      setHeroHeight(heroRef.current.clientHeight); // Accessing clientHeight is now valid
    }
  }, [heroRef]);

  return (
    <>
     <Top />
      <Navbar heroHeight={heroHeight} />
      <div ref={heroRef}>
        <Hero />
      </div>
      <ClassifyFirst />
      <ProductList />
      <Floating />
      <ProductOne />
    </>
  );
}
