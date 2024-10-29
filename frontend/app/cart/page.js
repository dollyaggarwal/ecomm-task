"use client";
import { useEffect, useState } from 'react';
import api from '../../lib/api';

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await api.get('/api/cart'); // Replace with your actual cart fetching route
        setCartItems(response.data.data);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };
    fetchCartItems();
  }, []);

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">Your Cart</h1>
      {cartItems.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Product</th>
                <th className="py-3 px-6 text-left">Quantity</th>
                <th className="py-3 px-6 text-left">Price</th>
                <th className="py-3 px-6 text-left">Total</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {cartItems.map((item) => (
                <tr key={item._id} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-3 px-6 text-left flex items-center">
                    <img src={item.productImage?.url} alt={item.name} className="h-16 w-16 object-cover rounded mr-4" />
                    <span>{item.name}</span>
                  </td>
                  <td className="py-3 px-6 text-left">{item.cartQuantity}</td>
                  <td className="py-3 px-6 text-left">${item.price.toFixed(2)}</td>
                  <td className="py-3 px-6 text-left">${(item.price * item.cartQuantity).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-600">Your cart is empty.</p>
      )}
    </div>
  );
}
