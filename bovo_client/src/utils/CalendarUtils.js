export const getDateKey = (year, month, date) => {
    return `${year}-${(month + 1).toString().padStart(2, "0")}-${date.toString().padStart(2, "0")}`;
};

export const isToday = (today, year, month, date) => {
    return today.getFullYear() === year && today.getMonth() === month && today.getDate() === date;
};

export const generateCalendarMeta = ({ today, selectedYearMonth, firstDayIndex, daysInMonth, totalCells }) => {
    const meta = [];
    const prevMonthDays = new Date(selectedYearMonth.year, selectedYearMonth.month, 0).getDate();

    // 이전 달
    for (let i = firstDayIndex - 1; i >= 0; i--) {
        meta.push({
            key: `prev-${i}`,
            day: prevMonthDays - i,
            isCurrentMonth: false,
            isToday: false,
            dayOfWeek: (7 + (i % 7)) % 7,
        });
    }

    // 이번 달
    for (let day = 1; day <= daysInMonth; day++) {
        meta.push({
            key: day,
            day: day,
            isCurrentMonth: true,
            isToday: isToday(today, selectedYearMonth.year, selectedYearMonth.month, day),
            dayOfWeek: (firstDayIndex + day - 1) % 7,
        });
    }

    // 다음 달
    const nextCells = totalCells % 7 === 0 ? 0 : 7 - (totalCells % 7);
    for (let i = 1; i <= nextCells; i++) {
        meta.push({
            key: `next-${i}`,
            day: i,
            isCurrentMonth: false,
            isToday: false,
            dayOfWeek: (firstDayIndex + daysInMonth + i - 1) % 7,
        });
    }

    return meta;
};
