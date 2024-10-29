// app/pages/Login.tsx
'use client';
import React, { useState, useEffect } from 'react';
import { account } from '../appwrite'; // Update the import path as necessary
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';
import Floating from '../components/floating';
import NavbarCart from '../components/NavbarCart';
import Top from '../components/top';
import Link from 'next/link';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const user = await account.get();
        if (user) {
          router.push('/user-profile'); 
        }
      } catch (error) {
        console.error("No active session found:", error);
      }
    };
    checkSession();
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await account.createEmailPasswordSession(email, password);
      toast.success("Login successful!");
      router.push('/user-profile'); // Redirect to user profile page
    } catch (error) {
      const appwriteError = error as { message: string };
      console.error("Login error:", appwriteError);
      toast.error(appwriteError.message || "Login failed. Please check your credentials.");
    }
  };

  return (
    <div>
      <Top />
      <Floating />
      <NavbarCart heroHeight={0} />
      <div className="flex flex-col items-center justify-center h-screen">
        <ToastContainer />
        <h2 className="text-7xl font-bold mb-6">Login</h2>
        <form onSubmit={handleLogin} className="p-6 flex flex-col items-center justify-center rounded w-96">
          <div className="mb-10">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-[400px] md:w-[650px] text-sm px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-10">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-[400px] md:w-[650px] px-4 py-3 text-sm border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Enter your password"
            />
          </div>
          <Link href='' className='underline text-left w-[400px] md:w-[650px]'>Forgot password?</Link>
          <button
            type="submit"
            className="px-8 mt-20 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded transition"
          >
            Login
          </button>
          <div className="text-center text-gray-400 my-4">OR</div>
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Not a member yet?{" "}
              <a href="/register" className="text-blue-500 hover:underline">
                Create Account
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
