import { useQuery } from "@tanstack/react-query";
import api from "./Auth";

const fetchRewards = async () => {
    try {
        const response = await api.get("/rewards");
        return response.data;
    } catch (error) {
        console.error("퀘스트 데이터를 불러오는 중 오류 발생:", error);
        return null;
    }
};

// React Query로 퀘스트 데이터 가져오기
export const useRewardsQuery = () => {
    return useQuery({
        queryKey: ['rewards'],  // 데이터의 고유한 키
        queryFn: fetchRewards,  // API 요청 함수
    });
}

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