import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { noteDetailData, createMemo, updateMemo } from "../api/NoteApi";

export const useNoteEdit = () => {
  const { memo_id } = useParams();
  const navigate = useNavigate();
  const bookId = useParams().book_id || null;

  const formatDate = (date) => {
    const year = date.getFullYear().toString().slice(-2);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}.${month}.${day}`;
  };

  const [loadedMemo, setLoadedMemo] = useState({
    memo_Q: "",
    memo_A: "",
    memo_date: formatDate(new Date())
  });

  const [titleFocused, setTitleFocused] = useState(false);
  const [templateModalOpen, setTemplateModalOpen] = useState(false);
  const MAX_TITLE_LENGTH = 36;
  
  useEffect(() => {
    const fetchData = async () => {
      if (!bookId) {
        console.error("bookId가 없습니다.");
        return;
      }
      try {
        const data = await noteDetailData(bookId, memo_id);
        console.log("데이터 불러옴:", data);
        setLoadedMemo({
          memo_Q: data.memo_Q || "",
          memo_A: data.memo_A || "",
          memo_date: data.memo_date || formatDate(new Date()),
        });
      } catch (error) {
        console.error("데이터 못 불러옴 (신규 작성시 정상):", error.response?.data || error.message);
      }
    };

    fetchData();
  }, [memo_id, bookId]);

  const handleSaveMemo = async () => {
    if (!bookId) {
      console.error("bookId가 없습니다.");
      return;
    }

    const updatedMemoData = {
      memo_Q: loadedMemo.memo_Q,
      memo_A: loadedMemo.memo_A,
      memo_date: formatDate(new Date()),
    };

    try {
      if (memo_id) {
        await updateMemo(bookId, memo_id, updatedMemoData);
        console.log("메모 수정 완료");
      } else {
        await createMemo(bookId, updatedMemoData);
        console.log("메모 작성 완료");
      }

      navigate(`/archive/${bookId}`);
    } catch (error) {
      console.error("메모 저장 실패:", error.response?.data || error.message);
    }
  };

  const handleMemoQChange = (value) => {
    if (!value.includes("\n") && value.length <= MAX_TITLE_LENGTH) {
      setLoadedMemo(prev => ({ ...prev, memo_Q: value }));
    }
  };
  

  const handleMemoAChange = (value) => {
    setLoadedMemo(prev => ({ ...prev, memo_A: value }));
  };

  const handleOpenTemplateModal = () => setTemplateModalOpen(true);
  const handleCloseTemplateModal = () => setTemplateModalOpen(false);
  
  const handleApplyTemplate = (templateContent) => {
    setLoadedMemo({ ...loadedMemo, memo_Q: templateContent });
    setTemplateModalOpen(false);
  };

  const handleTitleFocus = (isFocused) => {
    setTitleFocused(isFocused);
  };

  return {
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
    handleTitleFocus
  };
};