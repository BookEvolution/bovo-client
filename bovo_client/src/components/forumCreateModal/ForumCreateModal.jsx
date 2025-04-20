//도서 검색 상세 페이지에서 토론방 만들기 버튼 클릭 시 뜨는 모달
import PropTypes from "prop-types"; 
import { useNavigate } from "react-router-dom"; 
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { useDispatch } from "react-redux";
import { setBook } from "../../store/bookForum/BookSlice";

const ForumCreateModal = ({ open, onClose, book }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleMoveToForum = () => {
        dispatch(setBook(book));
        navigate("/forum/forum-make");
    };

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
                            objectFit: "cover",
                            marginBottom: "1.5rem",
                            marginTop: "2rem",
                        }}
                    />
                ) : (
                    <Box
                        sx={{
                            width: "24rem",
                            height: "33rem",
                            backgroundColor: "#DDE5ED",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: "0.5rem",
                            marginBottom: "1.5rem",
                            marginTop: "2rem",
                        }}
                    >
                        <Typography sx={{ fontSize: "1.8rem", color: "#5F5F5F" }}>이미지 없음</Typography>
                    </Box>
                )}

                <Typography sx={{ fontSize: "2.2rem", fontWeight: "600", marginTop: "1rem", marginBottom: "3rem" }}>
                    책 등록 완료!
                </Typography>

                <Button
                    variant="contained"
                    onClick={handleMoveToForum}
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
                    토론방 만들기
                </Button>
            </Box>
        </Modal>
    );
};

ForumCreateModal.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    book: PropTypes.shape({
        thumbnail: PropTypes.string,
        title: PropTypes.string,
    }).isRequired,
};

export default ForumCreateModal;
