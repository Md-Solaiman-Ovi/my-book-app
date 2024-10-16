import React, { useEffect, useState } from "react";
import BookCard from "../components/bookCard";
import { Book } from "../types/book";

const WishlistPage: React.FC = () => {
  const [wishlist, setWishlist] = useState<number[]>(() => {
    return JSON.parse(localStorage.getItem("wishlist") || "[]");
  });
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    const fetchWishlistBooks = async () => {
      const fetchedBooks = await Promise.all(
        wishlist.map((id) => fetchBookById(id))
      );
      setBooks(fetchedBooks);
    };

    fetchWishlistBooks();
  }, [wishlist]);

  const fetchBookById = async (id: number) => {
    const response = await fetch(`https://gutendex.com/books/${id}`);
    return await response.json();
  };

  const toggleWishlist = (id: number) => {
    const updatedWishlist = wishlist.includes(id)
      ? wishlist.filter((bookId) => bookId !== id)
      : [...wishlist, id];

    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto py-8">
        <h1 className="text-4xl font-bold text-center text-blue-600 mb-8">
          My Wishlist
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {books.length > 0 ? (
            books.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                onWishlistToggle={toggleWishlist}
                isWishlisted={wishlist.includes(book.id)}
              />
            ))
          ) : (
            <p className="text-center text-gray-600 col-span-full">
              No books in your wishlist.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default WishlistPage;
