import React, { useState, useEffect } from "react";
import { Box, Typography, Button, Paper } from "@mui/material";

const NoteEdit = ({ memo = { 
        memo_Q: "제목을 입력해주세요.", 
        memo_A: "내용을 입력해주세요." 
    } }) => {
  const [loadedMemo, setLoadedMemo] = useState(null);

  useEffect(() => {
    if (memo) {
      setLoadedMemo(memo);
    }
  }, [memo]);

  if (!loadedMemo) {
    return <Typography sx={{ fontSize: "2rem", color: "gray" }}>오류</Typography>;
  }

  return (
    <Box 
      display="flex"
      flexDirection="column" 
      alignItems="center"
      sx={{ width: "100%", padding: "0rem", position: "relative" }}
    >
      {/* 기록 시각 & 버튼 */}
      <Box display="flex" alignItems="center" justifyContent="center" gap="2rem" sx={{ width: "100%" }}>
        {/* 기록 시각 */}
        <Box 
          sx={{ 
            width: "20rem", height: "4rem", backgroundColor: "#E8F1F6", borderRadius: "0.625rem", 
            display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center"
          }}
        >
          <Typography variant="body1" sx={{ fontWeight: 600, fontSize: "1.4rem" }}>
            기록 시각 : {new Date().toLocaleDateString("ko-KR", { year: "2-digit", month: "2-digit", day: "2-digit" })}
          </Typography>
        </Box>

        {/* 버튼 */}
        <Box display="flex" gap="2rem">
          <Button 
            variant="contained" disableElevation 
            sx={{ width: "10rem", height: "4rem", backgroundColor: "#BDE5F1", color: "black",
                  borderRadius: "0.625rem", fontSize: "1.25rem", fontWeight: 500 }}
          >
            템플릿
          </Button>
          <Button 
            variant="contained" disableElevation 
            sx={{ width: "10rem", height: "4rem", backgroundColor: "#BDE5F1", color: "black",
                  borderRadius: "0.625rem", fontSize: "1.25rem", fontWeight: 500 }}
          >
            텍스트추출
          </Button>
        </Box>
      </Box>

      {/* 기록하기 텍스트 */}
      <Typography sx={{ marginTop: "2rem", fontSize: "2.5rem", fontWeight: "bold", color: "black", alignSelf: "flex-start" }}>
        기록하기
      </Typography>

      {/* 질문 박스 */}
      <Paper
        elevation={0}
        sx={{
          width: "41rem",
          height: "62.75rem",
          backgroundColor: "#E8F1F6",
          borderRadius: "20px",
          mt: "2rem",
          position: "relative",
        }}
      >
        {/* 세로줄 + 질문 */}
        <Box display="flex" alignItems="center">
          <Box sx={{ width: "0.25rem", height: "6rem", backgroundColor: "#739CD4", marginLeft: "2rem" }} />
          <Typography color="black" sx={{ display: "flex", alignItems: "center", height: "6rem", fontSize: "2rem", fontWeight: "bold", margin: "2rem" }}>
            {loadedMemo.memo_Q}
          </Typography>
        </Box>

        {/* 답변 박스 */}
        <Paper
          elevation={0}
          sx={{
            width: "38rem",
            height: "51rem",
            backgroundColor: "white",
            borderBottomLeftRadius: "20px",
            borderBottomRightRadius: "20px",
            overflowY: "auto",
            position: "absolute",
            bottom: "1.5rem",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          <Typography sx={{ fontSize: "1.5rem", margin: "1.5rem" }}>
            {loadedMemo.memo_A}
          </Typography>
        </Paper>
      </Paper>

      {/* 기록하기 버튼 */}
      <Button 
        variant="contained" disableElevation
        sx={{ 
          position: "absolute", 
          bottom: "-6rem", 
          right: "1.5rem",
          width: "15rem", 
          height: "5rem",
          backgroundColor: "#E8F1F6", 
          color: "#739CD4", 
          fontSize: "1.5rem", 
          fontWeight: "bold",
          borderRadius: "0.625rem"
        }}
      >
        기록하기
      </Button>

    </Box>
  );
};

export default NoteEdit;