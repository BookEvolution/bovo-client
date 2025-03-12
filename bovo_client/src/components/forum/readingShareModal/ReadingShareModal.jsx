import PropTypes from 'prop-types'; // PropTypes 임포트
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, List } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import styles from "./ReadingShareModal.module.css";
import { useState } from "react";
import TemplateListItem from '../templateListItem/TemplateListItem';

const ReadingShareModal = ({ open, onClose }) => {
    // 체크박스 상태 관리
    const [checked, setChecked] = useState(false);

    const handleCheckboxChange = (event) => {
        setChecked(event.target.checked);
    };

    // // 데이터를 받아온 후 체크박스 상태 배열을 동적으로 생성
    // const [checkedItems, setCheckedItems] = useState([]);

    // // 데이터가 변경되면 체크박스 상태 배열을 동적으로 초기화
    // useEffect(() => {
    //     if (data && data.length > 0) {
    //         setCheckedItems(new Array(data.length).fill(false));  // 데이터 길이에 맞춰 상태 배열 초기화
    //     }
    // }, [data]);  // data가 변경될 때마다 업데이트

    // const handleCheckboxChange = (index) => (event) => {
    //     const updatedCheckedItems = [...checkedItems];
    //     updatedCheckedItems[index] = event.target.checked;
    //     setCheckedItems(updatedCheckedItems);
    // };

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
                <List className={styles.templateList}>
                    <TemplateListItem checked={checked} handleCheckboxChange={handleCheckboxChange} />
                </List>
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
};