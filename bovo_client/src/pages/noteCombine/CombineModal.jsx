import React, { useState, useEffect } from "react";
import { Box, Paper, Typography, Button, IconButton } from "@mui/material";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import CloseIcon from "@mui/icons-material/Close";
import DragHandleIcon from "@mui/icons-material/DragHandle";

const CombineModal = ({ open, onClose, memos, setMemos }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    console.log("받은 기록", memos);
    if (memos && Array.isArray(memos) && memos.length > 0) {
      setItems(memos);
    } else {
      console.warn("기록 데이터 없음");
      setItems([]);
    }
  }, [memos]);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!active || !over || active.id === over.id) return;

    const oldIndex = items.findIndex((item) => String(item.memo_id) === String(active.id));
    const newIndex = items.findIndex((item) => String(item.memo_id) === String(over.id));

    if (oldIndex !== -1 && newIndex !== -1) {
      const newItems = arrayMove(items, oldIndex, newIndex);
      setItems(newItems);
      setMemos(newItems);
    }
  };

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
          padding: "0rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1rem",
          position: "relative",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <Box display="flex" justifyContent="space-between" width="100%">
          <Typography sx={{ fontSize: "1.5rem", fontWeight: "bold" }}>순서 변경하기</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
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
                maxHeight: "35rem"
              }}
            >
              {items.slice(0, 5).map((memo) => (
                <SortableItem key={memo.memo_id} memo={memo} />
              ))}
            </Box>
          </SortableContext>
        </DndContext>

        <Button
          variant="contained"
          disableElevation
          sx={{
            backgroundColor: "#E8F1F6",
            color: "#739CD4",
            fontSize: "1.5rem",
            borderRadius: "1.25rem",
            width: "10rem",
            height: "3rem",
          }}
        >
          정렬하기
        </Button>
      </Paper>
    </Box>
  );
};

const SortableItem = ({ memo }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: String(memo.memo_id) });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    width: "100%",
  };

  return (
    <Paper
      ref={setNodeRef}
      sx={{
        width: "34rem",
        height: "8rem",
        padding: "0rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: "1.25rem",
        backgroundColor: "white",
        cursor: "grab",
      }}
      style={style}
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