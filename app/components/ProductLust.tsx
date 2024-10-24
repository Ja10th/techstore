"use client";
import { client } from "@/sanity/lib/client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useShoppingCart } from "use-shopping-cart";
import { urlForImage } from "./AddtoCart";
import Link from "next/link";
import { motion } from "framer-motion";

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
  const query = `*[_type == 'product'][0...8] | order(_createdAt desc) {
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

const ProductList = () => {
  const [products, setProducts] = useState<DataType[]>([]);
  const [hoveredProduct, setHoveredProduct] = useState<DataType | null>(null);
  const { addItem } = useShoppingCart();

  useEffect(() => {
    const loadProducts = async () => {
      const data = await fetchProducts();
      setProducts(data);
    };

    loadProducts();
  }, []);

  const handleAddToCart = (product: DataType) => {
    addItem({
      id: product.sku,
      name: product.name,
      price: product.price,
      currency: "USD",
      image: urlForImage(product.images).url(),
      quantity: 1,
    });
  };

  if (!products.length) return <div className="text-center py-10">Infoworld Global Enterprises...</div>;

  return (
    <div className="relative z-30">
      <motion.div 
         initial={{y: '100px', opacity: 0}}
         whileInView={{y: '0px', opacity: 1}}
         transition={{delay: 1.2, duration: 1.4, ease: 'easeInOut'}}
      className="grid grid-cols-1 z-30 px-10 md:px-0 gap-y-2 md:gap-y-0 md:grid-cols-4 pt-0 mt-0 w-full">
        {products.map((product, index) => (
          <Link href={`/product/${product.slug}`}
            key={product._id}
            className={`product-card z-30 relative bg-white border border-black dark:bg-black transition-transform ease-in-out duration-500 
              ${index % 4 !== 3 ? 'md:border-r-0' : ''}  
              ${index < products.length - 4 ? 'md:border-b-0' : ''}`}
              onMouseEnter={() => setHoveredProduct(product)}
            onMouseLeave={() => setHoveredProduct(null)}
          >
            <div className="flex justify-between px-5 py-5 relative gap-10 z-40">
              <h3 className="uppercase text-sm">{product.name}</h3>
              <p className="text-sm">NGN {product.price.toLocaleString("en-NG")}</p>
            </div>
            <div className="py-20 px-20 relative z-40">
              {product.images && (
                <Image
                  src={urlForImage(product.images).url()}
                  width={150}
                  height={150}
                  alt={product.name}
                  className="object-contain transition-transform duration-500 ease-in-out transform hover:scale-110 cursor-pointer w-[150px] h-[150px] md:w-[250px] md:h-[250px]"
                />
              )}
            </div>

            {hoveredProduct?._id === product._id && (
              <div className="absolute bottom-0 inset-0 right-0 left-0 justify-end flex flex-col gap-2 bg-black bg-opacity-60 p-4 rounded-md z-50 transition ease-in-out duration-500">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleAddToCart(product);
                  }}
                  className="bg-blue-500 hover:bg-blue-600 rounded-xl text-white py-2 px-10 border-none"
                >
                  Add to Cart
                </button>
              </div>
            )}
          </Link>
        ))}
      </motion.div>
    </div>
  );
};

export default ProductList;
