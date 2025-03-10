import { useParams } from "react-router-dom";
import NoteInfo from "../../components/note/NoteInfo";
import NoteList from "../../components/note/NoteList";
import styles from "../../components/note/Note.module.css";
import useBooks from "../../hooks/useBooks";

const Note = () => {
  const { book_id } = useParams();
  const { getBookById } = useBooks();
  const book = getBookById(book_id);

  console.log("책 정보 확인:", book);

  if (!book) return <p className={styles.loading}>도서 정보를 불러오는 중</p>;

  return (
    <div className={styles.noteContainer}>
      <NoteInfo book={book} />
      <NoteList book={book} />
    </div>
  );
};

export default Note;