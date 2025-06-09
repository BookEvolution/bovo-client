import api from "./Auth.js"; // 기존 axios 설정 파일

// ✅ 전체 독서 토론방 목록 요청
export const fetchAllChatrooms = async () => {
    const response = await api.get("/chatrooms");
    console.log(response.data)
    return response.data.chatrooms; // chatrooms 배열 반환
};

// ✅ 나의 토론방 목록 요청
export const fetchMyChatrooms = async () => {
    const response = await api.get("/chatrooms/my");
    console.log(response.data);
    return response.data; // 단일 객체 반환
};

// 채팅방 생성 함수
export const createForumRoom = async (forumData) => {
    const response = await api.post("/chatrooms/create", forumData);
    console.log(response.data);
    return response.data;
};

// 채팅방 데이터 요청 함수
export const fetchChatRoomData = async (roomId) => {
    const response = await api.get(`/chatrooms/${roomId}`);
    console.log(response.data);
    return response.data; // 데이터 반환
};


// 나의토론방 참여를 위한 데이터 요청
export const fetchMyRoomData = async (roomId) => {
    const response = await api.get(`/chatrooms/my/${roomId}`);
    return response;
};

// 토론방 참여 후 userList 데이터 정보 요청
export const fetchUserList = async (roomId) => {
    const response = await api.get(`/chatrooms/users?roomId=${roomId}`);
    console.log("Received user list:", response.data);
    return response.data; // 사용자 목록 반환
};

// 채팅방 나가기 
export const deleteChatRoomUser = async (roomId) => {
    const response = await api.delete(`/chatrooms/leave?roomId=${roomId}`);
    return response.data;
};

// 독서기록 공유 
export const getMemos = async (roomId) => {
    const response = await api.get(`/chatrooms/memos?roomId=${roomId}`);
    return response.data;  // 요청 성공 시 반환된 데이터
};