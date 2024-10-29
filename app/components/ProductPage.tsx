"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useShoppingCart } from "use-shopping-cart";
import Top from "./top";
import Floating from "./floating";
import Navbar from "./NavbarCart";
import {
  FaMobileAlt,
  FaLaptop,
  FaGamepad,
  FaHeadphones,
  FaTools,
} from "react-icons/fa";

interface dataFact {
  _id: string;
  slug: string;
  name: string;
  price: number;
  category: string;
  image: any;
}

const ProductPage = ({
  data,
  category,
  categories,
}: {
  data: dataFact[];
  category: string;
  categories: string[];
}) => {
  const [hoveredProduct, setHoveredProduct] = useState<dataFact | null>(null);
  const { addItem } = useShoppingCart();

  const handleAddToCart = (product: dataFact) => {
    addItem({
      id: product._id,
      name: product.name,
      price: product.price,
      currency: "USD",
      image: product.image,
      quantity: 1,
    });
  };

  return (
    <div>
      <Top />
      <Floating />
      <Navbar heroHeight={0} />
      <div className="bg-white h-full flex flex-col md:flex-row">
        <aside className="pt-40 pb-5 md:py-60 px-5 w-1/5">
          <ul className="space-y-2 flex md:flex-col  py-8 px-10 transition-all duration-500 ease-in-out">
            {categories.map((cat) => {
              // Define icons for each category
              let IconComponent;
              switch (cat.toLowerCase()) {
                case "phones":
                  IconComponent = FaMobileAlt;
                  break;
                case "laptop":
                  IconComponent = FaLaptop;
                  break;
                case "consoles":
                  IconComponent = FaGamepad;
                  break;
                case "headset":
                  IconComponent = FaHeadphones;
                  break;
                default:
                  IconComponent = FaTools; // Icon for any additional category
              }

              return (
                <li key={cat}>
                  <Link href={`/category/${cat.toLowerCase()}`} >
                    <p
                      className={`flex items-center space-x-2 px-2 md:px-12 py-6 text-sm capitalize rounded-md ${
                        cat.toLowerCase() === category.toLowerCase()
                          ? "bg-blue-500 rounded-2xl text-white"
                          : " bg-gray-100  text-black"
                      }`}
                    >
                      {IconComponent && <IconComponent className="text-lg" />}{" "}
                      {/* Display the icon */}
                      <span>{cat}</span>
                    </p>
                  </Link>
                </li>
              );
            })}
          </ul>
        </aside>

        <main className="flex-1">
          <div className="px-10 mx-auto">
            <div className="pt-5 md:pt-40 pb-10">
              <h2 className="text-4xl font-bold text-center md:text-left capitalize text-black">
                {category} Products
              </h2>
            </div>
            <motion.div
              initial={{ filter: "blur(100px)", opacity: 0 }}
              whileInView={{ filter: "blur(0px)", opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8, ease: "easeInOut" }}
              className="grid grid-cols-1 z-30 px-10 md:px-0 gap-y-2 md:gap-y-0 md:grid-cols-3 pt-0 mt-0 w-full"
            >
              {data.map((product, index) => (
                <Link
                  href={`/product/${product.slug}`}
                  key={product._id}
                  className={`product-card z-30 relative bg-[#F1F1F1] border border-black dark:bg-dot-white/[0.2] bg-dot-black/[0.3] hover:bg-dot-black/[0.8] dark:bg-black transition-transform ease-in-out duration-700 
      ${index % 3 !== 2 && index + 1 < data.length ? "md:border-r-0" : ""} // Ensure no right border for last item in row
      ${index < data.length - 3 ? "md:border-b-0" : ""}`} // No bottom border for last row
                  onMouseEnter={() => setHoveredProduct(product)}
                  onMouseLeave={() => setHoveredProduct(null)}
                >
                  <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
                  <div className="flex justify-between px-5 py-6 md:py-12 relative gap-10 z-40">
                    <h3 className="uppercase text-sm">{product.name}</h3>
                    <p className="text-sm">
                      NGN {product.price.toLocaleString("en-NG")}
                    </p>
                  </div>
                  <div className="py-20 px-20 relative z-40">
                    {product.image && (
                      <Image
                        src={product.image}
                        width={150}
                        height={150}
                        alt={product.name}
                        className="object-contain transition-transform duration-[1.2s] ease-in-out transform hover:scale-110 cursor-pointer w-[200px] h-[200px] md:w-[250px] md:h-[250px]"
                      />
                    )}
                  </div>

                  {hoveredProduct?._id === product._id && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                      className="absolute bottom-0 inset-0 right-0 left-0 justify-end flex flex-col gap-2 p-4 rounded-md z-50 "
                    >
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleAddToCart(product);
                        }}
                        className="bg-blue-500 hover:bg-blue-600 rounded-xl text-white py-2 px-10 border-none transition-all duration-300 ease-in-out"
                      >
                        Add to Cart
                      </button>
                    </motion.div>
                  )}
                </Link>
              ))}
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProductPage;
