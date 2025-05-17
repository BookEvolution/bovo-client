import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";

const BookCard = ({ book, showDate, showRating }) => {
  const navigate = useNavigate();

  return (
    <Box
      onClick={() => navigate(`/main/archive/${book.book_id}`)}  // 선택하면 상세 페이지
      sx={{
        width: "39rem",
        height: "15rem",
        backgroundColor: "#E8F1F6",
        borderRadius: "1.5625rem",
        padding: "2rem",
        marginBottom: "3rem",
        display: "flex",
        alignItems: "center",
        cursor: "pointer",
      }}
    >
      {/* 책 표지 (없을 때도 설정) */}
      <img
        src={book.cover}
        alt={book.title}
        style={{
          width: "10rem",
          height: "15rem",
          objectFit: "cover",
          backgroundColor: "lightgray",
        }}
      />
       {/* 책 제목 */}
      <Box sx={{ ml: 4, flex: 1 }}>
        <Typography 
          sx={{ 
            fontSize: "1.8rem", 
            fontWeight: "bold", 
            width: "23rem", 
            height: "4rem",
            overflow: "hidden", 
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            lineHeight: "2rem",
            m: 0
          }}
        >
          {book.title}
        </Typography>
         {/* 저자 */}
        <Typography 
          sx={{ 
            fontSize: "1.5rem", 
            fontWeight: 500,
            width: "23rem", 
            height: "3.5rem",
            overflow: "hidden", 
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            lineHeight: "1.7rem",
            mt: 0.5,
            mb: 0.5
          }}
        >
          {book.author}
        </Typography>
         {/* 책 정보 */}
        {showDate && book.start_date && (
          <Typography sx={{ 
            fontSize: "1.25rem", 
            color: "gray",
            height: "2rem",
            display: "flex",
            alignItems: "center",
            m: 0
          }}>
            읽기 시작한 날: {book.start_date}
          </Typography>
        )}
        {showRating && book.star !== undefined && <Rating value={book.star / 2} precision={0.5} readOnly />}
      </Box>
    </Box>
  );
};

BookCard.propTypes = {
  book: PropTypes.object.isRequired,
  showDate: PropTypes.bool,
  showRating: PropTypes.bool,
};

export default BookCard;