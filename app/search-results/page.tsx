"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { PiEmpty } from "react-icons/pi";
import Link from "next/link";
import { motion } from "framer-motion";
import Top from "../components/top";
import Floating from "../components/floating";
import NavbarCart from "../components/NavbarCart";
import { urlForImage } from "../components/AddtoCart";
import Image from "next/image";

// Main search results page
const SearchResultsPage = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";
  const [results, setResults] = useState<any[]>([]);
  const [hoveredProduct, setHoveredProduct] = useState<any | null>(null);

  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  useEffect(() => {
    if (query) {
      const fetchData = async () => {
        try {
          // Use query as a template literal
          const data = await client.fetch(
            `*[_type == "product" && name match $searchQuery + "*"]`,
            { searchQuery: query } // Pass the query as searchQuery
          );
          setResults(data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      fetchData();
    }
  }, [query]);
  return (
    <motion.div className="fixed inset-0 bg-white flex flex-col">
      <Top />
      <Floating />
      <div className="!mt-40">
        <NavbarCart heroHeight={0} />
      </div>

      <motion.div 
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="flex-1 overflow-auto p-4 px-10 md:px-0"
      >
        <p className="text-black px-10 text-md py-4">
          Search Results for
        </p>
        <h2 className="capitalize font-black font-mono px-10 text-2xl pb-5">{query}</h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-0 md:px-0">
          {results.length === 0 ? (
            <motion.div variants={fadeIn}>
              <hr className="border-black mb-10" />
              <h1 className="flex items-center gap-2 py-5 text-sm text-left">
                <PiEmpty />
                No results found. Try searching for something else.
              </h1>
              <Link href="/">
                <button className="bg-blue-500 text-white hover:bg-blue-600 px-6 py-3 rounded-2xl">
                  Return to Store
                </button>
              </Link>
            </motion.div>
          ) : (
            results.map((result, index) => (
                <motion.div
                key={result._id}
                className={`product-card z-30 relative bg-[#F1F1F1] border  border-black dark:bg-dot-white/[0.2] bg-dot-black/[0.3] hover:bg-dot-black/[0.8] dark:bg-black transition-transform ease-in-out duration-700 
                ${index % 4 !== 3 ? "md:border-r-0" : ""}  
              ${index < results.length - 4 ? "md:border-b-0" : ""}`}
                onMouseEnter={() => setHoveredProduct(result)}
                onMouseLeave={() => setHoveredProduct(null)}
              >
                <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
                <div className="flex justify-between px-5 py-12 relative gap-10 z-40">
                  <h3 className="uppercase text-sm">{result.name}</h3>
                  <p className="text-sm">
                    NGN {result.price.toLocaleString("en-NG")}
                  </p>
                </div>
                <div className="py-20 px-20 relative z-40">
                  {result.images && (
                    <Image
                    src={result.images && result.images.length > 0 ? urlForImage(result.images[0].asset).url() : "https://via.placeholder.com/150"}
                    alt={result.name}
                    className="object-cover w-full h-full"
                    width={160} // Set width
                    height={160} // Set height
                  />
                  )}
                </div>

                {hoveredProduct?._id === result._id && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="absolute bottom-0 inset-0 right-0 left-0 justify-end flex flex-col gap-2 p-4 rounded-md z-50"
                  >
                     <Link href={`/product/${result.slug.current}`}>
                      <button className="bg-blue-500 hover:bg-blue-600 rounded-xl text-white py-2 px-10 border-none transition-all duration-300 ease-in-out">
                        View Details
                      </button>
                    </Link>
                  </motion.div>
                )}
              </motion.div>
            ))
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SearchResultsPage;
