import { useState, useEffect } from "react";
import { archiveData } from "../api/ArchiveApi";

const useArchive = () => {
  const [books, setBooks] = useState({ ing: [], end: [], wish: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArchive = async () => {
      setLoading(true);
      try {
        const data = await archiveData();
        const categorizedBooks = {
          ing: data.books.filter((book) => book.status === "ing"),
          end: data.books.filter((book) => book.status === "end"),
          wish: data.books.filter((book) => book.status === "wish"),
        };
        setBooks(categorizedBooks);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchArchive();
  }, []);

  return { books, loading, error };
};

export default useArchive;