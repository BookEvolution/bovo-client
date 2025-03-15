/** 책 상세보기에서 하단의 기록을 나타내는 부분 */

import { Box, IconButton } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import DeleteModal from "../../components/deleteModal/DeleteModal";
import { useState, useEffect } from "react";
import useBook from "../../hooks/useBook";
import PropTypes from "prop-types";
import { memoPropType } from "../../utils/propTypes";

const NoteList = ({ memos }) => {
  const { book_id } = useParams();
  const navigate = useNavigate();
  const { book } = useBook(book_id);
  const [memoList, setMemoList] = useState([]);

  useEffect(() => {
    setMemoList(memos);
  }, [memos]);

  const [selectedMemoId, setSelectedMemoId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 메모 수정
  const handleEdit = (e, memo_id) => {
    e.stopPropagation();
    navigate(`/archive/edit/${book_id}/${memo_id}`);
  };

  // 메모 삭제
  const handleDelete = (e, memo_id) => {
    e.stopPropagation();
    setSelectedMemoId(memo_id);
    setIsModalOpen(true);
  };

  // 삭제 후 목록 업데이트
  const handleDeleteSuccess = (deletedMemoId) => {
    setMemoList((prev) => prev.filter((memo) => memo.memo_id !== deletedMemoId));
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* 노트 기록 헤더 */}
      <Box
        sx={{
          width: "41rem",
          height: "4rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1rem",
        }}
      >
        {/* 헤더 글자 */}
        <Box 
          sx={{ 
            fontSize: "2.5rem", 
            fontWeight: "bold", 
            marginLeft: "1.5rem" 
          }}
        >
          노트 기록
        </Box>

        {/* 정렬 및 추가 버튼 */}
        <Box sx={{ display: "flex", fontSize: "2.5rem" }}>
          <IconButton onClick={() => navigate(`/archive/${book?.book_id}/memos`)}>
            <ListAltOutlinedIcon sx={{ fontSize: "2.5rem", color: "black" }} />
          </IconButton>
          <IconButton onClick={() => navigate(`/archive/edit/${book_id}`)}>
            <AddBoxOutlinedIcon sx={{ fontSize: "2.5rem", color: "black" }} />
          </IconButton>
        </Box>
      </Box>

      {/* 메모 목록 */}
      {memoList.length === 0 ? (
        <Box 
          sx={{ 
            textAlign: "center", 
            marginTop: "3rem", 
            fontSize: "2rem" 
          }}
        >
          작성된 메모가 없습니다.
        </Box>
      ) : (
        <Box
          sx={{
            maxHeight: "47rem",
            overflowY: "auto",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "1.5rem",
            margin: "0",
          }}
        >
          {memoList.map((memo) => (
            <Box key={memo.memo_id}>
              {/* 날짜 & 구분선 */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "1rem",
                  width: "41rem",
                  height: "2rem",
                  marginBottom: "1rem",
                }}
              >
                <Box
                  sx={{
                    fontSize: "2rem",
                    fontWeight: "500",
                    width: "10rem",
                    height: "3rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {memo.memo_date}
                </Box>
                <Box
                  sx={{
                    width: "27rem",
                    height: "0.2rem",
                    backgroundColor: "#739CD4",
                  }}
                />
              </Box>

              {/* 메모 카드 */}
              <Box
                sx={{
                  width: "41rem",
                  height: "18rem",
                  backgroundColor: "#E8F1F6",
                  borderRadius: "1.25rem",
                  display: "flex",
                  flexDirection: "column",
                  overflow: "hidden",
                  mb: "1.5rem",
                  cursor: "pointer",
                }}
                onClick={() => navigate(`/archive/${book?.book_id}/memo?memoId=${memo.memo_id}`)}
              >
                <Box
                  sx={{
                    flex: 1,
                    display: "flex",
                    justifyContent: "space-around",
                    flexDirection: "column",
                    marginLeft: "3rem",
                    marginTop: "1.75rem",
                  }}
                >
                  {/* 제목 */}
                  <Box
                    sx={{
                      fontSize: "2rem",
                      fontWeight: "bold",
                      width: "35rem",
                      height: "4.5rem",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      lineHeight: "2.25rem",
                    }}
                  >
                    {memo.memo_Q}
                  </Box>

                  {/* 내용 미리보기 */}
                  <Box
                    sx={{
                      fontSize: "1.75rem",
                      width: "35rem",
                      height: "6rem",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                      whiteSpace: "normal",
                      lineHeight: "2rem",
                    }}
                  >
                    {memo.memo_A}
                  </Box>
                </Box>

                {/* 수정 & 삭제 버튼 */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    marginRight: "1rem",
                  }}
                >
                  <IconButton onClick={(e) => handleEdit(e, memo.memo_id)}>
                    <EditNoteIcon sx={{ fontSize: "3rem", color: "#739CD4" }} />
                  </IconButton>
                  <IconButton onClick={(e) => handleDelete(e, memo.memo_id)}>
                    <DeleteOutlineIcon sx={{ fontSize: "2.5rem", color: "#739CD4" }} />
                  </IconButton>
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      )}

      {/* 삭제 모달 */}
      <DeleteModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        targetId={selectedMemoId}
        targetType="memo"
        bookId={book?.book_id}
        onSuccess={() => handleDeleteSuccess(selectedMemoId)}
      />
    </Box>
  );
};

// PropTypes 정의
NoteList.propTypes = {
  memos: PropTypes.arrayOf(memoPropType).isRequired,
};

export default NoteList;