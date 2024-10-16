import React from "react";
import { Book } from "../types/book";
interface BookCardProps {
  book: Book;
  onWishlistToggle: (id: number) => void; // Update the prop type
  isWishlisted: boolean;
}

const BookCard: React.FC<BookCardProps> = ({
  book,
  onWishlistToggle,
  isWishlisted,
}) => {
  return (
    <div className="relative bg-white/50 rounded-lg shadow-md p-4 transition-shadow duration-300 hover:shadow-xl h-[450px] flex flex-col gap-4 text-center">
      <div className="flex justify-center">
        <img
          src={book.formats["image/jpeg"] || "https://via.placeholder.com/150"} // Use placeholder if no image
          alt={book.title}
          className="h-64 object-cover mb-4 rounded"
        />
        <button
          onClick={() => onWishlistToggle(book.id)} // Call onWishlistToggle with book.id
          className={`mt-4 p-2 rounded-full absolute top-0 right-4  ${
            isWishlisted ? "bg-red-500 text-white" : "bg-gray-200 text-gray-800"
          }`}
        >
          {isWishlisted ? "❤️" : "🤍"}
        </button>
      </div>
      <div className="flex flex-col">
        <h2 className="text-lg font-semibold">{book.title}</h2>
        <p className="text-gray-600 text-sm">
          Author: {book.authors[0]?.name || "Unknown"}
        </p>
        <p className="text-gray-500 text-sm">
          Genre: {book.subjects[0] || "Unknown"}
        </p>
      </div>
    </div>
  );
};

export default BookCard;
