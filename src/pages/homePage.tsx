import BookList from "../components/bookList";

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-300">
      <div className="container mx-auto py-8 pb-20">
        <h1 className="mb-8 text-center text-4xl font-bold text-blue-600">
          Explore Books
        </h1>
        <BookList />
      </div>
    </div>
  );
};

export default HomePage;
