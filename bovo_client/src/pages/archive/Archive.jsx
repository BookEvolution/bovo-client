/**나의 서재 페이지 */

import { useState } from "react";
import useArchive from "../../hooks/useArchive";
import useArchiveSearch from "../../hooks/useArchiveSearch";
import ArchiveTabs from "../../components/archive/ArchiveTabs";
import BookList from "../../components/archive/BookList";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const Archive = () => {
  // 책 데이터 및 로딩, 에러
  const { books, loading, error } = useArchive();

  // 선택된 상태
  const [currentTab, setCurrentTab] = useState("ing");

  // 검색 기능
  const { searchQuery, setSearchQuery, displayedBooks } = useArchiveSearch(books, currentTab);

  return (
    <Box sx={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", marginTop: "2rem" }}>
      {/* 탭 & 검색창 */}
      <ArchiveTabs 
        currentTab={currentTab} 
        setCurrentTab={setCurrentTab} 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
        bookCount={books[currentTab]?.length || 0} 
      />

      {/* 책 목록 렌더링 */}
      {loading ? (
        <Typography sx={{ fontSize: "2rem", fontWeight: "bold", color: "#739cd4" }}>
          도서 목록을 불러오고 있습니다.
        </Typography>
      ) : error ? (
        <Typography sx={{ fontSize: "2rem", fontWeight: "bold", color: "red" }}>
          목록을 불러오는 중 오류가 발생했습니다.
        </Typography>
      ) : displayedBooks.length > 0 ? (
        <BookList books={displayedBooks} variant={currentTab} />
      ) : (
        <Typography sx={{ fontSize: "2rem", fontWeight: "bold", color: "#739cd4", textAlign: "center", height: "10rem" }}>
          해당하는 책이 없습니다.
        </Typography>
      )}
    </Box>
  );
};

export default Archive;