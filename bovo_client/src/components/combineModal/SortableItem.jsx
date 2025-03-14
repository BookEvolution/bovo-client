import { memoPropType } from "../../utils/propTypes";
import PropTypes from "prop-types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Box, IconButton, Typography } from "@mui/material";
import DragHandleIcon from "@mui/icons-material/DragHandle";

const SortableItem = ({ memo, isDragging }) => {
  const { 
    attributes, 
    listeners, 
    setNodeRef, 
    transform, 
    transition,
    isDragging: isSorting 
  } = useSortable({ 
    id: String(memo.memo_id) 
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging || isSorting ? 0.5 : 1,
  };

  return (
    <Box
      ref={setNodeRef}
      style={style}
      sx={{
        width: "100%",
        height: "10rem",
        padding: "1rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: "1.25rem",
        backgroundColor: "white",
        boxSizing: "border-box",
        touchAction: "auto",
      }}
    >
      <Box sx={{ 
        width: "85%",
        ml: "1rem"
        }}>
        <Typography sx={{ fontSize: "1.5rem", fontWeight: "500", mt: "1rem" }}>
          {memo.memo_Q || "제목 없음"}
        </Typography>
        <Typography sx={{ fontSize: "1.3rem", color: "gray", mb: "1rem" }}>
          기록 작성일 : {memo.memo_date || "YY.MM.DD"}
        </Typography>
      </Box>

      <IconButton 
        {...listeners} 
        {...attributes} 
        sx={{ cursor: "grab" }}
        data-drag-handle="true"
      >
        <DragHandleIcon sx={{ fontSize: "2rem", color: "gray", mr: "0.5rem" }} />
      </IconButton>
    </Box>
  );
};
SortableItem.propTypes = {
    memo: memoPropType.isRequired,
    isDragging: PropTypes.bool,
  };
  
  SortableItem.defaultProps = {
    isDragging: false,
  };

export default SortableItem;