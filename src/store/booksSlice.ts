import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Book } from "../types/book";

interface BooksState {
  books: Book[];
  wishlist: number[];
  loading: boolean;
  currentPage: number;
  totalPages: number;
  totalCount: number; // New property for total count of books
  searchQuery: string;
  genreFilter: string;
}

const initialState: BooksState = {
  books: JSON.parse(localStorage.getItem("books") || "[]"),
  wishlist: JSON.parse(localStorage.getItem("wishlist") || "[]"),
  loading: false,
  currentPage: 1,
  totalPages: 0,
  totalCount: 0, // Initialize totalCount
  searchQuery: "",
  genreFilter: "",
};

// Async thunk to fetch books
export const loadBooks = createAsyncThunk(
  "books/loadBooks",
  async (page: number = 1) => {
    // Check for cached data in localStorage first
    const cachedBooks = localStorage.getItem(`books_page_${page}`);
    if (cachedBooks) {
      return JSON.parse(cachedBooks);
    }

    // If not in localStorage, fetch data from API
    const response = await axios.get(
      `https://gutendex.com/books/?page=${page}`,
    );

    // Save fetched data to localStorage
    // localStorage.setItem(`books_page_${page}`, JSON.stringify(response.data));
    return response.data;
  },
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

      // Persist wishlist in localStorage
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
    builder
      .addCase(loadBooks.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadBooks.fulfilled, (state, action) => {
        state.books = action.payload.results;
        state.totalCount = action.payload.count; // Set total count of books
        state.totalPages = Math.ceil(action.payload.count / 10); // Assuming 10 books per page
        state.loading = false;
      })
      .addCase(loadBooks.rejected, (state) => {
        state.loading = false;
      });
  },
});

// Exporting the action creators
export const {
  toggleWishlist,
  setSearchQuery,
  setGenreFilter,
  setCurrentPage,
} = booksSlice.actions;

export default booksSlice.reducer;
