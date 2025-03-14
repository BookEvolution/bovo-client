import { useState, useEffect } from "react";
import { arrayMove } from "@dnd-kit/sortable";
import {
  TouchSensor,
  MouseSensor,
  useSensor,
  useSensors
} from "@dnd-kit/core";
import { updateMemoOrder } from "../api/NoteApi";
import { useParams } from "react-router-dom";

class CustomTouchSensor extends TouchSensor {
  static activators = [
    {
      eventName: "onTouchStart",
      handler: ({ nativeEvent: event }) => {
        if (!event.target.closest("[data-drag-handle='true']")) {
          return false;
        }
        return true;
      },
    },
  ];
}

const useCombineModal = (memos, setMemos, onClose) => {
  const [items, setItems] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [originalMemos, setOriginalMemos] = useState([]);
  const { book_id } = useParams();

  useEffect(() => {
    if (memos && Array.isArray(memos)) {
      const sortedMemos = [...memos].sort((a, b) => a.order - b.order);
      setOriginalMemos([...sortedMemos]);
      setItems([...sortedMemos]);
      console.log("전달된 메모:", sortedMemos);
    }
  }, [memos]);

  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 10 } }),
    useSensor(CustomTouchSensor, { activationConstraint: { delay: 100, tolerance: 5 } })
  );

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active && over && active.id !== over.id) {
      setItems((currentItems) => {
        const oldIndex = currentItems.findIndex(item => String(item.memo_id) === String(active.id));
        const newIndex = currentItems.findIndex(item => String(item.memo_id) === String(over.id));
        return arrayMove(currentItems, oldIndex, newIndex);
      });
    }
    setActiveId(null);
  };

  const handleDragCancel = () => {
    setActiveId(null);
  };

  const handleApplyOrder = async () => {
    const updatedItems = items.map((item, index) => ({
      ...item,
      memo_Q: item.memo_Q || "제목 없음",
      memo_A: item.memo_A || "내용 없음",
      order: index,
    }));

    if (!book_id) {
      console.error("book_id 없음", book_id);
      return;
    }

    const memoOrderArray = updatedItems.map(item => item.memo_id);
    console.log("보낼 데이터:", { book_id, memo_order: memoOrderArray });

    if (typeof setMemos === "function") {
      setMemos([...updatedItems]);
    } else {
      console.error("setMemos가 오류:", setMemos);
    }

    try {
      await updateMemoOrder(book_id, memoOrderArray);
      console.log("순서 변경 성공");
    } catch (error) {
      console.error("순서 변경 실패:", error);
    }

    setTimeout(() => {
      console.log("상태 업데이트 확인:", updatedItems);
      onClose();
    }, 100);
  };

  const handleCancel = () => {
    setItems(originalMemos);
    onClose();
  };

  const getActiveItem = () => {
    return items.find(item => String(item.memo_id) === String(activeId));
  };

  return {
    items,
    activeId,
    sensors,
    getActiveItem,
    handleDragStart,
    handleDragEnd,
    handleDragCancel,
    handleApplyOrder,
    handleCancel,
  };
};

export default useCombineModal;