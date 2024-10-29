// "use client";
// import { useEffect, useState } from 'react';
// import api from '../lib/api';

// export default function Products() {
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await api.get('/api/products');
//         setProducts(response.data.data); // Assumes products are in response.data.data
//       } catch (error) {
//         console.error('Error fetching products:', error);
//       }
//     };
//     fetchProducts();
//   }, []);

//   const addToCart = async (productId) => {
//     try {
//       await api.post('/api/cart', { productId, quantity: 1 });
//       alert('Product added to cart');
//     } catch (error) {
//       console.error('Error adding to cart:', error);
//     }
//   };

//   return (
//     <div>
//       <h1>Products</h1>
//       <ul>
//         {products.map((product) => (
//           <li key={product._id}>
//             <h2>{product.name}</h2>
//             <p>{product.description}</p>
//             <p>Price: ${product.price}</p>
//             <button onClick={() => addToCart(product._id)}>Add to Cart</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }


"use client";
import { useEffect, useState } from 'react';
import api from '../lib/api';

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

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
              <button
                onClick={() => addToCart(product._id)}
                className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
