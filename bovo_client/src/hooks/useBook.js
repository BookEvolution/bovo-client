import { useState, useEffect } from "react";
import { noteData } from "../api/NoteApi";

const useBook = (bookId) => {
  const [book, setBook] = useState(null);
  const [memos, setMemos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!bookId) return;

    const fetchBook = async () => {
      setLoading(true);
      try {
        const data = await noteData(bookId);
        if (data?.book) {
          setBook({
            book_id: bookId,
            title: data.book.title,
            cover: data.book.cover,
            author: data.book.author,
            star: data.book.star,
            start_date: data.book["start_date"],
            end_date: data.book["end_date"],
            status: data.book.status,
          });
        }
        setMemos(
          data?.memos?.map(memo => ({
            memo_id: memo.memo_id,
            memo_date: memo.memo_date,
            memo_Q: memo.memo_Q,
            memo_A: memo.memo_A,
          })) || []
        );
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [bookId]);

  return { book, memos, loading, error };
};

export default useBook;