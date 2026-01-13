import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { ShoppingBagIcon } from '@heroicons/react/24/outline';
import Cart from './Cart';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const location = useLocation();
  const { getTotalItems } = useCart();

  const isActive = (path) => location.pathname === path ? 'text-blue-600 font-bold' : 'text-gray-700';

  return (
    <nav className="bg-white shadow-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <img
                className="h-10 w-auto"
                src="/images/iphone daddy.logo.png"
                alt="iPhone Daddy Logo"
                onError={(e) => {
                  e.target.src = '/images/placeholder-image.jpg'; // fallback image
                }}
              />
              <span className="ml-2 text-xl font-bold text-gray-800">iPhone Daddy</span>
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            <Link to="/" className={`${isActive('/')} hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium`}>
              Home
            </Link>
            <Link to="/products" className={`${isActive('/products')} hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium`}>
              iPhones
            </Link>
            <Link to="/merchandise" className={`${isActive('/merchandise')} hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium`}>
              Merchandise
            </Link>
            <Link to="/my-orders" className={`${isActive('/my-orders')} hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium`}>
              My Orders
            </Link>
            <Link to="/contact" className={`${isActive('/contact')} hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium`}>
              Contact
            </Link>
            <Link to="/login" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium">
              Admin Login
            </Link>

            {/* Cart Icon */}
            <div className="relative ml-4">
              <button
                onClick={() => setIsCartOpen(true)}
                className="p-2 text-gray-700 hover:text-blue-600 focus:outline-none"
              >
                <ShoppingBagIcon className="h-6 w-6" />
                {getTotalItems() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {getTotalItems()}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            {/* Cart Icon for mobile */}
            <div className="relative mr-4">
              <button
                onClick={() => setIsCartOpen(true)}
                className="p-2 text-gray-700 hover:text-blue-600 focus:outline-none"
              >
                <ShoppingBagIcon className="h-6 w-6" />
                {getTotalItems() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {getTotalItems()}
                  </span>
                )}
              </button>
            </div>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg">
            <Link
              to="/"
              className={`${isActive('/')} block px-3 py-2 rounded-md text-base font-medium`}
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/products"
              className={`${isActive('/products')} block px-3 py-2 rounded-md text-base font-medium`}
              onClick={() => setIsOpen(false)}
            >
              iPhones
            </Link>
            <Link
              to="/merchandise"
              className={`${isActive('/merchandise')} block px-3 py-2 rounded-md text-base font-medium`}
              onClick={() => setIsOpen(false)}
            >
              Merchandise
            </Link>
            <Link
              to="/my-orders"
              className={`${isActive('/my-orders')} block px-3 py-2 rounded-md text-base font-medium`}
              onClick={() => setIsOpen(false)}
            >
              My Orders
            </Link>
            <Link
              to="/contact"
              className={`${isActive('/contact')} block px-3 py-2 rounded-md text-base font-medium`}
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
            <Link
              to="/login"
              className="block bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setIsOpen(false)}
            >
              Admin Login
            </Link>
          </div>
        </div>
      )}

      {/* Cart Component */}
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </nav>
  );
};

export default Navbar;