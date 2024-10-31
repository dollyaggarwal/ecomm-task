"use client";
import { useEffect, useState } from 'react';
import api from '../lib/api';
import Navbar from './navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get('/api/products');
        setProducts(response.data.data); // Assumes products are in response.data.data
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  const addToCart = async (productId) => {
    try {
      await api.post('/api/cart', { productId, quantity: 1 });
      alert('Product added to cart');
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const addToWishlist = async (productId) => {
    try {
      await api.post('/api/wishlist', { productId }); // Replace with your actual API endpoint for wishlist
      alert('Product added to wishlist');
    } catch (error) {
      console.error('Error adding to wishlist:', error);
    }
  };

  return (
    <div className="p-6">
      <Navbar />
   
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-7">
        {products.map((product) => (
          <div key={product._id} className="bg-white shadow-lg rounded-lg overflow-hidden">
            {product.productImage?.url ? (
              <img src={product.productImage.url} alt={product.name} className="w-full h-48 object-cover" />
            ) : (
              <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500">No Image Available</span>
              </div>
            )}
            <div className="p-4">
              <h2 className="text-gray-500 text-xl font-semibold">{product.name}</h2>
              <p className="text-gray-600 mt-2">{product.description}</p>
              <p className="text-lg font-bold text-gray-400 mt-2">${product.price.toFixed(2)}</p>
              <div className="flex justify-between items-center mt-4">
                <button
                  onClick={() => addToCart(product._id)}
                  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                >
                  Add to Cart
                </button>
                <span
                  onClick={() => addToWishlist(product._id)}
                  className="cursor-pointer text-red-500 hover:text-red-600"
                >
                  <FontAwesomeIcon icon={faHeartRegular} size="lg" />
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
