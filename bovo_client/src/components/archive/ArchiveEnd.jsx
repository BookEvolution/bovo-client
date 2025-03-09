import PropTypes from "prop-types";
import { bookPropType } from "../utils/propTypes";
import { useNavigate } from "react-router-dom";
import Rating from "@mui/material/Rating";
import styles from "./components/Archive.module.css";

const ArchiveEnd = ({ books }) => {
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
            {book.star !== undefined && <Rating value={book.star} readOnly />}
          </div>
        </div>
      ))}
    </div>
  );
};

ArchiveEnd.propTypes = {
  books: PropTypes.arrayOf(bookPropType).isRequired,
};

export default ArchiveEnd;