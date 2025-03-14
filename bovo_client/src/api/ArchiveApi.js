import api from "./Auth.js";

export const archiveData = async ( ) => {
    try {
        const response = await api.get("/archive");
        console.log(response.data);     //데이터만 보여주기
        return response.data;
    } catch (error) {
        console.error("서재 데이터 불러오지 못함", error.response || error.message);
        throw error;
    }
};