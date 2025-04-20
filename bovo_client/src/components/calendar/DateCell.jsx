import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { getSessionColor } from "../../utils/CalendarColorUtils";

const DateCell = ({ day, todayBg = "#fff", books = [], onClick, isSixRows, isCurrentMonth = true, dayOfWeek }) => {
    const maxVisibleBooks = isSixRows ? 2 : 3;
    const visibleBooks = books.slice(0, maxVisibleBooks);
    const hiddenBooksCount = books.length - maxVisibleBooks;

    const getDayColor = () => {
        if (!isCurrentMonth) return "#ccc";
        if (dayOfWeek === 0) return "#EA2424"; 
        if (dayOfWeek === 6) return "#2E50DA"; 
        return "#000"; 
    };

    return (
        <Box
            onClick={isCurrentMonth ? onClick : undefined}
            sx={{
                width: "100%",
                height: isSixRows ? "10rem" : "12rem",
                backgroundColor: todayBg,
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                paddingTop: "0.5rem",
                overflow: "hidden",
                position: "relative",
            }}
        >
            {day && (
                <Typography sx={{ fontSize: "1.6rem", fontWeight: 500, color: getDayColor() }}>
                    {day}
                </Typography>
            )}
            {visibleBooks.map((book, idx) => (
                <Box
                    key={idx}
                    sx={{
                        position: "absolute",
                        top: `${3.4 + idx * 2.2}rem`,
                        left: "50%",
                        transform: "translateX(-50%)",
                        width: "85%",
                        height: "1.8rem",
                        backgroundColor: getSessionColor(book.title),
                        borderRadius: "0.2rem",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        padding: "0 0.2rem",
                    }}
                >
                    <Typography
                        sx={{
                            color: "#fff",
                            fontSize: "1.1rem",
                            fontWeight: 600,
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            width: "100%",
                        }}
                    >
                        {book.title}
                    </Typography>
                </Box>
            ))}
            {hiddenBooksCount > 0 && (
                <Typography
                    sx={{
                        position: "absolute",
                        top: `${3.4 + visibleBooks.length * 2.2}rem`,
                        left: "50%",
                        transform: "translateX(-50%)",
                        fontSize: "1.1rem",
                        fontWeight: 600,
                        color: "#739CD4",
                    }}
                >
                    +{hiddenBooksCount} more
                </Typography>
            )}
        </Box>
    );
};

DateCell.propTypes = {
    day: PropTypes.number,
    todayBg: PropTypes.string,
    books: PropTypes.array,
    onClick: PropTypes.func,
    isSixRows: PropTypes.bool,
    isCurrentMonth: PropTypes.bool,
    dayOfWeek: PropTypes.number, 
};

export default DateCell;
