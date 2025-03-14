import api from "./Auth.js";

export const logout = async () => {
    try {
        await api.post("/my-page/logout");
        clearSession();
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

        await api.delete("/my-page/profile/delete", {
            data: { email },  // ✅ DELETE 요청 본문에 email 포함
        });

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