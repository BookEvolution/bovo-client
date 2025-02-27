import { useParams } from "react-router-dom";
import NoteInfo from "./NoteInfo";
import NoteList from "./NoteList";
import "./Note.css";

const Note = () => {
  const { book_id } = useParams();

  return (
    <div className="note-container">
      <NoteInfo book_id={book_id} />
      <NoteList book_id={book_id} />
    </div>
  );
};

export default Note;