import { motion } from "framer-motion";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { FlipWords } from "./ui/flip-words";
import Link from "next/link";
import { urlForImage } from "./AddtoCart";
import { client } from "@/sanity/lib/client";
import { useShoppingCart } from "use-shopping-cart";
import { useEffect, useState } from "react";

interface DataType {
  images: any;
  _id: string;
  name: string;
  price: number;
  slug: string;
  category: string;
  sku: string;
}


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

const Hero = () => {
  const words = [
    "Accessories",
    "Gadgets",
    "Electronics",
    "Wearables",
    "Gear",
    "Essentials",
  ];

  const [product, setProduct] = useState<DataType | null>(null);
  const { addItem } = useShoppingCart();

  useEffect(() => {
    const loadProduct = async () => {
      const data = await fetchProductBySlug('airpod-max'); // Assuming 'airpod-max' is the slug
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

  if (!product)
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

  return (
    <div className="relative z-40 ">
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.2, duration: 1.4, ease: "easeInOut" }}
        className="absolute top-[20%] md:top-[35%] left-1 text-center md:text-left md:left-20 transform -translate-y-1/2 max-w-4xl md:max-w-5xl z-20"
      >
        <h1 className="text-3xl px-6 hero md:px-0 md:text-[90px] leading-none font-bold pt-10 md:pt-0 font-mono text-white">
          Your One-Stop Shop for <FlipWords words={words} /> <br />
        </h1>
        <div className="flex items-center justify-center md:justify-start text-center pt-5 gap-5 ">
          <Link
            href="/category/all"
            className="border border-black bg-black hover:scale-110 transition-all duration-500 ease-in-out text-white rounded-xl flex items-center px-10 py-3"
          >
            Shop Now <MdOutlineArrowForwardIos className="text-3xl px-2" />
          </Link>
        </div>
      </motion.div>

      <motion.div
        initial={{ filter: "blur(10px)", opacity: 0 }}
        whileInView={{ filter: "blur(0px)", opacity: 1 }}
        transition={{ delay: 1.2, duration: 1.2, ease: "easeInOut" }}
        className="relative z-10"
      >
        <img
          src="https://images.pexels.com/photos/8001222/pexels-photo-8001222.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          className="h-[40rem] md:h-[50rem] w-full object-center object-cover"
        />
      </motion.div>

      <motion.div
       initial={{ filter: "blur(20px)", opacity: 0 }}
       whileInView={{ filter: "blur(0px)", opacity: 1 }}
       transition={{ delay: 1.2, duration: 1.2, ease: "easeInOut" }}
      className="bg-white h-28 w-60 hover:scale-110 transition-all duration-500 ease-in-out rounded-2xl absolute flex right-[10%] bottom-[60%] z-50">
        <div className="bg-gray-300 w-1/2 h-full px-4 flex rounded-l-2xl justify-center items-center">
          <img
            src="max.png"
            alt="Airpod"
            className="bg-transparent h-auto w-full rounded-l-2xl"
          />
        </div>
        <div className="flex flex-col justify-center items-center px-3">
          <p>Airpod Max</p>
          <p className="text-sm text-gray-500">NGN 500,000</p>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleAddToCart()
            }}
            className="bg-blue-500 hover:bg-blue-600 rounded-xl text-white mt-2 py-2 px-4 text-[12px]  border-none transition-all duration-300 ease-in-out"
          >
            Add to Cart
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Hero;
