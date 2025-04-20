//메인페이지 api
import api from "./Auth";

export const getMainData = async () => {
    try {
        const response = await api.get("/main");
        return { data: response.data, error: null };
    } catch (error) {
        console.error("메인 데이터 요청 실패:", error);
        return { data: null, error };
    }
};