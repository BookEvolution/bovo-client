//도서 상태 선택 후 기록 api
import api from "./Auth";

export const registerBook = async ({ book, selectedState }) => {
    if (!book || !selectedState) {
        console.error("도서 또는 상태 정보 확인 필요");
        return { success: false };
    }

    const authorsString = book.authors ? book.authors.join(", ") : "저자 정보 없음";

    const requestData = {
        isbn: book.isbn,
        book_name: book.title,
        book_author: authorsString,
        book_cover: book.thumbnail,
        publication_date: book.datetime ? String(book.datetime.split("T")[0]) : "0000-00-00",
        is_complete_reading: selectedState,
    };

    try {
        const response = await api.post("/save", requestData);
        return { success: true, data: response.data };
    } catch (error) {
        console.error("도서 등록 API 오류:", error);
        return { success: false, error };
    }
};
