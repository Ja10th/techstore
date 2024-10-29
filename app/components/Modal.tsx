'use client';
import React, { useContext, useState } from 'react';
import { FaFacebook, FaGoogle, FaApple } from 'react-icons/fa6';
import { IoClose } from 'react-icons/io5';
import { contextReader } from '../context/ContextProvider';
import { account, ID } from "../appwrite";
import { Models } from "appwrite";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Modal = () => {
  const [loggedInUser, setLoggedInUser] = useState<Models.User<Models.Preferences> | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const usingContext = useContext(contextReader);
  if (!usingContext) {
    throw new Error('Error: context not found');
  }

  const { isModalOpen, closeModal, openModal } = usingContext;

  // Function to log in the user
  const login = async (email: string, password: string) => {
    try {
      const currentUser = await account.get();
      if (currentUser) {
        toast.info("You are already logged in.");
        setLoggedInUser(currentUser);
        return;
      }

      await account.createEmailPasswordSession(email, password);
      const user = await account.get();
      setLoggedInUser(user);
      closeModal();
      openModal();
      toast.success("Login successful!");
    } catch (error) {
      const appwriteError = error as { message: string };
      console.error("Login error:", appwriteError);
      toast.error(appwriteError.message || "Login failed. Please check your credentials.");
    }
  };

  // Function to register the user
  const register = async () => {
    try {
      await account.create(ID.unique(), email, password, name);
      toast.success("Registration successful!");
      await login(email, password);
    } catch (error) {
      const appwriteError = error as { message: string };
      console.error("Registration failed:", appwriteError);
      toast.error(appwriteError.message || "Registration failed. Please try again.");
    }
  };

  // Function to log out the user
  const logout = async () => {
    await account.deleteSession("current");
    setLoggedInUser(null);
    closeModal();
    toast.success("Logout successful!");
  };

  if (loggedInUser) {
    return (
      <div>
        <p>Logged in as {loggedInUser.name}</p>
        <button type="button" onClick={logout}>Logout</button>
      </div>
    );
  }

  return (
    <div>
      <ToastContainer />

      {isModalOpen && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity" onClick={closeModal}></div>

          <div className={`fixed right-0 top-0 h-full w-full md:w-1/3 bg-white z-50 shadow-lg transform transition-transform ${isModalOpen ? "translate-x-0" : "translate-x-full"}`}>
            <div className="relative p-8 h-full flex flex-col justify-between">
              <button onClick={closeModal} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
                <IoClose className="text-2xl" />
              </button>

              <h2 className="text-2xl font-bold mb-6">{loggedInUser ? "User Profile" : "Login"}</h2>

              {loggedInUser ? (
                <div className="text-center">
                  <p className="text-lg">Logged in as {loggedInUser.name}</p>
                  <button type="button" onClick={logout} className="mt-4 bg-red-500 text-white py-2 px-4 rounded">
                    Logout
                  </button>
                </div>
              ) : (
                <>
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-1">Name</label>
                    <input
                      type="text"
                      placeholder="Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
                      placeholder="Enter your email"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-700 mb-1">Password</label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
                      placeholder="Enter your password"
                    />
                  </div>

                  <button 
                    onClick={() => login(email, password)}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded transition"
                  >
                    Login
                  </button>

                  <div className="text-center text-gray-400 my-4">OR</div>

                  <div className="text-center">
                    <p className="text-sm text-gray-600">
                      Not a member yet?{" "}
                      <a href="#" onClick={register} className="text-blue-500 hover:underline">
                        Create Account
                      </a>
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Modal;
