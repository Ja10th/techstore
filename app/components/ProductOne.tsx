import React from "react";
import { MdMarkunreadMailbox } from "react-icons/md";

const ProductOne = () => {
  return (
      <div className="py-20 bg-[#F5F5F7]">
      <div>
        <h2 className="text-center text-[40px] md:text-[110px] font-bold">
          Sleek Workforce
        </h2>
        <div className="flex flex-col md:flex-row gap-20 px-10 md:px-0 items-center py-10 justify-center ">
          <div>
            <img
              src="https://images.pexels.com/photos/2528116/pexels-photo-2528116.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="gaming image"
              className="h-[450px] w-[450px] md:h-[800px] md:w-[600px]"
            />
          </div>
          <div className="max-w-md">
          <MdMarkunreadMailbox className="mb-4 text-6xl" />
            <p className=" text-lg text-gray-500"><span className="text-black font-bold">Effortless productivity in one sleek package.</span> With an ultra-slim design and vibrant display, this laptop workspace transforms any environment into a hub of focus and creativity. Built for smooth multitasking, it powers through complex tasks, keeping you efficient without missing a beat. The keyboard is finely tuned for comfort, making long work sessions feel light and easy.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductOne;
