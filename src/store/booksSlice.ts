import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Book } from "../types/book";

interface BooksState {
  books: Book[];
  wishlist: number[];
  loading: boolean;
  currentPage: number;
  totalPages: number;
  searchQuery: string;
  genreFilter: string;
}

const initialState: BooksState = {
  books: JSON.parse(localStorage.getItem("books") || "[]"),
  wishlist: JSON.parse(localStorage.getItem("wishlist") || "[]"),
  loading: false,
  currentPage: 1,
  totalPages: 0,
  searchQuery: "",
  genreFilter: "",
};

// Async thunk to fetch books
export const loadBooks = createAsyncThunk(
  "books/loadBooks",
  async (page: number = 1) => {
    const cachedBooks = localStorage.getItem(`books_page_${page}`);
    if (cachedBooks) {
      return JSON.parse(cachedBooks);
    }
    const response = await axios.get(
      `https://gutendex.com/books/?page=${page}`
    );
    localStorage.setItem(`books_page_${page}`, JSON.stringify(response.data));
    return response.data;
  }
);

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    toggleWishlist: (state, action) => {
      const bookId = action.payload;
      const isWishlisted = state.wishlist.includes(bookId);
      state.wishlist = isWishlisted
        ? state.wishlist.filter((id) => id !== bookId)
        : [...state.wishlist, bookId];
      localStorage.setItem("wishlist", JSON.stringify(state.wishlist));
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setGenreFilter: (state, action) => {
      state.genreFilter = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadBooks.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loadBooks.fulfilled, (state, action) => {
      state.books = action.payload.results;
      state.totalPages = Math.ceil(action.payload.count / 10); // Assuming 10 books per page
      state.loading = false;
    });
    builder.addCase(loadBooks.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const {
  toggleWishlist,
  setSearchQuery,
  setGenreFilter,
  setCurrentPage,
} = booksSlice.actions;
export default booksSlice.reducer;
