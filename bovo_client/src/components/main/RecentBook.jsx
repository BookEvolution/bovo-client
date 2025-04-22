// 최근 등록된 '읽는 중'인 책을 보여주는 컴포넌트
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import AutoStoriesRoundedIcon from "@mui/icons-material/AutoStoriesRounded";
import PropTypes from "prop-types";

const RecentBook = ({ recent_book_info, navigate }) => {
    if (!recent_book_info) {
        return (
            <Box
                onClick={() => navigate("/search")}
                sx={{
                    position: "relative",
                    top: "23rem",
                    backgroundColor: "#fff",
                    padding: "1rem",
                    borderRadius: "1.5rem",
                    width: "35rem",
                    height: "20rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                }}
            >
                <Box sx={{ display: "flex", alignItems: "center", gap: "2rem" }}>
                    <Typography
                        sx={{
                            fontSize: "2.5rem",
                            fontWeight: "500",
                            color: "#7B7B7B",
                            marginLeft: "3rem",
                        }}
                    >
                        새로운 책 <br />
                        추가하러 가기
                    </Typography>
                    <Box
                        sx={{
                            backgroundColor: "#E7E7E7",
                            borderRadius: "100rem",
                            padding: "2.4rem",
                            marginLeft: "1.6rem",
                        }}
                    >
                        <AutoStoriesRoundedIcon sx={{ fontSize: "7rem", color: "#ffffff" }} />
                    </Box>
                </Box>
            </Box>
        );
    }

    const { bookName, bookAuthor, bookCover, readingStartDate, bookScore = 0 } = recent_book_info;

    return (
        <Box
            onClick={() => navigate("/archive")}
            sx={{
                position: "relative",
                top: "23rem",
                backgroundColor: "#fff",
                padding: "1rem",
                borderRadius: "1.5rem",
                width: "35rem",
                height: "20rem",
                display: "flex",
                alignItems: "center",
            }}
        >
            <Box sx={{ display: "flex", gap: 5, alignItems: "center" }}>
                <Box
                    sx={{
                        width: "12rem",
                        height: "16.5rem",
                        backgroundColor: "#D9D9D9",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: "0.8rem",
                        overflow: "hidden",
                        marginLeft: "1.4rem",
                    }}
                >
                    <img
                        src={bookCover}
                        alt="책 표지"
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                </Box>
                <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                    <Typography
                        sx={{
                            fontSize: "2.1rem",
                            fontWeight: "700",
                            maxWidth: "17rem",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            WebkitBoxOrient: "vertical",
                            WebkitLineClamp: 2,
                            display: "-webkit-box",
                            wordBreak: "break-word",
                            lineHeight: "2.5rem",
                            letterSpacing: "0.01rem",
                            marginLeft: "0.5rem",
                        }}
                    >
                        {bookName}
                    </Typography>
                    <Typography
                        sx={{
                            fontSize: "1.5rem",
                            color: "#6D6D6D",
                            marginTop: "0.8rem",
                            maxWidth: "16.4rem",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            WebkitBoxOrient: "vertical",
                            WebkitLineClamp: 1,
                            display: "-webkit-box",
                            wordBreak: "break-word",
                            marginLeft: "0.5rem",
                        }}
                    >
                        {bookAuthor}
                    </Typography>
                    <Typography sx={{ fontSize: "1.5rem", color: "#6D6D6D", marginTop: "0.5rem", maxWidth: "18rem" , marginLeft: "0.5rem",}}>
                        읽기 시작: {readingStartDate ? new Date(readingStartDate).toLocaleDateString() : "날짜 없음"}
                    </Typography>
                    <Box sx={{ marginTop: "0.5rem", display: "flex", alignItems: "center" }}>
                        <Rating
                            value={bookScore}
                            readOnly
                            precision={0.1}
                            icon={<StarRoundedIcon fontSize="inherit" sx={{ color: "#FFD700" }} />}
                            emptyIcon={<StarRoundedIcon fontSize="inherit" sx={{ color: "#E0E0E0" }} />}
                            sx={{
                                fontSize: "3.5rem",
                                "& .MuiRating-icon": {
                                    marginX: "-0.2rem",
                                },
                            }}
                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

RecentBook.propTypes = {
    recent_book_info: PropTypes.shape({
        bookName: PropTypes.string.isRequired,
        bookAuthor: PropTypes.string.isRequired,
        bookCover: PropTypes.string.isRequired,
        readingStartDate: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
        bookScore: PropTypes.number,
    }),
    navigate: PropTypes.func.isRequired,
};

export default RecentBook;
