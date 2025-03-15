import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "moment/locale/ko";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./Calendar.css";
import { Box, MenuItem, Select } from "@mui/material";
import { useEffect, useState } from "react";
import api from "../../api/Auth"; 

const localizer = momentLocalizer(moment);

const colors = ["#FFEA86", "#FFBD86", "#FF8686", "#EE7D99", "#9F68BD", "#609DE7", "#5FA8B2", "#68C691", "#A4E779"];

const getRandomColor = (bookName) => {
    const storedColors = JSON.parse(sessionStorage.getItem("bookColors")) || {};
    if (!storedColors[bookName]) {
        storedColors[bookName] = colors[Math.floor(Math.random() * colors.length)];
        sessionStorage.setItem("bookColors", JSON.stringify(storedColors));
    }
    return storedColors[bookName];
};

const SelectYearMonth = () => {
    const options = [];
    for (let year = 2025; year >= 2023; year--) {
        for (let month = 12; month >= 1; month--) {
            options.push({
                label: `${year}년 ${month}월`, 
                value: { year, month },
            });
        }
    }
    return options;
};

const yearMonthOptions = SelectYearMonth();

const MyCalendar = () => {
    const [date, setDate] = useState(new Date());
    const [events, setEvents] = useState([]);
    const [selectedYear, setSelectedYear] = useState(2025);
    const [selectedMonth, setSelectedMonth] = useState(3);

    const fetchEvents = async (year, month) => {
        try {
            const formattedMonth = String(month).padStart(2, "0"); 
            const response = await api.get(`/my-page/calendar?year=${year}&month=${formattedMonth}`);
    
            if (response.status === 200) {
                const bookCalendarList = response.data.book_calendar_list;
                let newEvents = [];
    
                Object.entries(bookCalendarList).forEach(([bookName, dateList]) => {
                    const color = getRandomColor(bookName);
    
                    let startDate = new Date(dateList[0]); 
                    let endDate = startDate;
    
                    for (let i = 1; i < dateList.length; i++) {
                        const currentDate = new Date(dateList[i]);

                        if ((endDate.getTime() + 86400000) === currentDate.getTime()) {
                            endDate = currentDate; 
                        } else {
                            newEvents.push({
                                title: bookName,
                                start: new Date(startDate),
                                end: new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate() + 1),
                                color: color,
                            });
    
                            startDate = currentDate;
                            endDate = currentDate;
                        }
                    }
    
                    newEvents.push({
                        title: bookName,
                        start: new Date(startDate),
                        end: new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate() + 1),
                        color: color,
                    });
                });
    
                setEvents(newEvents);
            }
        } catch (error) {
            console.error("캘린더 데이터 불러오기 실패:", error);
            setEvents([]); 
        }
    };
    

    useEffect(() => {
        fetchEvents(selectedYear, selectedMonth);
    }, [selectedYear, selectedMonth]);

    const handleDateChange = (event) => {
        const { year, month } = event.target.value;
        setSelectedYear(year);
        setSelectedMonth(month);
        setDate(new Date(year, month - 1, 1)); 
    };

    return (
        <Box className="calendar-container">
            <Box className="calendar-header" backgroundColor="#739CD4" padding="1.5rem" marginTop="1rem">
                <Select
                    value={yearMonthOptions.find(
                        (option) => option.value.year === selectedYear && option.value.month === selectedMonth
                    )?.value || ""}
                    onChange={handleDateChange}
                    variant="standard"
                    disableUnderline
                    sx={{
                        fontSize: "2.3rem",
                        fontWeight: 600,
                        minWidth: "10rem",
                        textAlign: "center",
                        color: "#ffffff",
                        "& .MuiSelect-select": {
                            padding: "0.5rem 1rem",
                            marginRight: "2rem",
                        },
                        "& .MuiSvgIcon-root": {
                            color: "#ffffff",
                            fontSize: "3rem",
                        },
                    }}
                    MenuProps={{
                        PaperProps: {
                            style: {
                                maxHeight: 400,
                                overflowY: "auto",
                            },
                        },
                    }}
                >
                    {yearMonthOptions.map((option) => (
                        <MenuItem
                            key={option.label}
                            value={option.value}
                            sx={{
                                fontSize: "1.8rem",
                                fontWeight: 400,
                                padding: "1rem 3rem",
                            }}
                        >
                            {option.label}
                        </MenuItem>
                    ))}
                </Select>
            </Box>
            <Box>
                <Calendar
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    views={["month"]}
                    date={date}
                    onNavigate={(newDate) => setDate(newDate)}
                    eventPropGetter={(event) => ({
                        style: {
                            backgroundColor: event.color,
                            color: "white",
                            borderRadius: "4px",
                            padding: "5px",
                            fontSize: "0.85rem",
                            border: "none",
                        },
                    })}
                    components={{
                        toolbar: () => null,
                    }}
                    style={{ height: "66rem" , marginTop:"2rem"}}
                    formats={{
                        weekdayFormat: (date, locale, localizer) =>
                            localizer.format(date, "ddd", locale), 
                    }}
                />
            </Box>
        </Box>
    );
};

export default MyCalendar;
