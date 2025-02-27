import React from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import styles from "./BookSearch.module.css";

const BookList = ({ books, loading, searchTerm }) => {
    const navigate = useNavigate();

    return (
        <Box className={styles.bookListWrapper}>
            {books.length === 0 && !loading ? (
                searchTerm.trim() ? (
                    <Box className={styles.noResultContainer}>
                        <Typography className={styles.noResultText}
                        sx={{ fontSize: "2.7rem" , fontWeight: "500"}}>
                            검색 결과가 없습니다
                        </Typography>
                    </Box>
                ) : (
                    <></>
                )
            ) : (
                <Box className={styles.bookGrid}>
                    {books.map((book, index) => (
                        <Box 
                            key={index} 
                            className={styles.bookItem}
                            onClick={() => navigate("/search/search-detail", { state: { book } })} 
                        >
                            <img 
                                src={book.thumbnail || "default_thumbnail.png"} 
                                alt={book.title} 
                                className={styles.bookCover} 
                            />
                            <Box className={styles.bookInfo}>
                                <Typography 
                                    className={styles.bookTitle} 
                                    sx={{ fontSize: "1.6rem" , fontWeight: "800", lineHeight:"1.6rem", marginTop: "0.8rem" ,overflow: "hidden",}}
                                >
                                    {book.title}
                                </Typography>
                                <Typography 
                                    className={styles.bookAuthor}
                                    sx={{ fontSize: "1.4rem" , fontWeight: "400", lineHeight:"1.6rem", marginTop: "0.8rem",overflow: "hidden",}}
                                >
                                    {book.authors ? book.authors.join(", ") : "저자 정보 없음"}
                                </Typography>
                            </Box>
                        </Box>
                    ))}
                </Box>
            )}

        </Box>
    );
};

export default BookList;
