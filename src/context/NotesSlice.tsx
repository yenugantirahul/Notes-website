// NotesSlice.tsx
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Note {
  note: string;
  now: string; // store as string for JSON serialization
  expanded: boolean;
  onEdit: boolean;
}

interface NotesState {
  notes: Note[];
  filteredNotes: Note[];
}

const loadNotes = (): Note[] => {
  try {
    const stored = localStorage.getItem("notes");
    if (!stored || stored === "undefined" || stored === "null") return [];
    return JSON.parse(stored);
  } catch {
    return [];
  }
};

const initialState: NotesState = {
  notes: loadNotes(),
  filteredNotes: loadNotes(),
};

export const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    addNote: (state, action: PayloadAction<Note>) => {
      state.notes.push(action.payload);
      state.filteredNotes = state.notes;
      localStorage.setItem("notes", JSON.stringify(state.notes));
    },
    deleteNote: (state, action: PayloadAction<string>) => {
      state.notes = state.notes.filter((n) => n.now !== action.payload);
      state.filteredNotes = state.notes;
      localStorage.setItem("notes", JSON.stringify(state.notes));
    },
    toggleExpand: (state, action: PayloadAction<string>) => {
      state.notes = state.notes.map((n) =>
        n.now === action.payload ? { ...n, expanded: !n.expanded } : n
      );
      state.filteredNotes = state.notes;
      localStorage.setItem("notes", JSON.stringify(state.notes));
    },
    toggleEdit: (state, action: PayloadAction<string>) => {
      state.notes = state.notes.map((n) =>
        n.now === action.payload ? { ...n, onEdit: !n.onEdit } : n
      );
      state.filteredNotes = state.notes;
      localStorage.setItem("notes", JSON.stringify(state.notes));
    },
    saveEdit: (
      state,
      action: PayloadAction<{ now: string; editedNote: string }>
    ) => {
      state.notes = state.notes.map((n) =>
        n.now === action.payload.now
          ? { ...n, note: action.payload.editedNote, onEdit: false }
          : n
      );
      state.filteredNotes = state.notes;
      localStorage.setItem("notes", JSON.stringify(state.notes));
    },
    searchNotes: (state, action: PayloadAction<string>) => {
      if (!action.payload.trim()) {
        state.filteredNotes = state.notes;
      } else {
        state.filteredNotes = state.notes.filter((n) =>
          n.note.toLowerCase().includes(action.payload.toLowerCase())
        );
      }
    },
  },
});

export const {
  addNote,
  deleteNote,
  toggleExpand,
  toggleEdit,
  saveEdit,
  searchNotes,
} = notesSlice.actions;

export default notesSlice.reducer;
