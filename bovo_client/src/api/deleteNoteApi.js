import api from "./Auth.js";

/** 책 삭제 */
export const deleteBook = async (bookId) => {
  console.log(`deleteBook 실행: bookId=${bookId}`);

  if (!bookId) {
    console.error("bookId 오류.");
    return;
  }

  try {
    const response = await api.delete(`/archive/${bookId}/delete`);

    console.log("책 삭제 성공:", response.data);
    return response.data;
  } catch (error) {
    console.error("책 삭제 실패:", error.response || error.message);
    throw error;
  }
};

/** 메모 삭제 */
export const deleteMemo = async (bookId, memoId) => {
  console.log(`deleteMemo 실행: bookId=${bookId}, memoId=${memoId}`);

  if (!bookId || !memoId) {
    console.error("bookId와 memoId 오류.");
    return;
  }

  try {
    const response = await api.delete(`/archive/${bookId}/memo?memoId=${memoId}`);
    
    console.log("기록 삭제 성공:", response.data);
    return response.data;
  } catch (error) {
    console.error("기록 삭제 실패:", error.response || error.message);
    throw error;
  }
};