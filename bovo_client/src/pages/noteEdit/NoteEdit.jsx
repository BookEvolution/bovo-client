import { Box, Typography, Button, Snackbar, Alert } from "@mui/material";
import NoteTemplate from "../../components/templateModal/NoteTemplate";
import { useNoteEdit } from "../../hooks/useNoteEdit";

const NoteEdit = () => {
  const {
    memo_id,
    loadedMemo,
    titleFocused,
    templateModalOpen,
    MAX_TITLE_LENGTH,
    handleMemoQChange,
    handleMemoAChange,
    handleSaveMemo,
    handleOpenTemplateModal,
    handleCloseTemplateModal,
    handleApplyTemplate,
    handleTitleFocus,
    snackbarOpen,
    setSnackbarOpen
  } = useNoteEdit();


  return (
    <Box 
      display="flex"
      flexDirection="column" 
      alignItems="center"
      sx={{ width: "100%", padding: "0rem", position: "relative" }}
    >
      {/* 기록 시각 & 버튼 */}
      <Box 
        display="flex" 
        alignItems="center" 
        justifyContent="center" 
        gap="2rem" 
        sx={{ width: "100%" }}
      >
        {/* 기록 시각 */}
        <Box 
          sx={{ 
            width: "20rem", 
            height: "4rem", 
            backgroundColor: "#E8F1F6", 
            borderRadius: "0.625rem", 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "center", 
            textAlign: "center"
          }}
        >
          <Typography variant="body1" sx={{ fontWeight: 600, fontSize: "1.4rem" }}>
            기록 시각 : {loadedMemo.memo_date}
          </Typography>
        </Box>

        {/* 버튼 */}
        <Box display="flex" gap="2rem">
          <Button 
            variant="contained" 
            disableElevation 
            onClick={handleOpenTemplateModal}
            sx={{ 
              width: "10rem", 
              height: "4rem", 
              backgroundColor: "#BDE5F1", 
              color: "black",
              borderRadius: "0.625rem",
              fontSize: "1.25rem", 
              fontWeight: 500 
            }}
          >
            템플릿
          </Button>
          <Button 
            variant="contained" 
            disableElevation 
            sx={{ 
              width: "10rem", 
              height: "4rem", 
              backgroundColor: "#BDE5F1", 
              color: "black",
              borderRadius: "0.625rem", 
              fontSize: "1.25rem", 
              fontWeight: 500 
            }}
          >
            텍스트추출
          </Button>
        </Box>
      </Box>

      {/* 기록하기 텍스트 */}
      <Typography sx={{ 
        marginTop: "2rem", 
        fontSize: "2.5rem", 
        fontWeight: "bold", 
        color: "black", 
        alignSelf: "flex-start" 
      }}>
        {memo_id ? "수정하기" : "기록하기"}
      </Typography>

      {/* 질문 박스 */}
      <Box
        sx={{
          width: "41rem",
          height: "62.75rem",
          backgroundColor: "#E8F1F6",
          borderRadius: "20px",
          mt: "2rem",
          position: "relative",
        }}
      >
        {/* 세로줄 질문 입력 제목 글자 수  */}
        <Box display="flex" alignItems="center" position="relative">
          <Box sx={{ 
            width: "0.25rem",
            height: "6rem", 
            backgroundColor: "#739CD4", 
            marginLeft: "2rem" 
          }} />

          <textarea
            value={loadedMemo.memo_Q}
            onChange={(e) => handleMemoQChange(e.target.value)}
            onFocus={() => handleTitleFocus(true)}
            onBlur={() => handleTitleFocus(false)}
            placeholder="제목을 입력해주세요."
            style={{
              width: "35rem",
              fontSize: "2rem",
              fontWeight: "bold",
              fontFamily: "unset",
              color: "black",
              border: "none",
              background: "transparent",
              resize: "none",
              outline: "none",
              overflow: "hidden",
              margin: "2rem",
              borderBottom: titleFocused ? "2px solid #739CD4" : "2px solid transparent",
              transition: "border-bottom 0.3s ease",
            }}
          />

          {/* 제목 글자 수 */}
          <Typography 
            sx={{ 
              position: "absolute",
              right: "2rem",
              bottom: "0.7rem",
              fontSize: "1rem",
              color: "#739CD4",
            }}
          >
            {loadedMemo.memo_Q.length}/{MAX_TITLE_LENGTH}
          </Typography>
        </Box>

        {/* 답변 박스 */}
        <Box
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
          <textarea
            value={loadedMemo.memo_A}
            onChange={(e) => handleMemoAChange(e.target.value)}
            placeholder="내용을 입력해주세요."
            style={{
              width: "92%",
              height: "92%",
              fontFamily: "unset",
              fontSize: "1.5rem",
              color: "black",
              border: "none",
              resize: "none",
              outline: "none",
              padding: "1.5rem",
            }}
          />
        </Box>
      </Box>

      {/* 기록하기 버튼 */}
      <Button 
        variant="contained" 
        disableElevation
        onClick={handleSaveMemo}
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
        {memo_id ? "수정완료" : "기록하기"}
      </Button>

      {/* 스낵바 */}
      <Snackbar 
        open={snackbarOpen} 
        autoHideDuration={3000} 
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert 
          onClose={() => setSnackbarOpen(false)} 
          severity="error" 
          sx={{ 
            width: '1000%', 
            fontWeight: "bold", backgroundColor: "#E8F1F6", color: "red" }}
        >
          제목과 내용을 모두 입력해야 합니다.
        </Alert>
      </Snackbar>


      {/* 템플릿 모달 */}
      <NoteTemplate 
        open={templateModalOpen} 
        onClose={handleCloseTemplateModal} 
        onApplyTemplate={handleApplyTemplate}
      />
    </Box>
  );
};

export default NoteEdit;