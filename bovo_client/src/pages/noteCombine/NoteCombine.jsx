import { useEffect, useState } from "react";
import { Box, Paper, Typography, Button } from "@mui/material";
import axios from "axios";
import { useParams } from "react-router-dom";

const NoteCombine = () => {
  const { book_id } = useParams();
  const [memos, setMemos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("현재 book_id:", book_id);

    if (!book_id) {
      console.error("book_id 확인 안됨");
      setLoading(false);
      return;
    }

    axios
      .get("/archive", { headers: { user_id: 1 } })
      .then((response) => {
        console.log("API 응답 데이터:", response.data);

        if (!response.data || !response.data.books) {
          return;
        }

        const foundBook = response.data.books.find(
          (book) => Number(book.book_id) === Number(book_id)
        );

        if (foundBook) {
          console.log("찾은 책 데이터:", foundBook);
          setMemos(foundBook.memos || []);
        }
      })
      .catch((error) => console.error("데이터 불러오기 실패:", error))
      .finally(() => setLoading(false));
  }, [book_id]);

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Paper
        elevation={0}
        sx={{
          width: "26rem",
          backgroundColor: "#E8F1F6",
          borderRadius: "1.25rem",
          padding: "1.5rem",
          marginBottom: "1rem",
          maxHeight: "40rem",
          overflowY: "auto",
        }}
      >
        {loading ? (
          <Typography sx={{ fontSize: "1.5rem", color: "blue" }}>데이터 불러오는 중</Typography>
        ) : memos.length === 0 ? (
          <Typography sx={{ fontSize: "1.5rem", color: "red" }}>기록이 없습니다.</Typography>
        ) : (
          memos.map((memo) => (
            <Box key={memo.memo_id} sx={{ marginBottom: "1rem" }}>
              <Typography sx={{ fontSize: "1.5rem", fontWeight: "bold", wordBreak: "break-word" }}>
                {memo.memo_Q || "질문 없음"}
              </Typography>
              <Typography sx={{ fontSize: "1.5rem", fontWeight: "500", wordBreak: "break-word" }}>
                {memo.memo_A || "답변 없음"}
              </Typography>
            </Box>
          ))
        )}
      </Paper>

      <Button
        variant="contained"
        sx={{
          backgroundColor: "#E8F1F6",
          color: "#739CD4",
          fontSize: "1rem",
          borderRadius: "0.625rem",
          width: "12rem",
          height: "2.5rem",
        }}
      >
        순서 변경하기
      </Button>
    </Box>
  );
};

export default NoteCombine;
