import { motion } from "framer-motion";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { FlipWords } from "./ui/flip-words";
import Link from "next/link";
import { useShoppingCart } from "use-shopping-cart";
import Image from "next/image";
import { urlForImage } from "./AddtoCart";

const Hero = () => {
  const words = ["Accessories", "Gadgets", "Electronics", "Wearables", "Gear", "Essentials"];
  
  const { addItem } = useShoppingCart();

  const airpodMax = {
    id: "airpod-max",
    name: "Airpod Max",
    price: 500000,
    currency: "NGN",
    imageUrl: "max.png",
  };

  const handleAddToCart = () => {
    addItem({
      id: "airpod-max",
      name: "Airpod Max",
      price: 500000,
      currency: "USD",
      image: urlForImage(airpodMax.imageUrl).url(),
      quantity: 1,
    });
  };

  return (
    <div className="relative z-40">
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.2, duration: 1.4, ease: "easeInOut" }}
        className="absolute top-[20%] md:top-[35%] left-1 text-center md:text-left md:left-20 transform -translate-y-1/2 max-w-4xl md:max-w-5xl z-20"
      >
        <h1 className="text-3xl px-6 hero md:px-0 md:text-[90px] leading-none font-bold pt-10 md:pt-0 font-mono text-white">
          Your One-Stop Shop for <FlipWords words={words} /> <br />
        </h1>
        <div className="flex items-center justify-center md:justify-start text-center pt-5 gap-5">
          <Link
            href="/category/all"
            className="border border-black bg-black hover:scale-110 transition-all duration-200 ease-in-out text-white rounded-xl flex items-center px-10 py-3"
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

      {/* Card for Airpod Max */}
      <div className="bg-white h-28 w-56 rounded-2xl absolute flex right-[10%] bottom-[60%] z-50">
        <div className="bg-gray-300 w-1/2 h-full px-4 flex rounded-l-2xl justify-center items-center">
          <img
            src='max.png'
            alt={airpodMax.name}
            className="bg-transparent h-auto w-full rounded-l-2xl"
          />
        </div>
        <div className="flex flex-col justify-center px-3">
          <p>{airpodMax.name}</p>
          <p className="text-sm text-gray-500">NGN {airpodMax.price.toLocaleString()}</p>
          <button
            onClick={handleAddToCart}
            className="bg-blue-500 hover:bg-blue-600 rounded-xl text-white py-1 px-4 text-[10px] border-none transition-all duration-300 ease-in-out"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
