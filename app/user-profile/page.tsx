// app/pages/UserProfile.tsx
'use client';
import React, { useEffect, useState } from 'react';
import { account } from '../appwrite'; // Adjust the import path as necessary
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import Floating from '../components/floating';
import NavbarCart from '../components/NavbarCart';
import Top from '../components/top';

const UserProfile = () => {
  const [userInfo, setUserInfo] = useState<any>(null); // State to hold user info
  const router = useRouter();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const user = await account.get(); // Fetch user info
        setUserInfo(user); // Set user info in state
      } catch (error) {
        console.error("Error fetching user info:", error);
        toast.error("Failed to fetch user information.");
        router.push('/login'); // Redirect to login if unable to fetch user info
      }
    };

    fetchUserInfo(); // Call function to fetch user info
  }, [router]);

  const handleLogout = async () => {
    try {
      await account.deleteSession('current'); // Logs out the current session
      toast.success("Logged out successfully!");
      router.push('/login'); // Redirect to login page
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Logout failed.");
    }
  };

  return (
    <div>
      <Top />
      <Floating />
      <NavbarCart heroHeight={0} />
      <div className="flex flex-col items-center justify-center h-screen">
        <h2 className="text-7xl font-bold mb-6">User Profile</h2>
        <p className="text-lg">Here is your user information:</p>
        {userInfo ? (
          <div className="mt-4">
            <p><strong>Email:</strong> {userInfo.email}</p>
            <p><strong>Registration Date:</strong> {new Date(userInfo.registration).toLocaleDateString()}</p>
            {/* Add more user information as needed */}
          </div>
        ) : (
          <p>Loading user information...</p>
        )}
        <button
          onClick={handleLogout}
          className="px-6 py-2 mt-4 bg-red-500 hover:bg-red-600 text-white rounded transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
