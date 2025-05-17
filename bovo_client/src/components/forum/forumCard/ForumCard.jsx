import PropTypes from 'prop-types';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import GroupIcon from '@mui/icons-material/Group';
import styles from "./ForumCard.module.css";

const ForumCard = ({ room, onClick }) => {
    const isFull = room.group_info.current_people === room.group_info.limit_people;

    return (
        <Box key={room.id} className={styles.forumList} onClick={() => onClick(room.id)}>
            <Box className={styles.forumBook}>
                <img src={room.book_info.book_img} alt="책 이미지" />
            </Box>
            <Typography
                className={styles.recruiting}
                sx={{
                    backgroundColor: room.group_info.current_people === room.group_info.limit_people
                        ? "#E8F1F6" // 모집완료 색상
                        : "#F3E38B", // 모집중 색상
                    position: "absolute",
                    right: "1rem",
                    bottom: "11rem",
                }}
            >
                {isFull ? "모집완료" : "모집중"}
            </Typography>
            <div className={styles.forumBottomContainer}>
                <Typography
                    className={styles.forumInfoText} 
                    sx={{
                        textOverflow: "ellipsis", 
                        fontSize: "1.75rem", 
                        letterSpacing: "0.0175rem", 
                        fontWeight: 500, 
                        textAlign: "left" 
                        }}
                >
                    {room.chatroom_name}
                </Typography>
                <Typography
                    className={styles.forumInfoText} 
                    sx={{ 
                            textOverflow: "ellipsis", 
                            fontSize: "1.25rem", 
                            fontWeight: 500, 
                            letterSpacing: "0.0125rem" 
                        }}
                >
                    {room.chatroom_ds}
                </Typography>
                <Box className={styles.groupLimitContainer}>
                    <Box className={styles.IconWrapper}>
                        <GroupIcon sx={{ fontSize: "2rem" }} />
                    </Box>
                    <Typography sx={{ fontSize: "1.75rem", fontWeight: 500, lineHeight: "0.0125rem" }}>
                        {room.group_info.current_people}
                    </Typography>
                    <Typography sx={{ fontSize: "1.75rem", fontWeight: 500, lineHeight: "0.0125rem" }}>
                        /
                    </Typography>
                    <Typography sx={{ fontSize: "1.75rem", fontWeight: 500, lineHeight: "0.0125rem" }}>
                        {room.group_info.limit_people}
                    </Typography>
                </Box>
            </div>
        </Box>
    );
};

ForumCard.propTypes = {
    room: PropTypes.shape({
        id: PropTypes.number.isRequired,
        chatroom_name: PropTypes.string.isRequired,
        chatroom_ds: PropTypes.string.isRequired,
        admin: PropTypes.bool.isRequired,
        book_info: PropTypes.shape({
            book_img: PropTypes.string.isRequired,
            book_name: PropTypes.string.isRequired,
        }).isRequired,
        group_info: PropTypes.shape({
            current_people: PropTypes.number.isRequired,
            limit_people: PropTypes.number.isRequired,
        }).isRequired,
    }).isRequired,
    onClick: PropTypes.func.isRequired,
};

export default ForumCard;

