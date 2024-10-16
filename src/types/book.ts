import { ReactNode } from "react";

export interface Book {
  text: ReactNode;
  id: number;
  title: string;
  authors: Array<{ name: string }>;
  subjects: string[];
  formats: {
    "image/jpeg": string;
  };
}
