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
  const getMemosByBookId = (book_id) => {
    const book = getBookById(book_id);
    return book && Array.isArray(book.memos) ? book.memos : [];
  };

  // 특정 메모 가져오기
  const getMemoById = (memo_id) => {
    for (const book of books) {
      const memo = book.memos.find(memo => String(memo.memo_id) === String(memo_id));
      if (memo) {
        return { ...memo, book_id: book.book_id };
      }
    }
    return null;
  };

  // 메모 삭제
  const deleteMemo = async (memo_id) => {
    if (!memo_id) {
      console.error("삭제 오류: memo_id가 없음");
      return false;
    }

    // 개발 환경에서 삭제
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

  return { books, loading, error, getBookById, getMemosByBookId, getMemoById, deleteMemo, updateMemo };
};

export default useBooks;