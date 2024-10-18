import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import {
  loadBooks,
  toggleWishlist,
  setSearchQuery,
  setGenreFilter,
  setCurrentPage,
} from "../store/booksSlice";
import BookCard from "./bookCard";
import LoadingAnimation from "./loadingAnimation";

const BookList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  // Selecting state from Redux store
  const {
    books,
    loading,
    wishlist,
    searchQuery,
    genreFilter,
    currentPage,
    totalPages,
  } = useSelector((state: RootState) => state.books);

  useEffect(() => {
    // Load books when component mounts or currentPage changes
    dispatch(loadBooks(currentPage));
  }, [dispatch, currentPage]);

  const handleWishlistToggle = (id: number) => {
    dispatch(toggleWishlist(id));
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(event.target.value));
  };

  const handleGenreChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setGenreFilter(event.target.value));
  };

  // Filter books based on searchQuery and genreFilter
  const filteredBooks = books.filter((book) => {
    const matchesSearch = book.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    const matchesGenre =
      genreFilter === "" ||
      book.subjects.some((subject) =>
        subject.toLowerCase().includes(genreFilter.toLowerCase()),
      );

    return matchesSearch && matchesGenre;
  });

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      dispatch(setCurrentPage(page));
    }
  };

  if (loading) {
    return <LoadingAnimation />;
  }

  return (
    <div className="flex flex-col gap-5 p-4 md:p-0">
      {/* Search and Filter Section */}
      <div className="mb-4 flex items-center justify-between">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search by title..."
          className="w-1/3 rounded-md border px-4 py-2"
        />

        <div className="">
          <label htmlFor="genre" className="mr-2 text-lg">
            Filter by Genre:
          </label>
          <select
            id="genre"
            onChange={handleGenreChange}
            className="rounded-lg border px-4 py-2"
          >
            <option value="">All Genres</option>
            <option value="Fiction">Fiction</option>
            <option value="Poetry">Poetry</option>
            <option value="Horror">Horror</option>
            <option value="Drama">Drama</option>
            {/* Add more genres based on your knowledge of the data */}
          </select>
        </div>
      </div>

      {/* Books List */}
      <div className="mb-8 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              onWishlistToggle={handleWishlistToggle}
              isWishlisted={wishlist.includes(book.id)}
            />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-600">
            No books found.
          </p>
        )}
      </div>

      {/* Pagination Section */}
      <div className="flex items-center justify-center gap-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="rounded-lg bg-blue-600 px-4 py-2 text-white disabled:opacity-50"
        >
          Previous
        </button>
        <p className="whitespace-nowrap">
          Page {currentPage} of {totalPages}
        </p>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="rounded-lg bg-blue-600 px-4 py-2 text-white disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default BookList;
