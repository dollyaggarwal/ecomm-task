// components/Navbar.js
import Link from 'next/link';
import { FaHeart, FaShoppingCart } from 'react-icons/fa';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-lg font-bold">WishCart</div>
        <div className="flex space-x-4">
          <Link href="/wishlist" className="flex items-center">
            <FaHeart className="mr-1" />
            Wishlist
          </Link>
          <Link href="/cart" className="flex items-center">
            <FaShoppingCart className="mr-1" />
            Cart
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
