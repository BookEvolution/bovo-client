import { useState } from "react";
import useArchive from "../../hooks/useArchive";
import useArchiveSearch from "../../hooks/useArchiveSearch";
import ArchiveTabs from "../../components/archive/ArchiveTabs";
import BookList from "../../components/archive/BookList";
import { Box, Typography } from "@mui/material";

const Archive = () => {
  const { books, loading, error } = useArchive();
  const [currentTab, setCurrentTab] = useState("ing");
  const { searchQuery, setSearchQuery, displayedBooks } = useArchiveSearch(books, currentTab);

  return (
    <Box sx={{ 
      width: "100%", 
      display: "flex", 
      flexDirection: "column", 
      alignItems: "center", 
      marginTop: "2rem"
    }}>
      <ArchiveTabs 
        currentTab={currentTab} 
        setCurrentTab={setCurrentTab} 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
        bookCount={books[currentTab]?.length || 0} 
      />

      {loading ? (
        <Typography sx={{ 
          fontSize: "2rem", 
          fontWeight: "bold", 
          color: "#739cd4"
        }}>
          도서 목록을 불러오고 있습니다.
        </Typography>
      ) : error ? (
        <Typography sx={{ 
          fontSize: "2rem", 
          fontWeight: "bold", 
          color: "red"
        }}>
          목록을 불러오는 중 오류가 발생했습니다.
        </Typography>
      ) : displayedBooks.length > 0 ? (
        <BookList books={displayedBooks} variant={currentTab} />
      ) : (
        <Typography sx={{ 
          fontSize: "2rem", 
          fontWeight: "bold", 
          color: "#739cd4",
          textAlign: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "10rem"
        }}>
          해당하는 책이 없습니다.
        </Typography>
      )}
    </Box>
  );
};

export default Archive;