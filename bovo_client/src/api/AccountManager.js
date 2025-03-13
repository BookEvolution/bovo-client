import api from "./Auth";

export const logout = async () => {
    try {
        await api.post("/my-page/logout");
        clearSession(); // 세션 정리 함수 호출
    } catch (error) {
        console.error("로그아웃 오류:", error);
    }
};

export const withdraw = async (email) => {
    try {
        const accessToken = sessionStorage.getItem("accessToken");

        if (!accessToken) {
            console.error("Access Token이 없습니다.");
            return;
        }

        await api.post("/my-page/profile/delete", { email });

        clearSession(); // 세션 정리 함수 호출
    } catch (error) {
        console.error("회원 탈퇴 오류:", error);
    }
};

// ✅ 중복되는 세션 정리 로직을 함수로 분리
const clearSession = () => {
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("tokenExpiry");
};