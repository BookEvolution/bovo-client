import React, { useState, useEffect } from "react";
import { Box, Paper, Typography, Button, IconButton } from "@mui/material";
import { 
  DndContext, 
  closestCenter, 
  KeyboardSensor, 
  PointerSensor, 
  useSensor, 
  useSensors,
  DragOverlay
} from "@dnd-kit/core";
import { 
  arrayMove, 
  SortableContext, 
  sortableKeyboardCoordinates, 
  verticalListSortingStrategy, 
  useSortable
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import CloseIcon from "@mui/icons-material/Close";
import DragHandleIcon from "@mui/icons-material/DragHandle";

const CombineModal = ({ open, onClose, memos, setMemos }) => {
  const [items, setItems] = useState([]);
  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    if (memos && Array.isArray(memos) && memos.length > 0) {
      setItems(memos);
    } else {
      setItems([]);
    }
  }, [memos]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 3, 
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    
    if (active && over && active.id !== over.id) {
      setItems((currentItems) => {
        const oldIndex = currentItems.findIndex(
          (item) => String(item.memo_id) === String(active.id)
        );
        const newIndex = currentItems.findIndex(
          (item) => String(item.memo_id) === String(over.id)
        );

        const updatedItems = arrayMove(currentItems, oldIndex, newIndex);
        setMemos(updatedItems);
        return updatedItems;
      });
    }

    setActiveId(null);
  };

  const handleDragCancel = () => {
    setActiveId(null);
  };

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
      onClick={onClose}
    >
      <Paper
        elevation={3}
        sx={{
          width: "43rem",
          height: "55rem",
          backgroundColor: "#E8F1F6",
          borderRadius: "1.25rem",
          padding: "1rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1rem",
          position: "relative",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <Box display="flex" justifyContent="space-between" width="100%" mb={2}>
          <Typography sx={{ fontSize: "1.5rem", fontWeight: "bold" }}>
            순서 변경하기
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
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
            <Box
              sx={{
                width: "34rem",
                height: "45rem",
                overflowY: "auto",
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              {items.map((memo) => (
                <SortableItem 
                  key={memo.memo_id} 
                  memo={memo} 
                />
              ))}
            </Box>
          </SortableContext>

          <DragOverlay>
            {activeId ? (
              <SortableItem 
                memo={activeItem} 
                isDragging 
              />
            ) : null}
          </DragOverlay>
        </DndContext>

        <Button
          variant="contained"
          disableElevation
          sx={{
            backgroundColor: "#739CD4",
            color: "white",
            fontSize: "1.5rem",
            borderRadius: "1.25rem",
            width: "10rem",
            height: "3rem",
            "&:hover": {
              backgroundColor: "#5a7fad",
            },
          }}
        >
          정렬하기
        </Button>
      </Paper>
    </Box>
  );
};

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
    <Paper
      ref={setNodeRef}
      {...listeners} 
      {...attributes}
      style={style}
      sx={{
        width: "34rem",
        height: "8rem",
        padding: "1rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: "1.25rem",
        backgroundColor: "white",
        cursor: "grab",
      }}
    >
      <Box>
        <Typography sx={{ fontSize: "1.2rem", fontWeight: "bold" }}>
          {memo.memo_Q || "제목 없음"}
        </Typography>
        <Typography sx={{ fontSize: "1rem", color: "gray" }}>
          기록 작성 일 : {memo.memo_date || "YY.MM.DD"}
        </Typography>
      </Box>
      <IconButton {...listeners} {...attributes} sx={{ cursor: "grab" }}>
        <DragHandleIcon sx={{ color: "gray" }} />
      </IconButton>
    </Paper>
  );
};

export default CombineModal;