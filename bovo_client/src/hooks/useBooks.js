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

  // 특정 책 가져오기
  const getBookById = (book_id) => books.find(book => String(book.book_id) === String(book_id)) || null;

  // 특정 책의 메모 목록 가져오기
  const getMemosByBookId = (book_id) => getBookById(book_id)?.memos || [];

  // 특정 메모 가져오기
  const getMemoById = (memo_id) => books.flatMap(book => book.memos || []).find(memo => String(memo.memo_id) === String(memo_id)) || null;

  // 기존 메모 수정
  const updateMemo = async (memo_id, updatedMemo) => {
    if (!memo_id) {
      console.error("오류: updateMemo 호출 시 memo_id가 없습니다.");
      return false;
    }

    // 개발 환경에서 상태 업데이트
    if (import.meta.env.MODE === "development") {
      console.log("메모 수정됨:", updatedMemo);
      setBooks(prevBooks =>
        prevBooks.map(book => ({
          ...book,
          memos: book.memos.map(memo => (String(memo.memo_id) === String(memo_id) ? { ...memo, ...updatedMemo } : memo)),
        }))
      );
      return true;
    }

    try {
      await axios.put(`/memos/${memo_id}`, updatedMemo, { headers: { user_id: 1 } });

      setBooks(prevBooks =>
        prevBooks.map(book => ({
          ...book,
          memos: book.memos.map(memo => (String(memo.memo_id) === String(memo_id) ? { ...memo, ...updatedMemo } : memo)),
        }))
      );

      return true;
    } catch (error) {
      console.error("메모 수정 실패:", error);
      return false;
    }
  };

  // 새로운 메모 추가
  const createMemo = async (book_id, newMemo) => {
    if (!book_id) {
      console.error("오류: book_id가 없습니다.");
      return false;
    }

    const memo_id = Date.now().toString(); // 새로운 memo_id 생성
    const memoToSave = { ...newMemo, memo_id };

    // 개발 환경에서 상태 업데이트
    if (import.meta.env.MODE === "development") {
      console.log("새 메모 추가됨:", memoToSave);
      setBooks(prevBooks =>
        prevBooks.map(book =>
          book.book_id === book_id
            ? { ...book, memos: [...book.memos, memoToSave] }
            : book
        )
      );
      return memo_id;
    }

    try {
      await axios.post(`/memos`, memoToSave, { headers: { user_id: 1 } });

      setBooks(prevBooks =>
        prevBooks.map(book =>
          book.book_id === book_id
            ? { ...book, memos: [...book.memos, memoToSave] }
            : book
        )
      );

      return memo_id;
    } catch (error) {
      console.error("메모 생성 실패:", error);
      return false;
    }
  };

  // 메모 삭제
  const deleteMemo = async (memo_id) => {
    try {
      await axios.delete(`/memos/${memo_id}`, { headers: { user_id: 1 } });

      setBooks(prevBooks =>
        prevBooks.map(book => ({
          ...book,
          memos: book.memos.filter(memo => String(memo.memo_id) !== String(memo_id)),
        }))
      );

      return true;
    } catch (error) {
      console.error("메모 삭제 실패:", error);
      return false;
    }
  };

  return {
    books,
    loading,
    error,
    getBookById,
    getMemosByBookId,
    getMemoById,
    updateMemo,
    createMemo, 
    deleteMemo,
  };
};

export default useBooks;