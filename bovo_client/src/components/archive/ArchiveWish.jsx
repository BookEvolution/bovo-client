import { bookPropType } from "../../utils/propTypes";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import styles from "./Archive.module.css";

const ArchiveWish = ({ books }) => {
  const navigate = useNavigate();

  return (
    <div className={styles.wishlist}>
      {books.map((book) => (
        <div 
          className={styles.wishcard} 
          key={book.book_id}
          onClick={() => navigate(`/note/${book.book_id}`)}
        >
          <img className={styles.wishcover} src={book.cover} alt={book.title} />
          <div className={styles.wishinfo}>
            <p className={styles.wishtitle}>{book.title}</p>
            <p className={styles.wishauthor}>{book.author}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

ArchiveWish.propTypes = {
  books: PropTypes.arrayOf(bookPropType).isRequired,
};

export default ArchiveWish;