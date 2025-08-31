import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { NotesContext } from "@/context/notesContext";
import { useContext, useState } from "react";

export function InputBox() {
  const [note, setNote] = useState<string>("");
  const { addNote } = useContext(NotesContext);

  return (
    <div className="grid w-[90%] sm:w-[70%] lg:w-[50%] mx-auto mt-20 gap-5">
      <Textarea
        className="border-gray-700"
        placeholder="Type your notes here."
        value={note}
        onChange={(e) => {
          setNote(e.target.value);
        }}
      />
      <Button
        onClick={() => {
          const now: Date = new Date();
          addNote({ note, now, expanded: false, onEdit: false });
          setNote("");
        }}
        className="cursor-pointer"
      >
        Send message
      </Button>
    </div>
  );
}
