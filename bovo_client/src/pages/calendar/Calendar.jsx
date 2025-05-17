// import { useState, useEffect } from "react";
// import Box from "@mui/material/Box";
// import Typography from "@mui/material/Typography";
// import { useNavigate } from "react-router-dom";
// import { fetchCalendarEvents } from "../../api/Calendar";
// import { getDateKey, generateCalendarMeta } from "../../utils/CalendarUtils";
// import DateCell from "../../components/calendar/DateCell";
// import Dropdown from "../../components/calendar/Dropdown";
// import CalendarModal from "../../components/calendar/CalendarModal";

// const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];

// const MyCalendar = () => {
//     const today = new Date();
//     const navigate = useNavigate();

//     const [selectedYearMonth, setSelectedYearMonth] = useState({
//         year: today.getFullYear(),
//         month: today.getMonth(),
//     });
//     const [selectedDate, setSelectedDate] = useState(null);
//     const [modalOpen, setModalOpen] = useState(false);
//     const [calendarData, setCalendarData] = useState({});
//     const [selectedBook, setSelectedBook] = useState(null);

//     const firstDayIndex = new Date(selectedYearMonth.year, selectedYearMonth.month, 1).getDay();
//     const daysInMonth = new Date(selectedYearMonth.year, selectedYearMonth.month + 1, 0).getDate();
//     const totalCells = firstDayIndex + daysInMonth;
//     const isSixRows = totalCells > 35;

//     useEffect(() => {
//         const fetchData = async () => {
//             const { data } = await fetchCalendarEvents(selectedYearMonth.year, selectedYearMonth.month + 1);
//             if (data) {
//                 const transformedData = {};
//                 Object.entries(data).forEach(([date, bookList]) => {
//                     transformedData[date] = bookList;
//                 });
//                 setCalendarData(transformedData);
//             }
//         };
//         fetchData();
//     }, [selectedYearMonth]);

//     const handleDateClick = (day) => {
//         setSelectedDate(day);
//         setModalOpen(true);
//         setSelectedBook(null);
//     };

//     const closeModal = () => {
//         setModalOpen(false);
//         setSelectedDate(null);
//         setSelectedBook(null);
//     };

//     const handleMoveToRecord = () => {
//         if (!selectedBook) return;
//         navigate(`/main/archive/${selectedBook.book_id}`);
//     };

//     const selectedDateKey = selectedDate !== null
//         ? getDateKey(selectedYearMonth.year, selectedYearMonth.month, selectedDate)
//         : null;

//     const calendarMeta = generateCalendarMeta({
//         today,
//         selectedYearMonth,
//         firstDayIndex,
//         daysInMonth,
//         totalCells,
//     });

//     return (
//         <Box sx={{ maxWidth: "43rem", margin: "auto" }}>
//             <Dropdown selectedYearMonth={selectedYearMonth} setSelectedYearMonth={setSelectedYearMonth} />

//             <Box sx={{ width: "100%", backgroundColor: "#fff" }}>
//                 <Box
//                     sx={{
//                         display: "grid",
//                         gridTemplateColumns: "repeat(7, 1fr)",
//                         textAlign: "center",
//                         mb: 1.6,
//                     }}
//                 >
//                     {daysOfWeek.map((day, idx) => (
//                         <Typography
//                             key={day}
//                             sx={{
//                                 fontSize: "1.6rem",
//                                 fontWeight: "600",
//                                 color: idx === 0 ? "#EA2424" : idx === 6 ? "#2E50DA" : "#000",
//                             }}
//                         >
//                             {day}
//                         </Typography>
//                     ))}
//                 </Box>

//                 <Box sx={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", justifyItems: "center", alignItems: "start" }}>
//                     {calendarMeta.map(({ key, day, isCurrentMonth, isToday, dayOfWeek }) => {
//                         const dateKey = getDateKey(selectedYearMonth.year, selectedYearMonth.month, day);
//                         return (
//                             <DateCell
//                                 key={key}
//                                 day={day}
//                                 books={calendarData[dateKey] || []}
//                                 todayBg={isToday ? "#E0F2FF" : "#fff"}
//                                 onClick={isCurrentMonth ? () => handleDateClick(day) : undefined}
//                                 isCurrentMonth={isCurrentMonth}
//                                 isSixRows={isSixRows}
//                                 dayOfWeek={dayOfWeek}
//                             />
//                         );
//                     })}
//                 </Box>
//             </Box>

//             <CalendarModal
//                 modalOpen={modalOpen}
//                 closeModal={closeModal}
//                 selectedDateKey={selectedDateKey}
//                 calendarData={calendarData}
//                 selectedBook={selectedBook}
//                 setSelectedBook={setSelectedBook}
//                 handleMoveToRecord={handleMoveToRecord}
//             />
//         </Box>
//     );
// };

