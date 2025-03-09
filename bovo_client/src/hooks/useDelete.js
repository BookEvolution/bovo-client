import { useNavigate } from "react-router-dom";
import axios from "axios";

const useDelete = () => {
  const navigate = useNavigate();

  const deleteItem = async (targetId, targetType, onSuccess) => {
    const endpoint = targetType === "memo" ? `/memos/${targetId}` : `/books/${targetId}`;

    try {
      // 백엔드가 없을 경우
      if (import.meta.env.MODE === "development") {
        console.log(`[Mock] ${targetType} ${targetId} 삭제됨`);
        onSuccess();
        if (targetType === "book") navigate("/archive");
        return;
      }

      await axios.delete(endpoint, { headers: { user_id: 1 } });

      console.log("삭제됨"); // 삭제 성공 시
      onSuccess();

      if (targetType === "book") navigate("/archive"); // 책 삭제하고 archive 이동
    } catch (error) {
      console.error("삭제 실패:", error);
    }
  };

  return { deleteItem };
};

export default useDelete;