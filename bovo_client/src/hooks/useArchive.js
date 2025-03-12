import { useState, useEffect } from "react";
import { archiveData } from "../api/ArchiveApi";

const useArchive = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArchive = async () => {
      setLoading(true);
      try {
        const data = await archiveData();
        setBooks(data?.books || []); // 배열만 저장
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