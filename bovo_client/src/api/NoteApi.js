import axios from "axios";

const API_URL = "https://eb77-2406-5900-902b-8631-6d33-afad-ed06-8ac3.ngrok-free.app";


/** 기록 페이지 */
export const noteData = async (bookId) => {
    //const token = sessionStorage.getItem("AccessToken");

    if (!bookId) {
        console.error("book_id가 필요합니다.");
        return;
    }
    try {

        const response = await axios.get(`${API_URL}/archive/1`, {
            headers: {
                "Content-Type": "application/json",
                "ngrok-skip-browser-warning": "69420",
                Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyaWQiOjcsImlhdCI6MTc0MTc2ODIxMywiZXhwIjoxNzQxNzcxODEzfQ.2vrG-8X45cc19OgMVc_ZfLLbg5Xd3FHurw9uCQXJt_Q"
            },
            withCredentials: true 
        });

        console.log(response.data); // 데이터만 보여주기
        return response.data;
    } catch (error) {
        console.error("기록 페이지 에러", error.response || error.message);
        throw error;
    }
};