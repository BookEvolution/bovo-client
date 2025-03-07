import React, { useState, useEffect } from "react";
import { Box, Paper, Typography, Button, IconButton } from "@mui/material";
import { 
  DndContext, 
  closestCenter, 
  TouchSensor, 
  useSensor, 
  useSensors,
  DragOverlay,
  MouseSensor
} from "@dnd-kit/core";
import { 
  arrayMove, 
  SortableContext, 
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

  // 센서 설정 개선
  const sensors = useSensors(
    // 마우스 센서 추가 (데스크톱 환경용)
    useSensor(MouseSensor, {
      // 마우스 클릭 후 드래그 활성화까지 필요한 최소 이동 거리
      activationConstraint: {
        distance: 10,
      },
    }),
    // 모바일 터치 센서 설정 개선
    useSensor(TouchSensor, {
      // 롱 프레스 없이 즉시 활성화하되, 최소 이동 거리 설정
      activationConstraint: {
        delay: 0,
        tolerance: 5,
      },
    })
  );

  const handleDragStart = (event) => {
    // 콘솔 로그 추가 - 문제 해결에 도움됨
    console.log("Drag started:", event);
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event) => {
    // 콘솔 로그 추가
    console.log("Drag ended:", event);
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
    // 콘솔 로그 추가
    console.log("Drag cancelled");
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
        // 스크롤 방지 (모바일에서 중요)
        overflow: "hidden",
        touchAction: "none"
      }}
      onClick={onClose}
    >
      <Paper
        elevation={3}
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
          // 모바일 환경 최적화
          maxWidth: "100%",
          maxHeight: "100%",
          boxSizing: "border-box"
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <Box display="flex" justifyContent="space-between" width="100%" mb={2}>
          <Typography sx={{ fontSize: { xs: "1.2rem", sm: "1.5rem" }, fontWeight: "bold" }}>순서 변경하기</Typography>
          <IconButton onClick={onClose}><CloseIcon /></IconButton>
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
                width: { xs: "100%", sm: "34rem" },
                height: { xs: "calc(100% - 8rem)", sm: "45rem" },
                overflowY: "auto",
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                // 스크롤 가능하지만 드래그 시 스크롤 방지
                touchAction: "pan-y",
                WebkitOverflowScrolling: "touch"
              }}
            >
              {items.map((memo) => (
                <SortableItem key={memo.memo_id} memo={memo} />
              ))}
            </Box>
          </SortableContext>

          <DragOverlay>
            {activeId ? (
              <SortableItem memo={activeItem} isDragging />
            ) : null}
          </DragOverlay>
        </DndContext>

        <Button
          variant="contained"
          disableElevation
          sx={{
            backgroundColor: "#739CD4",
            color: "white",
            fontSize: { xs: "1.2rem", sm: "1.5rem" },
            borderRadius: "1.25rem",
            width: { xs: "8rem", sm: "10rem" },
            height: { xs: "2.5rem", sm: "3rem" },
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
    // 모바일 터치 최적화
    touchAction: "none",
    WebkitTouchCallout: "none",
    WebkitUserSelect: "none",
    userSelect: "none"
  };

  return (
    <Paper
      ref={setNodeRef}
      style={style}
      sx={{
        width: { xs: "100%", sm: "34rem" },
        height: { xs: "auto", sm: "8rem" },
        minHeight: "6rem",
        padding: "1rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: "1.25rem",
        backgroundColor: "white",
        cursor: "grab",
        boxSizing: "border-box"
      }}
    >
      <Box sx={{ width: "90%" }}>
        <Typography sx={{ fontSize: { xs: "1rem", sm: "1.2rem" }, fontWeight: "bold" }}>
          {memo.memo_Q || "제목 없음"}
        </Typography>
        <Typography sx={{ fontSize: { xs: "0.8rem", sm: "1rem" }, color: "gray" }}>
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