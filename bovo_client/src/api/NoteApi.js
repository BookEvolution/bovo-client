import api from "./Auth.js";

/** 기록 페이지 */
export const noteData = async (bookId) => {

    if (!bookId) {
        console.error("book_id가 필요합니다.");
        return;
    }
    try {
        const response = await api.get(`/archive/${bookId}`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("기록 페이지 에러", error.response || error.message);
        throw error;
    }
};

/** 기록 상세보기 */
export const noteDetailData = async (bookId, memoId) => {

    if (!bookId || !memoId) {
        return;
    }
    try {
        const response = await api.get(`/archive/${bookId}/memo?memoId=${memoId}`);
        console.log("API 응답:", response.data);
        return response.data;
    } catch (error) {
        console.error("기록 상세보기 API 요청 실패:", error.response?.data || error.message);
        throw error;
    }
};

/** 기록 신규 작성 */

export const createMemo = async (bookId, memoData) => {
    memoData.memo_date = memoData.memo_date.replace(/\s/g, "").replace(/\.$/, "");
    console.log("createMemo 실행: bookId =", bookId);
    console.log("요청 데이터:", JSON.stringify(memoData));

    if (!bookId) {
        console.error("bookId 오류.");
        return;
    }

    try {
        const response = await api.post(`/archive/${bookId}/memo`, memoData);
      console.log("기록 작성 성공:", response.data);
      return response.data;
    } catch (error) {
      console.error("기록 작성 실패:", error.response?.data || error.message);
      throw error;
    }
  };
  
  /** 기록 수정 */
  export const updateMemo = async (bookId, memoId, memoData) => {
    console.log(`updateMemo 실행: bookId=${bookId}, memoId=${memoId}, memoData=`, memoData);
  
    if (!bookId || !memoId) {
      console.error("bookId, memoId 오류.");
      return;
    }
  
    try {
        const response = await api.put(`/archive/${bookId}/memo?memoId=${memoId}`, memoData);  
      console.log("기록 수정 성공:", response.data);
      return response.data;
    } catch (error) {
      console.error("기록 수정 실패:", error.response?.data || error.message);
      throw error;
    }
  };

  /** 책 정보 (BottomSheet) */
export const updateBook = async (bookId, bookData) => {
    console.log(`책 정보 수정: bookId=${bookId}, bookData=`, bookData);
  
    if (!bookId) {
        console.error("bookId 오류.");
        return;
    }
    try {
        const response = await api.put(`/archive/${bookId}/update`, bookData);
        console.log("책 정보 수정 성공:", response.data);
        return response.data;
    } catch (error) {
        console.error("책 정보 수정 실패:", error.response?.data || error.message);
        throw error;
    }
};


/** 기록 모아보기 */
export const noteCombineData = async (bookId) => {

    if (!bookId) {
        console.error("book_id가 필요합니다.");
        return;
    }
    try {
        const response = await api.get(`/archive/${bookId}/memos`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("기록 모아보기 페이지 에러", error.response || error.message);
        throw error;
    }
};


/** 메모 순서 변경 */
export const updateMemoOrder = async (bookId, memoOrderArray) => {
    console.log("API 요청 전 데이터 확인:", { book_id: bookId, memo_order: memoOrderArray });

    try {
        const response = await api.put(`/archive/${bookId}/memos`, {
            book_id: bookId,
            memo_order: memoOrderArray
        });

        console.log("메모 순서 변경 성공:", response.data);
        return response.data;
    } catch (error) {
        console.error("메모 순서 변경 실패:", error.response?.data || error.message);
        throw error;
    }
};