import { useState, useEffect } from "react";
import axios from "axios";
import ArchiveTabs from "./ArchiveTabs";
import ArchiveIng from "./ArchiveIng";
import ArchiveEnd from "./ArchiveEnd";
import ArchiveWish from "./ArchiveWish";
import "./Archive.css";

const Archive = () => {
  const [currentTab, setCurrentTab] = useState("ing");
  const [searchQuery, setSearchQuery] = useState("");
  const [bookCount, setBookCount] = useState(0);

  useEffect(() => {
    axios
      .get("/archive", { headers: { user_id: 1 } })
      .then((response) => {
        const books = response.data?.books || [];
        const filteredBooks = books.filter((book) => book.status === currentTab);
        setBookCount(filteredBooks.length);
      })
      .catch(() => {
        setBookCount(0);
      });
  }, [currentTab]);

  return (
    <div className="archive-container">
      <ArchiveTabs 
        currentTab={currentTab} 
        setCurrentTab={setCurrentTab} 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        bookCount={bookCount}  
      />
      {currentTab === "ing" && <ArchiveIng searchQuery={searchQuery} />}
      {currentTab === "end" && <ArchiveEnd searchQuery={searchQuery} />}
      {currentTab === "wish" && <ArchiveWish searchQuery={searchQuery} />}
    </div>
  );
};

export default Archive;