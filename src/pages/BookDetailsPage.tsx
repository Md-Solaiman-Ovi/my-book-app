import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Book } from "../types/book";

const BookDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Get the book ID from the URL
  const bookId = id || "";
  const [book, setBook] = useState<Book | null>(null);

  // Get navigate function for redirection
  const navigate = useNavigate();

  // Assuming books are already fetched and stored in the Redux state
  const books = useSelector((state: RootState) => state.books.books);

  useEffect(() => {
    // Find the book by ID from the Redux store
    const foundBook = books.find((book) => book.id === parseInt(bookId));
    if (foundBook) {
      setBook(foundBook);
    } else {
      // If no book is found, redirect to the home page
      navigate("/", { replace: true });
    }
  }, [bookId, books, navigate]);

  if (!book) {
    return null; // No need to render anything as we are redirecting
  }

  return (
    <div className="mx-auto mt-10 max-w-7xl rounded-lg bg-blue-100 px-4 py-10 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* Left Section - Book Image */}
        <div className="flex justify-center">
          <img
            src={book.formats["image/jpeg"]}
            alt={book.title}
            className="w-full max-w-xs rounded-lg shadow-lg"
          />
        </div>

        {/* Right Section - Book Information */}
        <div>
          <h1 className="text-4xl font-bold text-gray-900">{book.title}</h1>

          {/* Author Details */}
          <p className="mt-4 text-lg text-gray-600">
            <strong>Author:</strong> {book.authors[0].name}
          </p>

          {/* Genres */}
          <p className="mt-2 text-lg text-gray-600">
            <strong>Genres:</strong> {book.subjects.join(", ")}
          </p>

          {/* Book Description */}
          <p className="mt-4 text-base leading-7 text-gray-600">
            This is a fascinating piece of literature written by{" "}
            {book.authors[0].name}. It's categorized under genres such as{" "}
            {book.subjects.join(", ")}. Explore this great book from the classic
            collection and dive into the world of fiction.
          </p>

          {/* Download Section */}
          <div className="mt-6">
            <a
              href={book.formats["image/jpeg"]}
              className="inline-block rounded-lg bg-indigo-600 px-6 py-2 text-white shadow-md transition duration-300 hover:bg-indigo-500"
              target="_blank"
              rel="noopener noreferrer"
            >
              Read Book Online
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
