import React from "react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-blue-600 py-4 text-white">
      <div className="container mx-auto flex items-center justify-between px-4">
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
