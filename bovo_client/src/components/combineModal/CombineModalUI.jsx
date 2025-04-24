import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { DndContext, closestCenter, DragOverlay } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import CloseIcon from "@mui/icons-material/Close";
import SortableItem from "./SortableItem";
import PropTypes from "prop-types";
import { memoPropType } from "../../utils/propTypes";

const CombineModalUI = ({ 
  open, 
  onClose, 
  items, 
  sensors, 
  activeId, 
  handleDragStart, 
  handleDragEnd, 
  handleApplyOrder 
}) => {
  if (!open) return null;

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
      onClick={onClose} 
    >
      <Box
        sx={{
          width: "40rem",
          height: "75rem",
          backgroundColor: "#E8F1F6",
          borderRadius: "1.25rem",
          padding: "1rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
          boxSizing: "border-box"
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* 헤더 */}
        <Box 
        display="flex" 
        justifyContent="space-between" 
        width="100%" 
        mb={2}
        >
          <Typography sx={{ 
            fontSize: "2rem", 
            fontWeight: "bold",
            mt: "2rem", 
            ml: "2.2rem" 
            }}>
            순서 변경하기
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon sx={{ fontSize: "2rem", mt: "1rem", mr: "1rem" }} />
          </IconButton>
        </Box>

        {/* 드래그 & 드롭 컨텍스트 */}
        <DndContext 
          sensors={sensors}
          collisionDetection={closestCenter} 
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={items.map((item) => String(item.memo_id))} strategy={verticalListSortingStrategy}>
            <Box sx={{ width: "34rem", height: "72rem", overflowY: "auto", display: "flex", flexDirection: "column", gap: "1rem" }}>
              {items.map((memo) => (
                <SortableItem key={memo.memo_id} memo={memo} />
              ))}
            </Box>
          </SortableContext>

          <DragOverlay>
            {activeId ? <SortableItem memo={items.find(item => String(item.memo_id) === String(activeId))} isDragging /> : null}
          </DragOverlay>
        </DndContext>

        {/* 정렬 버튼 */}
        <Button 
          variant="contained" 
          disableElevation 
          onClick={handleApplyOrder} 
          sx={{ 
            backgroundColor: "#739CD4", 
            color: "white", 
            fontSize: "1.8rem", 
            borderRadius: "1.25rem", 
            width: "12rem", 
            height: "4rem", 
            mb: "2rem", 
            mt: "1.2rem" 
          }}
        >
          정렬하기
        </Button>
      </Box>
    </Box>
  );
};

// PropTypes 설정
CombineModalUI.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    items: PropTypes.arrayOf(memoPropType).isRequired,
    sensors: PropTypes.object.isRequired,
    activeId: PropTypes.string,
    handleDragStart: PropTypes.func.isRequired,
    handleDragEnd: PropTypes.func.isRequired,
    handleApplyOrder: PropTypes.func.isRequired,
  };

export default CombineModalUI;
