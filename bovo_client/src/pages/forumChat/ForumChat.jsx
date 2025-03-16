import PropTypes from "prop-types"; // PropTypes 임포트
import { Avatar, Box, List, ListItem, ListItemAvatar, Paper, Typography } from "@mui/material";
import styles from "./ForumChat.module.css";
import profileImages from "../../constant/ProfileImg";
import { useEffect, useRef } from "react";
import { formatDate } from "../../utils/FormatDate.js";

const ForumChat = ({ chatMessages }) => {
    // sessionStorage에서 email 가져오기
    const userEmail = sessionStorage.getItem("userEmail");
    console.log(userEmail);
    console.log("ForumChat:", chatMessages)

    const chatEndRef = useRef(null); // 스크롤을 끝으로 내리기 위한 ref

    // 채팅 메시지가 변경될 때마다 자동으로 스크롤을 맨 아래로
    useEffect(() => {
        if (chatEndRef.current) {
            chatEndRef.current.scrollIntoView({ behavior: "smooth" }); // 부드럽게 스크롤
        }
    }, [chatMessages]); // chatMessages가 변경될 때마다 실행

    return (
        <List className={styles.chatContainer}>
            {chatMessages.map((msg) => {
                // message의 email과 sessionStorage의 email이 동일한 경우 조건부로 스타일 변경
                const isUserMessage = msg.email === userEmail;
                const formattedTime = formatDate(msg.timestamp); // ✅ 안전하게 사용 가능

                return (
                    <ListItem
                        key={msg.id}
                        className={styles.chatListItem}
                        sx={{ 
                            display: "flex", 
                            flexDirection: "column", 
                            gap: "0.75rem",
                            alignItems: isUserMessage ? "flex-end" : "flex-start" // 내 메시지는 오른쪽에 배치 
                        }}
                    >
                        {!isUserMessage && (
                            <Box className={styles.userInfoWrapper}>
                                <ListItemAvatar className={styles.chatAvatar}>
                                    <Avatar 
                                        src={profileImages.length > 6 ? profileImages[6].src : "default-image-url"} 
                                        sx={{ width: "100%", height: "100%" }} 
                                    />
                                </ListItemAvatar>
                                <Typography 
                                    variant="caption" 
                                    sx={{ fontSize: "2rem", fontWeight: "bold" }}
                                >
                                    {msg.nickname}
                                </Typography>
                            </Box>
                        )}
                        <Box 
                            className={styles.msgContainer}
                            sx={{
                                flexDirection: isUserMessage ? "row-reverse" : "row", // 내 메시지는 row-reverse
                            }}
                        >
                            <Paper 
                                sx={{ 
                                    p: 1.5, 
                                    maxWidth: "90%", 
                                    borderRadius: "0.75rem", 
                                    backgroundColor: isUserMessage ? "#D0E8F2" : "#f0f0f0", // 내 메시지에는 다른 색상 적용
                                    color: "#000",
                                }}
                            >
                                <Typography sx={{ fontSize: "1.75rem", minHeight: "2.625rem" }}>
                                    {msg.message}
                                </Typography>
                            </Paper>
                            <Typography variant="caption" sx={{ fontSize: "1.5rem", color: "#666" }}>
                                {formattedTime}
                            </Typography>
                        </Box>
                    </ListItem>
                );
            })}
            <div ref={chatEndRef} /> {/* 스크롤을 끝으로 내리기 위한 참조 요소 */}
        </List>
    );
};

export default ForumChat;

// PropTypes 설정
ForumChat.propTypes = {
    chatMessages: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            email: PropTypes.string.isRequired,
            nickname: PropTypes.string.isRequired,
            message: PropTypes.string.isRequired,
        })
    ).isRequired,
};