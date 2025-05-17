import { kakaoLogin } from "../api/Login";

const useKakaoLoginHandler = (navigate) => {
    const handleKakaoLogin = async (authCode) => {
        try {
            const response = await kakaoLogin(authCode);
            const status = response.status;

            if (status === 200) {
                navigate("/main");
            } else if (status === 201) {
                navigate("/sign-up/kakao");
            } else {
                navigate("/");
            }
        } catch (error) {
            console.error("카카오 로그인 실패:", error);
            navigate("/");
        }
    };

    return { handleKakaoLogin };
};

export default useKakaoLoginHandler;
