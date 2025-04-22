import { kakaoLogin } from "../api/Login";

const useKakaoLoginHandler = (navigate) => {
    const handleKakaoLogin = async (authCode) => {
        try {
            const response = await kakaoLogin(authCode);
            const status = response.status;

            if (status === 200) {
                navigate("/");
            } else if (status === 201) {
                navigate("/sign-up/kakao");
            } else {
                navigate("/login");
            }
        } catch (error) {
            console.error("카카오 로그인 실패:", error);
            navigate("/login");
        }
    };

    return { handleKakaoLogin };
};

export default useKakaoLoginHandler;
