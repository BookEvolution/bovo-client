import { Box, Typography, Button, IconButton } from "@mui/material";
import { DndContext, closestCenter, DragOverlay } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import CloseIcon from "@mui/icons-material/Close";
import SortableItem from "./SortableItem";
import useCombineModal from "../../hooks/useCombineModal";
import PropTypes from "prop-types";


const CombineModal = ({ open, onClose, memos, setMemos }) => {
  const {
    items,
    activeId,
    sensors,
    handleDragStart,
    handleDragEnd,
    handleDragCancel,
    handleApplyOrder,
    handleCancel,
  } = useCombineModal(memos, setMemos, onClose);

  if (!open) return null;

  const activeItem = items.find(item => String(item.memo_id) === String(activeId));

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
      onClick={handleCancel} 
    >
      <Box
        sx={{
          width: { xs: "95%", sm: "43rem" },
          height: { xs: "80%", sm: "55rem" },
          backgroundColor: "#E8F1F6",
          borderRadius: "1.25rem",
          padding: "1rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1rem",
          position: "relative",
          maxWidth: "100%",
          maxHeight: "100%",
          boxSizing: "border-box"
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <Box display="flex" justifyContent="space-between" width="100%" mb={2}>
          <Typography sx={{ fontSize: "2rem", fontWeight: "bold" }}>순서 변경하기</Typography>
          <IconButton onClick={handleCancel}><CloseIcon /></IconButton>
        </Box>

        <DndContext 
          sensors={sensors}
          collisionDetection={closestCenter} 
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onDragCancel={handleDragCancel}
        >
          <SortableContext 
            items={items.map((item) => String(item.memo_id))} 
            strategy={verticalListSortingStrategy}
          >
            <Box sx={{
              width: "34rem",
              height: "45rem",
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}>
              {items.map((memo) => (
                <SortableItem key={memo.memo_id} memo={memo} />
              ))}
            </Box>
          </SortableContext>

          <DragOverlay>
            {activeId ? <SortableItem memo={activeItem} isDragging /> : null}
          </DragOverlay>
        </DndContext>

        <Button
          variant="contained"
          disableElevation
          onClick={handleApplyOrder}
          sx={{
            backgroundColor: "#739CD4",
            color: "white",
            fontSize: "1.5rem",
            borderRadius: "1.25rem",
            width: "10rem",
            height: "3rem",
          }}
        >
          정렬하기
        </Button>
      </Box>
    </Box>
  );
};

CombineModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  memos: PropTypes.array.isRequired,
  setMemos: PropTypes.func.isRequired,
};

export default CombineModal;