import PropTypes from "prop-types";
import { Box } from "@mui/material";
import BookCard from "./BookCard";
import WishCard from "./WishCard";

const BookList = ({ books, variant }) => {
  const listStyles = variant === "wish"     //값에 따라 스타일 다르게
    ? {
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",      //3열 그리드로
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
    {/* 값에 따라 다른 카드 렌더링 */}
      {books.map((book) =>
        variant === "wish" ? 
          <WishCard key={book.book_id} book={book} /> : 
          <BookCard 
          key={book.book_id} 
          book={book} 
          showDate={variant === "ing"}     // ing면 날짜
          showRating={variant === "end"}   // end면 별점
          />
      )}
    </Box>
  );
};
// PropTypes 정의
BookList.propTypes = {
  books: PropTypes.array.isRequired,
  variant: PropTypes.oneOf(["ing", "end", "wish"]).isRequired,
};

export default BookList;