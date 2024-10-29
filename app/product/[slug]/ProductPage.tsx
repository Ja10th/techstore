"use client";

import React, { useEffect, useState } from "react";
import AddtoCart, { urlForImage } from "@/app/components/AddtoCart";
import Floating from "@/app/components/floating";
import NavbarCart from "@/app/components/NavbarCart";
import Top from "@/app/components/top";
import Image from "next/image";
import Link from "next/link";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RichTextComponent } from "@/app/components/RichTextComponent";
import { PortableText } from "@portabletext/react";
import { IoIosArrowDropdown } from "react-icons/io";
import { motion } from "framer-motion";
import { useShoppingCart } from "use-shopping-cart";
import { PaystackButton } from "react-paystack";
import { client } from "@/sanity/lib/client";
import { AiFillStar } from "react-icons/ai";
import { IoHeartCircleOutline } from "react-icons/io5";
import { account, databases, ID } from "@/app/appwrite";

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
  stock: number;
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

interface DataThree {
  images: any;
  _id: string;
  name: string;
  price: number;
  slug: string;
  category: string;
  sku: string;
}

async function fetchRandomProduct() {
  const query = `*[_type == 'product'][0..9] { // Fetch first 10 products
    _id,
    name,
    price,
    "slug": slug.current,
    "category": category->name,
    "images": images[0]
  }`;

  const data = await client.fetch(query);
  // Pick a random product from the fetched list
  return data[Math.floor(Math.random() * data.length)];
}

