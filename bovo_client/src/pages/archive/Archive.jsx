import { useState } from "react";
import useBooks from "../hooks/useBooks";
import ArchiveTabs from "./ArchiveTabs";
import ArchiveIng from "./ArchiveIng";
import ArchiveEnd from "./ArchiveEnd";
import ArchiveWish from "./ArchiveWish";
import styles from "./Archive.module.css";

const Archive = () => {
  const { books, loading, error } = useBooks();
  const [currentTab, setCurrentTab] = useState("ing");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredBooks = books.filter((book) => book.status === currentTab);
  const displayedBooks = searchQuery
    ? filteredBooks.filter((book) =>
        book.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : filteredBooks;

  return (
    <div className={styles.container}>
      <ArchiveTabs 
        currentTab={currentTab} 
        setCurrentTab={setCurrentTab} 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        bookCount={filteredBooks.length}  
      />

      {loading ? (
        <div className={styles.loading}>도서 목록을 불러오고 있습니다.</div>
      ) : error ? (
        <div className={styles.error}>목록을 불러오는 중 오류가 발생했습니다.</div>
      ) : displayedBooks.length > 0 ? (
        currentTab === "ing" ? (
          <ArchiveIng books={displayedBooks} />
        ) : currentTab === "end" ? (
          <ArchiveEnd books={displayedBooks} />
        ) : (
          <ArchiveWish books={displayedBooks} />
        )
      ) : (
        <div className={styles.nobooks}>검색 결과가 없습니다.</div>
      )}
    </div>
  );
};

export default Archive;