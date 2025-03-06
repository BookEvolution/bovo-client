import { Box, IconButton, Rating, Chip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import NoteBottomSheet from "./NoteBottomSheet";
import styles from "./Note.module.css";

// 상태에 따른 라벨 매핑
const statusLabels = { 
  ing: "읽는 중", 
  end: "다 읽음", 
  wish: "읽고 싶음" 
};

const NoteInfo = () => {
  const { book_id } = useParams(); // URL에서 book_id 가져오기
  const [book, setBook] = useState(null); // 도서 정보를 저장
  const [openSheet, setOpenSheet] = useState(false); // 모달 열림 여부 상태

  useEffect(() => {
    const fetchBookData = async () => {
      try {
        // 도서 정보 요청 나중에 수정
        const response = await axios.get("/archive", { 
          headers: { user_id: 1 }
        });
        
        if (response.data?.books) {
          // book_id와 일치하는 도서 찾기
          const selectedBook = response.data.books.find(
            (b) => String(b.book_id) === book_id
          );
          setBook(selectedBook || null); // 도서 정보 상태 업데이트
        }
      } catch (error) {
        setBook(null); // 요청 실패 시 null 설정
      }
    };

    fetchBookData(); // API 호출 실행
  }, [book_id]);

  // 로딩 중 표시
  if (!book) {
    return <p className={styles.loading}>도서 정보를 불러오는 중</p>;
  }

  // 모달 열기/닫기
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
            {/* 수정 아이콘 버튼 */}
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
          <Rating value={book.star} readOnly className={styles.starRating} />
          {/* 독서 기간 */}
          <p className={styles.bookDate}>
            {book.start_date} - {book.end_date}
          </p>
        </Box>
      </Box>
      {/* 수정 바텀 시트 */}
      <NoteBottomSheet 
        open={openSheet} 
        onClose={handleCloseSheet} 
      />
    </>
  );
};

export default NoteInfo;