// src/utils/fetchBooks.ts
import axios from "axios";
import { Book } from "../types/book";

const API_URL = "https://gutendex.com/books";

export const fetchBooks = async (
  searchQuery: string,
  genre: string,
  currentPage: number
): Promise<Book[]> => {
  try {
    const response = await axios.get(
      `${API_URL}?search=${searchQuery}&topic=${genre}&page=${currentPage}`
    );
    return response.data.results;
  } catch (error) {
    console.error("Error fetching books:", error);
    return [];
  }
};

// src/utils/fetchBooks.ts

// export const fetchBooks = async (
//   searchQuery: string,
//   genre: string,
//   currentPage: number
// ) => {
//   try {
//     const response = await fetch(
//       `https://gutendex.com/books?search=${searchQuery}&subject=${genre}&page=${currentPage}`
//     );
//     if (!response.ok) {
//       throw new Error(`Error fetching books: ${response.statusText}`);
//     }
//     const data = await response.json();
//     console.log("Fetched books data:", data); // Log the fetched data
//     return data.results; // Adjust based on the actual structure of the response
//   } catch (error) {
//     console.error(error);
//     return []; // Return an empty array in case of error
//   }
// };
