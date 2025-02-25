import { Tabs, Tab, Box, TextField, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";

const ArchiveTabs = ({ currentTab, setCurrentTab }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const totalBooks = 1234; //총 몇 권 위치만 확인

  const handleChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  return (
    <Box sx={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
      {/* 탭 형식*/}
      <Tabs
        value={currentTab}
        onChange={handleChange}
        sx={{
          "& .MuiTabs-flexContainer": { justifyContent: "center" },
          "& .MuiTabs-indicator": { backgroundColor: "#739CD4", height: "0.25rem" },
        }}
      >
          {/*탭 스타일*/}
        {[
          { label: "읽는 중", value: "ing" },
          { label: "다 읽음", value: "end" },
          { label: "읽고 싶음", value: "wish" },
        ].map((tab) => (
          <Tab
            key={tab.value}
            label={tab.label}
            value={tab.value}
            sx={{
              fontSize: "1.5rem",
              fontWeight: "bold",
              color: currentTab === tab.value ? "#739CD4" : "black",
              minWidth: "13rem",
              minHeight: "4rem",
            }}
          />
        ))}
      </Tabs>

      {/* 검색창 */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          width: "40rem",
          height: "4rem",
          backgroundColor: "#E8F1F6",
          borderRadius: "1.5625rem",
          marginTop: "2rem",
          padding: "0 1rem",
        }}
      >
        <SearchIcon sx={{ color: "#739CD4", fontSize: "3rem", marginRight: "0.5rem" }} />
        <TextField
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="책 제목을 입력하세요."
          variant="standard"
          sx={{
            width: "100%",
            fontSize: "1.5rem",

            "& input": {
              fontSize: "1.5rem",
            },
          }}
        />
      </Box>

      {/* 총 몇 권*/}
      <Typography
        sx={{
          width: "40rem",
          marginTop: "1.5rem",
          fontSize: "1.5rem",
          fontWeight: "bold",
          color: "black",
          textAlign: "left",
        }}
      >
        총 {totalBooks}권
      </Typography>
    </Box>
  );
};

export default ArchiveTabs;