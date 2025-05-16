import PropTypes from "prop-types"; 
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ImageNotSupportedRoundedIcon from "@mui/icons-material/ImageNotSupportedRounded"; // 추가

const BookInfo = ({ book }) => {
    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                width: "100%",
                gap: "2.7rem",
                marginBottom: "2rem",
                marginLeft: "5rem",
            }}
        >
            <Box>
                {book.thumbnail ? (
                    <img
                        src={book.thumbnail}
                        alt={book.title}
                        style={{
                            width: "16rem",
                            height: "22rem",
                            backgroundColor: "#f0f0f0",
                            borderRadius: "0.5rem",
                            objectFit: "cover",
                        }}
                    />
                ) : (
                    <Box
                        sx={{
                            backgroundColor: "#E0E0E0",
                            width: "16rem",
                            height: "22rem",
                            borderRadius: "0.5rem",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <ImageNotSupportedRoundedIcon
                            sx={{ fontSize: "5rem", color: "#9E9E9E", marginBottom: "0.5rem" }}
                        />
                        <Typography sx={{ fontSize: "1.3rem", color: "#757575" }}>
                            이미지 없음
                        </Typography>
                    </Box>
                )}
            </Box>

            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    gap: "1.3rem",
                    flex: 1,
                }}
            >
                <Typography sx={titleStyle}>{book.title}</Typography>
                <Typography sx={infoStyle}>
                    저자 : {book.authors ? book.authors.join(", ") : "정보 없음"}
                </Typography>
                <Typography sx={infoStyle}>
                    출판사 : {book.publisher || "정보 없음"}
                </Typography>
                <Typography sx={infoStyle}>
                    출판일 : {book.datetime ? book.datetime.split("T")[0] : "정보 없음"}
                </Typography>
                <Typography sx={infoStyle}>ISBN : {book.isbn || "정보 없음"}</Typography>
            </Box>
        </Box>
    );
};

const titleStyle = {
    fontSize: "2.3rem",
    fontWeight: "700",
    lineHeight: "2.4rem",
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: 2,
    overflow: "hidden",
    textOverflow: "ellipsis",
    paddingRight: "4rem",
    marginBottom: "0.2rem",
};

const infoStyle = {
    fontSize: "1.5rem",
    fontWeight: "400",
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: 2,
    overflow: "hidden",
    textOverflow: "ellipsis",
    paddingRight: "4rem",
};

BookInfo.propTypes = {
    book: PropTypes.shape({
        thumbnail: PropTypes.string,
        title: PropTypes.string,
        authors: PropTypes.arrayOf(PropTypes.string),
        publisher: PropTypes.string,
        datetime: PropTypes.string,
        isbn: PropTypes.string,
    }).isRequired,
};

export default BookInfo;
