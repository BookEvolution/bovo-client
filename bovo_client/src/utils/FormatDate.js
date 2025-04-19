export const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const today = new Date();

    const todayYear = today.getFullYear();
    const todayMonth = today.getMonth();
    const todayDate = today.getDate();

    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();

    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const period = hours >= 12 ? "오후" : "오전";
    hours = hours % 12 || 12;

    if (todayYear === year && todayMonth === month && todayDate === day) {
        return `${period} ${hours}:${minutes}`;
    } else {
        return `${year}.${String(month + 1).padStart(2, "0")}.${String(day).padStart(2, "0")}`;
    }
};