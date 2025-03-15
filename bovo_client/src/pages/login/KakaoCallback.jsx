import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { disableInterceptor, enableInterceptor, setAccessToken } from "../../api/Auth";

const KakaoCallback = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const authCode = urlParams.get("code");
        console.log("인가 코드:", authCode);

        if (!authCode) {
            console.error("인가 코드가 없음");
            return;
        }

        disableInterceptor();

        axios.post(
            "https://aa62-112-158-33-80.ngrok-free.app/kakao/login", 
            { authCode: authCode },
            {
                headers: { "Content-Type": "application/json" },
                withCredentials: true
            }
        )
        .then((response) => {
            console.log("카카오 로그인 성공:", response.data);

            const accessToken = response.data.accessToken;
            if (accessToken) {
                sessionStorage.setItem("AccessToken", accessToken);
                axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
            }

            // const { kakaoId, nickname } = response.data;
            // sessionStorage.setItem("kakaoId", kakaoId);
            // sessionStorage.setItem("nickname", nickname);

            if (response.status === 200) {
                console.log("기존 유저 로그인 성공");
                const accessToken = response.data.accessToken;

                if (accessToken) {
                    sessionStorage.setItem("accessToken", accessToken);
                    setAccessToken(accessToken); // 만료시간 기본값 3600초 적용
                    
                }
                enableInterceptor();
                navigate("/");
            } else if (response.status === 201) {
                console.log("신규 유저 회원가입 페이지 이동");
                navigate("/sign-up/kakao");
            } else {
                console.log("예상치 못한 응답 상태 코드:", response.status);
                navigate("/login");
            }
        })
        .catch((error) => {
            console.error("카카오 로그인 실패:", error);

            if (error.response) {
                console.error("응답 상태 코드:", error.response.status);
                console.error("응답 데이터:", error.response.data);
            }

            navigate("/login");
        });

    }, [navigate]);

    return <div>로그인 처리 중</div>;
};

export default KakaoCallback;
