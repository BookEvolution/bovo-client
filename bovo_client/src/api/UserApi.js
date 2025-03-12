import axios from "axios";

const API_BASE_URL = "https://4e02-165-246-206-167.ngrok-free.app";


export const fetchMyPageData = async ( ) => {
    const token = sessionStorage.getItem("AccessToken");
    try {
        const response = await axios.get(`${API_BASE_URL}/my-page`, {
            headers: {
                "Content-Type": "application/json",
                "ngrok-skip-browser-warning": "69420",
                Authorization: `Bearer ${token}`
            },
            withCredentials: true 
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("MyPage 데이터 요청 중 오류 발생:", error.response || error.message);
        throw error;
    }
};

// ✅ 마이 프로필 정보 가져오기
export const fetchMyProfileData = async ( ) => {
    const token = sessionStorage.getItem("AccessToken");
    try {
        const response = await axios.get(`${API_BASE_URL}/my-page/profile`, {
            headers: {
                "ngrok-skip-browser-warning": "69420",
                Authorization: `Bearer ${token}`
            },
            withCredentials: true, // 인증 포함
        });
        console.log(response)
        return response;
    } catch (error) {
        console.error("MyProfile 데이터 요청 중 오류 발생:", error);
        throw error;
    }
};

// ✅ 마이 프로필 정보 가져오기 (닉네임, 이메일 등)
export const fetchMyProfileEditData = async ( ) => {
    const token = sessionStorage.getItem("AccessToken");
    try {
        const response = await axios.get(`${API_BASE_URL}/my-page/profile/update`, {
            headers: {
                "ngrok-skip-browser-warning": "69420",
                Authorization: `Bearer ${token}`
            },
            withCredentials: true, // 인증 포함
        });
        console.log("프로필 데이터:", response.data);
        return response.data;
    } catch (error) {
        console.error("MyProfile 데이터 요청 중 오류 발생:", error);
        throw error;
    }
};

// 프로필 수정 요청 (닉네임, 프로필 이미지, 비밀번호)
// 사용자 프로필 수정 API (PUT)
export const editUserProfile = async (profileData) => {
    const token = sessionStorage.getItem("AccessToken");
    try {
        const response = await axios.put(
            `${API_BASE_URL}/my-page/profile/update`, 
            profileData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                withCredentials: true, // 인증 포함
            }
        );
        return response.data; // 응답 데이터 반환
    } catch (error) {
        console.error("프로필 수정 중 오류 발생:", error);
        throw error;
    }
};