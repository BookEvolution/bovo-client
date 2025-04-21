import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { kakaoLogin } from "../../api/Login";   

const KakaoCallback = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const authCode = urlParams.get("code");

        if (!authCode) {
            console.error("인가 코드가 없음");
            return;
        }

        kakaoLogin(authCode)
            .then((response) => {
                const status = response.status;
                if (status === 200) {
                    navigate("/");
                } else if (status === 201) {
                    navigate("/sign-up/kakao");
                } else {
                    navigate("/login");
                }
            })
            .catch((error) => {
                console.error("카카오 로그인 실패:", error);
                navigate("/login");
            });
    }, [navigate]);

    return <div>로그인 처리 중...</div>;
};

export default KakaoCallback;
