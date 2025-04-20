import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import PropTypes from "prop-types";

const Dropdown = ({ selectedYearMonth, setSelectedYearMonth }) => {
    const yearMonthOptions = [];
    for (let year = 2025; year >= 2023; year--) {
        for (let month = 0; month < 12; month++) {
            yearMonthOptions.push({
                label: `${year}년 ${month + 1}월`,
                value: { year, month },
            });
        }
    }

    const handleDateChange = (e) => {
        setSelectedYearMonth(e.target.value);
    };

    return (
        <Box
            sx={{
                width: "40rem",
                height: "8rem",
                backgroundColor: "#739CD4",
                display: "flex",
                alignItems: "center",
                paddingLeft: "1rem",
                marginTop: "2rem",
                marginBottom: "2rem",
                borderRadius: "0.5rem",
                gap: "1rem",
            }}
        >
            <Select
                value={yearMonthOptions.find(
                    (option) => option.value.year === selectedYearMonth.year && option.value.month === selectedYearMonth.month
                )?.value || ""}
                onChange={handleDateChange}
                variant="standard"
                disableUnderline
                sx={{
                    fontSize: "2.3rem",
                    fontWeight: 600,
                    minWidth: "12rem",
                    textAlign: "center",
                    color: "#ffffff",
                    "& .MuiSelect-select": {
                        padding: "0.5rem 1rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginRight: "2rem",
                    },
                    "& .MuiSvgIcon-root": {
                        color: "#ffffff",
                        fontSize: "3rem",
                    },
                }}
                MenuProps={{
                    PaperProps: {
                        style: { maxHeight: 400, overflowY: "auto" },
                    },
                }}
            >
                {yearMonthOptions.map((option) => (
                    <MenuItem
                        key={option.label}
                        value={option.value}
                        sx={{ fontSize: "1.8rem", fontWeight: 400, padding: "1rem 3rem" }}
                    >
                        {option.label}
                    </MenuItem>
                ))}
            </Select>
        </Box>
    );
};

Dropdown.propTypes = {
    selectedYearMonth: PropTypes.shape({
        year: PropTypes.number.isRequired,
        month: PropTypes.number.isRequired,
    }).isRequired,
    setSelectedYearMonth: PropTypes.func.isRequired,
};

export default Dropdown;
