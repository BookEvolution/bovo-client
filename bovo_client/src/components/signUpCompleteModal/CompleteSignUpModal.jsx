//회원가입 완료 모달
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { useNavigate } from "react-router-dom";

const CompleteSignUpModal = ({ open, handleClose }) => {
    const navigate = useNavigate();

    const handleNavigateToLogin = () => {
        handleClose();
        navigate("/");
    };

    return (
        <Modal open={open} onClose={handleClose} BackdropProps={{ sx: { backgroundColor: "rgba(81,81,81,0.5)" } }}>
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "36rem",
                    bgcolor: "#E8F1F6",
                    padding: 5,
                    borderRadius: "1.5rem",
                    textAlign: "center",
                }}
            >
                <Typography sx={{ fontSize: "3.3rem", fontWeight: "600", mt: 4, mb: 2 }}>
                    회원가입 완료!
                </Typography>
                <Typography sx={{ fontSize: "1.7rem", color: "#666", mb: 4 }}>
                    로그인 페이지로 이동합니다.
                </Typography>
                <Button
                    fullWidth
                    sx={{
                        backgroundColor: "#739CD4",
                        color: "#FFFFFF",
                        fontSize: "1.9rem",
                        fontWeight: "600",
                        padding: "1rem",
                        borderRadius: "1rem",
                        marginBottom: "1rem",
                    }}
                    onClick={handleNavigateToLogin}
                >
                    이동하기
                </Button>
            </Box>
        </Modal>
    );
};

CompleteSignUpModal.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
};

export default CompleteSignUpModal;
