/**기록 모아보기 페이지 */

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CombineModal from "../../components/combineModal/CombineModal";
import NoteCombineUI from "../../components/noteCombine/NoteCombineUI";
import { noteCombineData, updateMemoOrder } from "../../api/NoteApi";

const NoteCombine = () => {
  const { book_id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bookInfo, setBookInfo] = useState({ title: "", author: "", start_date: "", end_date: "" });
  const [localMemos, setLocalMemos] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  // 메모 데이터 가져오기
  useEffect(() => {
    const fetchMemos = async () => {
      if (!book_id) return;
      setLoading(true);
      try {
        const data = await noteCombineData(book_id);
        
        if (data?.book) {
          setBookInfo({
            title: data.book.title || "책 제목 없음",
            author: data.book.author || "저자 없음",
            start_date: data.book.start_date || "기간 없음",
            end_date: data.book.end_date || "현재",
          });
        }

        setLocalMemos(data?.memos ?? []);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMemos();
  }, [book_id]);

  // 모달 열고 닫기
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  // 메모 순서 업데이트
  const handleUpdateMemos = async (updatedMemos) => {
    if (!Array.isArray(updatedMemos)) return;

    try {
      setLocalMemos([...updatedMemos]);
      await Promise.all(updatedMemos.map((memo) =>
        memo.memo_id ? updateMemoOrder(book_id, memo.memo_id, { order: memo.order }) : Promise.resolve()
      ));
    } catch (error) {
      console.error("메모 순서 업데이트 실패:", error);
    }
  };

  return (
    <>
      <NoteCombineUI 
        bookInfo={bookInfo}
        localMemos={localMemos}
        loading={loading}
        error={error}
        openModal={openModal}
      />

      {modalOpen && (
        <CombineModal 
          open={modalOpen} 
          onClose={closeModal} 
          memos={localMemos} 
          setMemos={handleUpdateMemos} 
        />
      )}
    </>
  );
};

export default NoteCombine;