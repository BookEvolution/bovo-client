import { useState, useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./NoteDetail.css";

const NoteDetail = () => {
  const { memo_id } = useParams();
  const [memo, setMemo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`/memos/${memo_id}`, { headers: { user_id: 1 } })
      .then((response) => {
        setMemo(response.data);
      })
      .catch(() => setMemo(null))
      .finally(() => setLoading(false));
  }, [memo_id]);

  if (loading) {
    return <p className="loading">불러오는 중...</p>;
  }

  return (
    <Box className="note-detail-container">
      {/* 날짜 (YY.MM.DD) */}
      <Box className="note-date">
        <Typography>{memo?.memo_date}</Typography>
        <div className="note-divider"></div>
      </Box>

      <Box className="note-question">
        <Typography>{memo?.memo_Q}</Typography>
      </Box>

      <Box className="note-answer">
        <Typography>{memo?.memo_A}</Typography>
      </Box>

      <Box className="note-actions">
        <Button className="delete-btn">삭제하기</Button>
        <Button className="edit-btn">수정하기</Button>
      </Box>
    </Box>
  );
};

export default NoteDetail;