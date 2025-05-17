// 책 검색 결과 리스트 
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ImageNotSupportedRoundedIcon from "@mui/icons-material/ImageNotSupportedRounded";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const BookList = ({ books, searchTerm, fetchMoreBooks, hasMore }) => {
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                maxHeight: "65rem",
                overflowY: "auto",
                "&::-webkit-scrollbar": { display: "none" },
            }}
        >
            {books.length === 0 && searchTerm.trim() ? (
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "50vh",
                    }}
                >
                    <Typography sx={{ fontSize: "2.7rem", fontWeight: "500" }}>
                        검색 결과가 없습니다
                    </Typography>
                </Box>
            ) : (
                <Box>
                    <Box
                        sx={{
                            display: "grid",
                            gridTemplateColumns: "repeat(3, 1fr)",
                            gap: "2rem",
                            width: "90%",
                            justifyContent: "center",
                            marginLeft: "1.8rem",
                        }}
                    >
                        {books.map((book, index) => (
                            <Box
                                key={index}
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    cursor: "pointer",
                                }}
                                onClick={() =>
                                    navigate("/main/search/search-detail", { state: { book } })
                                }
                            >
                                {book.thumbnail ? (
                                    <img
                                        src={book.thumbnail}
                                        alt={book.title}
                                        style={{
                                            width: "11rem",
                                            height: "15rem",
                                            objectFit: "cover",
                                        }}
                                    />
                                ) : (
                                    <Box
                                        sx={{
                                            width: "11rem",
                                            height: "15rem",
                                            backgroundColor: "#E0E0E0",
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            borderRadius: "0.5rem",
                                        }}
                                    >
                                        <ImageNotSupportedRoundedIcon
                                            sx={{ fontSize: "5rem", color: "#9E9E9E" }}
                                        />
                                        <Typography>이미지 없음</Typography>
                                    </Box>
                                )}

                                <Box
                                    sx={{
                                        textAlign: "left",
                                        width: "100%",
                                        marginTop: "0.3rem",
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "flex-start",
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            fontSize: "1.6rem",
                                            fontWeight: "800",
                                            lineHeight: "1.6rem",
                                            marginTop: "0.8rem",
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                            wordBreak: "break-word",
                                            display: "-webkit-box",
                                            WebkitLineClamp: 2,
                                            WebkitBoxOrient: "vertical",
                                        }}
                                    >
                                        {book.title}
                                    </Typography>
                                    <Typography
                                        sx={{
                                            fontSize: "1.4rem",
                                            fontWeight: "400",
                                            lineHeight: "1.6rem",
                                            marginTop: "0.8rem",
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                            wordBreak: "break-word",
                                            display: "-webkit-box",
                                            WebkitLineClamp: 1,
                                            WebkitBoxOrient: "vertical",
                                            color: "gray",
                                        }}
                                    >
                                        {book.authors && book.authors.length > 0
                                            ? book.authors.join(", ")
                                            : "저자 정보 없음"}
                                    </Typography>
                                </Box>
                            </Box>
                        ))}
                    </Box>

                    {hasMore && (
                        <Box sx={{ display: "flex", justifyContent: "center", marginTop: "2.6rem" }}>
                            <Button
                                onClick={fetchMoreBooks}
                                variant="text"
                                sx={{
                                    fontSize: "2.2rem",
                                    padding: "0.8rem 4.8rem",
                                    fontWeight: "700",
                                    color: "#FFFFFF",
                                    backgroundColor: "#BDE5F2",
                                    borderRadius: "0.8rem",
                                }}
                            >
                                + 더보기
                            </Button>
                        </Box>
                    )}
                </Box>
            )}
        </Box>
    );
};

BookList.propTypes = {
    books: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string.isRequired,
            thumbnail: PropTypes.string,
            authors: PropTypes.arrayOf(PropTypes.string),
        })
    ).isRequired,
    searchTerm: PropTypes.string.isRequired,
    fetchMoreBooks: PropTypes.func.isRequired,
    hasMore: PropTypes.bool.isRequired,
};

export default BookList;