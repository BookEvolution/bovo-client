// import axios from "axios";

// let requestInterceptor = null;  // 인터셉터를 저장할 변수

// const api = axios.create({
//   baseURL: "https://your-api.com",
//   withCredentials: true, // 쿠키에 있는 refreshToken을 보내기 위해 필요
// });

// // ✅ accessToken과 만료 시간을 저장하는 함수
// const setAccessToken = (token, expiresIn = 3600) => {
//     const bufferTime = 5 * 60 * 1000; // 5분 미리 갱신
//     sessionStorage.setItem("accessToken", token);
//     sessionStorage.setItem("tokenExpiry", Date.now() + expiresIn * 1000 - bufferTime); // 만료 시간 저장
// };

// // ✅ accessToken이 만료되었는지 확인하는 함수
// const isAccessTokenExpired = () => {
//   const expiry = sessionStorage.getItem("tokenExpiry");
//   return expiry ? Date.now() > expiry : true;
// };

// // ✅ 요청 인터셉터 (accessToken 자동 추가 + ngrok 예외처리)
// api.interceptors.request.use(
//   async (config) => {
//     let token = sessionStorage.getItem("accessToken");

//     // 🔥 accessToken이 만료되었으면 갱신 시도
//     if (!token || isAccessTokenExpired()) {
//       try {
//         const res = await api.post("/refresh"); // refreshToken을 통해 새로운 accessToken 요청
//         if (res.status === 200) {
//           token = res.data.accessToken;
//           setAccessToken(token, res.data.expiresIn); // 새로운 토큰과 만료 시간 저장
//         }
//       } catch (error) {
//         console.error("토큰 갱신 실패. 다시 로그인 필요");
//         sessionStorage.removeItem("accessToken");
//         window.location.href = "/login"; // 로그인 화면으로 이동
//         return Promise.reject(error); // 토큰 갱신 실패 시 더 이상 진행되지 않도록 처리
//       }
//     }

//     // Authorization 헤더에 토큰 추가
//     config.headers["Authorization"] = `Bearer ${token}`;

//     // GET 요청에만 ngrok 헤더 추가
//     if (config.method === "get") {
//       config.headers["ngrok-skip-browser-warning"] = "69420";
//     }

//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// // 인터셉터를 꺼두는 함수
// export const disableInterceptor = () => {
//     if (requestInterceptor !== null) {
//         api.interceptors.request.eject(requestInterceptor);
//         requestInterceptor = null;
//     }
// };

// // 인터셉터를 다시 활성화하는 함수
// export const enableInterceptor = () => {
//     if (requestInterceptor === null) {
//         setupInterceptor();
//     }
// };

// export default api;