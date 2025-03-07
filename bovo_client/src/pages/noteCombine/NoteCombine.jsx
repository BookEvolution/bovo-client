import React, { useEffect, useState } from "react";
import { Box, Paper, Typography, Button } from "@mui/material";
import axios from "axios";
import { useParams } from "react-router-dom";
import CombineModal from "./CombineModal";

const NoteCombine = () => {
  const { book_id } = useParams(); // URL에서 book_id 가져오기
  const [memos, setMemos] = useState([]); // 메모 목록 상태
  const [loading, setLoading] = useState(true); // 데이터 로딩 상태
  const [bookInfo, setBookInfo] = useState(null); // 책 정보 상태
  const [modalOpen, setModalOpen] = useState(false); // 모달 상태

  useEffect(() => {
    if (!book_id) {
      console.error("book_id 확인 안됨");
      setLoading(false);
      return;
    }

    const fetchBookData = async () => {
      try {
        // API 요청하여 데이터 가져오기
        const response = await axios.get("/archive", { headers: { user_id: 1 } });
        console.log("Full API 응답:", response.data);

        if (!response.data || !response.data.books) {
          console.error("책 데이터 없음");
          setLoading(false);
          return;
        }

        // book_id와 일치하는 책 찾기
        const foundBook = response.data.books.find(
          (book) => Number(book.book_id) === Number(book_id)
        );

        console.log("찾은 책:", foundBook);

        if (foundBook) {
          setBookInfo(foundBook); // 책 정보 저장
          const bookMemos = foundBook.memos || []; // 메모 리스트 저장
          console.log("책의 메모:", bookMemos);
          setMemos(bookMemos);
        } else {
          console.error("해당 ID의 책을 찾을 수 없음");
        }
      } catch (error) {
        console.error("데이터 불러오기 실패:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookData();
  }, [book_id]);

  return (
<Box display="flex" flexDirection="column" alignItems="center">
  <Box
    sx={{
      width: "41rem",
      height: "73rem",
      backgroundColor: "#E8F1F6",
      borderRadius: "1.25rem",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      paddingBottom: "1.75rem",
    }}
  >
    {bookInfo && (
      <Box 
        display="flex" 
        flexDirection="column"
        alignItems="center"
        mt="2rem"
        px="3rem"
        overflow="hidden"
      >
        <Box display="flex" alignItems="center" width="100%">
          <Box sx={{ 
            display: "flex", 
            alignItems: "center", 
            }}>
            <Box sx={{ 
                width: "0.3rem", 
                height: "8rem",
                mr: "1rem",
                backgroundColor: "#739CD4" 
                }} />
          </Box>
          <Box sx={{ 

            }}>
            <Typography sx={{ 
                fontSize: "2rem", 
                fontWeight: "bold", 
                maxWidth: "36rem",
                whiteSpace: "nowrap", 
                overflow: "hidden", 
                textOverflow: "ellipsis"
                }}>
              {bookInfo.title || "책 제목 없음"}
            </Typography>
            <Typography sx={{ 
                fontSize: "2rem", 
                color: "gray", 
                maxWidth: "36rem",
                whiteSpace: "nowrap", 
                overflow: "hidden", 
                textOverflow: "ellipsis"
                }}>
              {bookInfo.author || "저자 없음"}
            </Typography>
            <Typography sx={{ 
                fontSize: "1.5rem", 
                color: "gray" 
                }}>
              {bookInfo.start_date ? `${bookInfo.start_date} ~ ${bookInfo.end_date || "현재"}` : "읽은 기간 없음"}
            </Typography>
          </Box>
        </Box>

        {/* 기록 영역 */}
        <Box
          sx={{
            width: "38rem",
            height: "63rem",
            overflowY: "auto",
            backgroundColor: "white",
            borderBottomLeftRadius: "1.25rem",
            borderBottomRightRadius: "1.25rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "2rem",
          }}
        >
          {loading ? (
            <Typography sx={{ fontSize: "1.5rem", color: "blue", textAlign: "center", mt: "2rem" }}>
              데이터 불러오는 중
            </Typography>
          ) : memos.length === 0 ? (
            <Typography sx={{ fontSize: "1.5rem", color: "red", textAlign: "center", mt: "2rem" }}>
              기록이 없습니다.
            </Typography>
          ) : (
            <Box width="98%" >
              {memos.map((memo) => (
                <Box key={memo.memo_id} 
                sx={{ 
                    marginBottom: "1rem", 
                    textAlign: "left", 
                    padding: "1rem" 
                    }}>
                  <Typography sx={{ 
                    fontSize: "1.5rem", 
                    fontWeight: "500", 
                    mb: "1rem", 
                    px: "1rem" 
                    }}>
                    {memo.memo_Q || "제목 없음"}
                  </Typography>
                  <Typography sx={{ 
                    fontSize: "1rem", 
                    mb: "1rem", 
                    px: "1rem" 
                    }}>
                    {memo.memo_A || "내용 없음"}
                  </Typography>
                </Box>
              ))}
            </Box>
          )}
        </Box>
      </Box>
    )}
  </Box>
  
  {/* 순서 변경하기 버튼 */}
  <Box width="41rem" display="flex" justifyContent="flex-end" mt={2}>
    <Button
      variant="contained"
      disableElevation
      onClick={() => setModalOpen(true)}
      sx={{
        backgroundColor: "#E8F1F6",
        color: "#739CD4",
        fontSize: "1.75rem",
        borderRadius: "1.25rem",
        width: "15rem",
        height: "5rem",
      }}
    >
      순서 변경하기
    </Button>
  </Box>

      {modalOpen && memos.length > 0 && (
        <CombineModal open={modalOpen} onClose={() => setModalOpen(false)} memos={memos} setMemos={setMemos} />
      )}
    </Box>
  );
};

export default NoteCombine;