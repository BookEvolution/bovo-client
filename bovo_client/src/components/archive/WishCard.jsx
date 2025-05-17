import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const WishCard = ({ book }) => {
  const navigate = useNavigate();

  return (
    <Box
      onClick={() => navigate(`/main/archive/${book.book_id}`)}  //선택하면 상세 페이지
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "10rem",
        cursor: "pointer",
      }}
    >
        {/* 책 표지 */}
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
      <Box sx={{ textAlign: "left", mt: 1, width: "100%" }}>
        {/* 책 제목 */}
        <Typography 
          sx={{ 
            fontSize: "1.5rem", 
            fontWeight: "bold", 
            width: "10rem", 
            height: "1.75rem",
            overflow: "hidden", 
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            m: 0 
          }}
        >
          {book.title}
        </Typography>
        {/* 책 저자 */}
        <Typography 
          sx={{ 
            fontSize: "1.5rem", 
            width: "10rem", 
            height: "1.75rem",
            overflow: "hidden", 
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            m: 0
          }}
        >
          {book.author}
        </Typography>
      </Box>
    </Box>
  );
};

WishCard.propTypes = {
  book: PropTypes.object.isRequired,
};

export default WishCard;