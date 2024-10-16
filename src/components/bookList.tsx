import React, { useEffect, useState } from "react";
import { fetchBooks } from "../utilities/fatchBook";
import BookCard from "./bookCard";
import { Book } from "../types/book";

interface BookListProps {
  searchQuery: string;
  genre: string;
  currentPage: number;
  wishlist: number[];
  setWishlist: (wishlist: number[]) => void;
}

const BookList: React.FC<BookListProps> = ({
  searchQuery,
  genre,
  currentPage,
  wishlist,
  //   setWishlist,
}) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadBooks = async () => {
      setLoading(true);
      const fetchedBooks = await fetchBooks(searchQuery, genre, currentPage);
      setBooks(fetchedBooks);
      setLoading(false);
    };

    loadBooks();
  }, [searchQuery, genre, currentPage]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
      {books.length > 0 ? (
        books.map((book) => (
          <BookCard
            key={book.id}
            book={book}
            onWishlistToggle={() => {}}
            isWishlisted={wishlist.includes(book.id)}
          />
        ))
      ) : (
        <p className="text-center text-gray-600 col-span-full">
          No books found.
        </p>
      )}
    </div>
  );
};

export default BookList;
