/**기록 상세보기 페이지 */

import { useState, useEffect } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import DeleteModal from "../../components/deleteModal/DeleteModal";
import { noteDetailData } from "../../api/NoteApi";
import useBook from "../../hooks/useBook";

const NoteDetail = () => {
  const { book_id } = useParams();
  const [searchParams] = useSearchParams();
  const memo_id = searchParams.get("memoId");
  const { book } = useBook(book_id);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [memo, setMemo] = useState(null);

  console.log(" bookId:", book_id);
  console.log(" memoId:", memo_id);

  useEffect(() => {
    if (!book_id || !memo_id) {
      console.error("bookId 또는 memoId가 없습니다.");
      return;
    }

    const fetchMemo = async () => {
      try {
        const data = await noteDetailData(book_id, memo_id);

        const updatedMemo = {
          ...data, // 기존 데이터 유지
          memo_id: data.memo_id ?? memo_id, // memo_id가 null이면 memoId로 덮어쓰기
        };

        console.log("최종 업데이트된 memo:", updatedMemo);

        setMemo(updatedMemo); //새로운 객체 생성 - 오류 자꾸 나서
      } catch (error) {
        console.error("API 요청 중 오류 발생:", error);
      }
    };

    fetchMemo();
  }, [book_id, memo_id]);

  if (!memo) return <Typography>기록을 불러오는 중</Typography>;

  return (
    <Box display="flex" flexDirection="column" alignItems="center" p={4}>
      {/* 날짜 및 가로줄 */}
      <Box display="flex" alignItems="center" width="100%" maxWidth="41rem">
        <Typography sx={{ fontSize: "2rem", fontWeight: "bold" }}>{memo.memo_date}</Typography>
        <Box flexGrow={1} mx={2} height={2} bgcolor="#739CD4"></Box>
      </Box>

      {/* 질문 박스 */}
      <Box
        sx={{
          width: "41rem",
          height: "68.5rem",
          backgroundColor: "#E8F1F6",
          borderRadius: "20px",
          mt: 4,
          position: "relative",
        }}
      >
        {/* 세로줄 + 질문 */}
        <Box display="flex" alignItems="center">
          <Box sx={{ width: "0.5rem", height: "8rem", backgroundColor: "#739CD4", marginLeft: "2rem" }} />
          <Typography
            color="black"
            sx={{
              display: "flex",
              alignItems: "center",
              height: "8rem",
              fontSize: "2rem",
              fontWeight: "bold",
              margin: "2rem",
            }}
          >
            {memo.memo_Q}
          </Typography>
        </Box>

        {/* 내용 */}
        <Box
          sx={{
            width: "38rem",
            height: "55rem",
            backgroundColor: "white",
            borderBottomLeftRadius: "1.25rem",
            borderBottomRightRadius: "1.25rem",
            overflowY: "auto",
            position: "absolute",
            bottom: "1.5rem",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          <Typography sx={{ fontSize: "1.5rem", margin: "1.5rem" }}>{memo.memo_A}</Typography>
        </Box>
      </Box>

      {/* 버튼 */}
      <Box display="flex" gap={2} mt={3} width="41rem" justifyContent="flex-end">
        <Button
          variant="contained"
          disableElevation
          onClick={() => setIsModalOpen(true)}
          sx={{
            width: "15rem",
            height: "5rem",
            borderRadius: "1.25rem",
            backgroundColor: "#E8F1F6",
            color: "red",
            fontSize: "1.5rem",
          }}
        >
          삭제하기
        </Button>
        <Button
          variant="contained"
          disableElevation
          onClick={() => navigate(`/archive/edit/${book_id}/${memo_id}`)}
          sx={{
            width: "15rem",
            height: "5rem",
            borderRadius: "1.25rem",
            backgroundColor: "#E8F1F6",
            color: "black",
            fontSize: "1.5rem",
          }}
        >
          수정하기
        </Button>
      </Box>
      <DeleteModal
       open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        targetId={memo_id}
        targetType="memo"
        bookId={book?.book_id}
        onSuccess={() => navigate(`/archive/${book?.book_id}`)}
      />
    </Box>
  );
};

export default NoteDetail;