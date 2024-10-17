import { ReactNode } from "react";

export interface Book {
  text: ReactNode;
  id: number;
  title: string;
  authors: { name: string; birth_year: number; death_year: number }[];
  subjects: string[];
  bookshelves: string[];
  languages: string[];
  formats: {
    "image/jpeg": string;
  };
}
