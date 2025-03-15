import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";


const DeleteChatRoomModal = () => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            sx={{
                "& .MuiDialog-paper": {
                    width: "41.25rem",
                    height: "20rem",
                    padding: "3.125rem 5rem",
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
            <DialogContent
                sx={{
                    width: "31.25rem",
                    height: "3.125rem",
                    display: "flex",
                    alignItems: "center",
                    overflow: "hidden",
                    fontSize: "1.5rem",
                    justifyContent: "center",
                    textAlign: "center",
                }}
            >
                채팅방을 나갈 경우 이전 대화 기록은 복구할 수 없습니다.
            </DialogContent>
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
                    onClick={handleDelete}
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

export default DeleteChatRoomModal;