// export default MyCalendar;


// 임시 데이터 확인용 코드 (데이터 개별로 바 생성)
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { getDateKey, generateCalendarMeta } from "../../utils/CalendarUtils";
import DateCell from "../../components/calendar/DateCell";
import Dropdown from "../../components/calendar/Dropdown";
import CalendarModal from "../../components/calendar/CalendarModal";

const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];

const MyCalendar = () => {
    const today = new Date();
    const navigate = useNavigate();

    const [selectedYearMonth, setSelectedYearMonth] = useState({
        year: today.getFullYear(),
        month: today.getMonth(),
    });
    const [selectedDate, setSelectedDate] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [calendarData, setCalendarData] = useState({});
    const [selectedBook, setSelectedBook] = useState(null);

    const firstDayIndex = new Date(selectedYearMonth.year, selectedYearMonth.month, 1).getDay();
    const daysInMonth = new Date(selectedYearMonth.year, selectedYearMonth.month + 1, 0).getDate();
    const totalCells = firstDayIndex + daysInMonth;
    const isSixRows = totalCells > 35;

    useEffect(() => {
        const fetchData = async () => {
        // 임시 표시용 데이터
        const dummyData = {
            "2025-04-19": [
            { title: "정재승의 과학 콘서트", book_id: 139 },
            { title: "독서의 뇌과학", book_id: 133 },
            ],
            "2025-04-20": [
            { title: "정재승의 과학 콘서트", book_id: 139 },
            { title: "종의 기원", book_id: 132 },
            { title: "떨림과 울림", book_id: 148 },
            { title: "부분과 전체", book_id: 144 },
            ],
            "2025-04-21": [
            { title: "정재승의 과학 콘서트", book_id: 139 },
            { title: "100가지 식물로 읽는 세계사", book_id: 147 },
            { title: "결정력 수업", book_id: 141 },
            { title: "모든 계절의 물리학", book_id: 123 },
            { title: "갈 수 없지만 알 수 있는", book_id: 140 },
            ],
        };

        setCalendarData(dummyData);
        };

        fetchData();
    }, [selectedYearMonth]);

    const handleDateClick = (day) => {
        setSelectedDate(day);
        setModalOpen(true);
        setSelectedBook(null);
    };

    const closeModal = () => {
        setModalOpen(false);
        setSelectedDate(null);
        setSelectedBook(null);
    };

    const handleMoveToRecord = () => {
        if (!selectedBook) return;
        navigate(`/main/archive/${selectedBook.book_id}`);
    };

    const selectedDateKey = selectedDate !== null
        ? getDateKey(selectedYearMonth.year, selectedYearMonth.month, selectedDate)
        : null;

    const calendarMeta = generateCalendarMeta({
        today,
        selectedYearMonth,
        firstDayIndex,
        daysInMonth,
        totalCells,
    });

    return (
        <Box sx={{ maxWidth: "43rem", margin: "auto" }}>
        <Dropdown selectedYearMonth={selectedYearMonth} setSelectedYearMonth={setSelectedYearMonth} />

        <Box sx={{ width: "100%", backgroundColor: "#fff" }}>
            <Box
            sx={{
                display: "grid",
                gridTemplateColumns: "repeat(7, 1fr)",
                textAlign: "center",
                mb: 1.6,
            }}
            >
            {daysOfWeek.map((day, idx) => (
                <Typography
                key={day}
                sx={{
                    fontSize: "1.6rem",
                    fontWeight: "600",
                    color: idx === 0 ? "#EA2424" : idx === 6 ? "#2E50DA" : "#000",
                }}
                >
                {day}
                </Typography>
            ))}
            </Box>

            <Box sx={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", justifyItems: "center", alignItems: "start" }}>
            {calendarMeta.map(({ key, day, isCurrentMonth, isToday, dayOfWeek }) => {
                const dateKey = getDateKey(selectedYearMonth.year, selectedYearMonth.month, day);
                return (
                <DateCell
                    key={key}
                    day={day}
                    books={calendarData[dateKey] || []}
                    todayBg={isToday ? "#E0F2FF" : "#fff"}
                    onClick={isCurrentMonth ? () => handleDateClick(day) : undefined}
                    isCurrentMonth={isCurrentMonth}
                    isSixRows={isSixRows}
                    dayOfWeek={dayOfWeek}
                />
                );
            })}
            </Box>
        </Box>

        <CalendarModal
            modalOpen={modalOpen}
            closeModal={closeModal}
            selectedDateKey={selectedDateKey}
            calendarData={calendarData}
            selectedBook={selectedBook}
            setSelectedBook={setSelectedBook}
            handleMoveToRecord={handleMoveToRecord}
        />
        </Box>
    );
};

export default MyCalendar;