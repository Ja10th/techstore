'use client'
import React, { useContext } from 'react'
import { FaFacebook, FaGoogle, FaApple } from 'react-icons/fa6'
import { IoClose } from 'react-icons/io5'
import { contextReader } from '../context/ContextProvider'

const Modal = () => {

    const usingContext = useContext(contextReader)

    if (!usingContext) {
      throw new Error('Error somewhere')
    }
    const { isModalOpen, closeModal} = usingContext
  return (
    <div>
         {isModalOpen && (
        <>
          {/* Dark Overlay */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
            onClick={closeModal}
          ></div>

          {/* Sidecart Modal */}
          <div
            className={`fixed right-0 top-0 h-full w-full md:w-1/3 bg-white z-50 shadow-lg transform transition-transform ${
              isModalOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            {/* Modal Content */}
            <div className="relative p-8 h-full flex flex-col justify-between">
              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              >
                <IoClose className="text-2xl" />
              </button>

              <h2 className="text-2xl font-bold mb-6">Login</h2>

              {/* Email Field */}
              <div className="mb-4">
                <label className="block text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none"
                  placeholder="Enter your email"
                />
              </div>

              {/* Password Field */}
              <div className="mb-4">
                <label className="block text-gray-700 mb-1">Password</label>
                <input
                  type="password"
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none"
                  placeholder="Enter your password"
                />
              </div>

              {/* Remember Me + Forgot Password */}
              <div className="flex justify-between items-center mb-6">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span className="text-sm text-gray-600">Remember me</span>
                </label>
                <a href="#" className="text-sm text-blue-500 hover:underline">
                  Forgot password?
                </a>
              </div>

              {/* Login Button */}
              <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded transition">
                Login
              </button>

              {/* OR */}
              <div className="text-center text-gray-400 my-4">OR</div>

              {/* Social Login Buttons */}
              <div className="flex justify-between gap-3 mb-6">
                <button className="flex-1 bg-blue-700 text-white py-2 rounded flex justify-center items-center gap-2">
                  <FaFacebook />
                  Facebook
                </button>
                <button className="flex-1 bg-red-500 text-white py-2 rounded flex justify-center items-center gap-2">
                  <FaGoogle />
                  Google
                </button>
                <button className="flex-1 bg-black text-white py-2 rounded flex justify-center items-center gap-2">
                  <FaApple />
                  Apple
                </button>
              </div>

              {/* Create Account */}
              <div className="text-center">
                <p className="text-sm text-gray-600">
                  Not a member yet?{" "}
                  <a href="#" className="text-blue-500 hover:underline">
                    Create Account
                  </a>
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Modal