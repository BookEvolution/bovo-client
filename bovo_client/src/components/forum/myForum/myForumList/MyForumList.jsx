import PropTypes from "prop-types";  // PropTypes import
import { Box, ListItem, Typography } from "@mui/material";
import styles from "./MyForumList.module.css";
import useFormattedDate from "../../../../hooks/useFormattedDate";

const MyForumList = ({myChatroom}) => {
    // 각 myChatroom에 대해 날짜 포맷팅
    const formattedDate = useFormattedDate(myChatroom.last_msg_info.last_message_date);

    return (
        <ListItem button key={myChatroom.id} className={styles.myChatRoom}>
            <Box className={styles.chatContentContainer}>
                <Box className={styles.chatBookWrapper}>
                    <img src={myChatroom.book_info.book_img} alt="책 대체 이미지" />
                </Box>
                <Box className={styles.chatDescription}>
                    <Typography 
                        sx={{
                            fontSize: "1.75rem", 
                            letterSpacing: "0.0175rem",
                            fontWeight: "bold"
                        }}
                    >
                        {myChatroom.chatroom_name}
                    </Typography>
                    <Typography 
                        sx={{
                            fontSize: "1.25rem", 
                            letterSpacing: "0.01rem",
                            color: "#D9D9D9",
                            textAlign: "right"
                        }}
                    >
                        {formattedDate}
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
                            {myChatroom.last_msg_info.last_message} 
                        </Typography>
                        <Box className={styles.chatNewMsgCount}>
                            1
                        </Box>
                    </Box>
                </Box>
            </Box>
        </ListItem>
    );
};

export default MyForumList;

MyForumList.propTypes = {
    myChatroom: PropTypes.shape({
        id: PropTypes.number.isRequired,
        chatroom_name: PropTypes.string.isRequired,
        book_info: PropTypes.shape({
            book_img: PropTypes.string.isRequired,
        }).isRequired,
        last_msg_info: PropTypes.shape({
            last_message: PropTypes.string.isRequired,
            last_message_date: PropTypes.string.isRequired,
        }).isRequired,
    }).isRequired,
};