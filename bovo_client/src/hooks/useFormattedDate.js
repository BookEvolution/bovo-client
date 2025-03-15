import { useState, useEffect } from "react";

// 날짜 포맷을 원하는 형태로 변환하는 함수
const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const today = new Date();

    // 오늘 날짜의 년, 월, 일
    const todayYear = today.getFullYear();
    const todayMonth = today.getMonth();
    const todayDate = today.getDate();

    // 날짜의 년, 월, 일
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();

    // 시간은 AM/PM 형태로 변환
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const period = hours >= 12 ? '오후' : '오전'; // 오전/오후 구분
    hours = hours % 12 || 12; // 12시간제 시간으로 변환 (0시 -> 12시로 변환)

    // 오늘 날짜와 비교하여 동일하면 시간만 반환하고 다르면 날짜만 반환
    if (todayYear === year && todayMonth === month && todayDate === day) {
        return `${period} ${hours}:${minutes}`;  // 오늘이면 시간만 반환
    } else {
        return `${year}.${String(month + 1).padStart(2, '0')}.${String(day).padStart(2, '0')}`;  // 오늘이 아니면 날짜만 반환
    }
};

const useFormattedDate = (timestamp) => {
    const [formattedDateOrTime, setFormattedDateOrTime] = useState("");

    useEffect(() => {
        const formatted = formatDate(timestamp);
        setFormattedDateOrTime(formatted);
    }, [timestamp]);

    return formattedDateOrTime;
};

export default useFormattedDate;