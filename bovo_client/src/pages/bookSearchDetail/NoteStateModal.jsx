import { useState } from "react";
import { Box, Typography, Button, Modal } from "@mui/material";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import NoteCompleteModal from "./NoteCompleteModal";
import api from "../../api/Auth";

const NoteStateModal = ({ open, onClose, book }) => {
    const [selectedState, setSelectedState] = useState(null);
    const [isRegisterCompleteOpen, setIsRegisterCompleteOpen] = useState(false);

    const handleSelect = (state) => {
        setSelectedState(state);
    };

    const handleRegister = async () => {
        if (!selectedState || !book) {
            console.log("데이터 입력 에러");
            return;
        }

        const authorsString = book.authors ? book.authors.join(", "): "저자 정보 없음";

        const requestData = {
            isbn: book.isbn,
            book_name: book.title,
            book_author: authorsString,
            book_cover: book.thumbnail,
            publication_date: book.datetime? String(book.datetime.split("T")[0]) : "0000-00-00",
            is_complete_reading: selectedState,
        };
    
        console.log("요청 데이터 확인:", requestData);
    
        try {
            const response = await api.post("/save", requestData);
            console.log("서버 응답:", response.data);
            setIsRegisterCompleteOpen(true);
        } catch (error) {
            console.error("API 요청 오류:", error);
        }
    };
    

    return (
        <>
            <Modal open={open} onClose={onClose} sx={{ display: "flex", justifyContent: "center", alignItems: "flex-end" }}>
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
                    <Box sx={{ width: "15rem", height: "0.3rem", backgroundColor: "#739CD4", borderRadius: "10px", margin: "0 auto 1rem" }} />

                    <Typography variant="h6" sx={{ fontSize: "2.1rem", fontWeight: "600", margin: "1.5rem" }}>
                        이 책을
                    </Typography>

                    <Box sx={{ display: "flex", justifyContent: "center", gap: "1rem", marginBottom: "3rem" }}>
                        <Button
                            onClick={() => handleSelect("ing")}
                            sx={{
                                width: "15rem",
                                height: "17rem",
                                borderRadius: "1rem",
                                backgroundColor: selectedState === "ing" ? "#739CD4" : "#FFFFFF",
                                color: selectedState === "ing" ? "#FFFFFF" : "#303030",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                                boxShadow: "none",
                                fontSize: "2rem",
                                "&:hover": {
                                    backgroundColor: selectedState === "ing" ? "#739CD4" : "#F0F0F0",
                                },
                            }}
                        >
                            <HourglassBottomIcon sx={{ fontSize: "6rem", marginBottom: "0.5rem" }} />
                            읽는 중
                        </Button>

                        <Button
                            onClick={() => handleSelect("end")}
                            sx={{
                                width: "15rem",
                                height: "17rem",
                                borderRadius: "1rem",
                                backgroundColor: selectedState === "end" ? "#739CD4" : "#FFFFFF",
                                color: selectedState === "end" ? "#FFFFFF" : "#303030",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                                boxShadow: "none",
                                fontSize: "2rem",
                                "&:hover": {
                                    backgroundColor: selectedState === "end" ? "#739CD4" : "#F0F0F0",
                                },
                            }}
                        >
                            <CheckCircleOutlineIcon sx={{ fontSize: "6rem", marginBottom: "0.5rem" }} />
                            다 읽음
                        </Button>

                        <Button
                            onClick={() => handleSelect("wish")}
                            sx={{
                                width: "15rem",
                                height: "17rem",
                                borderRadius: "1rem",
                                backgroundColor: selectedState === "wish" ? "#739CD4" : "#FFFFFF",
                                color: selectedState === "wish" ? "#FFFFFF" : "#303030",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                                boxShadow: "none",
                                fontSize: "2rem",
                                "&:hover": {
                                    backgroundColor: selectedState === "wish" ? "#739CD4" : "#F0F0F0",
                                },
                            }}
                        >
                            <FavoriteBorderIcon sx={{ fontSize: "6rem", marginBottom: "0.5rem" }} />
                            읽고 싶음
                        </Button>
                    </Box>

                    <Button
                        variant="contained"
                        onClick={handleRegister}
                        disabled={!selectedState}
                        sx={{
                            fontSize: "2.2rem",
                            fontWeight: "600",
                            backgroundColor: "#BDE5F1",
                            padding: "1rem",
                            borderRadius: "0.8rem",
                            boxShadow: "none",
                            width: "100%",
                            marginBottom: "1rem",
                            "&:hover": {
                                backgroundColor: "#A5D8E8",
                            },
                        }}
                    >
                        기록하기
                    </Button>
                </Box>
            </Modal>

            <NoteCompleteModal open={isRegisterCompleteOpen} onClose={() => setIsRegisterCompleteOpen(false)} book={book}/>
        </>
    );
};

export default NoteStateModal;
