import api from "./Auth"; // ✅ axios 인스턴스 가져오기

// ✅ 마이 페이지 데이터 가져오기
export const fetchMyPageData = async () => {
    try {
        const response = await api.get("/my-page"); // ✅ api 사용
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("MyPage 데이터 요청 중 오류 발생:", error.response || error.message);
        throw error;
    }
};

// ✅ 마이 프로필 정보 가져오기
export const fetchMyProfileData = async () => {
    try {
        const response = await api.get("/my-page/profile"); // ✅ api 사용
        console.log(response);
        return response.data;
    } catch (error) {
        console.error("MyProfile 데이터 요청 중 오류 발생:", error);
        throw error;
    }
};

// ✅ 마이 프로필 수정 정보 가져오기
export const fetchMyProfileEditData = async () => {
    try {
        const response = await api.get("/my-page/profile/update"); // ✅ api 사용
        console.log("프로필 데이터:", response.data);
        return response.data;
    } catch (error) {
        console.error("MyProfile 데이터 요청 중 오류 발생:", error);
        throw error;
    }
};

// ✅ 프로필 수정 요청 (닉네임, 프로필 이미지, 비밀번호)
export const editUserProfile = async (profileData) => {
    try {
        const response = await api.put("/my-page/profile/update", profileData); // ✅ api 사용
        return response.data;
    } catch (error) {
        console.error("프로필 수정 중 오류 발생:", error);
        throw error;
    }
};