import axios from "axios";
import { disableInterceptor, enableInterceptor } from "./Auth";

const API_URL = import.meta.env.VITE_BACKEND_API_URL;

// 닉네임 중복 확인
export const checkNickname = async (nickname) => {
    const response = await axios.post(`${API_URL}/register/nickname`, { nickname });
    return response;
};

// 이메일 중복 확인
export const checkEmail = async (email) => {
    const response = await axios.post(`${API_URL}/register/email`, { email });
    return response;
};

// 일반 회원가입
export const registerUser = async (email, password, nickname, profileImage) => {
    const response = await axios.post(`${API_URL}/register`, {
        email,
        password,
        nickname,
        profile_picture: profileImage,
    });
    return response;
};

// 카카오 회원가입
export const registerKakaoUser = async (email, nickname, profileImage) => {
    disableInterceptor();
    try {
        const token = sessionStorage.getItem("AccessToken");
        const response = await axios.post(
            `${API_URL}/kakao/register`,
            { email, nickname, profile_picture: profileImage },
            {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                    "ngrok-skip-browser-warning": "69420",
                },
            }
        );
        return response;
    } finally {
        enableInterceptor();
    }
};
