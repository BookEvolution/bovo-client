import { useState, useMemo } from "react";

const useArchiveSearch = (books, currentTab) => {
  const [searchQuery, setSearchQuery] = useState("");

  const displayedBooks = useMemo(() => {
    if (!books[currentTab]) return [];
    
    // 검색어로 필터링
    const filteredBooks = books[currentTab].filter((book) =>
      book.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    // 최신순 정렬 (큰 수를 가진 ID가 위로)
    return [...filteredBooks].sort((a, b) => b.book_id - a.book_id);
  }, [books, currentTab, searchQuery]);

  return { searchQuery, setSearchQuery, displayedBooks };
};

export default useArchiveSearch;