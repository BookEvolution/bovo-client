import PropTypes from 'prop-types'; // PropTypes 임포트
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, List } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import styles from "./ReadingShareModal.module.css";
import { useEffect, useState } from "react";
import TemplateListItem from '../templateListItem/TemplateListItem';

const ReadingShareModal = ({ open, onClose, memos, handleSelectMemo, handleShareMemo }) => {
    const [checkedItems, setCheckedItems] = useState([]);

    // 모달이 열릴 때마다 checkedItems 초기화
    useEffect(() => {
        if (open) {
            setCheckedItems(new Array(memos.length).fill(false));  // memos 길이에 맞게 초기화
        }
    }, [open, memos]);

    // 선택된 메모를 부모 컴포넌트로 전달하는 함수
    const handleCheckboxChange = (index, checked) => {
        const updatedCheckedItems = [...checkedItems];
        updatedCheckedItems[index] = checked;
        setCheckedItems(updatedCheckedItems);
    };

    return (
        <Dialog 
            open={open} 
            onClose={onClose} 
            fullWidth 
            sx={{
                "& .MuiDialog-paper": {
                  width: "36.5625rem",
                  height: "59.75rem",
                  padding: "3.5rem 2.75rem 2.5rem 2.6875rem",
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: "#E8F1F6",
                  borderRadius: "1.5625rem",
                },
            }}
        >
            <Box className={styles.modalHeader}>
                <DialogTitle
                    sx={{fontSize: "2rem", fontWeight: "bold"}}
                >
                    내 템플릿 공유하기
                </DialogTitle>
                <IconButton onClick={onClose}>
                    <CloseIcon sx={{fontSize: "2rem"}} />
                </IconButton>
            </Box>
            <DialogContent>
                {memos && memos.length > 0 ? (
                        memos.map((memo, index) => (
                            <List key={index} className={styles.templateList}>
                                <TemplateListItem  
                                    memo={memo} 
                                    checked={checkedItems[index] || false} 
                                    handleCheckboxChange={(checked) => {
                                        handleCheckboxChange(index, checked); // 체크박스 상태 변경
                                        handleSelectMemo(memo, checked); // 부모 컴포넌트에서 선택된 메모 처리 함수 호출
                                    }}
                                />
                            </List>
                        ))
                    ) : (
                        <Box>데이터가 없습니다.</Box>
                )}
            </DialogContent>
            <DialogActions>
                <Button
                    className={styles.addBtn}
                    sx={{
                        backgroundColor: "#FFFFFF",
                        borderRadius: "1.5625rem",
                        fontSize: "2rem",
                        letterSpacing: "0.02rem",
                        color: "#739CD4"
                    }}
                    onClick={handleShareMemo}
                >
                    추가하기
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ReadingShareModal;

ReadingShareModal.propTypes = {
    open: PropTypes.bool.isRequired, // open은 boolean 타입이고 필수 props
    onClose: PropTypes.func.isRequired, // onClose는 함수 타입이고 필수 props
    memos: PropTypes.array.isRequired,  // memos는 배열 타입이고 필수 props
    handleSelectMemo: PropTypes.func.isRequired, // 메모 선택 처리 함수
    handleShareMemo: PropTypes.func.isRequired, // 메모 전송 처리 함수
};