"use client";
import { useEffect, useState } from 'react';
import api from '../../lib/api';

export default function Wishlist() {
  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    const fetchWishlistItems = async () => {
      try {
        const response = await api.get('/api/wishlist'); // Fetch existing wishlist items
        setWishlistItems(response.data.data);
      } catch (error) {
        console.error('Error fetching wishlist items:', error);
      }
    };

    // Initialize WebSocket connection
    const socket = new WebSocket('ws://yourserver.com'); // Replace with your server URL

    socket.onopen = () => {
      console.log('Connected to WebSocket server');
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.action === 'wishlistUpdated') {
        console.log('Wishlist updated', data.wishlist);
        // Update the wishlist items with the latest data from the server
        setWishlistItems(data.wishlist.items);
      }
    };

    socket.onclose = () => {
      console.log('Disconnected from WebSocket server');
    };

    // Fetch wishlist items when the component mounts
    fetchWishlistItems();

    // Cleanup function to close the socket connection when the component unmounts
    return () => {
      socket.close();
    };
  }, []);

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">Your Wishlist</h1>
      {wishlistItems.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Product</th>
                <th className="py-3 px-6 text-left">Price</th>
                <th className="py-3 px-6 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {wishlistItems.map((item) => (
                <tr key={item._id} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-3 px-6 text-left flex items-center">
                    <img src={item.productImage?.url} alt={item.name} className="h-16 w-16 object-cover rounded mr-4" />
                    <span>{item.name}</span>
                  </td>
                  <td className="py-3 px-6 text-left">${item.price.toFixed(2)}</td>
                  <td className="py-3 px-6 text-left">
                    <button className="mt-2 bg-blue-500 text-white py-1 px-4 rounded hover:bg-blue-600">
                      Add to Cart
                    </button>
                    <button className="mt-2 ml-2 bg-red-500 text-white py-1 px-4 rounded hover:bg-red-600">
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-600">Your wishlist is empty.</p>
      )}
    </div>
  );
}
