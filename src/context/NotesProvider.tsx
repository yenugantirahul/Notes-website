// NotesProvider.tsx
import { useState, useEffect } from "react";
import { NotesContext } from "./notesContext";

export interface NotesContextType {
  notes: Note[];
  addNote: (note: Note) => void; // Add missing interface property
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>; // Add missing interface property
  searchNotes: (query: string) => void;
  expandText: (id: Date) => void;
  deleteNotes: (id: Date) => void;
  editToggle: (id: Date) => void;
  saveEdit: (id: Date, newNote: string) => void;
}

export interface Note {
  note: string;
  now: Date;
  expanded: boolean;
  onEdit: boolean;
}

function loadNotes(): Note[] {
  try {
    const stored = localStorage.getItem("notes");
    if (!stored || stored === "undefined" || stored === "null") return [];
    const parsed = JSON.parse(stored);
    if (!Array.isArray(parsed)) return [];
    return parsed.map((note: any) => ({
      ...note,
      now: new Date(note.now),
    }));
  } catch (err) {
    console.error("Error loading notes:", err);
    return [];
  }
}

export function NotesProvider({ children }: { children: React.ReactNode }) {
  const [notes, setNotes] = useState<Note[]>(loadNotes);
  const [filteredNotes, setFilteredNotes] = useState<Note[]>(notes);

  function addNote(note: Note) {
    setNotes((prev) => [...prev, note]);
  }

  function expandText(date: Date | string) {
    const target = new Date(date);
    setNotes((prev) =>
      prev.map((note) =>
        note.now.getTime() === target.getTime()
          ? { ...note, expanded: !note.expanded }
          : note
      )
    );
  }

  function deleteNotes(date: Date | string) {
    const target = new Date(date);
    setNotes((prev) =>
      prev.filter((note) => target.getTime() !== note.now.getTime())
    );
  }

  function editToggle(date: Date | string) {
    const target = new Date(date);
    setNotes((prev) =>
      prev.map((note) =>
        note.now.getTime() === target.getTime()
          ? { ...note, onEdit: !note.onEdit }
          : note
      )
    );
  }

  function saveEdit(date: Date | string, editedNote: string) {
    const target = new Date(date);
    setNotes((prev) =>
      prev.map((note) =>
        note.now.getTime() === target.getTime()
          ? { ...note, note: editedNote, onEdit: false }
          : note
      )
    );
  }

  function searchNotes(keyword: string) {
    if (!keyword.trim()) {
      setFilteredNotes(notes);
    } else {
      setFilteredNotes(
        notes.filter((note) =>
          note.note.toLowerCase().includes(keyword.toLowerCase())
        )
      );
    }
  }

  useEffect(() => {
    try {
      localStorage.setItem("notes", JSON.stringify(notes));
      setFilteredNotes(notes); // keep search results in sync
    } catch (err) {
      console.error("Error saving notes:", err);
    }
  }, [notes]);

  return (
    <NotesContext.Provider
      value={{
        notes: filteredNotes, // ✅ always expose filtered list
        addNote,
        setNotes,
        expandText,
        deleteNotes,
        editToggle,
        saveEdit,
        searchNotes,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
}
