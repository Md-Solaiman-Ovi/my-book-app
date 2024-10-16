// src/utils/fetchBooks.ts
// import axios from "axios";
// import { Book } from "../types/book";

// const API_URL = "https://gutendex.com/books";

// export const fetchBooks = async (
//   searchQuery: string,
//   genre: string,
//   currentPage: number
// ): Promise<Book[]> => {
//   try {
//     const response = await axios.get(
//       `${API_URL}?search=${searchQuery}&topic=${genre}&page=${currentPage}`
//     );
//     return response.data.results;
//   } catch (error) {
//     console.error("Error fetching books:", error);
//     return [];
//   }
// };
