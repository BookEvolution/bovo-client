import { useState, useEffect } from "react";
import axios from "axios";

const useBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("/archive", { headers: { user_id: 1 } });
        setBooks(response.data?.books || []);
      } catch (error) {
        console.error("도서 목록 불러오기 실패:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  // 책 가져오기
  const getBookById = (book_id) => books.find(book => String(book.book_id) === String(book_id)) || null;

  // 책의 메모 가져오기
  const getMemosByBookId = (book_id) => getBookById(book_id)?.memos || [];

  // 메모 가져오기
  const getMemoById = (memo_id) => books.flatMap(book => book.memos || []).find(memo => String(memo.memo_id) === String(memo_id)) || null;

  // 메모 삭제
  const deleteMemo = async (memo_id) => {
    try {
      await axios.delete(`/memos/${memo_id}`, { headers: { user_id: 1 } });
      setBooks((prevBooks) =>
        prevBooks.map((book) => ({
          ...book,
          memos: book.memos.filter((memo) => String(memo.memo_id) !== String(memo_id)),
        }))
      );
      return true;
    } catch (error) {
      console.error("메모 삭제 실패:", error);
      return false;
    }
  };

  // 메모 수정
  const updateMemo = async (memo_id, updatedMemo) => {
    try {
      await axios.put(`/memos/${memo_id}`, updatedMemo, { headers: { user_id: 1 } });
      setBooks((prevBooks) =>
        prevBooks.map((book) => ({
          ...book,
          memos: book.memos.map((memo) => (String(memo.memo_id) === String(memo_id) ? { ...memo, ...updatedMemo } : memo)),
        }))
      );
      return true;
    } catch (error) {
      console.error("메모 수정 실패:", error);
      return false;
    }
  };

  return { books, loading, error, getBookById, getMemosByBookId, getMemoById, deleteMemo, updateMemo };
};

export default useBooks;