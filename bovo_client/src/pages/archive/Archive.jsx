import { useState } from "react";
import ArchiveTabs from "./ArchiveTabs";
import ArchiveIng from "./ArchiveIng";
import ArchiveEnd from "./ArchiveEnd";
import ArchiveWish from "./ArchiveWish";
import "./Archive.css";

const Archive = () => {
  const [currentTab, setCurrentTab] = useState("ing");

  return (
    <div className="archive-container">
      <ArchiveTabs currentTab={currentTab} setCurrentTab={setCurrentTab} />
      {currentTab === "ing" && <ArchiveIng />}
      {currentTab === "end" && <ArchiveEnd />}
      {currentTab === "wish" && <ArchiveWish />}
    </div>
  );
};

export default Archive;