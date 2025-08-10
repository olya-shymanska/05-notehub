import { useEffect } from "react";
import NoteForm from "../NoteForm/NoteForm";
import css from './Modal.module.css'
import { createPortal } from "react-dom";

interface ModalProps {
    onClose: () => void;
};

export default function Modal({ onClose }: ModalProps) {
    
    const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
    };
    
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [onClose]);
      

    return createPortal(
        <div className={css.backdrop} onClick={handleBackdropClick}>
            <div className={css.modal}>
                <NoteForm onCloseBtn={onClose} />
            </div>
        </div>,
         document.body
    );
}