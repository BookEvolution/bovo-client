import { useState, useEffect } from "react";
import { noteCombineData, updateMemo } from "../api/NoteApi";

const useNoteCombine = (bookId) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [localMemos, setLocalMemos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bookInfo, setBookInfo] = useState(null);

  // 메모 데이터 가져오기
  useEffect(() => {
    const fetchMemos = async () => {
      if (!bookId) return;
      setLoading(true);
      try {
        const data = await noteCombineData(bookId);
        if (data) {
          setBookInfo({
            title: data.title,
            author: data.author,
            start_date: data.start_date,
            end_date: data.end_date,
          });
          setLocalMemos(data.memos || []);
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMemos();
  }, [bookId]);

  // 모달 열고 닫기
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  // 메모 순서 업데이트
  const handleUpdateMemos = async (updatedMemos) => {
    if (!updatedMemos || !Array.isArray(updatedMemos)) {
      console.error("유효하지 않은 메모 데이터:", updatedMemos);
      return;
    }

    try {
      setLocalMemos([...updatedMemos]);

      // 서버에 업데이트 요청
      const updatePromises = updatedMemos.map((memo) =>
        memo.memo_id ? updateMemo(bookId, memo.memo_id, { order: memo.order }) : Promise.resolve(false)
      );

      await Promise.all(updatePromises);
      console.log("모든 메모 순서 저장 완료");
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
    handleUpdateMemos,
  };
};

export default useNoteCombine;