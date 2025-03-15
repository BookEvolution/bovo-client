import PropTypes from "prop-types";
import { Button, Dialog, DialogActions, DialogTitle, Typography } from "@mui/material";

const DeleteChatRoomModal = ({open, onClose}) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            sx={{
                "& .MuiDialog-paper": {
                    width: "41.25rem",
                    height: "20rem",
                    padding: "3.125rem 4rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#E8F1F6",
                    borderRadius: "1.25rem",
                },
            }}
        >
            <DialogTitle sx={{ fontSize: "2.5rem", fontWeight: "bold" }}>
                정말 채팅방을 나가시겠습니까?
            </DialogTitle>
            <Typography
                sx={{
                    width: "31.25rem",
                    display: "flex",
                    alignItems: "center",
                    fontSize: "1.5rem",
                    justifyContent: "center",
                    textAlign: "center",
                }}
            >
                채팅방을 나갈 경우 
            </Typography>
            <Typography
                sx={{
                    width: "31.25rem",
                    display: "flex",
                    alignItems: "center",
                    fontSize: "1.5rem",
                    justifyContent: "center",
                    textAlign: "center",
                    marginBottom: "1rem",
                }}
            >
                이전 대화 기록은 복구할 수 없습니다.
            </Typography>
            <DialogActions
                sx={{
                    width: "31.25rem",
                    height: "5rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >
                <Button
                    onClick={onClose}
                    sx={{
                        width: "12.5rem",
                        height: "5rem",
                        borderRadius: "1.5rem",
                        backgroundColor: "white",
                        color: "#739CD4",
                        fontSize: "2rem",
                    }}
                >
                    취소
                </Button>
                <Button
                    sx={{
                        width: "12.5rem",
                        height: "5rem",
                        borderRadius: "1.5rem",
                        backgroundColor: "#739CD4",
                        color: "white",
                        fontSize: "2rem",
                    }}
                >
                    나가기
                </Button>
            </DialogActions>
            </Dialog>
    );
};

DeleteChatRoomModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default DeleteChatRoomModal;