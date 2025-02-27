import { useState, useEffect } from "react";
import { Box, IconButton, Divider } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Note.css";

const NoteList = () => {
  const { book_id } = useParams();
  const navigate = useNavigate();
  const [memos, setMemos] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const handleDelete = async (e, memo_id) => {
    e.stopPropagation();
    try {
      await axios.delete(`/memos/${memo_id}`, { headers: { user_id: 1 } });
      setMemos((prevMemos) => prevMemos.filter((memo) => memo.memo_id !== memo_id));
    } catch (error) {
      console.error("메모 삭제 중 오류 발생:", error);
    }
  };

  if (loading) {
    return <p className="loading">메모를 불러오는 중...</p>;
  }

  return (
    <Box className="note-list-container">
      {memos.length === 0 ? (
        <p className="no-memos-message">작성된 메모가 없습니다.</p>
      ) : (
        <Box className="note-list">
          {memos.map((memo) => (
            <Box key={memo.memo_id}>
              <Box className="memo-date-container">
                <p className="memo-date">{memo.memo_date}</p>
                <Divider />
              </Box>

              <Box 
                className="note-card"
                onClick={() => navigate(`/note/note-detail/${memo.memo_id}`)}
              >
                <Box className="note-content">
                  {memo.memo_Q && <p className="note-title">{memo.memo_Q}</p>}
                  <p className="note-text">{memo.memo_A}</p>
                </Box>
                
                <Box className="note-actions">
                  <IconButton onClick={(e) => e.stopPropagation()}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={(e) => handleDelete(e, memo.memo_id)}>
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default NoteList;