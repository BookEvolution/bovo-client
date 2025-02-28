import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from "@mui/material";
import styles from "./DeleteModal.module.css";

const DeleteModal = ({ open, onClose, memoId, onDelete }) => {
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
        정말 삭제하시겠습니까?
      </DialogTitle>
      <DialogContent
        sx={{
          width: "31.25rem",
          height: "3.125rem",
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
        }}
      >
        <p className={styles.deleteDescription}>
          삭제할 경우 이전 기록은 복구할 수 없습니다.
        </p>
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
          onClick={onClose} // 모달 닫기
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
          onClick={() => onDelete(memoId)}
          sx={{
            width: "12.5rem",
            height: "5rem",
            borderRadius: "1.5rem",
            backgroundColor: "#739CD4",
            color: "white",
            fontSize: "2rem",
            letterSpacing: "0",
            textAlign: "center",
          }}
        >
          삭제
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteModal;