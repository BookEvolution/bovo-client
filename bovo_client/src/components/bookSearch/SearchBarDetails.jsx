// 검색 결과 책 권수, 정렬 옵션
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";

const SearchBarDetails = ({ books, sort, setSort }) => {
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "90%",
                margin: "1rem 0",
            }}
        >
            <Typography
                sx={{
                    fontSize: "1.7rem",
                    fontWeight: "600",
                    color: "#333",
                    marginBottom: "1rem",
                }}
            >
                검색 결과 {books.length} 권
            </Typography>

            <FormControl sx={{ minWidth: "10rem" }}>
                <Select
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    sx={{
                        border: "none",
                        boxShadow: "none",
                        backgroundColor: "transparent",
                        "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                        "& .MuiSelect-select": {
                            padding: "0.5rem 2rem",
                            fontSize: "1.6rem",
                        },
                        "& .MuiSelect-icon": {
                            color: "#3B3B3B",
                            fontSize: "3.7rem",
                            right: "-1.6rem",
                            top: "-0.7rem",
                        },
                    }}
                    MenuProps={{
                        transitionDuration: 100,
                        sx: {
                            "& .MuiPaper-root": {
                                borderRadius: "0.4rem",
                                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                                backgroundColor: "white",
                            },
                            "& .MuiMenuItem-root": {
                                fontSize: "1.5rem",
                                padding: "1rem 3rem",
                                "&:hover": {
                                    backgroundColor: "#E8F1F6",
                                },
                            },
                        },
                    }}
                >
                    <MenuItem value="accuracy">정확도순</MenuItem>
                    <MenuItem value="latest">최신순</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
};

SearchBarDetails.propTypes = {
    books: PropTypes.arrayOf(PropTypes.any).isRequired,
    sort: PropTypes.string.isRequired,
    setSort: PropTypes.func.isRequired,
};

export default SearchBarDetails;
