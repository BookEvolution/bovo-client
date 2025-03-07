import { useState, useEffect } from "react";
import { Box, Typography, Button, Paper } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import DeleteModal from "../../components/deleteModal/DeleteModal";

const NoteDetail = () => {
  const { memo_id } = useParams();
  const navigate = useNavigate();
  const [memo, setMemo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    axios
      .get("/archive", { headers: { user_id: 1 } })
      .then((response) => {
        if (!response.data || !response.data.books) {
          setMemo(null);
          return;
        }

        const foundMemo = response.data.books
          .flatMap((book) => book.memos || [])
          .find((memo) => Number(memo.memo_id) === Number(memo_id));

        setMemo(foundMemo || null);
      })
      .catch(() => setMemo(null))
      .finally(() => setLoading(false));
  }, [memo_id]);

  // 메모 삭제
  const handleDeleteMemo = (memoId) => {
    console.log(`시도하는 메모 삭제 ID: ${memoId}`);
    
    axios
      .delete(`/memos/${memoId}`, { headers: { user_id: 1 } })
      .then((response) => {
        console.log("삭제 성공:", response);
        navigate('/archive');
      })
      .catch((error) => {
        console.error("메모 삭제 실패:", error);
      })
      .finally(() => {
        setIsModalOpen(false);
      });
  };

  // 메모 수정 페이지로
  const handleEditMemo = () => {
    navigate(`/note/note-edit/${memo_id}`);
  };

  if (loading) {
    return <Typography>메모를 불러오는 중입니다.</Typography>;
  }

  if (!memo) {
    return <Typography>해당 메모를 찾을 수 없습니다.</Typography>;
  }

  return (
    <Box display="flex" flexDirection="column" alignItems="center" p={4}>
      {/* 날짜 및 가로줄 */}
      <Box display="flex" alignItems="center" width="100%" maxWidth="41rem">
        <Typography sx={{ fontSize: "2rem", fontWeight: "bold" }}>
          {memo.memo_date}
        </Typography>
        <Box flexGrow={1} mx={2} height={2} bgcolor="#739CD4"></Box>
      </Box>

      {/* 질문 박스 */}
      <Paper
        elevation={0}
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
          {/* 세로줄 */}
          <Box 
            sx={{ 
              width: "0.5rem", 
              height: "8rem", 
              backgroundColor: "#739CD4", 
              marginLeft: "2rem",
            }} 
          />
          
          {/* 제목 */}
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
        <Paper
          elevation={0}
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
          <Typography 
            sx={{ 
              fontSize: "1.5rem",
              margin : "1.5rem",
            }}
          >
            {memo.memo_A}
          </Typography>
        </Paper>
      </Paper>

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
          onClick={handleEditMemo}
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

      {/* 삭제 모달 */}
      <DeleteModal 
        open={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        memoId={memo_id}
        onDelete={handleDeleteMemo}
      />
    </Box>
  );
};

export default NoteDetail;