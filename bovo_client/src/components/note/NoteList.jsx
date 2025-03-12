import { Box, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import DeleteModal from "../../components/deleteModal/DeleteModal";
import styles from "./Note.module.css";
import { bookPropType } from "../../utils/propTypes";
import { useState, useEffect } from "react";
import useDelete from "../../hooks/useDelete";

const NoteList = ({ book, memos }) => {
  const navigate = useNavigate();
  const { deleteItem } = useDelete();
  const [memoList, setMemoList] = useState([]);

  useEffect(() => {
    setMemoList(memos);
  }, [memos]);

  const [selectedMemoId, setSelectedMemoId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEdit = (e, memo_id) => {
    e.stopPropagation();
    navigate(`/note/note-edit/${memo_id}`);
  };

  const handleDelete = (e, memo_id) => {
    e.stopPropagation();
    setSelectedMemoId(memo_id);
    setIsModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (!selectedMemoId) return;

    deleteItem(selectedMemoId, "memo", book.book_id, () => {
      setMemoList((prevMemos) => prevMemos.filter((memo) => memo.memo_id !== selectedMemoId));
      setIsModalOpen(false);
    });
  };

  const navigateToNoteCombine = () => {
    navigate(`/archive/${book?.book_id}/memos`);
  };

  const navigateToNoteEdit = () => {
    navigate(`/note/note-edit`);
  };

  if (!memoList.length) return <p className={styles.NOmemos}>작성된 메모가 없습니다.</p>;

  return (
    <Box className={styles.noteListContainer}>
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

      <Box className={styles.noteList}>
        {memoList.map((memo) => (
          <Box key={memo.memo_id}>
            <Box className={styles.Datecontainer}>
              <p className={styles.memoDate}>{memo.memo_date}</p>
              <div className={styles.dateLine}></div>
            </Box>
            <Box className={styles.noteCard} onClick={() => navigate(`/note/note-detail/${memo.memo_id}`)}>
              <Box className={styles.noteContent}>
                <p className={styles.noteTitle}>{memo.memo_Q}</p>
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

      <DeleteModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDeleteConfirm}
      />
    </Box>
  );
};

NoteList.propTypes = {
  book: bookPropType.isRequired,
  memos: bookPropType.isRequired,
};

export default NoteList;