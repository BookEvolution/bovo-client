import { useParams } from "react-router-dom";
import NoteInfo from "./NoteInfo";
import NoteList from "./NoteList";
import styles from "./Note.module.css";

const Note = () => {
  const { book_id } = useParams();

  return (
    <div className={styles.noteContainer}>
      <NoteInfo book_id={book_id} />
      <NoteList book_id={book_id} />
    </div>
  );
};

export default Note;
