// 도서 상세 페이지에서 책 상태 선택하는 모달
import PropTypes from "prop-types";
import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import NoteCreateModal from "../../components/noteCreateModal/NoteCreateModal";
import { registerBook } from "../../api/SelectBook";

const NoteStateSelectModal = ({ open, onClose, book }) => {
    const [selectedState, setSelectedState] = useState(null);
    const [isRegisterCompleteOpen, setIsRegisterCompleteOpen] = useState(false);

    const handleSelect = (state) => {
        setSelectedState(state);
    };

    const handleRegister = async () => {
        const result = await registerBook({ book, selectedState });
        if (result.success) {
        setIsRegisterCompleteOpen(true);
        }
    };

    return (
        <>
        <Modal
            open={open}
            onClose={onClose}
            sx={{ display: "flex", justifyContent: "center", alignItems: "flex-end" }}
        >
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
            <Box
                sx={{
                width: "15rem",
                height: "0.3rem",
                backgroundColor: "#739CD4",
                borderRadius: "10px",
                margin: "0 auto 1rem",
                }}
            />
            <Typography sx={{ fontSize: "2.1rem", fontWeight: "600", margin: "1.5rem" }}>
                이 책을
            </Typography>

            <Box sx={{ display: "flex", justifyContent: "center", gap: "1rem", marginBottom: "3rem" }}>
                {[
                { state: "ing", label: "읽는 중", icon: <HourglassBottomIcon sx={{ fontSize: "6rem", mb: "0.5rem" }} /> },
                { state: "end", label: "다 읽음", icon: <CheckCircleOutlineIcon sx={{ fontSize: "6rem", mb: "0.5rem" }} /> },
                { state: "wish", label: "읽고 싶음", icon: <FavoriteBorderIcon sx={{ fontSize: "6rem", mb: "0.5rem" }} /> },
                ].map(({ state, label, icon }) => (
                <Button
                    key={state}
                    onClick={() => handleSelect(state)}
                    sx={{
                    width: "15rem",
                    height: "17rem",
                    borderRadius: "1rem",
                    backgroundColor: selectedState === state ? "#739CD4" : "#FFFFFF",
                    color: selectedState === state ? "#FFFFFF" : "#303030",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "none",
                    fontSize: "2rem",
                    "&:hover": {
                        backgroundColor: selectedState === state ? "#739CD4" : "#F0F0F0",
                    },
                    }}
                >
                    {icon}
                    {label}
                </Button>
                ))}
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

        {isRegisterCompleteOpen && (
            <NoteCreateModal
            open={isRegisterCompleteOpen}
            onClose={() => setIsRegisterCompleteOpen(false)}
            book={book}
            />
        )}
        </>
    );
};

NoteStateSelectModal.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    book: PropTypes.object.isRequired, 
};

export default NoteStateSelectModal;


