import { useState, useEffect } from "react";
import { Box, Typography, Button } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import NoteTemplate from "../../components/templateModal/NoteTemplate";
import useBooks from "../../hooks/useBooks";

const NoteEdit = () => {
  const { memo_id } = useParams();
  const navigate = useNavigate();
  const { getMemoById, updateMemo, createMemo, loading } = useBooks();
  
  // 초기 상태를 빈 값으로 설정
  const [loadedMemo, setLoadedMemo] = useState({
    memo_Q: "",
    memo_A: "",
    memo_date: new Date().toLocaleDateString("ko-KR", { year: "2-digit", month: "2-digit", day: "2-digit" }),
  });

  const [titleFocused, setTitleFocused] = useState(false);
  const [templateModalOpen, setTemplateModalOpen] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const MAX_TITLE_LENGTH = 36;
  
  useEffect(() => {
    if (!loading && !isInitialized && memo_id) {
      try {
        const fetchedMemo = getMemoById(memo_id);
        console.log("불러온 메모:", fetchedMemo);
        
        if (fetchedMemo) {
          setLoadedMemo({
            memo_Q: fetchedMemo.memo_Q || "",
            memo_A: fetchedMemo.memo_A || "",
            memo_date: fetchedMemo.memo_date || new Date().toLocaleDateString("ko-KR", {
              year: "2-digit",
              month: "2-digit",
              day: "2-digit",
            }),
          });
          setErrorMessage("");
        } else {
          console.error("메모를 찾을 수 없습니다:", memo_id);
          setErrorMessage(`메모를 찾을 수 없습니다: ${memo_id}`);
        }
      } catch (error) {
        console.error("메모 불러오기 오류:", error);
        setErrorMessage("메모 불러오기 중 오류가 발생했습니다.");
      }
      setIsInitialized(true);
    }
  }, [memo_id, getMemoById, isInitialized, loading]);

  const handleSaveMemo = async () => {
    if (!loadedMemo.memo_Q || !loadedMemo.memo_A) {
      console.error("오류: 제목과 내용이 비어있습니다.");
      setErrorMessage("제목과 내용을 모두 입력해주세요.");
      return;
    }

    const updatedMemo = {
      memo_Q: loadedMemo.memo_Q,
      memo_A: loadedMemo.memo_A,
      memo_date: loadedMemo.memo_date,
    };

    let memoIdToNavigate;

    if (memo_id) {
      console.log("수정할 메모:", updatedMemo);
      const success = await updateMemo(memo_id, updatedMemo);
      if (success) {
        memoIdToNavigate = memo_id;
      } else {
        setErrorMessage("메모 수정에 실패했습니다.");
        return;
      }
    } else {
      console.log("새로운 메모 저장:", updatedMemo);
      
      // 새 메모 생성 시 book_id 처리
      const book_id = "default_book_id"; // 실제 사용할 기본값
      const newMemoId = await createMemo(book_id, updatedMemo);
      if (newMemoId) {
        memoIdToNavigate = newMemoId;
      } else {
        setErrorMessage("메모 생성에 실패했습니다.");
        return;
      }
    }

    if (memoIdToNavigate) {
      navigate(`/note/note-detail/${memoIdToNavigate}`);
    } else {
      setErrorMessage("메모 저장 후 이동에 실패했습니다.");
    }
  };

  const handleOpenTemplateModal = () => setTemplateModalOpen(true);
  const handleCloseTemplateModal = () => setTemplateModalOpen(false);
  const handleApplyTemplate = (templateContent) => {
    setLoadedMemo({ ...loadedMemo, memo_Q: templateContent });
    setTemplateModalOpen(false);
  };

  // 메인 로딩 화면
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" sx={{ height: '80vh' }}>
        <Typography variant="h5">메모를 불러오는 중입니다...</Typography>
      </Box>
    );
  }

  // 에러 메시지 표시
  if (errorMessage && !loading && isInitialized) {
    return (
      <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" sx={{ height: '80vh' }}>
        <Typography variant="h5" color="error" sx={{ mb: 2 }}>
          {errorMessage}
        </Typography>
        <Button 
          variant="contained" 
          onClick={() => navigate("/note")}
          sx={{ 
            backgroundColor: "#BDE5F1", 
            color: "black",
            borderRadius: "0.625rem",
            fontSize: "1.25rem"
          }}
        >
          메모 목록으로 돌아가기
        </Button>
      </Box>
    );
  }

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
      sx={{ 
        width: "100%" 
        }}>
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
            variant="contained" disableElevation 
            sx={{ width: "10rem", 
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
        alignSelf: "flex-start" }}>
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
            onChange={(e) => {
              if (e.target.value.length <= MAX_TITLE_LENGTH) {
                setLoadedMemo(prev => ({ ...prev, memo_Q: e.target.value }));
              }
            }}
            onFocus={() => setTitleFocused(true)}
            onBlur={() => setTitleFocused(false)}
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
            onChange={(e) => setLoadedMemo(prev => ({ ...prev, memo_A: e.target.value }))}
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