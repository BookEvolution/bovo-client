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


// 나의토론방 참여를 위한 데이터 요청
export const fetchMyRoomData = async (roomId) => {
    try {
      const response = await api.get(`/chatrooms/my/?roomId=${roomId}`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch room data:', error);
      throw error;
    }
};

// 토론방 참여 후 userList 데이터 정보 요청
export const fetchUserList = async (roomId) => {
    try {
        const response = await api.get(`/chatrooms?roomId=${roomId}/users`);
        console.log("Received user list:", response.data);
        return response.data; // 사용자 목록 반환
    } catch (error) {
        console.error("사용자 목록 요청 실패:", error);
        throw error;
    }
};

// 채팅방 나가기 
export const deleteChatRoomUser = async (roomId) => {
    try {
        const response = await api.delete(`/chatrooms?roomId=${roomId}/users`);
        return response.data;
    } catch (error) {
        console.error("채팅방 나가기 요청에 실패했습니다.", error);
        throw error;
    }
};

// 독서기록 공유 
export const getMemos = async (roomId) => {
    try {
        const response = await api.get(`/chatrooms?roomId=${roomId}/memos`);
        return response.data;  // 요청 성공 시 반환된 데이터
    } catch (error) {
        console.error("메모를 가져오는 데 실패했습니다:", error);
        throw error;  // 에러 발생 시 에러를 throw하여 호출하는 쪽에서 처리하도록 함
    }
};