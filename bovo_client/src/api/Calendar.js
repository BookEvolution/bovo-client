//캘린더 api
import api from "./Auth";

export const fetchCalendarEvents = async (year, month) => {
    try {
        const formattedMonth = String(month).padStart(2, "0");
        const response = await api.get(`/my-page/calendar?year=${year}&month=${formattedMonth}`);

        if (response.status === 200) {
            return { data: response.data.book_calendar_list, error: null };
        }
    } catch (error) {
        console.error("캘린더 데이터 불러오기 실패:", error);
        return { data: null, error };
    }
};


// // 캘린더 API - 백엔드 수정되면 이거 사용하기
// import api from "./Auth";

// export const fetchCalendarEvents = async (year, month) => {
//     try {
//         const formattedMonth = String(month).padStart(2, "0");
//         const response = await api.get(`/my-page/calendar?year=${year}&month=${formattedMonth}`);

//         if (response.status === 200) {
//             const transformed = {};

//             response.data.book_calendar_list.forEach(({ date, books }) => {
//                 transformed[date] = books.map(book => ({
//                     thumbnail: book.thumbnail, 
//                     title: book.title, 
//                     book_id: book.book_id,
//                     author: book.author,  
//                     reading_status: book.reading_status, 
//                 }));
//             });

//             return { data: transformed, error: null };
//         }
//     } catch (error) {
//         console.error("캘린더 데이터 불러오기 실패:", error);
//         return { data: null, error };
//     }
// };
