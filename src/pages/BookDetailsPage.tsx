import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Book } from '../types/book';

const BookDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<Book | null>(null);

  useEffect(() => {
    const fetchBook = async () => {
      const response = await fetch(`https://gutendex.com/books/${id}`);
      const data = await response.json();
      setBook(data);
    };

    fetchBook();
  }, [id]);

  if (!book) return <p>Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto py-8">
        <div className="bg-white rounded-lg shadow-md p-6 flex flex-col md:flex-row">
          <img src={book.formats["image/jpeg"]} alt={book.title} className="h-60 object-cover mb-4 md:mb-0 md:mr-4 rounded" />
          <div className="flex-grow">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">{book.title}</h1>
            <p className="text-gray-600 mb-4">By: {book.authors[0]?.name || "Unknown"}</p>
            <p className="text-gray-500 mb-4">Genre: {book.subjects[0] || "Unknown"}</p>
            <p className="text-gray-700">{book.text}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetailPage;