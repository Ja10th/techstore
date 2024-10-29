'use client';
import React, { useState } from 'react';
import { account, client, ID } from '../appwrite'; // Update the import path as necessary
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';
import Floating from '../components/floating';
import NavbarCart from '../components/NavbarCart';
import Top from '../components/top';
import { Databases } from 'appwrite'; // Import Database

const db = new Databases(client); // Initialize Database

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState(""); // New state for address
  const [phone, setPhone] = useState(""); // New state for phone number
  const [isLoading, setIsLoading] = useState(false); // State for loading
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password.length < 8) {
      toast.error("Password must be at least 8 characters long.");
      return;
    }

    setIsLoading(true); // Disable button while loading

    try {
      // Create user in Appwrite
      const user = await account.create(ID.unique(), email, password, name);
      
      await db.createDocument('6720dace00204fde7db8', '6720e06f00017790f58f', user.$id, {
        Name: name,  // Make sure this matches your database schema
        Email: email,
        Address: address,
        Phone: phone
      });

      toast.success("Registration successful!");
      router.push('/login');
    } catch (error) {
        const appwriteError = error as { code: number; message: string };
        
        // Handle different errors based on the code
        if (appwriteError.code === 409) {
            toast.error("A user with this email already exists. Please use a different email.");
        } else if (appwriteError.code === 429) {
            toast.error("You are being rate limited. Please try again later.");
        } else {
            toast.error(appwriteError.message || "Registration failed. Please try again.");
        }
        console.error("Registration failed:", appwriteError);
    } finally {
        setIsLoading(false); // Re-enable button after operation
    }
  };

  return (
    <>
      <Top />
      <Floating />
      <NavbarCart heroHeight={0} />
      <div className="flex flex-col items-center justify-center h-screen ">
        <ToastContainer />
        <h2 className="text-7xl font-bold mb-6">Register</h2>
        <form onSubmit={handleRegister} className="flex flex-col p-6 items-center justify-center rounded w-96">
          <div className="mb-10">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-[400px] md:w-[650px] text-sm text-black px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Full name"
            />
          </div>
          <div className="mb-10">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-[400px] md:w-[650px] text-sm  px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Email address"
            />
          </div>
          <div className="mb-10">
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              className="w-[400px] md:w-[650px] text-sm text-black px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Address"
            />
          </div>
          <div className="mb-10">
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="w-[400px] md:w-[650px] text-sm px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Phone number"
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-[400px] md:w-[650px] text-sm px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Password"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading} // Disable button while loading
            className={`px-8 mt-20 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded transition ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isLoading ? 'Registering...' : 'Register'}
          </button>
          <div className="text-center text-gray-400 my-4">OR</div>
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Already a member?{" "}
              <a href="/login" className="text-blue-500 hover:underline">
                Login
              </a>
            </p>
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;
