import type { Note } from "../../types/note";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteNote } from "../../services/noteService";
import css from './NoteList.module.css'


interface NoteListProps {
    tasks: Note[] | undefined;
}

export default function NoteList({ tasks }: NoteListProps) {

    const queryClient = useQueryClient();
    
    const deleteTaskMutation = useMutation({
        mutationFn: (id: number) => deleteNote(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] })
        },
    });


    return (
        <ul className={css.list}>
            {tasks?.map((task) => (
                <li className={css.listItem} key={task.id}>
                    <h2 className={css.title}>{task.title}</h2>
                    <p className={css.content}>{task.content}</p>
    <div className={css.footer}>
                        <span className={css.tag}>{task.tag}</span>
      <button className={css.button} onClick={() => {deleteTaskMutation.mutate(task.id)}} >Delete</button>
    </div>
                </li>
            ))}
        </ul>
    )
}