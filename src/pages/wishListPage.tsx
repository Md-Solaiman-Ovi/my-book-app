import BookCard from "../components/bookCard";
import { AppDispatch, RootState } from "../store/store";
import { useDispatch, useSelector } from "react-redux";
import { loadBooks, toggleWishlist } from "../store/booksSlice";
import { useEffect } from "react";

const WishlistPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { wishlist, books, currentPage } = useSelector(
    (state: RootState) => state.books
  );
  const wishlistedBooks = books.filter((book) => wishlist.includes(book.id));
  const handleToggleWishlist = (id: number) => {
    dispatch(toggleWishlist(id)); // Dispatch the toggle action
  };
  useEffect(() => {
    // Load books when component mounts or currentPage changes
    dispatch(loadBooks(currentPage));
  }, [dispatch, currentPage]);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto py-8">
        <h1 className="text-4xl font-bold text-center text-blue-600 mb-8">
          My Wishlist
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {wishlistedBooks.length > 0 ? (
            wishlistedBooks.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                onWishlistToggle={handleToggleWishlist}
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
