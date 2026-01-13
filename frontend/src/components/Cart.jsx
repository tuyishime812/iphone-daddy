import React from 'react';
import { useCart } from '../context/CartContext';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

const Cart = ({ isOpen, onClose }) => {
  const { cart, removeFromCart, updateQuantity, getTotalPrice } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    onClose(); // Close the cart modal
    navigate('/checkout'); // Navigate to checkout page
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 overflow-hidden z-50">
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          onClick={onClose}
        ></div>

        <div className="fixed inset-y-0 right-0 max-w-full flex">
          <div className="relative w-screen max-w-md">
            <div className="h-full flex flex-col bg-white shadow-xl">
              <div className="flex-1 py-6 overflow-y-auto px-4 sm:px-6">
                <div className="flex items-start justify-between">
                  <h2 className="text-lg font-medium text-gray-900">Shopping cart</h2>
                  <button
                    type="button"
                    className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                    onClick={onClose}
                  >
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                <div className="mt-8">
                  <div className="flow-root">
                    {cart.items.length === 0 ? (
                      <p className="text-gray-500 text-center">Your cart is empty</p>
                    ) : (
                      <ul className="-my-6 divide-y divide-gray-200">
                        {cart.items.map((item) => (
                          <li key={item._id} className="py-6 flex">
                            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="h-full w-full object-cover object-center"
                                onError={(e) => {
                                  e.target.src = '/images/placeholder-image.jpg'; // fallback image
                                }}
                              />
                            </div>

                            <div className="ml-4 flex flex-1 flex-col">
                              <div>
                                <div className="flex justify-between text-base font-medium text-gray-900">
                                  <h3>{item.name}</h3>
                                  <p className="ml-4">${(item.price * item.quantity).toFixed(2)}</p>
                                </div>
                                <p className="mt-1 text-sm text-gray-500">{item.category}</p>
                              </div>
                              <div className="flex flex-1 items-end justify-between text-sm">
                                <div className="flex items-center">
                                  <button
                                    onClick={() => updateQuantity(item._id, item.quantity - 1)}
                                    className="px-2 py-1 bg-gray-200 rounded-l-md text-gray-600 hover:bg-gray-300"
                                  >
                                    -
                                  </button>
                                  <span className="px-3 py-1 bg-gray-100 border-y border-gray-300">
                                    {item.quantity}
                                  </span>
                                  <button
                                    onClick={() => updateQuantity(item._id, item.quantity + 1)}
                                    className="px-2 py-1 bg-gray-200 rounded-r-md text-gray-600 hover:bg-gray-300"
                                  >
                                    +
                                  </button>
                                </div>

                                <button
                                  type="button"
                                  className="font-medium text-red-600 hover:text-red-500"
                                  onClick={() => removeFromCart(item._id)}
                                >
                                  Remove
                                </button>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>

              {cart.items.length > 0 && (
                <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <p>Subtotal</p>
                    <p>${getTotalPrice().toFixed(2)}</p>
                  </div>
                  <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                  <div className="mt-6">
                    <button
                      onClick={handleCheckout}
                      className="w-full flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700"
                    >
                      Checkout
                    </button>
                  </div>
                  <div className="mt-6 flex justify-center text-sm text-center text-gray-500">
                    <p>
                      or{' '}
                      <button
                        type="button"
                        className="text-blue-600 font-medium hover:text-blue-500"
                        onClick={onClose}
                      >
                        Continue Shopping
                        <span aria-hidden="true"> &rarr;</span>
                      </button>
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;