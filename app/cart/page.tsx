"use client";

import React, { useEffect, useState } from "react";
import { useShoppingCart } from "use-shopping-cart";
import Image from "next/image";
import dynamic from "next/dynamic";
import Navbar from "../components/Navbar";
import Top from "../components/top";
import { PiEmpty } from "react-icons/pi";
import Floating from "../components/floating";
import Link from "next/link";
import NavbarCart from "../components/NavbarCart";
import { motion } from "framer-motion";
import { client } from "@/sanity/lib/client";
import { urlForImage } from "../components/AddtoCart";

interface DataType {
  images: any;
  _id: string;
  name: string;
  price: number;
  slug: string;
  category: string;
  sku: string;
}

async function fetchProducts() {
  const query = `*[_type == 'product'][0...4] | order(_createdAt desc){
    _id,
    name,
    price,
    "slug": slug.current,
    "category": category -> name,
    "images": images[0] // Fetch only the first image
  }`;

  const data = await client.fetch(query);
  return data;
}

const PaystackButton = dynamic(
  () => import("react-paystack").then((mod) => mod.PaystackButton),
  {
    ssr: false,
  }
);

const ShoppingCartPage = () => {
  const [products, setProducts] = useState<DataType[]>([]);
  const {
    cartCount,
    cartDetails = {},
    decrementItem,
    incrementItem,
    totalPrice,
    addItem,
  } = useShoppingCart();
  const [address, setAddress] = useState("");

  const safeCartCount = cartCount ?? 0;
  const safeTotalPrice = totalPrice ?? 0;

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
  };

  useEffect(() => {
    const loadProducts = async () => {
      const data = await fetchProducts();
      setProducts(data);
    };

    loadProducts();
  }, []);

  const handleAddToCart = (product: DataType, quantity: number) => {
    const existingItem = cartDetails[product.sku]; // Check if the item already exists in the cart
    if (existingItem) {
      // If it exists, increment by selected quantity
      incrementItem(product.sku, { count: quantity });
    } else {
      // Add the item with selected quantity
      addItem({
        id: product.sku,
        name: product.name,
        price: product.price,
        currency: "USD",
        image: urlForImage(product.images).url(),
        quantity: quantity,
      });
    }
  };

  if (!products.length)
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

  const paystackConfig = {
    email: "customer@example.com",
    amount: safeTotalPrice * 100,
    publicKey: "pk_test_110f5d5fffad6bc1dae024858bb6e25cb2924994",
    metadata: {
      custom_fields: [
        {
          display_name: "Customer Name",
          variable_name: "customer_name",
          value: "Anonymous User",
        },
        {
          display_name: "Delivery Address",
          variable_name: "delivery_address",
          value: address || "No address provided",
        },
      ],
    },
  };

  const handleSuccess = (reference: any) => {
    console.log("Payment Successful, reference:", reference);
  };

  const handleClose = () => {
    console.log("Payment dialog closed");
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    <motion.div className="fixed inset-0 bg-white flex flex-col">
      <Top />
      <Floating />
      <NavbarCart heroHeight={0} />

      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="flex-1 overflow-auto p-4 md:px-10"
      >
        <h1 className="text-black font-black text-3xl pt-20 md:text-4xl lg:text-8xl mb-4">
          Your Cart
        </h1>

        <div className="flex flex-col gap-10 md:flex-row md:px-0">
          <div className="w-full">
            <ul className="divide-gray-300">
              {safeCartCount === 0 ? (
                <motion.div variants={fadeIn}>
                  <hr className="border-black mb-10" />
                  <h1 className="flex items-center gap-2 py-5 text-sm text-left">
                    <PiEmpty />
                    Your cart is currently empty. Shop now to secure the bag.
                  </h1>
                  <Link href="/category/all">
                    <button className="bg-blue-500 text-white hover:bg-blue-600 px-6 py-3 rounded-2xl">
                      Return to Store
                    </button>
                  </Link>
                </motion.div>
              ) : (
                <>
                  <div className="bg-gray-100 p-4 border rounded-xl md:p-5">
                    {Object.values(cartDetails ?? {}).map((entry, index) => (
                      <motion.li
                        key={entry.id}
                        variants={fadeIn}
                        className={`flex py-6 items-center ${index < Object.keys(cartDetails).length - 1 ? "border-b border-gray-300" : ""}`}
                      >
                        <div className="hidden md:flex h-32 w-32 flex-shrink-0 overflow-hidden rounded-xl p-3 border-gray-300">
                          <Image
                            src={entry.image as string}
                            alt="Product image"
                            width={100}
                            height={100}
                            className="object-contain group-hover:scale-110 transition ease-in-out rounded-xl w-[50px] h-[50px] md:w-[100px] md:h-[100px]"
                          />
                        </div>

                        <div className="ml-6 flex-1">
                          <div className="flex justify-between text-lg font-semibold text-gray-800">
                            <h3>{entry.name}</h3>
                            <p className="ml-4">
                              ₦{(entry.quantity * entry.price).toLocaleString()}
                            </p>
                          </div>

                          <div className="flex justify-between items-center mt-4">
                            <div className="flex items-center">
                              <motion.button
                                type="button"
                                onClick={() => decrementItem(entry.id)}
                                whileTap={{ scale: 0.9 }}
                                className="text-blue-400 border border-blue-500 rounded-xl hover:bg-blue-500 hover:text-white px-2 py-0 text-lg font-medium"
                              >
                                -
                              </motion.button>
                              <p className="mx-3 text-gray-700">
                                {entry.quantity}
                              </p>
                              <motion.button
                                type="button"
                                onClick={() => incrementItem(entry.id)}
                                whileTap={{ scale: 0.9 }}
                                className="text-green-500 border-2 border-green-500 rounded-xl hover:bg-blue-600 px-2 text-lg font-medium"
                              >
                                +
                              </motion.button>
                            </div>
                            <motion.button
                              type="button"
                              onClick={() =>
                                decrementItem(entry.id, {
                                  count: entry.quantity,
                                })
                              }
                              whileTap={{ scale: 0.9 }}
                              className="text-sm text-red-500 hover:underline"
                            >
                              Remove
                            </motion.button>
                          </div>
                        </div>
                      </motion.li>
                    ))}
                  </div>
                </>
              )}
            </ul>
          </div>
          {safeCartCount > 0 && (
            <motion.div
              className="sticky top-20 w-full md:w-1/3  h-[500px] items-center justify-center flex rounded-xl bg-gray-100 p-20  md:py-6 md:px-1"
              variants={fadeIn}
            >
              <div className="flex flex-col">
                <h2 className="text-lg font-medium text-gray-900">
                  Order Summary
                </h2>
                <div className="flex justify-between text-gray-900 mt-4">
                  <p className="text-sm font-light">Subtotal:</p>
                  <p className="text-sm">₦{safeTotalPrice.toLocaleString()}</p>
                </div>
                <div className="flex justify-between text-lg font-medium text-gray-900 mt-2">
                  <p className="text-sm font-light">Delivery Fee:</p>
                  <p className="text-sm">₦0.00</p>
                </div>
                <div className="flex justify-between text-lg font-medium text-gray-900 mt-10">
                  <p className="text-sm font-light">Total:</p>
                  <p className="text-sm">
                    ₦{(safeTotalPrice + 0).toLocaleString()}
                  </p>
                </div>

                <div className="mt-10">
                  <label className="block text-gray-700 text-xs my-1">
                    Delivery Address
                  </label>
                  <input
                    type="text"
                    value={address}
                    onChange={handleAddressChange}
                    className="border border-gray-300 rounded-lg w-full p-2 focus:outline-none focus:ring focus:ring-blue-300"
                  />
                </div>

                <PaystackButton
                  {...paystackConfig}
                  text="Proceed to Checkout"
                  className="mt-8 bg-blue-500 text-white rounded-lg p-3"
                  onSuccess={handleSuccess}
                  onClose={handleClose}
                />
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ShoppingCartPage;
