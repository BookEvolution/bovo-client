import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { Box, Typography } from "@mui/material";

const WishCard = ({ book }) => {
  const navigate = useNavigate();

  return (
    <Box
      onClick={() => navigate(`/archive/${book.book_id}`)}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "10rem",
        cursor: "pointer",
      }}
    >
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