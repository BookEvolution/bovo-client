import { useState } from "react";
import axios from "axios";
import useBooks from "./useBooks";

const useUpdateMemo = () => {
  const { setBooks } = useBooks();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateMemo = async (memo_id, updatedMemo) => {
    setLoading(true);
    setError(null);
    try {
      await axios.put(`/memos/${memo_id}`, updatedMemo, { headers: { user_id: 1 } });
      setBooks((prevBooks) =>
        prevBooks.map((book) => ({
          ...book,
          memos: book.memos.map((memo) =>
            String(memo.memo_id) === String(memo_id) ? { ...memo, ...updatedMemo } : memo
          ),
        }))
      );
      return true;
    } catch (err) {
      console.error("메모 수정 실패:", err);
      setError(err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { updateMemo, loading, error };
};

export default useUpdateMemo;