import { useNavigate } from "react-router-dom";
import { deleteBook, deleteMemo } from "../api/deleteNoteApi";

const useDelete = () => {
  const navigate = useNavigate();

  const deleteItem = async (targetId, targetType, bookId, onSuccess = () => {}) => {
    console.log(`delete.js 실행 - targetId: ${targetId}, targetType: ${targetType}, bookId: ${bookId}`);

    try {
      if (targetType === "memo") {
        await deleteMemo(bookId, targetId);
        console.log(`기록 삭제 완료 - memoId: ${targetId}`);
        navigate(`/main/archive/${bookId}`);
      } else {
        await deleteBook(targetId);
        console.log(`책 삭제 완료 - bookId: ${targetId}`);
        navigate("/main/archive");
      }

      onSuccess();
    } catch (error) {
      console.error("삭제 실패:", error);
    }
  };

  return { deleteItem };
};

export default useDelete;