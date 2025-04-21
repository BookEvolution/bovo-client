import axios from "axios";
import { disableInterceptor, enableInterceptor, setAccessToken } from "./Auth";

const API_URL = import.meta.env.VITE_BACKEND_API_URL;

export const loginUser = async (email, password) => {
    disableInterceptor();
    try {
        const response = await axios.post(
            `${API_URL}/login`,
            { email, password },
            {
                withCredentials: true,
                headers: { "Content-Type": "application/json" },
            }
        );

        const accessToken = response.data.accessToken;
        if (accessToken) {
            sessionStorage.setItem("accessToken", accessToken);
            setAccessToken(accessToken);
            sessionStorage.setItem("userEmail", email);
        }

        return response.status;
    } finally {
        enableInterceptor();
    }
};

export const kakaoLogin = async (authCode) => {
    disableInterceptor();
    try {
        const response = await axios.post(
            `${API_URL}/kakao/login`,
            { authCode },
            {
                withCredentials: true,
                headers: { "Content-Type": "application/json" },
            }
        );

        return response;
    } finally {
        enableInterceptor();
    }
};
