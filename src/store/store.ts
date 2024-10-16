import { configureStore } from "@reduxjs/toolkit";
import booksReducer from "./booksSlice";

const store = configureStore({
  reducer: {
    books: booksReducer,
    // add other reducers if needed
  },
});

// Export the RootState and AppDispatch types from the store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
