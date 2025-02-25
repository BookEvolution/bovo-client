import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ArchiveIng = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/archive", { headers: { user_id: 1 } })
      .then((response) => {
        setBooks(response.data?.books?.filter((book) => book.status === "ing") || []);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        setError(true);
      });
  }, []);

  return (
    <div>
      {loading ? (
        <div className="loading">도서 목록을 불러오고 있습니다.</div>
    ) : error ? (
      <div className="error">목록을 불러오는 중 오류가 발생했습니다.</div>
      ) : books.length > 0 ? (
        <div className="book-list">
          {books.map((book) => (
            <div 
              className="book-card" 
              key={book.book_id} 
              onClick={() => navigate(`/note/${book.book_id}`)}
              style={{ cursor: "pointer" }}
            >
              <img className="book-cover" src={book.cover} alt={book.title} />
              <div className="book-info">
                <p className="book-title">{book.title}</p>
                <p className="book-author">{book.author}</p>
                <p className="book-date">읽기 시작한 날: {book.start_date}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-books">등록된 도서가 없습니다.</div>
      )}
    </div>
  );
};

export default ArchiveIng;