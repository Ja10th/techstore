"use client";
import { client } from "@/sanity/lib/client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useShoppingCart } from "use-shopping-cart";
import { urlForImage } from "./AddtoCart";
import Link from "next/link";

interface DataType {
  images: any;
  _id: string;
  name: string;
  price: number;
  slug: string;
  category: string;
  sku: string;
}

const Sleek = () => {
  async function fetchProductBySlug(slug: string) {
    const query = `*[_type == 'product' && slug.current == $slug][0] {
      _id,
      name,
      price,
      "slug": slug.current,
      "category": category->name,
      "images": images[0]
    }`;

    const params = { slug };
    const data = await client.fetch(query, params);
    return data;
  }

  const [product, setProduct] = useState<DataType | null>(null);
  const { addItem } = useShoppingCart();

  useEffect(() => {
    const loadProduct = async () => {
      const data = await fetchProductBySlug('macbook-2019-pro'); // Replace with actual slug if necessary
      setProduct(data);
    };
    loadProduct();
  }, []);

  const handleAddToCart = () => {
    if (product) {
      addItem({
        id: product._id,
        name: product.name,
        price: product.price,
        currency: "USD",
        image: urlForImage(product.images).url(),
        quantity: 1,
      });
    }
  };

  return (
    <div className="relative bg-gray-100 py-20 z-30 overflow-hidden">
      <div>
        <h2 className="text-6xl text-center max-w-2xl mx-auto font-bold">
          Next-level graphics performance. Game on.
        </h2>
      </div>
      <div className="relative flex justify-center items-center h-screen">
        <div className="z-20 relative">
          {product && (
            <Link
              href={`/product/${product.slug}`}
              className="product-card z-30 relative bg-[#F1F1F1] "
            >
              <div className="relative z-40">
                {product.images && (
                  <Image
                    src={urlForImage(product.images).url()}
                    width={150}
                    height={150}
                    alt={product.name}
                    className="object-contain object-center transition-transform duration-[1.2s] ease-in-out transform scale-125 hover:scale-150 cursor-pointer w-[200px] h-[200px] md:w-auto md:h-[250px]"
                  />
                )}
              </div>
            </Link>
          )}
        </div>

        {/* Floating Images */}
        <motion.div
          className="absolute top-[20%] z-30 left-[30%]"
          initial={{ x: 0, opacity: 1 }}
          whileInView={{ x: -25, opacity: 1, left: "5%" }}
          transition={{ duration: 1.5, delay: 1.2, ease: "easeInOut" }}
        >
          <Image
            src="https://www.apple.com/v/macbook-pro/al/images/overview/themes/performance/performance_screen_blender__d52d3whfhtw2_large_2x.png"
            width={400}
            height={400}
            alt="Image 1"
            className="object-cover w-[200px] md:w-[450px]"
          />
        </motion.div>

        <motion.div
          className="absolute top-[20%] z-30"
          initial={{ x: 25, opacity: 1, right: "20%" }}
          whileInView={{ x: 25, opacity: 1, right: "5%" }}
          transition={{ duration: 1.5, delay: 1.2, ease: "easeInOut" }}
        >
          <Image
            src="https://www.apple.com/v/macbook-pro/al/images/overview/themes/performance/performance_screen_lightroom__dsnznus7aryq_large_2x.png"
            width={400}
            height={400}
            alt="Image 2"
            className="object-cover w-[200px] md:w-[450px]"
          />
        </motion.div>

        <motion.div
          className="absolute bottom-[20%] z-30 left-[20%]"
          initial={{ x: 0, opacity: 1 }}
          whileInView={{ x: -20, opacity: 1, left: "15%" }}
          transition={{ duration: 1.5, delay: 1.2, ease: "easeInOut" }}
        >
          <Image
            src="https://www.apple.com/v/macbook-pro/al/images/overview/themes/camera-audio/desk_view__ebrkrzqqutea_large_2x.jpg"
            width={400}
            height={400}
            alt="Image 3"
            className="object-cover w-[200px] md:w-[450px]"
          />
        </motion.div>

        <motion.div
          className="absolute bottom-[20%] z-30"
          initial={{ x: 0, opacity: 1, right: "30%" }}
          whileInView={{ x: 25, opacity: 1, right: "15%" }}
          transition={{ duration: 1.5, delay: 1.2, ease: "easeInOut" }}
        >
          <Image
            src="https://www.apple.com/v/macbook-pro/al/images/overview/themes/performance/performance_screen_flame__bhg8ls5afrn6_large_2x.png"
            width={400}
            height={400}
            alt="Image 4"
            className="object-cover w-[200px] md:w-[450px]"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default Sleek;
