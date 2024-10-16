import React, { useState } from "react";
import BookList from "../components/bookList";

import Pagination from "../components/pagination";

const HomePage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = 8; // Replace with the actual total number of pages

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto py-8">
        <h1 className="text-4xl font-bold text-center text-blue-600 mb-8">
          Explore Books
        </h1>

        <BookList />

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
