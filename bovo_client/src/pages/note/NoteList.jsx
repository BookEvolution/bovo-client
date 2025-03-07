import { useState, useEffect } from "react";
import { Box, IconButton } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import DeleteModal from "../../components/deleteModal/DeleteModal";
import styles from "./Note.module.css";

const NoteList = () => {
  const { book_id } = useParams(); // URL에서 book_id 가져오기
  const navigate = useNavigate(); // 페이지 이동
  const [memos, setMemos] = useState([]); // 메모 리스트 상태
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [selectedMemoId, setSelectedMemoId] = useState(null); // 삭제할 메모 ID 저장
  const [isModalOpen, setIsModalOpen] = useState(false); // 삭제 모달

  useEffect(() => {
    // 도서 정보에서 해당 책의 메모 목록 가져오기
    axios
      .get("/archive", { headers: { user_id: 1 } })
      .then((response) => {
        const selectedBook = response.data?.books?.find(
          (b) => String(b.book_id) === book_id
        );
        setMemos(selectedBook?.memos || []);
      })
      .catch(() => setMemos([]))
      .finally(() => setLoading(false));
  }, [book_id]);

  const handleEdit = (e, memo_id) => {
    e.stopPropagation(); // 버블링 방지
    navigate(`/note/note-edit/${memo_id}`);
  };

  const handleDelete = (e, memo_id) => {
    e.stopPropagation(); // 버블링 방지
    setSelectedMemoId(memo_id);
    setIsModalOpen(true);
  };

  const navigateToDetail = (memo_id) => {
    navigate(`/note/note-detail/${memo_id}`);
  };

  const navigateToNoteEdit = () => {
    navigate("/note/note-edit");
  };

  const navigateToNoteCombine = () => {
    navigate(`/note/note-combine/${book_id}`);
  };

  if (loading) {
    return <p className={styles.loading}>메모를 불러오는 중입니다.</p>;
  }

  return (
    <Box className={styles.noteListContainer}>
      {/* 헤더 영역 */}
      <Box className={styles.header}>
        <p className={styles.listTitle}>노트 기록</p>
        <Box className={styles.listIcons}>
          <IconButton onClick={navigateToNoteCombine}>
            <ListAltOutlinedIcon sx={{ fontSize: "2.5rem", color: "black" }} />
          </IconButton>
          <IconButton onClick={navigateToNoteEdit}>
            <AddBoxOutlinedIcon sx={{ fontSize: "2.5rem", color: "black" }} />
          </IconButton>
        </Box>
      </Box>

      {/* 메모 목록이 없는 경우 */}
      {memos.length === 0 ? (
        <p className={styles.NOmemos}>작성된 메모가 없습니다.</p>
      ) : (
        <Box className={styles.noteList}>
          {memos.map((memo) => (
            <Box key={memo.memo_id}>
              {/* 날짜 표시 */}
              <Box className={styles.Datecontainer}>
                <p className={styles.memoDate}>{memo.memo_date}</p>
                <div className={styles.dateLine}></div>
              </Box>

              {/* 개별 메모 카드 */}
              <Box
                className={styles.noteCard}
                onClick={() => navigateToDetail(memo.memo_id)}
              >
                <Box className={styles.noteContent}>
                  {/* 제목 */}
                  {memo.memo_Q && <p className={styles.noteTitle}>{memo.memo_Q}</p>}
                  <p className={styles.noteText}>{memo.memo_A}</p>
                </Box>

                {/* 수정 및 삭제 아이콘 */}
                <Box className={styles.cardIcons}>
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
        memoId={selectedMemoId}
        onDelete={(memoId) => {
          console.log("삭제된 메모 ID:", memoId);
          setMemos((prevMemos) =>
            prevMemos.filter((memo) => memo.memo_id !== memoId)
          );
          setIsModalOpen(false);
        }}
      />
    </Box>
  );
};

export default NoteList;