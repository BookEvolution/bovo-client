import PropTypes from 'prop-types'; // PropTypes 임포트
import Box from '@mui/material/Box';
import Typography from "@mui/material/Typography";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import CloseIcon from '@mui/icons-material/Close';
import styles from "./ReadingShareModal.module.css";
import { useEffect, useState } from "react";
import TemplateListItem from '../templateListItem/TemplateListItem';
import LoadingSpinner from '../../loadingSpinner/LoadingSpinner';

const ReadingShareModal = ({ 
    open, 
    onClose, 
    memos, 
    handleSelectMemo, 
    handleShareMemo, 
    isLoading, 
    isError 
}) => {
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

    // ⭐ 로딩 및 에러 상태에 따른 조건부 렌더링 추가
    let content;
    if (isLoading) {
        content = (
            <LoadingSpinner />
        );
    } else if (isError) {
        content = (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', flexDirection: 'column' }}>
                <Typography color="error" sx={{ textAlign: 'center' }}>메모를 불러오는 데 실패했습니다.<br/>잠시 후 다시 시도해주세요.</Typography>
            </Box>
        );
    } else if (memos && memos.length > 0) { // memos가 존재하고 내용이 있을 때
        content = memos.map((memo, index) => (
            <List key={index} className={styles.templateList}>
                <TemplateListItem
                    memo={memo}
                    checked={checkedItems[index] || false} // checkedItems[index]가 undefined일 경우를 대비하여 || false 추가
                    handleCheckboxChange={(checked) => {
                        handleCheckboxChange(index, checked);
                        handleSelectMemo(memo, checked);
                    }}
                />
            </List>
        ));
    } else { // memos가 없거나 빈 배열일 때
        content = <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>데이터가 없습니다.</Box>;
    }

    return (
        <Dialog 
            open={open} 
            onClose={onClose} 
            fullWidth
            disableRestoreFocus 
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
                {content}
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
    isLoading: PropTypes.bool, // 메모 데이터 로딩
    isError: PropTypes.bool, // 메모 데이터 불러오기 에러시
};