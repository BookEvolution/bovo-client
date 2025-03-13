import axios from "axios";

const API_URL = "https://626e-112-158-33-80.ngrok-free.app";
const token = "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyaWQiOjMsImlhdCI6MTc0MTg3MjIxOSwiZXhwIjoxNzQxODc1ODE5fQ.w-KNJ9Iu2XRMZ15leCfLs-T0PIn1UFcRZyW1z0MxoIU";

/** 책 삭제 */
export const deleteBook = async (bookId) => {
  console.log(`deleteBook 실행: bookId=${bookId}`);

  if (!bookId) {
    console.error("bookId 오류.");
    return;
  }

  try {
    const response = await axios.delete(`${API_URL}/archive/${bookId}/delete`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });

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
    const response = await axios.delete(`${API_URL}/archive/${bookId}/memo?memoId=${memoId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });

    console.log("기록 삭제 성공:", response.data);
    return response.data;
  } catch (error) {
    console.error("기록 삭제 실패:", error.response || error.message);
    throw error;
  }
};