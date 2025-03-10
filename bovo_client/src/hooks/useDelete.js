import { useNavigate } from "react-router-dom";
import { useBooks } from "./useBooks";

const useDelete = () => {
  const navigate = useNavigate();
  const { deleteMemo, deleteBook } = useBooks();

  const deleteItem = async (targetId, targetType, bookId, onSuccess = () => {}) => {
    try {
      let deleteSuccess = false;

      if (targetType === "memo") {
        deleteSuccess = await deleteMemo(targetId);
      } else if (targetType === "book") {
        deleteSuccess = await deleteBook(targetId);
      }

      if (!deleteSuccess) {
        console.error(`${targetType} 삭제 실패`);
        return;
      }

      console.log(`${targetType} 삭제 성공`);
      onSuccess();

      if (targetType === "book") {
        navigate("/archive");
      } else if (bookId) {
        navigate(`/note/${bookId}`);
      }
    } catch (error) {
      console.error("삭제 중 오류 발생:", error);
    }
  };

  return { deleteItem };
};

export default useDelete;