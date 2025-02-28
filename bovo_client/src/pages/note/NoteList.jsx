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
  const { book_id } = useParams();
  const navigate = useNavigate();
  const [memos, setMemos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMemoId, setSelectedMemoId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
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
    e.stopPropagation();
    navigate(`/note/note-edit/${memo_id}`);
  };

  const handleDelete = (e, memo_id) => {
    e.stopPropagation();
    setSelectedMemoId(memo_id);
    setIsModalOpen(true);
  };

  const navigateToDetail = (memo_id) => {
    navigate(`/note/note-detail/${memo_id}`);
  };

  const navigateToNoteEdit = () => {
    navigate("/note/note-edit");
  };

  if (loading) {
    return <p className={styles.loading}>메모를 불러오는 중입니다.</p>;
  }

  return (
    <Box className={styles.noteListContainer}>
      <Box className={styles.header}>
        <p className={styles.listTitle}>노트 기록</p>
        <Box className={styles.listIcons}>
          <IconButton>
            <ListAltOutlinedIcon sx={{ fontSize: "2.5rem", color: "black" }} />
          </IconButton>
          <IconButton onClick={navigateToNoteEdit}>
            <AddBoxOutlinedIcon sx={{ fontSize: "2.5rem", color: "black" }} />
          </IconButton>
        </Box>
      </Box>

      {memos.length === 0 ? (
        <p className={styles.NOmemos}>작성된 메모가 없습니다.</p>
      ) : (
        <Box className={styles.noteList}>
          {memos.map((memo) => (
            <Box key={memo.memo_id}>
              <Box className={styles.Datecontainer}>
                <p className={styles.memoDate}>{memo.memo_date}</p>
                <div className={styles.dateLine}></div>
              </Box>

              <Box
                className={styles.noteCard}
                onClick={() => navigateToDetail(memo.memo_id)}
              >
                <Box className={styles.noteContent}>
                  {memo.memo_Q && <p className={styles.noteTitle}>{memo.memo_Q}</p>}
                  <p className={styles.noteText}>{memo.memo_A}</p>
                </Box>

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