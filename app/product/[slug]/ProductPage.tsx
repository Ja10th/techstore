"use client";

import React, { useState } from "react";
import AddtoCart, { urlForImage } from "@/app/components/AddtoCart";
import Floating from "@/app/components/floating";
import NavbarCart from "@/app/components/NavbarCart";
import Top from "@/app/components/top";
import Image from "next/image";
import Link from "next/link";
import { RichTextComponent } from "@/app/components/RichTextComponent";
import { PortableText } from "@portabletext/react";
import { IoIosArrowDropdown } from "react-icons/io";
import { motion } from "framer-motion";
import { useShoppingCart } from "use-shopping-cart";

interface DataFact {
  _id: string;
  images: any;
  price: number;
  name: string;
  sku: string;
  description: string;
  slug: string;
  category: string;
  price_id: string;
  specifications: any;
  features: any;
}

interface DataType {
  _id: string;
  name: string;
  price: number;
  slug: string;
  sku: string;
  category: string;
  productImage: string;
}

const ProductPage: React.FC<{ data: DataFact; otherProducts: DataType[] }> = ({
  data,
  otherProducts,
}) => {
  // State for quantity

  const [quantity, setQuantity] = useState(1);
  const [hoveredProduct, setHoveredProduct] = useState<DataType | null>(null);
  const {
    addItem,
    cartDetails = {},
    incrementItem,
    decrementItem,
  } = useShoppingCart(); // Ensure these are imported

  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decrementQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const handleAddToCart = (product: DataType) => {
    addItem({
      id: product._id,
      name: product.name,
      price: product.price,
      currency: "USD",
      image: product.productImage,
      quantity: 1,
    });
  };
  const handleAddToCartTwo = (data: DataFact, quantity: number) => {
    console.log("Adding to cart with quantity:", quantity);

    // Check if the item is already in the cart
    const existingItem = cartDetails[data._id];

    if (existingItem) {
      // Log existing quantity
      console.log(
        `Current quantity of ${data.name} in cart:`,
        existingItem.quantity
      );

      // If the item exists, increment its quantity
      // Update the existing item's quantity by adding the new quantity
      incrementItem(data._id, { count: quantity });
    } else {
      // If it doesn't exist, add it with the specified quantity
      addItem({
        id: data._id,
        name: data.name,
        price: data.price,
        currency: "USD",
        image: urlForImage(data.images[0]).url(),
        quantity: quantity, // Use the current quantity in state
      });
    }

    // Log to verify the quantity being passed
    console.log(`Adding ${quantity} of ${data.name} to cart`);
  };

  return (
    <div>
      <Top />
      <Floating />
      <NavbarCart heroHeight={0} />
      <div className="max-w-6xl py-40 mx-auto px-8">
        {/* Product details */}
        <div className="grid gap-14 md:grid-cols-2">
          {/* Left Section: Images */}
          <div className="flex flex-col  items-center justify-center md:py-8">
            {data.images.map((image: any, index: number) => (
              <div
                key={index}
                className={`mb-2 px-20 py-10 items-center justify-center relative bg-[#F1F1F1] border border-black dark:bg-dot-white/[0.2] bg-dot-black/[0.3] hover:bg-dot-black/[0.8] dark:bg-black transition-transform ease-in-out duration-700   ${index === 0 ? "rounded-t-0" : ""} ${index === data.images.length - 1 ? "rounded-b-0" : ""}`}
              >
                <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
                <Image
                  src={urlForImage(image).url()}
                  alt={data.name}
                  className="object-contain w-[250px] h-[250px]"
                  width={500} // Adjust width as needed
                  height={500} // Adjust height as needed
                />
              </div>
            ))}
          </div>

          {/* Right Section: Product Info */}
          <div className="md:py-8">
            <h2 className="text-2xl font-bold text-center text-gray-800 lg:text-4xl">
              {data.name}
            </h2>
            <p className="text-lg text-center text-gray-500 py-2">
              {" "}
              NGN {data.price.toLocaleString("en-NG")}
            </p>
            <p className="text-gray-600 text-sm text-center py-10">
              {data.description}
            </p>
            <div className="flex gap-4  justify-center">
              <div className="flex bg-gray-100 px-2 rounded-2xl items-center justify-center">
                <button onClick={decrementQuantity} className="">
                  -
                </button>
                <input
                  type="number"
                  className="bg-gray-100 text-center w-full"
                  value={quantity}
                  onChange={(e) => {
                    const value = Math.max(1, Number(e.target.value)); // Ensure quantity is at least 1
                    setQuantity(value);
                  }}
                />
                <button onClick={incrementQuantity} className="">
                  +
                </button>
              </div>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleAddToCartTwo(data, quantity);
                }}
                className="bg-blue-500 hover:bg-blue-600 rounded-xl text-white py-2 px-10 border-none transition-all duration-300 ease-in-out"
              >
                Add to Cart
              </button>
            </div>
            <div className="py-20">
              <div className="accordion border-b pb-2">
                <input type="checkbox" id="specifications" className="hidden" />
                <label
                  htmlFor="specifications"
                  className="flex justify-between items-center cursor-pointer"
                >
                  <span className="text-sm uppercase">Specifications</span>
                  <span className="text-xl">
                    <IoIosArrowDropdown />
                  </span>
                </label>
                <div className="mt-2 pl-2 hidden accordion-content">
                  {data.specifications ? (
                    <PortableText
                      value={data.specifications}
                      components={RichTextComponent}
                    />
                  ) : (
                    <p className="text-gray-500">
                      No specifications available.
                    </p>
                  )}
                </div>
              </div>
              <div className="accordion border-b pb-2 pt-5">
                <input type="checkbox" id="keyFeatures" className="hidden" />
                <label
                  htmlFor="keyFeatures"
                  className="flex justify-between items-center cursor-pointer"
                >
                  <span className="uppercase text-sm"> Key Features</span>
                  <span className="text-xl">
                    <IoIosArrowDropdown />
                  </span>
                </label>
                <div className="mt-2 pl-2 hidden accordion-content">
                  {data.features ? (
                    <PortableText
                      value={data.features}
                      components={RichTextComponent}
                    />
                  ) : (
                    <p className="text-gray-500">No key features available.</p>
                  )}
                </div>
              </div>
              <div className="mt-12">
                <h3 className="text-2xl font-semibold text-gray-800 mb-6">
                  Frequently Bought Together
                </h3>
                <div></div>
              </div>
            </div>
          </div>
        </div>

        {/* Horizontal scrolling section for other products */}
      </div>
      <div className="mt-6 px-10">
        <h3 className="text-2xl font-semibold text-gray-800 mb-6">
          You may also like
        </h3>
        <div className="grid grid-cols-1 z-30 px-10 md:px-0 gap-y-2 md:gap-y-0 md:grid-cols-4 pt-0 mt-0 w-full">
          {otherProducts.map((product, index) => (
            <Link
              href={`/product/${product.slug}`}
              key={product._id}
              className={`product-card z-30 relative bg-[#F1F1F1] border border-black dark:bg-dot-white/[0.2] bg-dot-black/[0.3] hover:bg-dot-black/[0.8] dark:bg-black transition-transform ease-in-out duration-700 
                ${index % 4 !== 3 ? "md:border-r-0" : ""}  
                ${index < otherProducts.length - 4 ? "md:border-b-0" : ""}`}
            >
              <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
              <div className="flex justify-between px-5 py-6 md:py-12 relative gap-10 z-40">
                <h3 className="uppercase text-sm">{product.name}</h3>
                <p className="text-sm">
                  NGN {product.price.toLocaleString("en-NG")}
                </p>
              </div>
              <div className="py-20 px-20 relative z-40">
                {product.productImage && (
                  <Image
                    src={product.productImage}
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
                  className="absolute top-0 inset-0 right-0 left-0 justify-end flex flex-col gap-2 p-4 rounded-md z-50"
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
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
