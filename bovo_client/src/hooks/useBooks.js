import { useState, useEffect, useCallback } from "react";
import axios from "axios";

const useBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

 
  const fetchBooks = useCallback(async () => {
    try {
      setLoading(true);
      console.log("도서 데이터 불러오기 시작");
      const response = await axios.get("/archive", { headers: { user_id: 1 } });
      const fetchedBooks = response.data?.books || [];
      console.log("불러온 도서 데이터:", fetchedBooks);
      setBooks(fetchedBooks);
      setError(false);
    } catch (error) {
      console.error("도서 목록 불러오기 실패:", error);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  // 특정 책 가져오기
  const getBookById = useCallback((book_id) => {
    console.log("getBookById 호출, book_id:", book_id);
    console.log("현재 books 상태:", books);
    const book = books.find(book => String(book.book_id) === String(book_id)) || null;
    console.log("찾은 book:", book);
    return book;
  }, [books]);

  // 특정 책의 메모 목록 가져오기
  const getMemosByBookId = useCallback((book_id) => {
    console.log("getMemosByBookId 호출, book_id:", book_id);
    const book = getBookById(book_id);
    const memos = book && Array.isArray(book.memos) ? book.memos : [];
    console.log("찾은 memos:", memos);
    return memos;
  }, [getBookById]);

  // 특정 메모 가져오기
  const getMemoById = useCallback((memo_id) => {
    console.log("getMemoById 호출, memo_id:", memo_id);
    console.log("현재 books 상태:", books);
    
    if (!memo_id) {
      console.error("getMemoById 오류: memo_id가 없습니다");
      return null;
    }
    
    if (!books || books.length === 0) {
      console.log("getMemoById: books 데이터가 없거나 로딩 중입니다");
      return null;
    }
    
    for (const book of books) {
      console.log("검색 중인 book:", book.book_id);
      
      if (!book.memos || !Array.isArray(book.memos)) {
        console.log(`book ${book.book_id}에 memos가 없거나 배열이 아닙니다`);
        continue;
      }
      
      const memo = book.memos.find(memo => String(memo.memo_id) === String(memo_id));
      if (memo) {
        console.log("메모를 찾았습니다:", memo);
        return { ...memo, book_id: book.book_id }; // book_id 포함하여 반환
      }
    }
    
    console.log("메모를 찾지 못했습니다:", memo_id);
    return null;
  }, [books]);

  // 새로운 메모 추가
  const createMemo = useCallback(async (book_id, newMemo) => {
    if (!book_id) {
      console.error("오류: book_id가 없습니다.");
      return false;
    }

    // book_id가 유효한지 확인
    const bookExists = getBookById(book_id);
    if (!bookExists) {
      console.error(`오류: ID가 ${book_id}인 책이 존재하지 않습니다.`);
      return false;
    }

    const memo_id = Date.now().toString(); // 새로운 memo_id 생성
    const memo_date = new Date().toLocaleDateString("ko-KR", {
      year: "2-digit",
      month: "2-digit",
      day: "2-digit",
    });
    
    const memoToSave = { 
      ...newMemo, 
      memo_id,
      memo_date,
    };

    // 개발 환경에서 Mock 데이터 처리
    if (import.meta.env.MODE === "development") {
      console.log("새 메모 추가됨:", memoToSave);
      setBooks(prevBooks =>
        prevBooks.map(book =>
          String(book.book_id) === String(book_id)
            ? { 
                ...book, 
                memos: Array.isArray(book.memos) 
                  ? [...book.memos, memoToSave] 
                  : [memoToSave] 
              }
            : book
        )
      );
      return memo_id;
    }

    try {
      await axios.post(`/memos`, memoToSave, { headers: { user_id: 1 } });

      setBooks(prevBooks =>
        prevBooks.map(book =>
          String(book.book_id) === String(book_id)
            ? { 
                ...book, 
                memos: Array.isArray(book.memos) 
                  ? [...book.memos, memoToSave] 
                  : [memoToSave] 
              }
            : book
        )
      );

      return memo_id;
    } catch (error) {
      console.error("메모 생성 실패:", error);
      return false;
    }
  }, [getBookById]);

  // 메모 삭제
  const deleteMemo = useCallback(async (memo_id) => {
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
          memos: Array.isArray(book.memos) 
            ? book.memos.filter(memo => String(memo.memo_id) !== String(memo_id))
            : []
        }))
      );
      return true;
    }

    try {
      await axios.delete(`/memos/${memo_id}`, { headers: { user_id: 1 } });
      setBooks((prevBooks) =>
        prevBooks.map(book => ({
          ...book,
          memos: Array.isArray(book.memos) 
            ? book.memos.filter(memo => String(memo.memo_id) !== String(memo_id))
            : []
        }))
      );
      return true;
    } catch (error) {
      console.error("메모 삭제 실패:", error);
      return false;
    }
  }, []);

  // 메모 수정
  const updateMemo = useCallback(async (memo_id, updatedMemo) => {
    if (!memo_id) {
      console.error("수정 오류: memo_id가 없음");
      return false;
    }

    // 메모가 존재하는지 확인
    const existingMemo = getMemoById(memo_id);
    if (!existingMemo) {
      console.error(`오류: ID가 ${memo_id}인 메모가 존재하지 않습니다.`);
      return false;
    }

    // 개발 환경에서 Mock 수정
    if (import.meta.env.MODE === "development") {
      console.log(`[Mock] 메모 ${memo_id} 수정됨`, updatedMemo);
      setBooks((prevBooks) =>
        prevBooks.map(book => ({
          ...book,
          memos: Array.isArray(book.memos) 
            ? book.memos.map(memo =>
                String(memo.memo_id) === String(memo_id) 
                  ? { ...memo, ...updatedMemo } 
                  : memo
              )
            : []
        }))
      );
      return true;
    }

    try {
      await axios.put(`/memos/${memo_id}`, updatedMemo, { headers: { user_id: 1 } });
      setBooks((prevBooks) =>
        prevBooks.map(book => ({
          ...book,
          memos: Array.isArray(book.memos) 
            ? book.memos.map(memo =>
                String(memo.memo_id) === String(memo_id) 
                  ? { ...memo, ...updatedMemo } 
                  : memo
              )
            : []
        }))
      );
      return true;
    } catch (error) {
      console.error("메모 수정 실패:", error);
      return false;
    }
  }, [getMemoById]);

  // 데이터 새로고침 함수 추가
  const refreshData = () => {
    fetchBooks();
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
    updateMemo,
    refreshData
  };
};

export default useBooks;