import { useParams } from "react-router-dom";
import NoteInfo from "../../components/note/NoteInfo";
import NoteList from "../../components/note/NoteList";
import styles from "../../components/note/Note.module.css";
import useBook from "../../hooks/useBook";

const Note = () => {
  const { book_id } = useParams();
  const { book, memos } = useBook(book_id);

  if (!book) return <p className={styles.loading}>도서 정보를 불러오는 중</p>;

  return (
    <div className={styles.noteContainer}>
      <NoteInfo book={book} />
      <NoteList book={book} memos={memos} />
    </div>
  );
};

export default Note;