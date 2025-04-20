//캘린더 훅
import { useEffect, useState } from "react";
import { fetchCalendarEvents } from "../api/Calendar";
import { getSessionColor } from "../utils/BookColorUtils";

const useCalendarEvents = (selectedYear, selectedMonth) => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
            const { data } = await fetchCalendarEvents(selectedYear, selectedMonth);
            if (!data) return setEvents([]);

            const newEvents = [];
            
            Object.entries(data).forEach(([bookName, dateList]) => {
                const color = getSessionColor(bookName);

                let startDate = new Date(dateList[0]);
                let endDate = startDate;

                for (let i = 1; i < dateList.length; i++) {
                    const currentDate = new Date(dateList[i]);
                    if ((endDate.getTime() + 86400000) === currentDate.getTime()) {
                        endDate = currentDate;
                    } else {
                        newEvents.push({
                            title: bookName,
                            start: startDate,
                            end: new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate() + 1),
                            color,
                        });
                        startDate = currentDate;
                        endDate = currentDate;
                    }
                }

                newEvents.push({
                    title: bookName,
                    start: startDate,
                    end: new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate() + 1),
                    color,
                });
            });

            setEvents(newEvents);
        };

        fetchEvents();
    }, [selectedYear, selectedMonth]);

    return events;
};

export default useCalendarEvents;
