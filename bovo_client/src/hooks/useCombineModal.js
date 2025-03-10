import { useState, useEffect } from "react";
import { arrayMove } from "@dnd-kit/sortable";
import { 
  TouchSensor, 
  MouseSensor, 
  useSensor, 
  useSensors 
} from "@dnd-kit/core";

class CustomTouchSensor extends TouchSensor {
  static activators = [
    {
      eventName: 'onTouchStart',
      handler: ({ nativeEvent: event }) => {
        if (!event.target.closest('[data-drag-handle="true"]')) {
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

  useEffect(() => {
    if (memos && Array.isArray(memos)) {
      setOriginalMemos([...memos]);  // 원본 메모 저장
      setItems([...memos]);
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
        const oldIndex = currentItems.findIndex(
          (item) => String(item.memo_id) === String(active.id)
        );
        const newIndex = currentItems.findIndex(
          (item) => String(item.memo_id) === String(over.id)
        );
        return arrayMove(currentItems, oldIndex, newIndex);
      });
    }
    setActiveId(null);
  };

  const handleDragCancel = () => {
    setActiveId(null);
  };

  const handleApplyOrder = () => {
    setMemos(items);
    onClose();
  };

  const handleCancel = () => {
    setItems(originalMemos);
    onClose();
  };

  return {
    items,
    activeId,
    sensors,
    handleDragStart,
    handleDragEnd,
    handleDragCancel,
    handleApplyOrder,
    handleCancel,
  };
};

export default useCombineModal;