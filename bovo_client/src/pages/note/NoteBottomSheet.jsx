import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
    Box, Modal, Typography, Button,
    ToggleButton, ToggleButtonGroup, Rating, Slide
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import DeleteModal from "../../components/deleteModal/DeleteModal";

const NoteBottomSheet = ({ open, onClose }) => {
    const { book_id } = useParams();

    // 상태 관리 (책 데이터, 독서 상태, 기간, 별점, 삭제 모달)
    const [bookData, setBookData] = useState(null);
    const [status, setStatus] = useState("ing");
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [rating, setRating] = useState(0);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);

    // 책 데이터 불러오기
    // 나중에 PUT으로 정보를 보내야 함
    useEffect(() => {
        const fetchBookData = async () => {
            try {
                const response = await axios.get("/archive", { headers: { user_id: 1 } });

                if (response.data?.books) {
                    const selectedBook = response.data.books.find((b) => String(b.book_id) === book_id);
                    if (selectedBook) {
                        setBookData(selectedBook);
                        setStatus(selectedBook.status || "ing");
                        setStartDate(dayjs(selectedBook.start_date) || null);
                        setEndDate(dayjs(selectedBook.end_date) || null);
                        setRating(selectedBook.star || 0);
                    }
                }
            } catch (error) {
                setBookData(null);
            }
        };

        fetchBookData();
    }, [book_id]);

    if (!bookData) return null;

    // 독서 상태 변경
    const handleStatusChange = (event, newStatus) => {
        if (newStatus !== null) setStatus(newStatus);
    };

    // 기록하기 버튼 클릭 시 모달 닫기
    const handleSave = () => {
        onClose();
    };

    return (
        <>
            {/* 모달 */}
            <Modal 
                open={open} 
                onClose={onClose} 
                disableEnforceFocus
                sx={{ display: "flex", alignItems: "flex-end", justifyContent: "center" }}
            >
                <Slide direction="up" in={open} mountOnEnter unmountOnExit>
                    <Box
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
                              mb: "1.5rem" }}
                        >
                            독서 상태
                        </Typography>

                        {/* 독서 상태 버튼 */}
                        <ToggleButtonGroup
                            value={status}
                            exclusive
                            onChange={handleStatusChange}
                            sx={{ 
                              display: "flex", 
                              gap: "1rem", 
                              mb: "3rem" 
                            }}
                        >
                            {[   
                                { value: "ing", label: "읽는 중", 
                                  icon: <HourglassBottomIcon 
                                  sx={{ 
                                    fontSize: "6rem", 
                                    marginBottom: "0.5rem" 
                                  }} /> },
                                { value: "end", label: "다 읽음", 
                                  icon: <CheckCircleOutlineIcon 
                                  sx={{ 
                                    fontSize: "6rem", 
                                    marginBottom: "0.5rem" 
                                  }} /> },
                                { value: "wish", label: "읽고 싶음", 
                                  icon: <FavoriteBorderIcon 
                                  sx={{ 
                                    fontSize: "6rem", 
                                    marginBottom: "0.5rem" 
                                  }} /> }
                            ].map(({ value, label, icon }) => (
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
                        <Typography sx={{ 
                          fontSize: "1.75rem", 
                          fontWeight: "bold", 
                          mb: "1.5rem" 
                          }}>
                            독서 기간
                        </Typography>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <Box sx={{ 
                              display: "flex", 
                              gap: "1rem", 
                              justifyContent: "center", 
                              }}>
                                <DatePicker
                                    value={startDate}
                                    onChange={(newValue) => setStartDate(newValue)}
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
                                            "& fieldset": { borderColor: "#739CD4" },
                                            "&:hover fieldset": { borderColor: "#0056b3" },
                                            "&.Mui-focused fieldset": { borderColor: "#003f7f" },
                                        }
                                    }}
                                />

                                <Typography sx={{ 
                                  fontSize: "3rem", 
                                  fontWeight: "bold", 
                                  color: "black" 
                                  }}>~</Typography>

                                <DatePicker
                                    value={endDate}
                                    onChange={(newValue) => setEndDate(newValue)}
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
                                            "& fieldset": { borderColor: "#739CD4" },
                                            "&:hover fieldset": { borderColor: "#0056b3" },
                                            "&.Mui-focused fieldset": { borderColor: "#003f7f" },
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
                          }}>
                            별점
                          </Typography>
                        <Rating 
                          name="size-large" 
                          value={rating / 2} 
                          precision={0.5} 
                          size="large" 
                          onChange={(event, newValue) => setRating(newValue * 2)} 
                          sx={{ mb: "2rem", fontSize: "5rem" }} 
                        />
                        {/* 삭제 & 수정 버튼 */}
                        <Box sx={{ 
                          display: "flex", 
                          justifyContent: "space-evenly", 
                          mt: "3rem" 
                          }}>
                            <Button variant="contained" disableElevation onClick={() => setOpenDeleteModal(true)}
                                sx={{ 
                                  fontSize: "2rem", 
                                  fontWeight: "500", 
                                  backgroundColor: "white",
                                  color: "red", 
                                  borderRadius: "1.25rem", 
                                  width: "40%" 
                                  }}>
                                책 삭제하기
                            </Button>
                            <Button variant="contained" disableElevation onClick={handleSave}
                                sx={{ 
                                  fontSize: "2rem", 
                                  fontWeight: "500", 
                                  backgroundColor: "white",
                                  color: "#739CD4", 
                                  borderRadius: "1.25rem", 
                                  width: "40%" }}>
                                수정하기
                            </Button>
                        </Box>
                    </Box>
                </Slide>
            </Modal>

            <DeleteModal open={openDeleteModal} onClose={() => setOpenDeleteModal(false)} />
        </>
    );
};

export default NoteBottomSheet;