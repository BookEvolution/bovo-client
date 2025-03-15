import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { arrayMove } from "@dnd-kit/sortable";
import {
  TouchSensor,
  MouseSensor,
  useSensor,
  useSensors
} from "@dnd-kit/core";
import { updateMemoOrder } from "../../api/NoteApi";
import CombineModalUI from "./CombineModalUI";
import PropTypes from "prop-types";
import { memoPropType } from "../../utils/propTypes";

// 모바일 환경에서 드래그하게 터치 센서 설정
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

const CombineModal = ({ open, onClose, memos, setMemos }) => {
  const { book_id } = useParams();
  const [items, setItems] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [originalMemos, setOriginalMemos] = useState([]);


  /**목록을 불러올 때 상태가 변경되면 정렬된 상태로 items와 originalMemos를 설정 */
  useEffect(() => {
    if (memos && Array.isArray(memos)) {
      const sortedMemos = [...memos].sort((a, b) => a.order - b.order);
      setOriginalMemos([...sortedMemos]);
      setItems([...sortedMemos]);
    }
  }, [memos]);

  /**10px 이동해야 드래그 시작, 터치 후 100ms 후에 드래그 가능 */
  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 10 } }),
    useSensor(CustomTouchSensor, { activationConstraint: { delay: 100, tolerance: 5 } })
  );

/**activeId에 현재 드래그 중인 아이템의 ID 저장 */
  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };
/**드래그가 끝난 후 아이템 순서를 변경 arrayMove로 새로운 순서를 반영 */
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
/**순서 변경 적용 */
  const handleApplyOrder = async () => {
    const updatedItems = items.map((item, index) => ({
      ...item,
      order: index,
    }));

    if (!book_id) {
      console.error("book_id 없음", book_id);
      return;
    }

    const memoOrderArray = updatedItems.map(item => item.memo_id);

    if (typeof setMemos === "function") {
      setMemos([...updatedItems]);
    }

    try {
      await updateMemoOrder(book_id, memoOrderArray);
    } catch (error) {
      console.error("순서 변경 실패:", error);
    }

    setTimeout(() => {
      onClose();
    }, 100);
  };

  // 취소
  const handleCancel = () => {
    setItems(originalMemos); // 원래 상태로 되돌림
    onClose();
  };

  return (
    <CombineModalUI 
      open={open} 
      onClose={handleCancel} 
      items={items} 
      activeId={activeId} 
      sensors={sensors} 
      handleDragStart={handleDragStart} 
      handleDragEnd={handleDragEnd} 
      handleApplyOrder={handleApplyOrder} 
    />
  );
};

// PropTypes 설정
CombineModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  memos: PropTypes.arrayOf(memoPropType).isRequired,
  setMemos: PropTypes.func.isRequired,
};

export default CombineModal;