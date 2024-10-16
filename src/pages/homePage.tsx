import React, { useState } from "react";
import BookList from "../components/bookList";
import SearchBar from "../components/SearchBar";
import DropdownFilter from "../components/dropdownFilter";
import Pagination from "../components/pagination";

const HomePage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [genre, setGenre] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [wishlist, setWishlist] = useState<number[]>(() => {
    return JSON.parse(localStorage.getItem("wishlist") || "[]");
  });

  const totalPages = 8; // Replace with the actual total number of pages

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto py-8">
        <h1 className="text-4xl font-bold text-center text-blue-600 mb-8">
          Explore Books
        </h1>

        <div className="flex flex-col md:flex-row justify-between items-center mb-4">
          <SearchBar onSearch={setSearchQuery} />
          <DropdownFilter onFilter={setGenre} />
        </div>

        <BookList
          searchQuery={searchQuery}
          genre={genre}
          currentPage={currentPage}
          wishlist={wishlist} // Pass wishlist to BookList
          setWishlist={setWishlist} // Pass setWishlist to BookList
        />

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
};

export default HomePage;
