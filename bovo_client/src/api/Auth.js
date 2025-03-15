import axios from "axios";

let requestInterceptor = null; // 인터셉터 저장 변수
let onUnauthorizedCallback = null; // 콜백 저장

const api = axios.create({
  baseURL: "https://c374-112-158-33-80.ngrok-free.app",
  withCredentials: true, // 쿠키 포함
});

// ✅ accessToken과 만료 시간을 저장하는 함수
const setAccessToken = (token, expiresIn = 3600) => {
    const bufferTime = 5 * 60 * 1000; // 5분 미리 갱신
    sessionStorage.setItem("accessToken", token);
    sessionStorage.setItem("tokenExpiry", Date.now() + expiresIn * 1000 - bufferTime); // 만료 시간 저장
};

// ✅ accessToken이 만료되었는지 확인하는 함수
const isAccessTokenExpired = () => {
  const expiry = sessionStorage.getItem("tokenExpiry");
  return expiry ? Date.now() > expiry : true;
};

// ✅ 요청 인터셉터를 설정하는 함수
const setupInterceptor = (onUnauthorized) => {
    if (requestInterceptor !== null) return; // 이미 설정되어 있으면 중복 추가 방지

    onUnauthorizedCallback = onUnauthorized; // 콜백 저장

    requestInterceptor = api.interceptors.request.use(
        async (config) => {
            let token = sessionStorage.getItem("accessToken");

            // 🔥 accessToken이 만료되었으면 갱신 시도
            if (!token || isAccessTokenExpired()) {
                try {
                    const res = await api.post("/refresh");
                    if (res.status === 200) {
                        token = res.data.accessToken;
                        setAccessToken(token);
                    }
                } catch (error) {
                    console.error("토큰 갱신 실패. 다시 로그인 필요");
                    sessionStorage.removeItem("accessToken");
                    if (onUnauthorized) onUnauthorized(); // 콜백 호출 (리다이렉트 처리)
                    return Promise.reject(error);
                }
            }

            // Authorization 헤더 추가
            config.headers["Authorization"] = `Bearer ${token}`;

            // GET 요청에만 ngrok 헤더 추가
            if (config.method === "get") {
                config.headers["ngrok-skip-browser-warning"] = "69420";
            }

            return config;
        },
        (error) => Promise.reject(error)
    );
};

// ✅ 인터셉터를 비활성화하는 함수
export const disableInterceptor = () => {
    if (requestInterceptor !== null) {
        api.interceptors.request.eject(requestInterceptor);
        requestInterceptor = null;
    }
};

// ✅ 인터셉터를 다시 활성화하는 함수
export const enableInterceptor = (onUnauthorized) => {
    setupInterceptor(onUnauthorized);
};

// 새로고침 시 헤더 설정을 다시 적용하는 함수
const applyDefaultHeaders = () => {
    const token = sessionStorage.getItem("accessToken");
    if (token) {
        api.defaults.headers["Authorization"] = `Bearer ${token}`;
    }
};

// 새로고침 후 헤더를 다시 설정
applyDefaultHeaders();

// ✅ 초기 인터셉터 설정
setupInterceptor();

export { setAccessToken, isAccessTokenExpired };
export default api;