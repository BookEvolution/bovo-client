import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useKakaoLoginHandler from "../../hooks/useKakaoLogin";

const KakaoCallback = () => {
    const navigate = useNavigate();
    const { handleKakaoLogin } = useKakaoLoginHandler(navigate);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const authCode = urlParams.get("code");

        if (!authCode) {
            console.error("인가 코드 없음");
            return;
        }

        handleKakaoLogin(authCode);
    }, [navigate, handleKakaoLogin]);

    return <div>로그인 처리 중...</div>;
};

export default KakaoCallback;
