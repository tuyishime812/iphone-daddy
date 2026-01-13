import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { productService, merchandiseService } from '../services/api';
import { useCart } from '../context/CartContext';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // Try to fetch as a product first, then as merchandise
        try {
          const response = await productService.getById(id);
          setProduct(response.data);
        } catch (productErr) {
          // If product fetch fails, try merchandise
          try {
            const response = await merchandiseService.getById(id);
            setProduct(response.data);
          } catch (merchErr) {
            setError('Product not found');
          }
        }
        setLoading(false);
      } catch (err) {
        setError('Failed to load product details');
        setLoading(false);
        console.error('Error fetching product:', err);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
      alert(`${product.name} added to cart!`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-800">Product not found</h2>
            <p className="text-gray-600 mt-2">{error || 'The product you are looking for does not exist.'}</p>
            <a
              href="/"
              className="mt-4 inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300"
            >
              Back to Home
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2 p-6">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-auto rounded-lg object-contain max-h-96"
                onError={(e) => {
                  e.target.src = '/src/photos/placeholder-image.jpg'; // fallback image
                }}
              />
            </div>
            <div className="md:w-1/2 p-8">
              <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
              <div className="text-3xl font-bold text-blue-600 mb-6">${product.price}</div>
              <p className="text-gray-700 mb-8">{product.description}</p>

              <h3 className="text-xl font-semibold mb-4">Details:</h3>
              <ul className="mb-8 space-y-2">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Category: {product.category}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Added: {new Date(product.createdAt).toLocaleDateString()}</span>
                </li>
              </ul>

              <div className="flex space-x-4">
                <button
                  onClick={handleAddToCart}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300"
                >
                  Add to Cart
                </button>
                <button className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-bold py-3 px-8 rounded-lg transition duration-300">
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;