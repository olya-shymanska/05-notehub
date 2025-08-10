import type { NoteTag } from "./NoteTag";

export interface Note {
    id: number,
    title: string,
    content: string,
    createdAt: string,
    updatedAt: string,
    tag: NoteTag,
}

