import { Box, List, ListItem, Typography } from "@mui/material";
import Book from "../../../assets/book/book_ex.png";
import styles from "./MyForum.module.css";

const MyForum = () => {
    return (
        <List className={styles.chatRoomContainer}>
            <ListItem button="true" className={styles.myChatRoom}>
                <Box className={styles.chatContentContainer}>
                    <Box className={styles.chatBookWrapper}>
                        <img src={Book} alt="책 대체 이미지" />
                    </Box>
                    <Box className={styles.chatDescription}>
                        <Typography 
                            sx={{
                                fontSize: "1.75rem", 
                                letterSpacing: "0.0175rem",
                                fontWeight: "bold"
                            }}
                        >
                            채팅방 제목
                        </Typography>
                        <Typography 
                            sx={{
                                fontSize: "1.25rem", 
                                letterSpacing: "0.01rem",
                                color: "#D9D9D9",
                                textAlign: "right"
                            }}
                        >
                            2025.03.10
                        </Typography>
                        <Box className={styles.chatMessageInfoWrapper}>
                            <Typography
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontSize: "1.25rem", 
                                    letterSpacing: "0.0125rem",
                                }}
                            >
                                안녕하세요 ~ OO입니다.
                            </Typography>
                            <Box className={styles.chatNewMsgCount}>
                                1
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </ListItem>
        </List>
    );
};

export default MyForum;