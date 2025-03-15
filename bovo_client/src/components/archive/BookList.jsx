import PropTypes from "prop-types";
import { Box } from "@mui/material";
import BookCard from "./BookCard";
import WishCard from "./WishCard";

const BookList = ({ books, variant }) => {
  const listStyles = variant === "wish" 
    ? {
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "2rem",
        justifyItems: "center",
        width: "43rem",
        maxHeight: "63rem",
        overflowY: "auto",
        marginTop: "2rem",
      }
    : {
        width: "43rem",
        maxHeight: "63rem",
        overflowY: "auto",
        paddingRight: "0.5rem",
        marginTop: "1rem",
      };

  return (
    <Box sx={listStyles}>
      {books.map((book) =>
        variant === "wish" ? 
          <WishCard key={book.book_id} book={book} /> : 
          <BookCard key={book.book_id} book={book} showDate={variant === "ing"} showRating={variant === "end"} />
      )}
    </Box>
  );
};

BookList.propTypes = {
  books: PropTypes.array.isRequired,
  variant: PropTypes.oneOf(["ing", "end", "wish"]).isRequired,
};

export default BookList;