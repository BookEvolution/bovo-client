import PropTypes from "prop-types";
import { Box, Button, Dialog, Typography } from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';
import Book from "../../../assets/book/book_ex.png";
import styles from './JoinChatRoomModal.module.css';

const JoinChatRoomModal = ({ open, onClose }) => {
    return (
        <Dialog
              open={open}
              onClose={onClose}
              sx={{
                "& .MuiDialog-paper": {
                  width: "42rem",
                  padding: "2rem 2rem 4rem 2rem",
                  backgroundColor: "#E8F1F6",
                  borderRadius: "1.5625rem",
                },
              }}
            >
            <Button
                className={styles.cancelBtn}
                onClick={onClose}
                sx={{
                    marginLeft: "34.75rem",
                }}
            >
                <ClearIcon sx={{fontSize: "2rem"}} />
            </Button>
            <Box className={styles.contentContainer}>
                <Box className={styles.bookInfoContainer}>
                    <Box className={styles.bookImg}>
                        <img src={Book} alt="책 대체 이미지" />
                    </Box>
                    <Box className={styles.bookInfoWrapper}>
                        <Typography 
                            sx={{fontSize: "2rem", fontWeight: 500, letterSpacing: "0.02rem"}}
                        >
                            책 제목
                        </Typography>
                        <Box className={styles.groupLimitContainer}>
                            <Typography
                                sx={{
                                    fontSize: "1.5rem",
                                    lineHeight: "0.015rem"
                                }}
                            >
                                모집 인원
                            </Typography>
                            <Typography
                                sx={{
                                    fontSize: "1.5rem",
                                    lineHeight: "0.015rem"
                                }}
                            >
                                00
                            </Typography>
                            <Typography
                                sx={{
                                    fontSize: "1.5rem",
                                    lineHeight: "0.015rem"
                                }}
                            >
                                /
                            </Typography>
                            <Typography
                                sx={{
                                    fontSize: "1.5rem",
                                    lineHeight: "0.015rem"
                                }}
                            >
                                00
                            </Typography>
                        </Box>
                        <Box className={styles.dueDateWrapper}>
                            <Typography
                                sx={{
                                    fontSize: "1.5rem",
                                    lineHeight: "0.015rem"
                                }}
                            >
                                YY.MM.DD
                            </Typography>
                            <Typography
                                sx={{
                                    fontSize: "1.5rem",
                                    lineHeight: "0.015rem"
                                }}
                            >
                                ~
                            </Typography>
                            <Typography
                                sx={{
                                    fontSize: "1.5rem",
                                    lineHeight: "0.015rem"
                                }}
                            >
                                YY.MM.DD
                            </Typography>
                        </Box>
                    </Box>
                </Box>
                <Box className={styles.chatRoomInfoContainer}>
                    <Typography
                        sx={{
                            fontSize: "2.5rem",
                            fontWeight: 500,
                            letterSpacing: "0.025rem",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                        }}
                    >
                        챌린지 제목 입니다
                    </Typography>
                    <Typography
                        sx={{
                            fontSize: "1.5rem",
                            letterSpacing: "0.015rem",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                        }}
                    >
                        챌린지 세부 설명
                        챌린지 세부 설명입니다
                    </Typography>
                </Box>
                <Button
                    className={styles.enrollBtn}
                    sx={{
                        borderRadius: "1.5625rem",
                        backgroundColor: "#FFFFFF",
                        fontSize: "2rem",
                        letterSpacing: "0.02rem",
                        color: "#739CD4", 
                    }}
                >
                    참여하기
                </Button>
            </Box>
        </Dialog>
    );
};

export default JoinChatRoomModal;

//props type 정의
JoinChatRoomModal.propTypes = {
    open: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
};