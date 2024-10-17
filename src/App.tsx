import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar";
import HomePage from "./pages/homePage";
import WishlistPage from "./pages/wishListPage";
import BookDetailsPage from "./pages/BookDetailsPage";

const App: React.FC = () => (
  <Router>
    <Navbar />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/wishlist" element={<WishlistPage />} />
      <Route path="/book/:id" element={<BookDetailsPage />} />
    </Routes>
  </Router>
);

export default App;
