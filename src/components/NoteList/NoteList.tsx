import type { Note } from "../../types/Note";

interface NoteListProps {
    tasks: Note[] | undefined;
}

export default function NoteList({tasks}: NoteListProps) {
    return console.log(tasks);
}