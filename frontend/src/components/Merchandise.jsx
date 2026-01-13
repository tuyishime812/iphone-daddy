import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { merchandiseService } from '../services/api';
import { useCart } from '../context/CartContext';

const Merchandise = () => {
  const [merchandise, setMerchandise] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchMerchandise = async () => {
      try {
        const response = await merchandiseService.getAll();
        setMerchandise(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load merchandise');
        setLoading(false);
        console.error('Error fetching merchandise:', err);
      }
    };

    fetchMerchandise();
  }, []);

  const handleAddToCart = (item) => {
    addToCart(item);
    alert(`${item.name} added to cart!`);
  };

  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Merchandise Collection</h2>
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Merchandise Collection</h2>
          <div className="text-center text-red-500">
            <p>{error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Merchandise Collection</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {merchandise.map((item) => (
            <div key={item._id || item.id} className="product-card bg-white rounded-xl overflow-hidden shadow-lg">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-cover"
                onError={(e) => {
                  e.target.src = '/images/placeholder-image.jpg'; // fallback image
                }}
              />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{item.name}</h3>
                <p className="text-gray-600 mb-4 line-clamp-2">{item.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-blue-600">${item.price}</span>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleAddToCart(item)}
                      className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-lg transition duration-300 text-sm"
                    >
                      Add to Cart
                    </button>
                    <Link
                      to={`/product/${item._id || item.id}`}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg transition duration-300 text-sm"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link
            to="/merchandise"
            className="inline-block bg-gray-800 hover:bg-black text-white font-bold py-3 px-8 rounded-full transition duration-300"
          >
            View All Merchandise
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Merchandise;