import { NotesContext } from "@/context/notesContext";
import { useContext, useState } from "react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MdEditSquare, MdDelete } from "react-icons/md";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import type { Note } from "@/context/NotesProvider"; // Fix import path

const Notes = () => {
  const { notes, searchNotes } = useContext(NotesContext);
  const [search, setSearch] = useState<string>("");

  return (
    <>
      <div className="flex text-center mx-auto mt-10 w-full max-w-sm items-center gap-2">
        <Input
          className="h-[50px] text-xl"
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            searchNotes(e.target.value);
          }}
        />
        <Button
          className="h-[50px] cursor-pointer"
          type="submit"
          variant="outline"
          onClick={() => searchNotes(search)}
        >
          Search
        </Button>
      </div>

      <div className="grid mt-4 px-5 sm:grid-cols-2 lg:grid-cols-2 gap-10">
        {notes.length > 0 ? (
          notes.map((note, i) => (
            <NoteCard key={note.now.toString()} {...note} index={i + 1} />
          ))
        ) : (
          <div className="text-center w-full mt-10 text-gray-500 text-lg">
            No notes found
          </div>
        )}
      </div>
    </>
  );
};

interface NoteCardProps extends Note {
  index: number;
}

const NoteCard = ({ onEdit, note, index, now, expanded }: NoteCardProps) => {
  const { expandText, deleteNotes, editToggle, saveEdit } =
    useContext(NotesContext);
  const [editNote, setEditNote] = useState<string>(note);

  return (
    <Card
      className={`w-[300px] lg:w-[350px] ${
        onEdit ? "h-[330px]" : "h-fit"
      } mx-auto p-4`}
    >
      <CardTitle className="text-center mb-2">Note - {index}</CardTitle>

      {onEdit ? (
        <>
          <Textarea
            className="border-gray-700"
            placeholder="Type your notes here."
            value={editNote}
            onChange={(e) => setEditNote(e.target.value)}
          />
          <Button className="mt-2" onClick={() => saveEdit(now, editNote)}>
            Save
          </Button>
        </>
      ) : (
        <CardContent
          className={`text-sm transition-all duration-300 ease-in-out ${
            expanded ? "" : "line-clamp-4"
          }`}
        >
          {note}
        </CardContent>
      )}

      <div className="flex cursor-pointer justify-between items-center gap-2 mt-3">
        <Button onClick={() => editToggle(now)} className="ml-5 cursor-pointer">
          <MdEditSquare size={"30px"} />
        </Button>
        <Button
          onClick={() => deleteNotes(now)}
          className="cursor-pointer mr-5"
        >
          <MdDelete size={"30px"} />
        </Button>
      </div>

      {note.length > 100 && (
        <Button
          variant="ghost"
          size="sm"
          className="mt-2 text-white bg-gray-700 cursor-pointer"
          onClick={() => expandText(now)}
        >
          {expanded ? "Show Less" : "Show More"}
        </Button>
      )}
    </Card>
  );
};

export default Notes;
