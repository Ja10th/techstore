"use client";
import { client } from "@/sanity/lib/client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
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

  if (!products.length) return <div className="text-center py-10">Infoworld Global Enterpises...</div>;

  return (
    <div>
      <div className="grid grid-cols-1 px-10 md:px-0 gap-y-2 md:gap-y-0 md:grid-cols-4 pt-5 mt-5 w-full">
        {products.map((product, index) => (
          <Link
            key={product._id}
            href={`/product/${product.slug}`}
            className={`group product-card relative dark:bg-black bg-white dark:bg-dot-white/[0.2] bg-dot-black/[0.2] hover:bg-dot-black/[0.8] border border-black transition ease-in-out duration-200 
              ${index % 4 !== 3 ? "md:border-r-0" : ""} 
              ${index < products.length - 4 ? "md:border-b-0" : ""}`}
          >
            <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>

            <div className="flex justify-between px-5 py-5 relative z-40 gap-10">
              <h3 className="uppercase text-sm">{product.name}</h3>
              <p className="text-sm">NGN {product.price.toLocaleString("en-NG")}</p>
            </div>
            <div className="py-20 px-20">
              {product.images && (
                <Image
                  src={urlForImage(product.images).url()}
                  width={150}
                  height={150}
                  alt={product.name}
                  className="object-contain group-hover:scale-110 transition ease-in-out rounded-xl cursor-pointer w-[150px] h-[150px] md:w-[250px] md:h-[250px]"
                />
              )}
            </div>
            <div className="absolute bottom-0 inset-0 right-0 left-0 items-center justify-center hidden group-hover:flex transition ease-in-out z-40">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleAddToCart(product);
                }}
                className="bg-blue-500 hover:bg-blue-600 rounded-xl text-white py-2 px-10 border-none z-50"
              >
                Add to Cart
              </button>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
