import { useState } from "react";
import { Box, Modal, Typography, Button, ToggleButton, ToggleButtonGroup, Rating } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import DeleteModal from "../../components/deleteModal/DeleteModal"; // 삭제 모달 연결

const NoteBottomSheet = ({ open, onClose, book }) => {
    const [status, setStatus] = useState(book?.status || "ing");
    const [startDate, setStartDate] = useState(dayjs(book?.start_date) || null);
    const [endDate, setEndDate] = useState(dayjs(book?.end_date) || null);
    const [rating, setRating] = useState(book?.star || 0);
    const [openDeleteModal, setOpenDeleteModal] = useState(false); // 삭제 모달 상태 추가

    const handleStatusChange = (event, newStatus) => {
        if (newStatus !== null) setStatus(newStatus);
    };

    return (
        <>
            <Modal open={open} onClose={onClose} sx={{ display: "flex", alignItems: "flex-end", justifyContent: "center" }}>
                <Box
                    sx={{
                        width: "100%",
                        maxWidth: "45.5rem",
                        backgroundColor: "#E8F1F6",
                        borderRadius: "1.5rem 1.5rem 0 0",
                        boxShadow: "0px -2px 10px rgba(0, 0, 0, 0.1)",
                        padding: "2rem",
                        textAlign: "center",
                    }}
                >
                    {/* 상단 바 */}
                    <Box sx={{ width: "15rem", height: "0.3rem", backgroundColor: "#739CD4", borderRadius: "10px", margin: "0 auto 1rem" }} />

                    <Typography variant="h6" sx={{ fontSize: "2.1rem", fontWeight: "600", margin: "1.5rem" }}>
                        독서 상태
                    </Typography>

                    {/* 독서 상태 버튼 */}
                    <ToggleButtonGroup
                        value={status}
                        exclusive
                        onChange={handleStatusChange}
                        sx={{ display: "flex", gap: "1rem", marginBottom: "2rem" }}
                    >
                        <ToggleButton 
                            value="ing" 
                            sx={{
                                flex: 1,
                                height: "17rem",
                                borderRadius: "1rem",
                                backgroundColor: status === "ing" ? "#739CD4" : "#FFFFFF",
                                color: status === "ing" ? "#FFFFFF" : "#303030",
                                fontSize: "1.5rem",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                                "&:hover": { backgroundColor: status === "ing" ? "#739CD4" : "#F0F0F0" },
                            }}
                        >
                            <HourglassBottomIcon sx={{ fontSize: "6rem", marginBottom: "0.5rem" }} />
                            읽는 중
                        </ToggleButton>
                        <ToggleButton 
                            value="end" 
                            sx={{
                                flex: 1,
                                height: "17rem",
                                borderRadius: "1rem",
                                backgroundColor: status === "end" ? "#739CD4" : "#FFFFFF",
                                color: status === "end" ? "#FFFFFF" : "#303030",
                                fontSize: "1.5rem",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                                "&:hover": { backgroundColor: status === "end" ? "#739CD4" : "#F0F0F0" },
                            }}
                        >
                            <CheckCircleOutlineIcon sx={{ fontSize: "6rem", marginBottom: "0.5rem" }} />
                            다 읽음
                        </ToggleButton>
                        <ToggleButton 
                            value="wish" 
                            sx={{
                                flex: 1,
                                height: "17rem",
                                borderRadius: "1rem",
                                backgroundColor: status === "wish" ? "#739CD4" : "#FFFFFF",
                                color: status === "wish" ? "#FFFFFF" : "#303030",
                                fontSize: "1.5rem",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                                "&:hover": { backgroundColor: status === "wish" ? "#739CD4" : "#F0F0F0" },
                            }}
                        >
                            <FavoriteBorderIcon sx={{ fontSize: "6rem", marginBottom: "0.5rem" }} />
                            읽고 싶음
                        </ToggleButton>
                    </ToggleButtonGroup>

                    {/* 독서 기간 */}
                    <Typography sx={{ fontSize: "1.5rem", fontWeight: "500", mb: "0.5rem" }}>독서 기간</Typography>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <Box sx={{ display: "flex", gap: "1rem", justifyContent: "center", mb: "2rem" }}>
                            <DatePicker
                                value={startDate}
                                onChange={(newValue) => setStartDate(newValue)}
                                format="YY.MM.DD"
                            />
                            <DatePicker
                                value={endDate}
                                onChange={(newValue) => setEndDate(newValue)}
                                format="YY.MM.DD"
                            />
                        </Box>
                    </LocalizationProvider>

                    {/* 별점 */}
                    <Typography sx={{ fontSize: "1.5rem", fontWeight: "500", mb: "0.5rem" }}>별점</Typography>
                    <Rating 
                        name="half-rating"
                        value={rating / 2} 
                        precision={0.5} 
                        size="large"
                        onChange={(event, newValue) => setRating(newValue * 2)}
                        sx={{ mb: "2rem" }} 
                    />

                    {/* 버튼 정렬: 삭제 왼쪽, 기록 오른쪽 */}
                    <Box sx={{ display: "flex", justifyContent: "space-between", mt: "2rem" }}>
                        <Button
                            variant="contained"
                            onClick={() => setOpenDeleteModal(true)} // 삭제 모달 열기
                            sx={{
                                fontSize: "2rem",
                                fontWeight: "600",
                                backgroundColor: "red",
                                color: "white",
                                padding: "1rem",
                                borderRadius: "0.8rem",
                                boxShadow: "none",
                                width: "48%",
                                "&:hover": { backgroundColor: "#d32f2f" },
                            }}
                        >
                            책 삭제하기
                        </Button>

                        <Button
                            variant="contained"
                            onClick={() => alert("기록 완료")}
                            sx={{
                                fontSize: "2rem",
                                fontWeight: "600",
                                backgroundColor: "#BDE5F1",
                                padding: "1rem",
                                borderRadius: "0.8rem",
                                boxShadow: "none",
                                width: "48%",
                                "&:hover": { backgroundColor: "#A5D8E8" },
                            }}
                        >
                            기록하기
                        </Button>
                    </Box>
                </Box>
            </Modal>

            {/* 삭제 모달 */}
            <DeleteModal open={openDeleteModal} onClose={() => setOpenDeleteModal(false)} />
        </>
    );
};

export default NoteBottomSheet;
