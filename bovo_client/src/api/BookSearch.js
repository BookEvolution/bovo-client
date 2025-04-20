//도서 검색 api
import api from "./Auth";

export const BookSearch = async (query, sort = "accuracy", page = 1, size = 20) => {
    try {
        const response = await api.get(
            `/search?query=${encodeURIComponent(query)}&sort=${sort}&size=${size}&page=${page}`
        );

        if (response.data && response.data.documents) {
            return { data: response.data.documents, error: null };
        } else {
            console.error("잘못된 API 응답 형식:", response.data);
            return { data: [], error: new Error("잘못된 API 응답") };
        }
    } catch (error) {
        console.error("도서 검색 API 오류:", error);
        return { data: [], error };
    }
};