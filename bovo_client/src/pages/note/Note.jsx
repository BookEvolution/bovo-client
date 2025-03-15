/**책 상세보기 페이지 */

import { useParams } from "react-router-dom";
import NoteInfo from "../../components/note/NoteInfo";
import NoteList from "../../components/note/NoteList";
import useBook from "../../hooks/useBook";
import { Box } from "@mui/material";

const Note = () => {
  const { book_id } = useParams();
  const { book, memos } = useBook(book_id);

  return (
    <Box sx={{ width: "100%", minHeight: "100vh", display: "flex", flexDirection: "column", overflowY: "auto" }}>
      <NoteInfo book={book} />
      <NoteList book={book} memos={memos} />
    </Box>
  );
};

export default Note;