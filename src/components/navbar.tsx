import React from "react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-blue-600 text-white py-4">
      <div className="container mx-auto flex justify-between items-center px-4">
        <div className="text-lg font-bold">
          <Link to="/" className="hover:text-gray-200">
            Book Finder
          </Link>
        </div>
        <ul className="flex space-x-4">
          <li>
            <Link to="/" className="hover:text-gray-200">
              Home
            </Link>
          </li>
          <li>
            <Link to="/wishlist" className="hover:text-gray-200">
              Wishlist
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