const ProductPage: React.FC<{ data: DataFact; otherProducts: DataType[] }> = ({
  data,
  otherProducts,
}) => {
  // State for quantity
  const [hoveredProduct, setHoveredProduct] = useState<DataType | null>(null);
  const [product, setProduct] = useState<DataThree | null>(null);
  const [frequentlyBought, setFrequentlyBought] = useState<DataThree | null>(
    null
  );
  const [youMayLike, setYouMayLike] = useState<DataType[]>([]);
  const { addItem } = useShoppingCart();

  useEffect(() => {
    const loadProduct = async () => {
      const randomProduct = await fetchRandomProduct();
      setProduct(randomProduct);

      // Fetch frequently bought products (using DataThree type)
      const randomFrequentlyBought = await fetchRandomProduct(); // Fetch one random product
      setFrequentlyBought(randomFrequentlyBought);

      // Shuffle other products for "You May Like" section
      const randomYouMayLike = otherProducts
        .sort(() => 0.5 - Math.random()) // Shuffle the other products
        .slice(0, 3); // Take the first 3 for "You May Like"
      setYouMayLike(randomYouMayLike);
    };

    loadProduct();
  }, [otherProducts]);

  const handleAddToCartThree = () => {
    if (frequentlyBought) {
      addItem({
        id: frequentlyBought._id,
        name: frequentlyBought.name,
        price: frequentlyBought.price,
        currency: "USD",
        image: urlForImage(frequentlyBought.images).url(),
        quantity: 1,
      });
    }
  };

  const paystackConfig = {
    email: "customer@example.com", // Replace with user's email
    amount: data.price * 100, // Paystack expects the amount in kobo
    publicKey: "pk_test_110f5d5fffad6bc1dae024858bb6e25cb2924994",
    metadata: {
      custom_fields: [
        {
          display_name: "Customer Name",
          variable_name: "customer_name",
          value: "Anonymous User", // Replace with actual customer name
        },
        {
          display_name: "Product Name",
          variable_name: "product_name",
          value: data.name,
        },
      ],
    },
  };

  const handleSuccess = (reference: any) => {
    console.log("Payment Successful, reference:", reference);
    // Handle success actions, like redirecting to a thank you page
  };

  const handleClose = () => {
    console.log("Payment dialog closed");
    // Handle what happens when the payment dialog is closed
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

  const handleAddToCartTwo = () => {
    addItem({
      id: data._id,
      name: data.name,
      price: data.price,
      currency: "USD",
      image: urlForImage(data.images[0]).url(),
      quantity: 1,
    });
  };

  const handleAddToWishlist = async (productId: any) => {
    try {
      // Check if user is logged in
      const user = await account.get();
      if (!user) {
        toast.error('Please log in to add items to your wishlist.');
        return;
      }
  
      // Add to wishlist in Appwrite
      await databases.createDocument(
        '6720dace00204fde7db8',     // Database ID
        '672108d90023dbb89309',            // Collection ID
        ID.unique(),            // Automatically generated unique ID
        {                       // Data
          user_id: user.$id,
          product_id: productId,
        }
      );
  
      toast.success('Item added to your wishlist!');
    } catch (error) {
      console.error('Error adding to wishlist:', error);
      toast.error('Failed to add item to wishlist');
    }
  };

  return (
    <div>
      <ToastContainer />
      <Top />
      <Floating />
      <NavbarCart heroHeight={0} />
      <div className="max-w-6xl py-40 mx-auto px-8">
        {/* Product details */}
        <div className="flex flex-col justify-center gap-14 md:flex-row">
          {/* Left Section: Images */}
          <div className="flex flex-col md:overflow-hidden pt-10">
            <div className="flex md:flex-col overflow-x-auto space-x-4 md:space-x-0 gap-4 pb-4 md:pb-0">
              {data.images.map((image: any, index: number) => (
                <div
                  key={index}
                  className="flex-shrink-0 px-10 md:px-10 py-20 md:py-20 bg-[#F1F1F1] relative border border-black dark:bg-dot-white/[0.2] bg-dot-black/[0.3] hover:bg-dot-black/[0.8] dark:bg-black transition-transform ease-in-out duration-700 rounded-md"
                >
                  <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
                  <Image
                    src={urlForImage(image).url()}
                    alt={data.name}
                    className="object-contain w-full h-full"
                    width={250} // Adjusted width
                    height={250} // Adjusted height
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Right Section: Product Info */}
          <div className="md:py-8 max-w-lg">
            <h2 className="text-2xl text-left font-light lg:text-3xl">
              {data.name}
            </h2>
            <div className="flex gap-3">
              <p className="text-3xl text-left font-bold py-2">
                {" "}
                NGN {data.price.toLocaleString("en-NG")}
              </p>
              <p className="text-2xl text-gray-500  mt-1 text-left line-through font-light py-2">
                {" "}
                NGN {(data.price + 30000).toLocaleString("en-NG")}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <small>Items left: {data.stock}</small>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <AiFillStar key={i} />
                ))}
              </div>
              <div className="relative group">
                <IoHeartCircleOutline
                  className="text-green-700 text-3xl cursor-pointer"
                  onClick={() => handleAddToWishlist(data._id)}
                />
                <div className="absolute top-[-10px] left-0 text-center transform -translate-y-full bg-white border border-black text-black text-sm px-2 w-32 justify-center items-center flex py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  Add to Wishlist
                </div>
              </div>
            </div>
            <p className="font-light text-[16px] text-left leading-6 pt-5 pb-10">
              {data.description}
            </p>
            <div className="flex gap-4  justify-start ">
              <button
                onClick={handleAddToCartTwo}
                className="bg-blue-500 hover:bg-blue-600 rounded-xl text-white py-2 px-20 border-none transition-all duration-300 ease-in-out"
              >
                Add to Cart
              </button>
              <PaystackButton
                {...paystackConfig}
                text="Buy Now"
                className=" border border-black hover:bg-black hover:text-white rounded-xl text-black py-2 px-20 transition-all duration-300 ease-in-out"
                onSuccess={handleSuccess}
                onClose={handleClose}
              />
            </div>
            <div className="py-20">
              <div className="accordion border-b pb-2">
                <input type="checkbox" id="specifications" className="hidden" />
                <label
                  htmlFor="specifications"
                  className="flex justify-between items-center cursor-pointer"
                >
                  <span className="text-md uppercase">Specifications</span>
                  <span className="text-xl">
                    <IoIosArrowDropdown />
                  </span>
                </label>
                <div className="mt-2 pl-2 transition-all duration-300 overflow-hidden  accordion-content">
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
                  <span className="uppercase text-md"> Key Features</span>
                  <span className="text-xl">
                    <IoIosArrowDropdown />
                  </span>
                </label>
                <div className="mt-2 pl-2 transition-all duration-300 overflow-hidden  accordion-content">
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
              <div className="flex flex-col justify-start  transition-all duration-500 ease-in-out rounded-2xl  ">
                <h2 className="text-left text-2xl py-10">
                  Frequently Bought Together
                </h2>
                {frequentlyBought && (
                  <>
                    <div
                      key={frequentlyBought._id}
                      className="flex border   hover:scale-110 transition duration-500 ease-in-out h-36 w-full  rounded-2xl"
                    >
                      <div className="bg-gray-300 w-1/2 h-full px-4 flex rounded-l-2xl justify-center items-center">
                        <img
                          src={urlForImage(frequentlyBought.images).url()}
                          alt={frequentlyBought.name}
                          className="bg-transparent h-24 w-auto rounded-l-2xl"
                        />
                      </div>
                      <div className=" w-1/2 flex flex-col justify-center items-center ">
                        <h3 className="text-lg">{frequentlyBought.name}</h3>
                        <p className="text-sm text-gray-500">
                          NGN {frequentlyBought.price.toLocaleString("en-NG")}
                        </p>
                        <button
                          onClick={handleAddToCartThree}
                          className="bg-blue-500 hover:bg-blue-600 rounded-xl text-white mt-2 py-2 px-1 md:px-4 text-[12px]  border-none transition-all duration-300 ease-in-out"
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Horizontal scrolling section for other products */}
      </div>
      <div className="mt-6 px-1 md:px-10">
        <h3 className="text-2xl text-center md:text-left font-semibold text-gray-800 mb-6">
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
