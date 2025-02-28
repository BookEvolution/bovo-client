import React from "react";
import { Box, Typography, Button, Modal } from "@mui/material";

const NoteCompleteModal = ({ open, onClose, book, onMoveToArchive }) => {
    return (
        <Modal open={open} onClose={onClose} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Box
                sx={{
                    width: "100%",
                    maxWidth: "35rem",
                    backgroundColor: "#E8F1F6",
                    borderRadius: "1.5rem",
                    padding: "2rem",
                    textAlign: "center",
                }}
            >

                {book?.thumbnail ? (
                    <img
                        src={book.thumbnail}
                        alt={book.title}
                        style={{
                            width: "24rem",
                            height: "33rem",
                            borderRadius: "0.5rem",
                            marginBottom: "1.5rem",
                            objectFit: "cover",
                            marginTop: "2rem",
                        }}
                    />
                ) : (
                    <Box
                        sx={{
                            width: "24rem",
                            height: "33rem",
                            borderRadius: "0.5rem",
                            marginBottom: "1.5rem",
                            backgroundColor: "#DDE5ED",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            marginLeft: "5.65rem",
                            marginTop: "2rem",
                            
                        }}
                    >
                        <Typography sx={{ fontSize: "1.8rem", color: "#5F5F5F" }}>이미지 없음</Typography>
                    </Box>
                )}


                <Typography variant="h6" sx={{ fontSize: "2.2rem", fontWeight: "600", marginTop: "1rem", marginBottom: "3rem" }}>
                    등록 완료!
                </Typography>


                <Button
                    variant="contained"
                    onClick={onMoveToArchive}
                    sx={{
                        fontSize: "2.2rem",
                        fontWeight: "600",
                        backgroundColor: "#BDE5F1",
                        padding: "1rem",
                        borderRadius: "0.8rem",
                        boxShadow: "none",
                        width: "100%",
                        maxWidth: "34rem",
                        marginBottom: "1rem",
                    }}
                >
                    내 서재로
                </Button>
            </Box>
        </Modal>
    );
};

export default NoteCompleteModal;
