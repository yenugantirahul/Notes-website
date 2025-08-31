import { createContext } from "react";
import type { NotesContextType } from "./NotesProvider";

export const NotesContext = createContext<NotesContextType>(
  {} as NotesContextType
);
