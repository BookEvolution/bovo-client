import { useDispatch, useSelector } from "react-redux";
import { toggleLogoutModal } from "../../store/logout/LogeoutSlice";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import styles from './LogoutModal.module.css';

const LogoutModal = () => {
    const dispatch = useDispatch();
    const isLogout = useSelector((state) => state.logout.isLogout);

    const handleClose = () => {
        dispatch(toggleLogoutModal(false)); // 모달 닫기
    };

    return (
        <Dialog 
            open={isLogout} 
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
                sx={{fontSize: "2rem", fontWeight: "bold" }}
            >
                로그아웃
            </DialogTitle>
            <DialogContent
                sx={{
                    width: "31.25rem",
                    height: "3.125rem",
                    display: "flex",
                    alignItems: "center"
                }}
            >
                <p className={styles.logoutDiscription}>
                    정말 로그아웃 하시겠습니까?
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
                    onClick={handleClose}
                    sx={{
                        width: "12.5rem",
                        height: "5rem",
                        borderRadius: "1.5rem",
                        backgroundColor: "white",
                        color: "#739CD4",
                        fontSize: "1.75rem",
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
                        backgroundColor: "#739CD4",
                        color: "white",
                        fontSize: "1.75rem",
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

export default LogoutModal;