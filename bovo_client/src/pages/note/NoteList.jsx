import { useState, useEffect } from "react";
import { Box, IconButton } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
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

  const handleEdit = (e, memo_id) => {
    e.stopPropagation();
    console.log(`메모 수정: ${memo_id}`);
  };

  const handleDelete = (e, memo_id) => {
    e.stopPropagation();
    console.log(`메모 삭제: ${memo_id}`);
  };

  const navigateToDetail = (memo_id) => {
    navigate(`/note/note-detail/${memo_id}`);
  };

  if (loading) {
    return <p className="loading">메모를 불러오는 중입니다.</p>;
  }

  return (
    <Box className="note-list-container">
      <Box className="note-list-header">
        <p className="note-list-title">노트 기록</p>
        <Box className="note-list-icons">
          <IconButton>
            <ListAltOutlinedIcon sx={{ 
                fontSize: "2.5rem",
                color: "black" 
                }} />
          </IconButton>
          <IconButton>
            <AddBoxOutlinedIcon sx={{ 
                fontSize: "2.5rem",
                color: "black"
                }} />
          </IconButton>
        </Box>
      </Box>

      {memos.length === 0 ? (
        <p className="no-memos-message">작성된 메모가 없습니다.</p>
      ) : (
        <Box className="note-list">
          {memos.map((memo) => (
            <Box key={memo.memo_id}>
              <Box className="memo-date-container">
                <p className="memo-date">{memo.memo_date}</p>
                <div className="memo-divider"></div>
              </Box>

              <Box
                className="note-card"
                onClick={() => navigateToDetail(memo.memo_id)}
              >
                <Box className="note-content">
                  {memo.memo_Q && <p className="note-title">{memo.memo_Q}</p>}
                  <p className="note-text">{memo.memo_A}</p>
                </Box>

                <Box className="note-card-icons">
                  <IconButton onClick={(e) => handleEdit(e, memo.memo_id)}>
                    <EditNoteIcon sx={{ 
                        fontSize: "2.5rem",
                        color: "#739CD4"
                        }} />
                  </IconButton>
                  <IconButton onClick={(e) => handleDelete(e, memo.memo_id)}>
                    <DeleteOutlineIcon sx={{ 
                        fontSize: "2.5rem",
                        color: "#739CD4"
                        }} />
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
