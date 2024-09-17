// src/Home.tsx

import Navbar from "../Component/Navbar";
import ProductList from "../Component/Productllist";
import Blogs from "../Component/Blogs";
import Hero from "../assets/Hero.png";
import Informasi from "../Component/Informasi";
import Footer from "../Component/Footer";

const Home = () => {
  return (
    <>
      <div className="pt-20">
        {" "}
        {/* Padding atas untuk menghindari tumpang tindih dengan navbar */}
        <Navbar />
        {/* Hero Section */}
        <div className="relative h-100vh bg-gray-100">
          {/* Hero Image */}
          <img
            src={Hero}
            alt="Hero"
            className="w-full h-full object-cover p-2 bg-white"
          />

          {/* Text Overlay */}
          <div className="absolute inset-0 flex items-center justify-center text-center text-white p-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-serif mb-4">
                DISCOUNT UP TO 50%
              </h1>
              <p className="text-lg md:text-xl font-serif mb-6">
                From September 30, 2023 - October 25, 2023
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center p-2 bg-white border border-gray-300 mt-2 mx-2 rounded-md shadow-sm">
          <h1 className="text-black text-md font-serif">Home</h1>
        </div>
        {/* Product List */}
        <div className="mt-3">
          <ProductList />
        </div>
        <div className="mt-10">
          <h1 className="mx-3 text-2xl font-bold relative">
            BLOG
            <span className="block absolute bottom-0 left-0 w-[600px] h-[2px] bg-gray-500"></span>
          </h1>
          <Blogs />
        </div>
        <div className="mt-10">
          <h1 className="mx-3 text-2xl font-bold relative">
            Informasi
            <span className="block absolute bottom-0 left-0 w-[600px] h-[2px] bg-gray-500"></span>
          </h1>
          <div>
            <Informasi />
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Home;
