//도서 상세페이지 책 소개 
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const BookDescription = ({ description }) => {
    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                    marginBottom: "1rem",
                }}
            >
                <Typography
                    sx={{
                        fontSize: "2.2rem",
                        fontWeight: "500",
                        whiteSpace: "nowrap",
                        marginRight: "1rem",
                        marginLeft: "2.5rem",
                    }}
                >
                    책 소개
                </Typography>
                <hr
                    style={{
                        flexGrow: 1,
                        height: "2px",
                        backgroundColor: "#4682B4",
                        border: "none",
                        marginRight: "2rem",
                    }}
                />
            </Box>

            <Box sx={{ width: "90%", maxWidth: "40rem", textAlign: "left", marginBottom: "3rem" }}>
                <Typography
                    sx={{
                        fontSize: "1.8rem",
                        fontWeight: "400",
                        lineHeight: "2.2rem",
                        marginTop: "0.5rem",
                        paddingBottom: "2rem",
                    }}
                >
                    {description || "책 소개 정보가 없습니다."}
                </Typography>
            </Box>
        </>
    );
};

BookDescription.propTypes = {
    description: PropTypes.string,
};

export default BookDescription;
