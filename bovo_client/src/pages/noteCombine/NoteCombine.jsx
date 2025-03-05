import React, { useEffect, useState } from "react";
import { Box, Paper, Typography, Button } from "@mui/material";
import axios from "axios";
import { useParams } from "react-router-dom";
import CombineModal from "./CombineModal";

const NoteCombine = () => {
  const { book_id } = useParams();
  const [memos, setMemos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bookInfo, setBookInfo] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (!book_id) {
      console.error("book_id 확인 안됨");
      setLoading(false);
      return;
    }

    const fetchBookData = async () => {
      try {
        const response = await axios.get("/archive", { headers: { user_id: 1 } });
        console.log("Full API 응답:", response.data);

        if (!response.data || !response.data.books) {
          console.error("책 데이터 없음");
          setLoading(false);
          return;
        }

        const foundBook = response.data.books.find(
          (book) => Number(book.book_id) === Number(book_id)
        );

        console.log("찾은 책:", foundBook);

        if (foundBook) {
          setBookInfo(foundBook);
          const bookMemos = foundBook.memos || [];
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
      <Paper
        elevation={0}
        sx={{
          width: "41rem",
          height: "73rem",
          backgroundColor: "#E8F1F6",
          borderRadius: "1.25rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {bookInfo && (
          <Box display="flex" alignItems="center" width="100%" mt={2} px={3} overflow="hidden">
            <Box sx={{ display: "flex", alignItems: "center", ml: 2 }}>
              <Box sx={{ width: "0.5rem", height: "8rem", backgroundColor: "#739CD4" }} />
            </Box>
            <Box ml={2} sx={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              <Typography sx={{ fontSize: "2rem", fontWeight: "bold", maxWidth: "30rem" }}>
                {bookInfo.title || "책 제목 없음"}
              </Typography>
              <Typography sx={{ fontSize: "2rem", fontWeight: "500", color: "gray", maxWidth: "30rem" }}>
                {bookInfo.author || "저자 없음"}
              </Typography>
              <Typography sx={{ fontSize: "1.5rem", color: "gray" }}>
                {bookInfo.start_date ? `${bookInfo.start_date} - ${bookInfo.end_date || "현재"}` : "읽은 기간 없음"}
              </Typography>
            </Box>
          </Box>
        )}

        <Paper
          elevation={0}
          sx={{
            width: "38rem",
            height: "59rem",
            overflowY: "auto",
            backgroundColor: "white",
            borderBottomLeftRadius: "1.25rem",
            borderBottomRightRadius: "1.25rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
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
            <Box width="100%" p={2}>
              {memos.map((memo) => (
                <Box key={memo.memo_id} sx={{ marginBottom: "1rem", textAlign: "left", padding: "1rem" }}>
                  <Typography sx={{ fontSize: "1.5rem", fontWeight: "bold", wordBreak: "break-word", mb: 1, px: 1 }}>
                    {memo.memo_Q || "질문 없음"}
                  </Typography>
                  <Typography sx={{ fontSize: "1.5rem", fontWeight: "500", wordBreak: "break-word", px: 1 }}>
                    {memo.memo_A || "답변 없음"}
                  </Typography>
                </Box>
              ))}
            </Box>
          )}
        </Paper>
      </Paper>

      <Box width="41rem" display="flex" justifyContent="flex-end" mt={1}>
        <Button
          variant="contained"
          disableElevation
          onClick={() => {
            console.log("모달 오픈 시 memos:", memos);
            setModalOpen(true);
          }}
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