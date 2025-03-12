import { useNavigate } from "react-router-dom";
import axios from "axios";

const useDelete = () => {
  const navigate = useNavigate();

  const deleteItem = async (targetId, targetType, book_id, onSuccess = () => {}) => {
    const endpoint = targetType === "memo" ? `/memos/${targetId}` : `/books/${targetId}`;

    try {
      // 개발 환경에서 Mock 삭제 처리
      if (import.meta.env.MODE === "development") {
        console.log(`[Mock] ${targetType} ${targetId} 삭제됨`);
        onSuccess();

        // 삭제 후 이동 처리
        if (targetType === "book") navigate("/archive");
        else navigate(`/archive/${book_id}`);
        return;
      }

      // 실제 삭제 API 요청
      await axios.delete(endpoint, { headers: { user_id: 1 } });

      console.log(`${targetType} 삭제 성공`);
      onSuccess();

      // 삭제 후 리다이렉트 처리
      if (targetType === "book") navigate("/archive");
      else if (book_id) navigate(`/archive/${book_id}`);
    } catch (error) {
      console.error("삭제 실패:", error);
    }
  };

  return { deleteItem };
};

export default useDelete;