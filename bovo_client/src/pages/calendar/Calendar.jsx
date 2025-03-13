import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "moment/locale/ko";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./Calendar.css";
import { Box, MenuItem, Select } from "@mui/material";
import { useEffect, useState } from "react";

moment.locale("ko");
const localizer = momentLocalizer(moment);

const adjustEvents = (events) => {
    return events.map(event => ({
        ...event,
        end: new Date(event.end.getFullYear(), event.end.getMonth(), event.end.getDate() + 1) 
    }));
};
//임의 설정
const events = adjustEvents([
    { title: "해리 포터와 비밀의 방 1", start: new Date(2025, 2, 5), end: new Date(2025, 2, 10), color: "#000000" },
    { title: "해리 포터와 마법사의 돌 1", start: new Date(2025, 2, 28), end: new Date(2025, 3, 1), color: "#8B0000" },
    { title: "해리 포터와 불의 잔 1", start: new Date(2025, 2, 10), end: new Date(2025, 2, 12), color: "#1E3A8A" },
    { title: "해리 포터와 혼혈 왕자 1", start: new Date(2025, 2, 20), end: new Date(2025, 2, 24), color: "#c4a484" },
]);

const SelectYearMonth = () => {
    const options = [];
    for (let year = 2025; year >= 2023; year--) {
        for (let month = 11; month >= 0; month--) {
            options.push({
                label: `${year}년 ${month + 1}월`, 
                value: { year, month: month }, 
            });
        }
    }
    return options;
};

const yearMonthOptions = SelectYearMonth();

const MyCalendar = () => {
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        console.log("현재 선택된 날짜:", date);
    }, [date]);

    const eventStyleGetter = (event) => {
        return {
            style: {
                backgroundColor: event.color,
                color: "white",
                borderRadius: "4px",
                padding: "5px",
                fontSize: "0.85rem",
                border: "none",
            },
        };
    };

    const handleDateChange = (event) => {
        const { year, month } = event.target.value;
        const newDate = new Date(year, month, 1);
        setDate(newDate);
        console.log("업데이트된 날짜:", newDate);
    };

    return (
        <Box className="calendar-container">
            <Box className="calendar-header" backgroundColor="#739CD4" padding="1.5rem" marginTop="1rem">
                <Select
                    value={yearMonthOptions.find(
                        (option) => option.value.year === moment(date).year() && option.value.month === moment(date).month()
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
                    eventPropGetter={eventStyleGetter}
                    components={{
                        toolbar: () => null,
                    }}
                    style={{ height: "66rem" }}
                    formats={{
                        weekdayFormat: (date, locale, localizer) =>
                            localizer.format(date, "dddd", locale), 
                    }}
                    locale="ko"
                />
            </Box>
        </Box>
    );
};

export default MyCalendar;
