import { useState } from "react";
import { Box, Typography, Button, Modal } from "@mui/material";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import NoteCompleteModal from "./NoteCompleteModal";
import axios from "axios";

const NoteStateModal = ({ open, onClose, book, userId }) => {
    const [selectedState, setSelectedState] = useState(null);
    const [isRegisterCompleteOpen, setIsRegisterCompleteOpen] = useState(false);

    const handleSelect = (state) => {
        setSelectedState(state);
    };

    console.log("NoteStateModal - book:", book);

    // const handleRegister = async () => {
    //     if (!selectedState || !book) {
    //         console.log("데이터 입력 에러");
    //         return;
    //     }
    
    //     const accessToken = sessionStorage.getItem("AccessToken");
    //     if (!accessToken) {
    //         console.log("AccessToken 없음, 요청 불가");
    //         return;
    //     }

    //     const authorsString = book.authors ? book.authors.join(", "): "저자 정보 없음";

    //     const requestData = {
    //         isbn: Array.isArray(book.isbn) ? String(book.isbn[0]) : String(book.isbn),
    //         book_name: String(book.title),
    //         book_author: authorsString,
    //         book_cover: String(book.thumbnail),
    //         publication_date: String(book.datetime.split("T")[0]), 
    //         is_complete_reading: String(selectedState),
    //     };
    
    //     console.log("요청 데이터 확인:", requestData);
    //     console.log("Authorization 헤더 확인:", `Bearer ${accessToken}`);
    
    //     try {
    //         const response = await axios.post(
    //             `https://2cc3-222-112-255-159.ngrok-free.app/save`,
    //             requestData,
    //             {
    //                 headers: {
    //                     Authorization: `Bearer ${accessToken}`, 
    //                     "Content-Type": "application/json",
    //                 },
    //             }
    //         );
    //         console.log("서버 응답:", response.data);
    
    //     } catch (error) {
    //         if (error.response) {
    //             console.error("응답 데이터:", error.response.data);
    //             console.error("응답 상태 코드:", error.response.status);
    //             console.error("응답 헤더:", error.response.headers);
    //         } else if (error.request) {
    //             console.error("요청이 전송되었으나 응답 없음", error.request);
    //         } else {
    //             console.error("요청 설정 중 오류 발생", error.message);
    //         }
    //     }
    // };

    const handleRegister = async () => {
        if (!selectedState || !book) {
            console.log("데이터 입력 에러");
            return;
        }
    
        const accessToken = sessionStorage.getItem("AccessToken");
        if (!accessToken) {
            console.log("AccessToken 없음, 요청 불가");
            return;
        }
        
        const requestData = {
            isbn: book.isbn,
            book_name: book.title,
            book_author: book.authors,
            book_cover: book.thumbnail,
            publication_date: book.datetime ? book.datetime.split("T")[0] : "0000-00-00",
            is_complete_reading: selectedState,
        };
    
        console.log("요청 데이터 확인:", requestData);
        console.log("Authorization 헤더 확인:", `Bearer ${accessToken}`);
    
        try {
            const response = await axios.post(
                `https://2cc3-222-112-255-159.ngrok-free.app/save`,
                requestData,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            console.log("서버 응답:", response.data);
        } catch (error) {
            if (error.response) {
                console.error("응답 데이터:", error.response.data);
                console.error("응답 상태 코드:", error.response.status);
                console.error("응답 헤더:", error.response.headers);
            } else if (error.request) {
                console.error("요청이 전송되었으나 응답 없음", error.request);
            } else {
                console.error("요청 설정 중 오류 발생", error.message);
            }
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

            <NoteCompleteModal open={isRegisterCompleteOpen} onClose={() => setIsRegisterCompleteOpen(false)} book={book} />
        </>
    );
};

export default NoteStateModal;
