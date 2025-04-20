// 도서 상세페이지 버튼들
import PropTypes from "prop-types"; 
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

const Buttons = ({ onOpenNoteModal, onOpenForumModal }) => {
    return (
        <Box sx={{ display: "flex", justifyContent: "center", gap: "1rem", marginBottom: "2rem" }}>
            <Button
                variant="outlined"
                onClick={onOpenForumModal}
                sx={{
                    fontSize: "1.9rem",
                    fontWeight: "600",
                    padding: "0.8rem 5rem",
                    borderRadius: "0.5rem",
                    marginTop: "1rem",
                    border: "none",
                    backgroundColor: "#E8F1F6",
                    color: "#5F5F5F",
                }}
            >
                토론방 등록
            </Button>

            <Button
                variant="contained"
                onClick={onOpenNoteModal}
                sx={{
                    fontSize: "1.9rem",
                    fontWeight: "600",
                    padding: "0.8rem 5.6rem",
                    marginTop: "1rem",
                    borderRadius: "0.5rem",
                    backgroundColor: "#BDE5F1",
                    color: "#5F5F5F",
                    outline: "none",
                    boxShadow: "none",
                    "&:hover": { boxShadow: "none" },
                    "&:active": { boxShadow: "none" },
                }}
            >
                기록하기
            </Button>
        </Box>
    );
};

Buttons.propTypes = {
    onOpenNoteModal: PropTypes.func.isRequired,
    onOpenForumModal: PropTypes.func.isRequired,
};

export default Buttons;
