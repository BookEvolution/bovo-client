const CLIENT_ID = import.meta.env.VITE_KAKAO_LOGIN_API_KEY;
const REDIRECT_URI = import.meta.env.VITE_KAKAO_REDIRECT_URI;

export const getKakaoAuthUrl = () => {
    return `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;
};
