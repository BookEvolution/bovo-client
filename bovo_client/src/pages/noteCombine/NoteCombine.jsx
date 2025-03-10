import { useState, useEffect } from "react";
import { Box, Typography, Button } from "@mui/material";
import { useParams } from "react-router-dom";
import CombineModal from "../../components/combineModal/CombineModal";
import useBooks from "../../hooks/useBooks";

const NoteCombine = () => {
  const { book_id } = useParams();
  const [modalOpen, setModalOpen] = useState(false);
  // 메모 상태 추가
  const [localMemos, setLocalMemos] = useState([]);
  
  const { 
    loading, 
    error, 
    getBookById, 
    getMemosByBookId,
    updateMemo
  } = useBooks();

  // 현재 책 정보와 메모 가져오기
  const bookInfo = book_id ? getBookById(book_id) : null;
  const memos = book_id ? getMemosByBookId(book_id) || [] : [];

  useEffect(() => {
    if (!modalOpen && memos && Array.isArray(memos)) {
      setLocalMemos([...memos]); // 모달이 닫힌 후에만 localMemos 업데이트
    }
  }, [memos, modalOpen]);  

  const handleUpdateMemos = (updatedMemos) => {
    if (!updatedMemos || !Array.isArray(updatedMemos)) return;
  
    setLocalMemos(updatedMemos); // 즉시 반영
  
    updatedMemos.forEach((memo, index) => {
      if (memo.memo_id) {
        updateMemo(memo.memo_id, { ...memo, order: index });
      }
    });
  
    setModalOpen(false); // 모달 닫기
  };  

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
        {bookInfo ? (
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
              ) : error ? (
                <Typography sx={{ fontSize: "1.5rem", color: "red", textAlign: "center", mt: "2rem" }}>
                  데이터를 불러오는 중 오류가 발생했습니다.
                </Typography>
              ) : !localMemos || localMemos.length === 0 ? (
                <Typography sx={{ fontSize: "1.5rem", color: "red", textAlign: "center", mt: "2rem" }}>
                  기록이 없습니다.
                </Typography>
              ) : (
                <Box width="98%" >
                  {localMemos.map((memo) => (
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
        ) : loading ? (
          <Typography sx={{ fontSize: "1.5rem", color: "blue", textAlign: "center", mt: "2rem" }}>
            데이터 불러오는 중
          </Typography>
        ) : (
          <Typography sx={{ fontSize: "1.5rem", color: "red", textAlign: "center", mt: "2rem" }}>
            책 정보를 찾을 수 없습니다.
          </Typography>
        )}
      </Box>
      
      {/* 순서 변경하기 버튼 */}
      {bookInfo && localMemos && localMemos.length > 0 && (
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
      )}

      {modalOpen && localMemos && localMemos.length > 0 && (
        <CombineModal 
          open={modalOpen} 
          onClose={() => setModalOpen(false)} 
          memos={localMemos} 
          setMemos={handleUpdateMemos}
        />
      )}
    </Box>
  );
};

export default NoteCombine;