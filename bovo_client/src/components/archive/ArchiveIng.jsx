import PropTypes from "prop-types";
import { bookPropType } from "../utils/propTypes";
import { useNavigate } from "react-router-dom";
import styles from "./components/Archive.module.css";

const ArchiveIng = ({ books }) => {
  const navigate = useNavigate();

  return (
    <div className={styles.booklist}>
      {books.map((book) => (
        <div 
          className={styles.bookcard} 
          key={book.book_id}
          onClick={() => navigate(`/note/${book.book_id}`)}
        >
          <img className={styles.bookcover} src={book.cover} alt={book.title} />
          <div className={styles.bookinfo}>
            <p className={styles.booktitle}>{book.title}</p>
            <p className={styles.bookauthor}>{book.author}</p>
            {book.start_date && <p className={styles.bookdate}>읽기 시작한 날: {book.start_date}</p>}
          </div>
        </div>
      ))}
    </div>
  );
};

ArchiveIng.propTypes = {
  books: PropTypes.arrayOf(bookPropType).isRequired,
};

export default ArchiveIng;