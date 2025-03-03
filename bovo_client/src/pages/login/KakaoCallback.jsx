import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = ""; //백엔드 URL 넣기

const KakaoCallback = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const authCode = urlParams.get("code"); //인가 코드 입력

        if (authCode) {
            axios.post(`${API_URL}/auth/kakao`, { code: authCode }, { withCredentials: true })  // 쿠키 
                .then((response) => {
                    const { isNewUser } = response.data;

                    if (isNewUser) {
                        navigate("/sign-up/step1"); 
                    } else {
                        navigate("/"); 
                    }
                })
                .catch((error) => {
                    console.error("카카오 로그인 실패:", error);
                    navigate("/login"); 
                });
        }
    }, [navigate]);

    return <div>로그인 처리 중</div>;
};

export default KakaoCallback;
