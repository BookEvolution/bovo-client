import PropTypes from "prop-types";
import { bookPropType } from "../../utils/propTypes";
import {
    Box, Modal, Typography, Button,
    ToggleButton, ToggleButtonGroup, Rating, Slide
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import DeleteModal from "../deleteModal/DeleteModal";

const NoteBottomSheetUI = ({
    open,
    onClose,
    book,
    status,
    startDate,
    endDate,
    rating,
    openDeleteModal,
    onStatusChange,
    onStartDateChange,
    onEndDateChange,
    onRatingChange,
    onSave,
    onDeleteClick,
    onDeleteModalClose,
    onDeleteSuccess
}) => {
    const statusOptions = [
        { 
            value: "ing", 
            label: "읽는 중", 
            icon: <HourglassBottomIcon 
                sx={{ 
                    fontSize: "6rem", 
                    marginBottom: "0.5rem" 
                }} 
            /> 
        },
        { 
            value: "end", 
            label: "다 읽음", 
            icon: <CheckCircleOutlineIcon 
                sx={{ 
                    fontSize: "6rem", 
                    marginBottom: "0.5rem" 
                }} 
            /> 
        },
        { 
            value: "wish", 
            label: "읽고 싶음", 
            icon: <FavoriteBorderIcon 
                sx={{ 
                    fontSize: "6rem", 
                    marginBottom: "0.5rem" 
                }} 
            /> 
        }
    ];

    return (
        <>
            {/* 모달 */}
            <Modal 
                open={open} 
                onClose={onClose}
                disableAutoFocus
                disableEnforceFocus
                sx={{ 
                    display: "flex", 
                    alignItems: "flex-end", 
                    justifyContent: "center" 
                }}
            >
                <Slide direction="up" in={open} mountOnEnter unmountOnExit>
                    <Box
                        aria-hidden="false"
                        sx={{
                            width: "100%",
                            maxWidth: "45.5rem",
                            backgroundColor: "#E8F1F6",
                            borderRadius: "1.5rem 1.5rem 0 0",
                            boxShadow: "0px -2px 10px rgba(0, 0, 0, 0.1)",
                            padding: "1rem 4rem 6rem 4rem",
                            textAlign: "center",
                        }}
                    >
                        {/* 상단 바 */}
                        <Box 
                            sx={{
                                width: "20rem",
                                height: "0.4rem",
                                backgroundColor: "#739CD4",
                                margin: "0 auto 2rem"
                            }} 
                        />
                        
                        {/* 독서 상태 선택 */}
                        <Typography 
                            sx={{ 
                                fontSize: "1.75rem", 
                                fontWeight: "bold", 
                                mb: "1.5rem" 
                            }}
                        >
                            독서 상태
                        </Typography>
                        
                        {/* 독서 상태 버튼 */}
                        <ToggleButtonGroup 
                            value={status} 
                            exclusive 
                            onChange={onStatusChange} 
                            sx={{ 
                                display: "flex", 
                                gap: "1rem", 
                                mb: "3rem" 
                            }}
                        >
                            {statusOptions.map(({ value, label, icon }) => (
                                <ToggleButton 
                                    key={value} 
                                    value={value} 
                                    sx={{ 
                                        flex: 1, 
                                        height: "11rem", 
                                        borderRadius: "1.25rem", 
                                        backgroundColor: status === value ? "#739CD4" : "#FFFFFF", 
                                        color: status === value ? "#FFFFFF" : "#303030", 
                                        fontSize: "1.5rem", 
                                        display: "flex", 
                                        flexDirection: "column", 
                                        alignItems: "center", 
                                        justifyContent: "center" 
                                    }}
                                >
                                    {icon}
                                    {label}
                                </ToggleButton>
                            ))}
                        </ToggleButtonGroup>

                        {/* 독서 기간 선택 */}
                        <Typography 
                            sx={{ 
                                fontSize: "1.75rem", 
                                fontWeight: "bold", 
                                mb: "1.5rem" 
                            }}
                        >
                            독서 기간
                        </Typography>
                        
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <Box 
                                sx={{ 
                                    display: "flex", 
                                    gap: "1rem", 
                                    justifyContent: "center", 
                                }}
                            >
                                <DatePicker
                                    value={startDate}
                                    onChange={onStartDateChange}
                                    format="YY.MM.DD"
                                    sx={{
                                        width: "14rem",
                                        "& .MuiInputBase-root": {
                                            height: "5rem",
                                            fontSize: "2rem",
                                            borderRadius: "1.25rem",
                                            backgroundColor: "white",
                                        },
                                        "& .MuiOutlinedInput-root": {
                                            "& fieldset": { 
                                                borderColor: "#739CD4" 
                                            },
                                            "&:hover fieldset": { 
                                                borderColor: "#0056b3" 
                                            },
                                            "&.Mui-focused fieldset": { 
                                                borderColor: "#003f7f" 
                                            },
                                        }
                                    }}
                                />
                                <Typography 
                                    sx={{ 
                                        fontSize: "3rem", 
                                        fontWeight: "bold", 
                                        color: "black" 
                                    }}
                                >
                                    ~
                                </Typography>
                                <DatePicker
                                    value={endDate}
                                    onChange={onEndDateChange}
                                    format="YY.MM.DD"
                                    sx={{
                                        width: "14rem",
                                        "& .MuiInputBase-root": {
                                            height: "5rem",
                                            fontSize: "2rem",
                                            borderRadius: "1.25rem",
                                            backgroundColor: "white",
                                        },
                                        "& .MuiOutlinedInput-root": {
                                            "& fieldset": { 
                                                borderColor: "#739CD4" 
                                            },
                                            "&:hover fieldset": { 
                                                borderColor: "#0056b3" 
                                            },
                                            "&.Mui-focused fieldset": { 
                                                borderColor: "#003f7f" 
                                            },
                                        }
                                    }}
                                />
                            </Box>
                        </LocalizationProvider>

                        {/* 별점 */}
                        <Typography 
                            sx={{ 
                                fontSize: "1.75rem", 
                                fontWeight: "bold", 
                                mb: "1.5rem", 
                                mt: "1.5rem" 
                            }}
                        >
                            별점
                        </Typography>
                        
                        <Rating 
                            name="size-large" 
                            value={rating / 2} 
                            precision={0.5} 
                            size="large" 
                            onChange={onRatingChange} 
                            sx={{ 
                                mb: "2rem", 
                                fontSize: "5rem" 
                            }} 
                        />

                        {/* 삭제 수정 버튼 */}
                        <Box 
                            sx={{ 
                                display: "flex", 
                                justifyContent: "space-evenly", 
                                mt: "3rem" 
                            }}
                        >
                            <Button 
                                variant="contained" 
                                disableElevation 
                                onClick={onDeleteClick} 
                                sx={{ 
                                    fontSize: "2rem", 
                                    fontWeight: "500", 
                                    backgroundColor: "white", 
                                    color: "red", 
                                    borderRadius: "1.25rem", 
                                    width: "40%" 
                                }}
                            >
                                책 삭제하기
                            </Button>
                            <Button 
                                variant="contained" 
                                disableElevation 
                                onClick={onSave} 
                                sx={{ 
                                    fontSize: "2rem", 
                                    fontWeight: "500", 
                                    backgroundColor: "white", 
                                    color: "#739CD4", 
                                    borderRadius: "1.25rem", 
                                    width: "40%" 
                                }}
                            >
                                수정하기
                            </Button>
                        </Box>
                    </Box>
                </Slide>
            </Modal>

            {/* 삭제 모달 */}
            <DeleteModal
                open={openDeleteModal}
                onClose={onDeleteModalClose}
                targetId={book?.book_id}
                targetType="book"
                onSuccess={onDeleteSuccess}
            />
        </>
    );
};

NoteBottomSheetUI.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    book: bookPropType.isRequired,
    status: PropTypes.string.isRequired,
    startDate: PropTypes.object,
    endDate: PropTypes.object,
    rating: PropTypes.number.isRequired,
    openDeleteModal: PropTypes.bool.isRequired,
    onStatusChange: PropTypes.func.isRequired,
    onStartDateChange: PropTypes.func.isRequired,
    onEndDateChange: PropTypes.func.isRequired,
    onRatingChange: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    onDeleteClick: PropTypes.func.isRequired,
    onDeleteModalClose: PropTypes.func.isRequired,
    onDeleteSuccess: PropTypes.func.isRequired
};

export default NoteBottomSheetUI;