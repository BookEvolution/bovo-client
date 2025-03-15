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

  return (
    <Box sx={{ 
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      <Box sx={{
        width: '41rem',
        height: '4rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1rem'
      }}>
        <Box sx={{
          fontSize: '2.5rem',
          fontWeight: 'bold',
          marginLeft: '1.5rem'
        }}>
          노트 기록
        </Box>
        <Box sx={{ display: 'flex', fontSize: '2.5rem' }}>
          <IconButton onClick={navigateToNoteCombine}>
            <ListAltOutlinedIcon sx={{ fontSize: "2.5rem", color: "black" }} />
          </IconButton>
          <IconButton onClick={navigateToNoteEdit}>
            <AddBoxOutlinedIcon sx={{ fontSize: "2.5rem", color: "black" }} />
          </IconButton>
        </Box>
      </Box>
  
      {memoList.length > 0 ? (
        <Box sx={{
          maxHeight: '47rem',
          overflowY: 'auto',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1.5rem',
          margin: '0'
        }}>
          {memoList.map((memo) => (
            <Box key={memo.memo_id}>
              <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '1rem',
                width: '41rem',
                height: '2rem',
                marginBottom: '1rem'
              }}>
                <Box sx={{
                  fontSize: '2rem',
                  fontWeight: '500',
                  width: '10rem',
                  height: '3rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0rem'
                }}>
                  {memo.memo_date}
                </Box>
                <Box sx={{
                  width: '27rem',
                  height: '0.2rem',
                  backgroundColor: '#739CD4'
                }} />
              </Box>
              <Box sx={{
                width: '41rem',
                height: '18rem',
                backgroundColor: '#E8F1F6',
                borderRadius: '1.25rem',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                mb: '1.5rem'
              }} 
              onClick={() => navigate(`/archive/${book?.book_id}/memo?memoId=${memo.memo_id}`)}>
                <Box sx={{
                  flex: 1,
                  display: 'flex',
                  justifyContent: 'space-around',
                  flexDirection: 'column',
                  marginLeft: '3rem',
                  marginTop: '1.75rem'
                }}>
                  <Box sx={{
                    fontSize: '2rem',
                    fontWeight: 'bold',
                    width: '35rem',
                    height: '4.5rem',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    lineHeight: '2.25rem',
                    margin: '0rem'
                  }}>
                    {memo.memo_Q}
                  </Box>
                  <Box sx={{
                    fontSize: '1.75rem',
                    width: '35rem',
                    height: '6rem',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    whiteSpace: 'normal',
                    lineHeight: '2rem',
                    margin: '0rem',
                    alignItems: 'flex-start'
                  }}>
                    {memo.memo_A}
                  </Box>
                </Box>
                <Box sx={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  marginRight: '1rem'
                }}>
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
      ) : (
        <Box sx={{
          textAlign: 'center',
          marginTop: '3rem',
          fontSize: '2rem'
        }}>
          작성된 메모가 없습니다.
        </Box>
      )}
  
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