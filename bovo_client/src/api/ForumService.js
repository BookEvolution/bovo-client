import api from "./Auth.js"; // 기존 axios 설정 파일

// ✅ 전체 독서 토론방 목록 요청
export const fetchAllChatrooms = async () => {
    try {
        const response = await api.get("/chatrooms");
        console.log(response.data)
        return response.data.chatrooms; // chatrooms 배열 반환
    } catch (error) {
        console.error("전체 독서 토론방 목록 불러오기 실패:", error);
        throw error;
    }
};

// ✅ 나의 토론방 목록 요청
export const fetchMyChatrooms = async () => {
    try {
        const response = await api.get("/chatrooms/my");
        console.log(response.data);
        return response.data; // 단일 객체 반환
    } catch (error) {
        console.error("나의 독서 토론방 목록 불러오기 실패:", error);
        throw error;
    }
};

// 채팅방 생성 함수
export const createForumRoom = async (forumData) => {
    try {
        const response = await api.post("/chatrooms/create", forumData);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("방 만들기 요청 실패:", error);
        throw error;
    }
};

// 채팅방 데이터 요청 함수
export const fetchChatRoomData = async (roomId) => {
    try {
      const response = await api.get(`/chatrooms/${roomId}`);
      console.log(response.data);
      return response.data; // 데이터 반환
    } catch (error) {
      console.error("채팅방 정보 요청 실패", error);
      throw error; // 에러를 다시 던져서 호출한 곳에서 처리 가능하게 함
    }
};