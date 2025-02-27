import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./Note.css";

const NoteList = () => {
  const { book_id } = useParams();
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

  if (loading) {
    return <p className="loading">기록을 불러오는 중입니다.</p>;
  }

  return (
    <Box className="note-list-container">
      {memos.length === 0 ? (
        <p className="no-memos-message">작성된 기록이 없습니다.</p>
      ) : (
        <Box className="note-list">
          {memos.map((memo) => (
            <Box key={memo.memo_id}>
              <Box className="memo-date-container">
                <p className="memo-date">{memo.memo_date}</p>
                <div className="memo-divider"></div>
              </Box>

              <Box className="note-card">
                <Box className="note-content">
                  {memo.memo_Q && <p className="note-title">{memo.memo_Q}</p>}
                  <p className="note-text">{memo.memo_A}</p>
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
