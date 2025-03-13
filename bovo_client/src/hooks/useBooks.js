import { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";

const useBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [booksLoaded, setBooksLoaded] = useState(false);
  
  // 마지막 데이터 로드 시간을 추적
  const lastFetchTimeRef = useRef(0);
  // 데이터 로드 진행 중인지 추적하기 위한 ref
  const fetchInProgressRef = useRef(false);
  
  // 데이터 캐싱 관리 함수
  const getCachedData = useCallback(() => {
    try {
      const cachedData = localStorage.getItem('cachedBooks');
      const cachedTimestamp = localStorage.getItem('cachedBooksTimestamp');
      
      if (cachedData && cachedTimestamp) {
        const parsedData = JSON.parse(cachedData);
        const timestamp = parseInt(cachedTimestamp);
        return { data: parsedData, timestamp };
      }
    } catch (error) {
      console.error("캐시 데이터 파싱 실패:", error);
    }
    return { data: null, timestamp: 0 };
  }, []);
  
  const cacheData = useCallback((data) => {
    try {
      const timestamp = Date.now();
      localStorage.setItem('cachedBooks', JSON.stringify(data));
      localStorage.setItem('cachedBooksTimestamp', timestamp.toString());
      lastFetchTimeRef.current = timestamp;
    } catch (error) {
      console.error("데이터 캐싱 실패:", error);
    }
  }, []);
  
  //메인 데이터 로드 함수
  const fetchBooks = useCallback(async (forceRefresh = false) => {
    // 이미 데이터 로드 중이면 중복 요청 방지
    if (fetchInProgressRef.current) {
      console.log("데이터 로드가 이미 진행 중입니다.");
      return;
    }
    
    // 강제 새로고침이 아니고, 마지막 로드 후 30초 이내면 스킵 (개발 환경에서는 적용하지 않음)
    const now = Date.now();
    const timeSinceLastFetch = now - lastFetchTimeRef.current;
    if (!forceRefresh && lastFetchTimeRef.current > 0 && timeSinceLastFetch < 30000 && import.meta.env.MODE !== "development") {
      console.log("최근에 이미 데이터를 로드했습니다. 스킵합니다.");
      return;
    }
    
    try {
      fetchInProgressRef.current = true;
      setLoading(true);
      console.log("도서 데이터 불러오기 시작");

      /* API 요청 전체 응답 확인을 위한 로깅 추가
      const response = await axios.get("여기에다 어쩌다/archive/${book_id}", {
        headers: { user_id: "1" },
        withCredentials: true
      }); */


      const response = await axios.get(`https://eb77-2406-5900-902b-8631-6d33-afad-ed06-8ac3.ngrok-free.app/archive/1`, {
        headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "69420",
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyaWQiOjYsImlhdCI6MTc0MTc0MTY3MSwiZXhwIjoxNzQxNzQ1MjcxfQ.Y1oXGpw_5zWL1AWn9z6g501lzCEG-3uA6TuqBBko5KE"
        },
        withCredentials: true
      });


      
      console.log("API 응답 전체:", response);
      
      const fetchedBooks = response.data?.books || [];
      console.log("서버에서 불러온 도서 데이터:", fetchedBooks);
      
      if (fetchedBooks.length === 0) {
        console.warn("서버/MSW에서 받은 도서 데이터가 비어있습니다");
      }
      
      setBooks([...fetchedBooks]);
      setBooksLoaded(true);
      setError(false);
      
      // 데이터 캐싱 (프로덕션 환경에서만 필요하지만, 일관성을 위해 유지)
      cacheData(fetchedBooks);
      console.log("도서 데이터 캐싱 완료");
      
    } catch (error) {
      console.error("도서 목록 불러오기 실패:", error);
      setError(true);
      
      // 오류 발생 시 캐시 데이터 사용 시도
      const { data: cachedBooks } = getCachedData();
      if (cachedBooks && cachedBooks.length > 0) {
        console.log("API 오류 발생, 캐시된 데이터로 폴백");
        setBooks([...cachedBooks]);
        setBooksLoaded(true);
      }
    } finally {
      setLoading(false);
      fetchInProgressRef.current = false;
      lastFetchTimeRef.current = Date.now();
    }
  }, [getCachedData, cacheData]);

  // 초기 로드 및 새로고침 이벤트 설정
  useEffect(() => {
    console.log("useBooks 초기화 - 데이터 로드 시작");
    
    // 개발 환경(MSW)에서는 캐시 검사 스킵, 바로 API 호출
    if (import.meta.env.MODE === "development") {
      fetchBooks(true);
    } else {
      // 프로덕션에서는 캐시 먼저 확인 후 API 호출
      const { data: cachedBooks } = getCachedData();
      if (cachedBooks && cachedBooks.length > 0) {
        console.log("캐시된 데이터 먼저 로드");
        setBooks([...cachedBooks]);
        setBooksLoaded(true);
        setLoading(false);
      }
      fetchBooks();
    }
    
    // 페이지 가시성 변경 감지 (탭 전환, 화면 복귀 등)
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        console.log("페이지 가시성 변경 감지, 데이터 확인");
        fetchBooks();
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    // window.onload 이벤트에도 데이터 로드 추가 (새로고침 대응)
    const handleLoad = () => {
      console.log("window.onload 이벤트 감지, 데이터 확인");
      fetchBooks();
    };
    
    window.addEventListener('load', handleLoad);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('load', handleLoad);
    };
  }, [fetchBooks, getCachedData]);

  // 특정 책 가져오기
  const getBookById = useCallback((book_id) => {
    if (!book_id || books.length === 0) return null;
    const book = books.find(book => String(book.book_id) === String(book_id)) || null;
    return book;
  }, [books]);

  // 특정 책의 메모 가져오기
  const getMemosByBookId = useCallback((book_id) => {
    if (!book_id) {
      console.error("getMemosByBookId 오류: book_id가 없습니다");
      return [];
    }
    
    const book = getBookById(book_id);
    let memos = book && Array.isArray(book.memos) ? book.memos : [];
  
    // 로컬 스토리지에서 order 정보 불러오기
    try {
      const storedMemos = localStorage.getItem(`memos_order_${book_id}`);
      if (storedMemos) {
        const parsedMemos = JSON.parse(storedMemos);
        if (Array.isArray(parsedMemos) && parsedMemos.length > 0) {
          console.log("로컬 스토리지에서 불러온 memos:", parsedMemos);
          memos = parsedMemos;
        }
      }
    } catch (error) {
      console.error("메모 정렬 정보 불러오기 실패:", error);
    }
  
    // order 값 기준으로 정렬
    memos = [...memos].sort((a, b) => (a.order ?? a.memo_id) - (b.order ?? b.memo_id));
  
    return memos;
  }, [getBookById]);  

  // 특정 메모 가져오기
  const getMemoById = useCallback((memo_id) => {
    if (!memo_id) {
      console.error("getMemoById 오류: memo_id가 없습니다");
      return null;
    }
    
    if (!books || books.length === 0) {
      console.log("getMemoById: books 데이터가 없거나 로딩 중입니다");
      return null;
    }
    
    for (const book of books) {
      if (!book.memos || !Array.isArray(book.memos)) {
        continue;
      }
      
      const memo = book.memos.find(memo => String(memo.memo_id) === String(memo_id));
      if (memo) {
        return { ...memo, book_id: book.book_id };
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

    try {
      // MSW가 가로채서 처리할 API 요청 수행
      await axios.post(`/memos`, memoToSave, { headers: { user_id: 1 } });

      // 요청 성공 후 상태 업데이트
      const updatedBooks = books.map(book =>
        String(book.book_id) === String(book_id)
          ? { 
              ...book, 
              memos: Array.isArray(book.memos) 
                ? [...book.memos, memoToSave] 
                : [memoToSave] 
            }
          : book
      );
      
      setBooks(updatedBooks);
      // 캐시 업데이트
      cacheData(updatedBooks);
      return memo_id;
    } catch (error) {
      console.error("메모 생성 실패:", error);
      return false;
    }
  }, [books, getBookById, cacheData]);

  // 메모 삭제
  const deleteMemo = useCallback(async (memo_id) => {
    if (!memo_id) {
      console.error("삭제 오류: memo_id가 없음");
      return false;
    }

    try {
      // MSW가 가로채서 처리할 API 요청 수행
      await axios.delete(`/memos/${memo_id}`, { headers: { user_id: 1 } });
      
      const updatedBooks = books.map(book => ({
        ...book,
        memos: Array.isArray(book.memos) 
          ? book.memos.filter(memo => String(memo.memo_id) !== String(memo_id))
          : []
      }));
      
      setBooks(updatedBooks);
      // 캐시 업데이트
      cacheData(updatedBooks);
      return true;
    } catch (error) {
      console.error("메모 삭제 실패:", error);
      return false;
    }
  }, [books, cacheData]);

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

    try {
      // MSW가 가로채서 처리할 API 요청 수행
      await axios.put(`/memos/${memo_id}`, updatedMemo, { headers: { user_id: 1 } });
      
      const updatedBooks = books.map(book => ({
        ...book,
        memos: Array.isArray(book.memos) 
          ? book.memos.map(memo =>
              String(memo.memo_id) === String(memo_id) 
                ? { ...memo, ...updatedMemo } 
                : memo
            )
          : []
      }));
      
      setBooks(updatedBooks);
      // 캐시 업데이트
      cacheData(updatedBooks);
      return true;
    } catch (error) {
      console.error("메모 수정 실패:", error);
      return false;
    }
  }, [books, getMemoById, cacheData]);

  // 메모 순서 저장 기능
  const saveMemoOrder = useCallback((book_id, orderedMemos) => {
    if (!book_id || !Array.isArray(orderedMemos)) {
      console.error("메모 순서 저장 오류: 유효하지 않은 데이터");
      return false;
    }
    
    try {
      // 로컬 스토리지에 순서 저장
      localStorage.setItem(`memos_order_${book_id}`, JSON.stringify(orderedMemos));
      
      // 상태 및 캐시 업데이트
      const updatedBooks = books.map(book => 
        String(book.book_id) === String(book_id)
          ? { ...book, memos: orderedMemos }
          : book
      );
      
      setBooks(updatedBooks);
      cacheData(updatedBooks);
      
      // MSW를 통해 처리될 API 호출 (필요한 경우)
      // axios.put(`/books/${book_id}/memos/order`, { memos: orderedMemos }, { headers: { user_id: 1 } });
      
      return true;
    } catch (error) {
      console.error("메모 순서 저장 실패:", error);
      return false;
    }
  }, [books, cacheData]);

  // 데이터 새로고침 함수 - 강제 새로고침
  const refreshData = useCallback(() => {
    return fetchBooks(true); // MSW 환경에서는 항상 강제 새로고침 사용
  }, [fetchBooks]);

  // 앱이 실행되고 있는지 확인하는 함수 (앱 초기화 확인용)
  const isAppReady = useCallback(() => {
    return booksLoaded || books.length > 0;
  }, [booksLoaded, books]);

  return { 
    books, 
    loading,
    booksLoaded,
    error, 
    getBookById, 
    getMemosByBookId, 
    setBooksLoaded,
    getMemoById, 
    createMemo,
    deleteMemo, 
    updateMemo,
    saveMemoOrder,
    refreshData,
    fetchBooks,
    isAppReady
  };
};

export default useBooks;