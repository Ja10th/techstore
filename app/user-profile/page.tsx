// app/pages/UserProfile.tsx
"use client";
import React, { useEffect, useState } from "react";
import { account, databases } from "../appwrite"; 
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Floating from "../components/floating";
import NavbarCart from "../components/NavbarCart";
import Top from "../components/top";
import { Query } from "appwrite";
import { client } from "@/sanity/lib/client";
import Link from "next/link";

const UserProfile = () => {
  const [userInfo, setUserInfo] = useState<any>(null); 
  const [wishlist, setWishlist] = useState<any[]>([]); 
  const [products, setProducts] = useState<any[]>([]); 
  const router = useRouter();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const user = await account.get(); // Fetch user info
        setUserInfo(user); // Set user info in state
        await fetchWishlist(user.$id); // Fetch wishlist for the user
      } catch (error) {
        console.error("Error fetching user info:", error);
        toast.error("Failed to fetch user information.");
        router.push("/login"); // Redirect to login if unable to fetch user info
      }
    };

    const fetchWishlist = async (userId: string) => {
      try {
        const response = await databases.listDocuments(
          "6720dace00204fde7db8", // Database ID
          "672108d90023dbb89309", // Collection ID
          [
            Query.equal("user_id", userId),
          ]
        );
    
        // Store both product_id and document ID in the wishlist state
        const wishlistWithIDs = response.documents.map(doc => ({
          ...doc,
          product_id: doc.product_id, // Assuming this field exists
        }));
    
        setWishlist(wishlistWithIDs); // Set wishlist items in state
        await fetchProductDetails(wishlistWithIDs); // Fetch product details based on wishlist items
      } catch (error) {
        console.error("Error fetching wishlist:", error);
        toast.error("Failed to fetch wishlist.");
      }
    };

    const fetchProductDetails = async (wishlistItems: any[]) => {
      try {
        const productDetails = await Promise.all(
          wishlistItems.map(async (item) => {
            // Fetch product details from Sanity
            const product =
              await client.fetch(`*[_type == "product" && _id == "${item.product_id}"][0] {
            _id,
            name,
            price,
            "slug": slug.current,
            "productImage": images[0].asset->url
          }`);
            return product;
          })
        );

        setProducts(productDetails.filter(Boolean)); // Filter out any null values
      } catch (error) {
        console.error("Error fetching product details:", error);
        toast.error("Failed to fetch product details.");
      }
    };

  

    fetchUserInfo(); // Call function to fetch user info and wishlist
  }, [router]);

  const handleRemoveFromWishlist = async (productId: string) => {
    console.log("Attempting to remove product with ID:", productId);
    try {
      const user = await account.get();
      
      // Find the wishlist item that matches the productId
      const wishlistItem = wishlist.find(item => item.product_id === productId);
      
      if (wishlistItem) {
        await databases.deleteDocument(
          "6720dace00204fde7db8", // Database ID
          "672108d90023dbb89309", // Collection ID
          wishlistItem.$id // Use the correct document ID here
        );
        setProducts((prevProducts) => prevProducts.filter(product => product._id !== productId));
        toast.success("Item removed from your wishlist!");
      } else {
        toast.error("Item not found in wishlist.");
      }
    } catch (error) {
      console.error("Error removing item from wishlist:", error);
      toast.error("Failed to remove item from wishlist");
    }
  };

  const handleLogout = async () => {
    try {
      await account.deleteSession("current"); // Logs out the current session
      toast.success("Logged out successfully!");
      router.push("/login"); // Redirect to login page
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
        <h2 className="text-7xl font-bold mb-6">Account</h2>
        {userInfo ? (
          <div className="mt-1 flex gap-3">
            <p>{userInfo.name}</p>
            <p>{userInfo.email}</p>
          </div>
        ) : (
          <p>Loading user information...</p>
        )}

        <div className="mt-8 w-[400px] justify-center items-center flex flex-col border border-black p-10 md:w-[600px]">
          <h3 className="text-xl font-semibold mb-4">Your Wishlist</h3>
          {products.length > 0 ? (
            <ul>
              {products.map((product, index) => (
                <li
                  key={product._id}
                  className={`p-4 ${index === products.length - 1 ? "" : "border-b"} flex gap-x-10 items-center`}
                >
                  <img
                    src={product.productImage}
                    alt={product.name}
                    className="w-auto h-20 object-cover mb-2"
                  />
                  <Link href={`/products/${product.slug}`}>{product.name}</Link>
                  <p>
                   NGN{" "}
                    {product.price.toLocaleString("en-NG")}
                  </p>
                  <p
                    className=" text-red-500 "
                    onClick={() => handleRemoveFromWishlist(product._id)}
                  >
                    Remove
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No items in your wishlist yet.</p>
          )}
        </div>

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
