import { useState } from "react";
import { Box } from "@mui/material";
import ArchiveTabs from "./ArchiveTabs";

const Archive = () => {
  const [currentTab, setCurrentTab] = useState("ing");

  return (
    <Box sx={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <ArchiveTabs currentTab={currentTab} setCurrentTab={setCurrentTab} />
      {/* 탭 불러와서 페이지 동작 확인 */}
      <Box sx={{ marginTop: "2rem", textAlign: "center" }}>
        {currentTab === "ing" && <h2>읽는 중</h2>}
        {currentTab === "end" && <h2>다 읽음</h2>}
        {currentTab === "wish" && <h2>읽고 싶음</h2>}
      </Box>
    </Box>
  );
};

export default Archive;