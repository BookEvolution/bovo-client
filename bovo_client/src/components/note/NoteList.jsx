import { Box, IconButton } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import DeleteModal from "../../components/deleteModal/DeleteModal";
import styles from "./Note.module.css";
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

  const handleEdit = (e, memo_id) => {
    e.stopPropagation();
    navigate(`/archive/edit/${book_id}/${memo_id}`);
  };

  const handleDelete = (e, memo_id) => {
    e.stopPropagation();
    setSelectedMemoId(memo_id);
    setIsModalOpen(true);
  };

  const handleDeleteSuccess = (deletedMemoId) => {
    setMemoList((prev) => prev.filter((memo) => memo.memo_id !== deletedMemoId));
  };
  

  const navigateToNoteCombine = () => {
    navigate(`/archive/${book?.book_id}/memos`);
  };

  const navigateToNoteEdit = () => {
    navigate(`/archive/edit/${book_id}`);
  };

  if (!memoList.length) return <p className={styles.NOmemos}>작성된 메모가 없습니다.</p>;
  /**작성된 메모가 없다는 거 띄울 때도 글쓰기 아이콘은 노출되어야함 컨테이너 다시 만들기 */

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
  
      <Box className={styles.scrollableNoteList}>
        {memoList.map((memo) => (
          <Box key={memo.memo_id}>
            <Box className={styles.Datecontainer}>
              <p className={styles.memoDate}>{memo.memo_date}</p>
              <div className={styles.dateLine}></div>
            </Box>
            <Box className={styles.noteCard}
              sx={{ mb: "1.5rem" }} 
            onClick={() => navigate(`/archive/${book?.book_id}/memo?memoId=${memo.memo_id}`)}>
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
        targetId={selectedMemoId}
        targetType="memo"
        bookId={book?.book_id}
        onSuccess={() => handleDeleteSuccess(selectedMemoId)}
      />
    </Box>
  );
};

NoteList.propTypes = {
  memos: PropTypes.arrayOf(memoPropType).isRequired,
};

export default NoteList;