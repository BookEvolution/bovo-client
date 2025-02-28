import PropTypes from 'prop-types'; // PropTypes 임포트
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import styles from './WithdrawModal.module.css';

const WithdrawModal = ({open, onClose}) => {
    return (
        <Dialog 
            open={open} 
            sx={{
                "& .MuiDialog-paper": {
                    width: "41.25rem",               // 너비 변경
                    height: "20rem",
                    padding: "3.125rem 5rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#E8F1F6",  // 배경색 변경
                    borderRadius: "1.25rem",         // 모서리 둥글게
                },
            }}
        >
            <DialogTitle
                sx={{fontSize: "3rem", fontWeight: "bold" }}
            >
                회원탈퇴
            </DialogTitle>
            <DialogContent
                sx={{
                    width: "31.25rem",
                    height: "3.125rem",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    overflow: "hidden"
                }}
            >
                <p className={styles.withdrawDiscription}>
                    탈퇴 후 그동안의 기록은 복구할 수 없습니다!
                </p>
                <p className={styles.withdrawDiscription}>
                    정말 탈퇴하시겠습니까?
                </p>
            </DialogContent>
            <DialogActions
                sx={{
                    width: "31.25rem",
                    height: "5rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between"
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
                        letterSpacing: "0",
                        textAlign: "center",
                    }}  
                >
                    취소
                </Button>
                <Button 
                    sx={{
                        width: "12.5rem",
                        height: "5rem",
                        borderRadius: "1.5rem",
                        backgroundColor: "white",
                        color: "#FCA18D",
                        fontSize: "2rem",
                        letterSpacing: "0",
                        textAlign: "center",
                    }} 
                >
                    확인
                </Button>
            </DialogActions>
        </Dialog>
    );
};

// props 타입 정의
WithdrawModal.propTypes = {
    open: PropTypes.func.isRequired, 
    onClose: PropTypes.func.isRequired,
};

export default WithdrawModal;