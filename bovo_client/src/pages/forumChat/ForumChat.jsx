import { Avatar, Box, List, ListItem, ListItemAvatar, Paper, Typography } from "@mui/material";
import styles from "./ForumChat.module.css";
import profileImages from "../../constant/ProfileImg";

const ForumChat = () => {
    return (
        <List className={styles.chatContainer}>
            <ListItem
                className={styles.chatListItem}
                sx={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}
            >
                <Box className={styles.userInfoWrapper}>
                    <ListItemAvatar className={styles.chatAvatar}>
                        <Avatar src={profileImages[6].src} sx={{width: "100%", height: "100%"}} />
                    </ListItemAvatar>
                    <Typography 
                        variant="caption" 
                        sx={{ 
                            fontSize: "2rem", 
                            fontWeight: "bold",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "centr", 
                        }}
                    >
                        구르미
                    </Typography>
                </Box>
                <Paper 
                    sx={{ 
                        p: 1.5, 
                        minWidth: "60%",
                        maxWidth: "90%", // 메시지 너비 제한
                        borderRadius: "0.75rem", 
                        backgroundColor: "#f0f0f0",
                        color: "#000",
                        alignSelf: "flex-start"
                    }}
                >
                    <Typography sx={{fontSize: "1.75rem",}}>
                        안녕하세요
                    </Typography>
                </Paper>
            </ListItem>
        </List>
    );
};

export default ForumChat;