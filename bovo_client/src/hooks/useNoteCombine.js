import { useState, useEffect, useMemo } from "react";
import useBooks from "./useBooks";

const useNoteCombine = (bookId) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [localMemos, setLocalMemos] = useState([]);
  
  const { 
    loading, 
    error, 
    getBookById, 
    getMemosByBookId,
    updateMemo,
  } = useBooks();

  const bookInfo = useMemo(() => bookId ? getBookById(bookId) : null, [bookId, getBookById]);
  const memos = useMemo(() => bookId ? getMemosByBookId(bookId) || [] : [], [bookId, getMemosByBookId]);

  // 메모 데이터가 변경되면 로컬 상태에 반영
  useEffect(() => {
    if (memos && Array.isArray(memos) && memos.length > 0) {
      // 순서(order) 기준으로 정렬
      const sortedMemos = [...memos].sort((a, b) => {
        if (a.order !== undefined && b.order !== undefined) {
          return a.order - b.order;
        }
        return String(a.memo_id).localeCompare(String(b.memo_id));
      });
      
      setLocalMemos(sortedMemos);
    } else {
      setLocalMemos([]);
    }
  }, [memos]);

  // 모달 열기/닫기 핸들러
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  /* 메모 업데이트 핸들러
  const handleUpdateMemos = async (updatedMemos) => {
    if (!updatedMemos || !Array.isArray(updatedMemos)) {
      console.error("유효하지 않은 메모 데이터:", updatedMemos);
      return;
    }
  
    console.log("모달에서 받은 업데이트된 메모:", updatedMemos);
  
    try {
      setLocalMemos([...updatedMemos]);
  
      // 각 메모의 order 값을 서버에 저장
      const updatePromises = updatedMemos.map((memo) =>
        memo.memo_id ? updateMemo(memo.memo_id, { order: memo.order }) : Promise.resolve(false)
      );
  
      await Promise.all(updatePromises);
      console.log("모든 메모 순서 서버에 저장 완료");
  
      // 새로고침 없이 상태 유지
      setLocalMemos([...updatedMemos]);
      console.log("메모 상태 업데이트 완료");
    } catch (error) {
      console.error("메모 순서 저장 중 오류 발생:", error);
    }
  }; */

  const handleUpdateMemos = async (updatedMemos) => {
    if (!updatedMemos || !Array.isArray(updatedMemos)) {
      console.error("유효하지 않은 메모 데이터:", updatedMemos);
      return;
    }
  
    console.log("모달에서 받은 업데이트된 메모:", updatedMemos);
  
    try {
      setLocalMemos([...updatedMemos]);
  
      // 로컬 스토리지에 저장 (프론트 확인용)
      localStorage.setItem(`memos_order_${bookId}`, JSON.stringify(updatedMemos));
  
      // API가 있는 경우 순서 업데이트
      const updatePromises = updatedMemos.map((memo) =>
        memo.memo_id ? updateMemo(memo.memo_id, { order: memo.order }) : Promise.resolve(false)
      );
  
      await Promise.all(updatePromises);
      console.log("모든 메모 순서 저장 완료");
  
      setLocalMemos([...updatedMemos]);
      console.log("메모 상태 업데이트 완료");
    } catch (error) {
      console.error("메모 순서 저장 중 오류 발생:", error);
    }
  };  
  
  
  return {
    loading,
    error,
    bookInfo,
    localMemos,
    modalOpen,
    openModal,
    closeModal,
    handleUpdateMemos
  };
};

export default useNoteCombine;