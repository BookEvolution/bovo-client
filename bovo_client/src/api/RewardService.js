import api from "./Auth";

export const fetchRewards = async () => {
    try {
        const response = await api.get("/rewards");
        return response.data;
    } catch (error) {
        console.error("퀘스트 데이터를 불러오는 중 오류 발생:", error);
        return null;
    }
};

// 경험치 증가 요청 함수
export const increaseExp = async (missionId) => {
    try {
        const response = await api.post("/rewards/exp-increase", { mission_id: missionId });
        return response.data;
    } catch (error) {
        console.error('Error increasing experience:', error);
        throw error;
    }
};