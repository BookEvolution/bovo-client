import PropTypes from "prop-types";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";


const QuestInfoModal = ({open, onClose}) => {
    return (
        <Dialog 
            open={open}
            onClose={onClose} 
            sx={{
                "& .MuiDialog-paper": {
                    width: "40.625rem",               // 너비 변경
                    height: "41rem",
                    padding: "4.6875rem 2.6875rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#FFF",  // 배경색 변경
                    borderRadius: "1.25rem",         // 모서리 둥글게
                },
            }}
        >
            <DialogTitle
                sx={{
                        fontSize: "3rem", 
                        fontWeight: "bold", 
                        marginBottom: "2rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center" 
                    }}
            >
                퀘스트 정보
            </DialogTitle>
            <DialogContent
                sx={{
                    width: "100%",
                    height: "14.25rem",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "1rem",
                    padding: "0",
                    marginBottom: "2rem"
                }}
            >
                <Typography sx={{ width: "100%", fontSize: "1.75rem" }}>
                    1. 퀘스트 달성에 따라 경험치가 채워집니다.
                </Typography>
                <Typography sx={{ width: "100%", fontSize: "1.75rem" }}>
                    2. 퀘스트 항목에 따라 채워지는 경험치 양이<br/> &emsp;달라집니다.
                </Typography>
                <Typography sx={{ width: "100%", fontSize: "1.75rem" }}>
                    3. 퀘스트는 매주 초에 초기화가 이루어집니다.
                </Typography>
                <Typography sx={{ width: "100%", fontSize: "1.75rem" }}>
                    4. 퀘스트 항목에 해당하는 과제를 해결한 후<br/> 
                    &emsp;퀘스트 페이지에서 해당 항목의 ‘확인’ 버튼을<br/> 
                    &emsp;클릭하여야 경험치가 부과됩니다.
                </Typography>
            </DialogContent>
            <DialogActions
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                }}
            >
                <Button 
                    onClick={onClose}
                    sx={{
                        width: "31.25rem",
                        height: "6.25rem",
                        borderRadius: "2.5rem",
                        backgroundColor: "#BDE5F1",
                        color: "#FFF",
                        fontSize: "2.1875rem",
                        textAlign: "center",
                    }}  
                >
                    확인했어요!
                </Button>
            </DialogActions>
        </Dialog>
    );
};

// PropTypes 설정
QuestInfoModal.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default QuestInfoModal;