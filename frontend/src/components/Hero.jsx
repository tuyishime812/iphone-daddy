import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section
      className="min-h-[70vh] flex items-center justify-center text-white"
      style={{
        backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('/images/iphone daddy.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
      }}
    >
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
          Premium iPhones & Merchandise
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
          Discover the latest iPhone models and exclusive merchandise at unbeatable prices
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/products"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full text-lg transition duration-300 transform hover:scale-105"
          >
            Shop iPhones
          </Link>
          <Link
            to="/merchandise"
            className="bg-transparent hover:bg-white hover:text-blue-600 border-2 border-white text-white font-bold py-3 px-8 rounded-full text-lg transition duration-300"
          >
            Shop Merchandise
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;