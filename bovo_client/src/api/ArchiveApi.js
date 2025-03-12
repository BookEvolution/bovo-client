import axios from "axios";

const API_URL = "";

export const archiveData = async ( ) => {
    const token = sessionStorage.getItem("AccessToken");
    try {
        const response = await axios.get(`${API_URL}/archive`, {
            headers: {
                "Content-Type": "application/json",
                "ngrok-skip-browser-warning": "69420",
                Authorization: `Bearer ${token}`
            },
            withCredentials: true 
        });
        console.log(response.data);     //데이터만 보여주기
        return response.data;
    } catch (error) {
        console.error("서재 데이터 불러오지 못함", error.response || error.message);
        throw error;
    }
};