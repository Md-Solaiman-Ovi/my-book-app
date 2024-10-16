// import React, { useEffect, useState } from "react";
// import { fetchBooks } from "../utilities/fatchBook";
// import BookCard from "./bookCard";
// import { Book } from "../types/book";

// interface BookListProps {
//   searchQuery: string;
//   genre: string;
//   currentPage: number;
//   wishlist: number[];
//   setWishlist: (wishlist: number[]) => void;
// }

// const BookList: React.FC<BookListProps> = ({
//   searchQuery,
//   genre,
//   currentPage,
//   wishlist,
//   setWishlist,
// }) => {
//   const [books, setBooks] = useState<Book[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);

//   useEffect(() => {
//     const loadBooks = async () => {
//       setLoading(true);
//       const fetchedBooks = await fetchBooks(searchQuery, genre, currentPage);
//       setBooks(fetchedBooks);
//       setLoading(false);
//     };

//     loadBooks();
//   }, [searchQuery, genre, currentPage]);

//   const toggleWishlist = (id: number) => {
//     const updatedWishlist = wishlist.includes(id)
//       ? wishlist.filter((bookId) => bookId !== id)
//       : [...wishlist, id];

//     setWishlist(updatedWishlist);
//     localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-64">
//         <div className="loader"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-8">
//       {books.length > 0 ? (
//         books.map((book) => (
//           <BookCard
//             key={book.id}
//             book={book}
//             onWishlistToggle={toggleWishlist}
//             isWishlisted={wishlist.includes(book.id)}
//           />
//         ))
//       ) : (
//         <p className="text-center text-gray-600 col-span-full">
//           No books found.
//         </p>
//       )}
//     </div>
//   );
// };

// export default BookList;

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../store/store"; // Import AppDispatch and RootState
import {
  loadBooks,
  toggleWishlist,
  setSearchQuery,
  setGenreFilter,
} from "../store/booksSlice";
import BookCard from "./bookCard";

const BookList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>(); // Use typed dispatch

  // Selecting state from Redux store
  const { books, loading, wishlist, searchQuery, genreFilter, currentPage } =
    useSelector((state: RootState) => state.books);

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

    // Check if the book has the genre in its subjects
    const matchesGenre =
      genreFilter === "" ||
      book.subjects.some((subject) =>
        subject.toLowerCase().includes(genreFilter.toLowerCase())
      );

    return matchesSearch && matchesGenre;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="loader"></div>
        <p>Loading books...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      {/* Search and Filter Section */}
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search by title..."
          className="px-4 py-2 border rounded-md w-1/3"
        />
        <div className="mb-4">
          <label htmlFor="genre" className="mr-2 text-lg">
            Filter by Genre:
          </label>
          <select
            id="genre"
            onChange={handleGenreChange}
            className="px-4 py-2 border rounded-lg"
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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-8">
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
          <p className="text-center text-gray-600 col-span-full">
            No books found.
          </p>
        )}
      </div>
    </div>
  );
};

export default BookList;
