import axios from "axios";

const API_URL = "https://eb77-2406-5900-902b-8631-6d33-afad-ed06-8ac3.ngrok-free.app";
const token = "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyaWQiOjcsImlhdCI6MTc0MTc4NjYyOSwiZXhwIjoxNzQxNzkwMjI5fQ.wlfHx69ZznJLxNGppCJ077M3G3l_5qGALp15l-XcSTg";

/** 기록 페이지 */
export const noteData = async (bookId) => {
    //const token = sessionStorage.getItem("AccessToken");

    if (!bookId) {
        console.error("book_id가 필요합니다.");
        return;
    }
    try {

        const response = await axios.get(`${API_URL}/archive/${bookId}`, {
            headers: {
                "Content-Type": "application/json",
                "ngrok-skip-browser-warning": "69420",
                Authorization: `Bearer ${token}`
            },
            withCredentials: true 
        });

        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("기록 페이지 에러", error.response || error.message);
        throw error;
    }
};

/** 기록 상세보기 */
export const noteDetailData = async (bookId, memoId) => {
    console.log("전달된 bookId:", bookId);
    console.log("전달된 memoId:", memoId);
    console.log(`요청 경로: ${API_URL}/archive/${bookId}/memo?memoId=${memoId}`);

    if (!bookId || !memoId) {
        console.error("book_id와 memo_id가 필요합니다.", { bookId, memoId });
        return;
    }

    try {
        const response = await axios.get(`${API_URL}/archive/${bookId}/memo?memoId=${memoId}`, {
            headers: {
                "Content-Type": "application/json",
                "ngrok-skip-browser-warning": "69420",
                Authorization: `Bearer ${token}`
            },
            withCredentials: true 
        });

        console.log("API 응답:", response.data);
        return response.data;
    } catch (error) {
        console.error("기록 상세보기 API 요청 실패:", error.response?.data || error.message);
        throw error;
    }
};


/** 기록 모아보기 */
export const noteCombineData = async (bookId) => {
    //const token = sessionStorage.getItem("AccessToken");

    if (!bookId) {
        console.error("book_id가 필요합니다.");
        return;
    }
    try {
        const response = await axios.get(`${API_URL}/archive/${bookId}/memos`, {
            headers: {
                "Content-Type": "application/json",
                "ngrok-skip-browser-warning": "69420",
                Authorization: `Bearer ${token}`
            },
            withCredentials: true 
        });

        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("기록 모아보기 페이지 에러", error.response || error.message);
        throw error;
    }
};