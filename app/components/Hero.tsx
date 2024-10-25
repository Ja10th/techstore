import { motion } from "framer-motion";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { FlipWords } from "./ui/flip-words";


const Hero = () => {

  const words = ["Accessories", "Gadgets", "Electronics", "Wearables", "Gear", "Essentials"];

  return (
    <div className="relative z-40">
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.2, duration: 1.4, ease: "easeInOut" }}
        className="absolute top-[20%] md:top-[40%] left-1 text-center md:text-left md:left-20 transform -translate-y-1/2 max-w-4xl z-20"
      >
        <h1 className="text-3xl px-6 md:px-0 md:text-7xl font-[400] pt-10 md:pt-0 font-mono text-white">
          Your One-Stop Shop for <FlipWords words={words} /> <br />
        </h1>
        <div className="flex items-center justify-center md:justify-start text-center pt-5 gap-5 ">
          <p className="border border-black bg-black hover:scale-110 transition-all duration-200 ease-in-out text-white rounded-xl flex items-center px-10 py-3">
            Shop Now <MdOutlineArrowForwardIos className="text-3xl px-2" />
          </p>
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
    </div>
  );
};

export default Hero;
