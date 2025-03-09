import { Box, IconButton, Rating, Chip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";
import NoteBottomSheet from "./NoteBottomSheet";
import styles from "./Note.module.css";
import { bookPropType } from "../../utils/propTypes";

const statusLabels = {
  ing: "읽는 중",
  end: "다 읽음",
  wish: "읽고 싶음"
};

const NoteInfo = ({ book }) => {
  const [openSheet, setOpenSheet] = useState(false);
  
  const handleOpenSheet = () => setOpenSheet(true);
  const handleCloseSheet = () => setOpenSheet(false);
  
  return (
    <>
      <Box className={styles.info}>
        <img
          className={styles.bookcover}
          src={book.cover}
          alt={book.title}
        />
        <Box className={styles.details}>
          {/* 상태 표시 및 수정 버튼 */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              position: "relative",
              width: "100%"
            }}
          >
            {/* 책 상태 표시 */}
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
            {/* 정보 수정 */}
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
          {/* 책 제목 */}
          <p className={styles.bookTitle}>{book.title}</p>
          {/* 저자 정보 */}
          <p className={styles.author}>{book.author}</p>
          {/* 별점 표시 */}
          <Rating 
            value={book.star / 2} 
            precision={0.5}
            readOnly 
            className={styles.starRating}
          />
          {/* 독서 기간 */}
          <p className={styles.bookDate}>
            {book.start_date} - {book.end_date}
          </p>
        </Box>
      </Box>

      <NoteBottomSheet 
        open={openSheet} 
        onClose={handleCloseSheet} 
        book={book} 
      />
    </>
  );
};

NoteInfo.propTypes = {
  book: bookPropType.isRequired,
};

export default NoteInfo;