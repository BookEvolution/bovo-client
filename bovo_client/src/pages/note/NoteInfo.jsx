import { Box, IconButton, Rating, Chip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import NoteBottomSheet from "./NoteBottomSheet";
import "./Note.css";

const statusLabels = { 
  ing: "읽는 중", 
  end: "다 읽음", 
  wish: "읽고 싶음" 
};

const NoteInfo = () => {
  const { book_id } = useParams();
  const [book, setBook] = useState(null);
  const [openSheet, setOpenSheet] = useState(false);

  useEffect(() => {
    const fetchBookData = async () => {
      try {
        const response = await axios.get("/archive", { 
          headers: { user_id: 1 } 
        });
        
        if (response.data?.books) {
          const selectedBook = response.data.books.find(
            (b) => String(b.book_id) === book_id
          );
          setBook(selectedBook || null);
        }
      } catch (error) {
        setBook(null);
      }
    };

    fetchBookData();
  }, [book_id]);

  if (!book) {
    return <p className="loading">도서 정보를 불러오는 중...</p>;
  }

  const handleOpenSheet = () => setOpenSheet(true);
  const handleCloseSheet = () => setOpenSheet(false);

  return (
    <>
      <Box className="note-info">
        <img 
          className="note-book-cover" 
          src={book.cover} 
          alt={book.title} 
        />
        <Box className="note-book-details">
          <Box 
            sx={{ 
              display: "flex", 
              alignItems: "center", 
              position: "relative",
              width: "100%" 
            }}
          >
            <Chip
              label={statusLabels[book.status]}
              sx={{
                fontSize: "1.2rem",
                borderRadius: "2.5rem",
                width: "9rem",
                height: "3rem",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#E8F1F6",
                "& .MuiChip-label": {
                  padding: 0
                }
              }}
            />
            <IconButton 
              onClick={handleOpenSheet} 
              sx={{ 
                position: "absolute",
                right: "2.5rem",
                color: "#739CD4"
              }}
            >
              <EditIcon sx={{ fontSize: "2rem" }} />
            </IconButton>
          </Box>
          <p className="note-book-title">{book.title}</p>
          <p className="note-book-author">{book.author}</p>
          <Rating value={book.star} readOnly className="note-star-rating" />
          <p className="note-book-date">
            {book.start_date} - {book.end_date}
          </p>
        </Box>
      </Box>
      <NoteBottomSheet 
        open={openSheet} 
        onClose={handleCloseSheet} 
      />
    </>
  );
};

export default NoteInfo;