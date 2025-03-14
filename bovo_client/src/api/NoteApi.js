import axios from "axios";

const API_URL = "https://deb1-2406-5900-902b-8631-4cd9-c81c-a344-e3ef.ngrok-free.app";
const token = "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyaWQiOjcsImlhdCI6MTc0MTkxOTU0MiwiZXhwIjoxNzQxOTIzMTQyfQ.WQmGjLv93hYQyb8v3iEX1a9yB00Iv_GSKDCRNGmng5Y";

/** 기록 페이지 */
export const noteData = async (bookId) => {
    //const token = sessionStorage.getItem("AccessToken");

    if (!bookId) {
        console.error("book_id가 필요합니다.");
        return;
    }
    try {

        const response = await axios.get(`${API_URL}/archive/${bookId}`, {
            headers: {
                "Content-Type": "application/json",
                "ngrok-skip-browser-warning": "69420",
                Authorization: `Bearer ${token}`
            },
            withCredentials: true 
        });

        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("기록 페이지 에러", error.response || error.message);
        throw error;
    }
};

/** 기록 상세보기 */
export const noteDetailData = async (bookId, memoId) => {
    console.log("전달된 bookId:", bookId);
    console.log("전달된 memoId:", memoId);
    console.log(`요청 경로: ${API_URL}/archive/${bookId}/memo?memoId=${memoId}`);

    if (!bookId || !memoId) {
        return;
    }

    try {
        const response = await axios.get(`${API_URL}/archive/${bookId}/memo?memoId=${memoId}`, {
            headers: {
                "Content-Type": "application/json",
                "ngrok-skip-browser-warning": "69420",
                Authorization: `Bearer ${token}`
            },
            withCredentials: true 
        });

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
      const response = await axios.post(`${API_URL}/archive/${bookId}/memo`, memoData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        withCredentials: true,
      });
  
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
      const response = await axios.put(`${API_URL}/archive/${bookId}/memo?memoId=${memoId}`, memoData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        withCredentials: true,
      });
  
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
        const response = await axios.put(`${API_URL}/archive/${bookId}/update`, bookData, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            withCredentials: true,
        });
  
        console.log("책 정보 수정 성공:", response.data);
        return response.data;
    } catch (error) {
        console.error("책 정보 수정 실패:", error.response?.data || error.message);
        throw error;
    }
};


/** 기록 모아보기 */
export const noteCombineData = async (bookId) => {
    //const token = sessionStorage.getItem("AccessToken");

    if (!bookId) {
        console.error("book_id가 필요합니다.");
        return;
    }
    try {
        const response = await axios.get(`${API_URL}/archive/${bookId}/memos`, {
            headers: {
                "Content-Type": "application/json",
                "ngrok-skip-browser-warning": "69420",
                Authorization: `Bearer ${token}`
            },
            withCredentials: true 
        });

        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("기록 모아보기 페이지 에러", error.response || error.message);
        throw error;
    }
};

/** 메모 순서 변경 */
export const updateMemoOrder = async (bookId, updatedMemos) => {
    console.log("API 요청 전 updatedMemos 값 확인:", updatedMemos);

    if (!bookId || !Array.isArray(updatedMemos) || updatedMemos.length === 0) {
        console.error("bookId 또는 updatedMemos가 올바르지 않음:", { bookId, updatedMemos });
        return;
    }

    const memoOrderArray = updatedMemos
        .map(memo => memo.memo_id)
        .filter(memoId => memoId !== null && memoId !== undefined);

    if (memoOrderArray.length === 0) {
        console.error("memo_order가 비어 있음, 요청 취소");
        return;
    }

    try {
        console.log("최종 요청 데이터:", {
            book_id: bookId,
            memo_order: memoOrderArray
        });

        const response = await axios.put(`${API_URL}/archive/${bookId}/memos`, 
            { book_id: bookId, memo_order: memoOrderArray },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                withCredentials: true,
            }
        );

        console.log("메모 순서 변경 성공:", response.data);
        return response.data;
    } catch (error) {
        console.error("메모 순서 변경 실패:", error.response?.data || error.message);
        throw error;
    }
};