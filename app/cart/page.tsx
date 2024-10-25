"use client";

import React, { useState } from "react";
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

// Dynamically load PaystackButton to ensure it's client-side only
const PaystackButton = dynamic(
  () => import("react-paystack").then((mod) => mod.PaystackButton),
  {
    ssr: false,
  }
);

const ShoppingCartPage = () => {
  const { cartCount, cartDetails, decrementItem, incrementItem, totalPrice } =
    useShoppingCart();
  const [address, setAddress] = useState("");

  const safeCartCount = cartCount ?? 0;
  const safeTotalPrice = totalPrice ?? 0;

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
  };

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
      <div className="!mt-40">
        <NavbarCart />
      </div>

      <motion.div 
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="flex-1 overflow-auto p-4 md:px-10"
      >
        <h1 className="text-black font-black text-4xl py-5 md:text-6xl lg:text-8xl mb-4">
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
                  <Link href="/">
                    <button className="bg-blue-500 text-white hover:bg-blue-600 px-6 py-3 rounded-2xl">
                      Return to Store
                    </button>
                  </Link>
                </motion.div>
              ) : (
                <>
                  <div className="bg-gray-100 p-4 rounded-xl md:p-10">
                    {Object.values(cartDetails ?? {}).map((entry) => (
                      <motion.li
                        key={entry.id}
                        variants={fadeIn}
                        className="flex py-6 items-center"
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
                            <p className="ml-4">₦{entry.price.toLocaleString()}</p>
                          </div>
                          <p className="text-sm text-gray-500 mt-1">
                            {entry.description}
                          </p>

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
                              <p className="mx-3 text-gray-700">{entry.quantity}</p>
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
              className="w-full md:w-1/2 lg:w-1/3 rounded-xl bg-gray-100 p-20 ms:py-6 md:px-20"
              variants={fadeIn}
            >
              <div className="flex flex-col">
                <h2 className="text-lg font-medium text-gray-900">Order Summary</h2>
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
                  <p className="text-sm">₦{(safeTotalPrice + 0).toLocaleString()}</p>
                </div>

                <div className="mt-10">
                  <label className="block text-gray-700 text-xs my-2">
                    Delivery Address:
                  </label>
                  <input
                    type="text"
                    value={address}
                    onChange={handleAddressChange}
                    className="text-sm py-2 px-4 w-full border border-gray-300 rounded-md"
                    placeholder="Enter your delivery address"
                  />
                </div>

                <div className="mt-6">
                  <PaystackButton
                    className="bg-blue-500 hover:bg-blue-600 text-white w-full p-3 rounded-xl"
                    {...paystackConfig}
                    text="Proceed to Checkout"
                    onSuccess={handleSuccess}
                    onClose={handleClose}
                  />
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ShoppingCartPage;
