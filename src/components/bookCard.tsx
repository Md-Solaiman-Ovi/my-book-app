import React from "react";
import { Link } from "react-router-dom";
import { Book } from "../types/book";

interface BookCardProps {
  book: Book;
  onWishlistToggle: (id: number) => void;
  isWishlisted: boolean;
}

const BookCard: React.FC<BookCardProps> = ({
  book,
  onWishlistToggle,
  isWishlisted,
}) => {
  const maxTitleLength = (title: string) => {
    const words = title.split(" ");
    if (words.length > 5) {
      return words.slice(0, 5).join(" ") + "...";
    }
    return title;
  };

  return (
    <div className="relative">
      {/* Wrapping the card content in the Link */}
      <Link
        to={`/book/${book.id}`}
        className="relative flex h-[450px] flex-col gap-4 rounded-lg bg-white/50 p-4 text-center shadow-md transition-shadow duration-300 hover:shadow-xl"
      >
        <div className="flex justify-center">
          <img
            src={
              book.formats["image/jpeg"] || "https://via.placeholder.com/150"
            } // Use placeholder if no image
            alt={maxTitleLength(book.title)}
            className="mb-4 h-64 rounded object-cover"
          />
        </div>
        <div className="flex flex-col">
          <h2 className="text-lg font-semibold">
            {maxTitleLength(book.title)}
          </h2>
          <p className="text-sm text-gray-600">
            Author: {book.authors[0]?.name || "Unknown"}
          </p>
          <p className="text-sm text-gray-500">
            Genre: {book.subjects[0] || "Unknown"}
          </p>
          <p className="text-sm text-gray-500">Book Id: {book.id}</p>
        </div>
      </Link>

      {/* Separate wishlist button outside the Link to avoid interference */}
      <button
        onClick={(e) => {
          e.preventDefault(); // Prevents navigation triggered by the button
          onWishlistToggle(book.id); // Call onWishlistToggle with book.id
        }}
        className={`absolute right-4 top-0 mt-4 rounded-full p-2 ${
          isWishlisted ? "bg-red-500 text-white" : "bg-gray-200 text-gray-800"
        }`}
      >
        {isWishlisted ? "❤️" : "🤍"}
      </button>
    </div>
  );
};

export default BookCard;
