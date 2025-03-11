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
        // 드래그 핸들 요소(data-drag-handle="true")를 클릭한 경우에만 드래그 활성화
        if (!event.target.closest('[data-drag-handle="true"]')) {
          return false;
        }
        return true;
      },
    },
  ];
}

const useCombineModal = (memos, setMemos, onClose) => {
  // 아이템 상태 관리
  const [items, setItems] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [originalMemos, setOriginalMemos] = useState([]);

  // 메모 배열이 변경될 때 아이템 상태 업데이트
  useEffect(() => {
    if (memos && Array.isArray(memos)) {
      const sortedMemos = JSON.parse(JSON.stringify(memos)).sort((a, b) => {
        if (a.order !== undefined && b.order !== undefined) {
          return a.order - b.order;
        }
        return String(a.memo_id).localeCompare(String(b.memo_id));
      });
      
      // 원본 메모와 현재 아이템 상태 설정
      setOriginalMemos([...sortedMemos]);
      setItems([...sortedMemos]);
      
      console.log("모달에 전달된 메모:", sortedMemos);
    }
  }, [memos]);

  // 드래그 앤 드롭을 위한 센서 설정
  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 10 } }),
    useSensor(CustomTouchSensor, { activationConstraint: { delay: 100, tolerance: 5 } })
  );

  // 드래그 시작 이벤트 핸들러
  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  // 드래그 종료 이벤트 핸들러
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
        
        // 순서 이동 및 콘솔에 로그 기록
        const newItems = arrayMove(currentItems, oldIndex, newIndex);
        console.log(`항목 이동: ${active.id}를 ${oldIndex}에서 ${newIndex}로 이동`);
        return newItems;
      });
    }
    setActiveId(null);
  };

  // 드래그 취소 이벤트 핸들러
  const handleDragCancel = () => {
    setActiveId(null);
  };

  // 변경된 순서 적용 핸들러
  const handleApplyOrder = async () => {
    const updatedItems = items.map((item, index) => ({
      ...item,
      order: index,
    }));
  
    console.log("정렬 적용 - 업데이트된 항목:", updatedItems);
  
    // 모달이 닫히기 전에 상태를 먼저 업데이트
    setMemos([...updatedItems]);
  
    setTimeout(() => {
      console.log("모달 닫기 전 상태 업데이트 확인:", updatedItems);
      onClose();
    }, 100);
  };  

  // 모달 취소 핸들러
  const handleCancel = () => {
    // 원래 순서로 복원
    setItems(originalMemos);
    onClose();
  };

  // 활성 항목 가져오기
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