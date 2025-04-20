//도서 검색 바
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Box from "@mui/material/Box";
import SearchIcon from "@mui/icons-material/Search";
import PropTypes from "prop-types";

const BookSearchBar = ({ searchTerm, setSearchTerm }) => {
    return (
        <Box
            sx={{
                width: "40rem",
                marginTop: "1.3rem",
                marginBottom: "1rem",
                borderRadius: "1.5rem",
                display: "flex",
                alignItems: "center",
                backgroundColor: "#E8F1F6",
            }}
        >
            <TextField
                placeholder="책 제목, 저자, 출판사, ISBN"
                fullWidth
                variant="outlined"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                sx={{
                    "& .MuiOutlinedInput-root": {
                        border: "none",
                        boxShadow: "none",
                        backgroundColor: "transparent",
                        height: "4rem",
                    },
                    "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                    "& .MuiInputBase-input": { fontSize: "1.7rem", padding: "0.5rem 1rem" },
                }}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon sx={{ color: "#739CD4", fontSize: "2.8rem", marginLeft: "0.6rem" }} />
                        </InputAdornment>
                    ),
                }}
            />
        </Box>
    );
};

BookSearchBar.propTypes = {
    searchTerm: PropTypes.string.isRequired,
    setSearchTerm: PropTypes.func.isRequired,
};

export default BookSearchBar;
