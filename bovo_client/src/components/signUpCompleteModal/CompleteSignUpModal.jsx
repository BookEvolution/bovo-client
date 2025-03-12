import { Modal, Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const CompleteSignUpModal = ({ open, handleClose }) => {
    const navigate = useNavigate();

    const handleNavigateToLogin = () => {
        handleClose();
        navigate("/login");
    };

    return (
        <Modal open={open} onClose={handleClose}>
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "80%",
                    maxWidth: "30rem",
                    bgcolor: "white",
                    boxShadow: 24,
                    p: 4,
                    borderRadius: "1.5rem",
                    textAlign: "center",
                }}
            >
                <Typography sx={{ fontSize: "2rem", fontWeight: "bold", mb: 2 }}>
                    회원가입 완료!
                </Typography>
                <Typography sx={{ fontSize: "1.4rem", color: "#666", mb: 3 }}>
                    로그인 페이지로 이동합니다.
                </Typography>
                <Button
                    fullWidth
                    sx={{
                        backgroundColor: "#BDE5F1",
                        color: "#FFFFFF",
                        fontSize: "1.6rem",
                        fontWeight: "bold",
                        padding: "1rem",
                        borderRadius: "1rem",
                        "&:hover": { backgroundColor: "#A4D4E8" },
                    }}
                    onClick={handleNavigateToLogin}
                >
                    이동하기
                </Button>
            </Box>
        </Modal>
    );
};

export default CompleteSignUpModal;
