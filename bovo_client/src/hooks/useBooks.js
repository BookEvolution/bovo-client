import { useState, useEffect } from "react";
import axios from "axios";

const useBooks = () => {
  const [books, setBooks] = useState([]); // books 초기값을 빈 배열로 설정
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("/archive", { headers: { user_id: 1 } });
        setBooks(response.data?.books || []); // 데이터가 없을 경우 빈 배열을 설정
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
  const getMemosByBookId = (book_id) => {
    const book = getBookById(book_id);
    return book && Array.isArray(book.memos) ? book.memos : [];
  };

  // 특정 메모 가져오기
  const getMemoById = (memo_id) => {
    for (const book of books || []) {
      if (!book.memos) continue;
      const memo = book.memos.find(memo => String(memo.memo_id) === String(memo_id));
      if (memo) {
        return { ...memo, book_id: book.book_id }; // book_id 포함하여 반환
      }
    }
    return null;
  };

  // 새로운 메모 추가
  const createMemo = async (book_id, newMemo) => {
    if (!book_id) {
      console.error("오류: book_id가 없습니다.");
      return false;
    }

    const memo_id = Date.now().toString(); // 새로운 memo_id 생성
    const memoToSave = { ...newMemo, memo_id };

    // 개발 환경에서 Mock 데이터 처리
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
    if (!memo_id) {
      console.error("삭제 오류: memo_id가 없음");
      return false;
    }

    // 개발 환경에서 Mock 삭제
    if (import.meta.env.MODE === "development") {
      console.log(`[Mock] 메모 ${memo_id} 삭제됨`);
      setBooks((prevBooks) =>
        prevBooks.map(book => ({
          ...book,
          memos: book.memos.filter(memo => String(memo.memo_id) !== String(memo_id)),
        }))
      );
      return true;
    }

    try {
      await axios.delete(`/memos/${memo_id}`, { headers: { user_id: 1 } });
      setBooks((prevBooks) =>
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

  // 메모 수정
  const updateMemo = async (memo_id, updatedMemo) => {
    if (!memo_id) {
      console.error("수정 오류: memo_id가 없음");
      return false;
    }

    // 개발 환경에서 Mock 수정
    if (import.meta.env.MODE === "development") {
      console.log(`[Mock] 메모 ${memo_id} 수정됨`, updatedMemo);
      setBooks((prevBooks) =>
        prevBooks.map(book => ({
          ...book,
          memos: book.memos.map(memo =>
            String(memo.memo_id) === String(memo_id) ? { ...memo, ...updatedMemo } : memo
          ),
        }))
      );
      return true;
    }

    try {
      await axios.put(`/memos/${memo_id}`, updatedMemo, { headers: { user_id: 1 } });
      setBooks((prevBooks) =>
        prevBooks.map(book => ({
          ...book,
          memos: book.memos.map(memo =>
            String(memo.memo_id) === String(memo_id) ? { ...memo, ...updatedMemo } : memo
          ),
        }))
      );
      return true;
    } catch (error) {
      console.error("메모 수정 실패:", error);
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
    createMemo,
    deleteMemo, 
    updateMemo 
  };
};

export default useBooks;