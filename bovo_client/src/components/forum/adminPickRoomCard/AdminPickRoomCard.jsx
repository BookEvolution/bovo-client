import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import GroupIcon from '@mui/icons-material/Group';
import styles from "./AdminPickRoomCard.module.css";

const AdminPickRoomCard = ({ adminPickRoom, handleOpen }) => {
    if (!adminPickRoom) return null;

    return (
        <Box className={styles.adminPickWrapper} onClick={() => handleOpen(adminPickRoom.id)}>
            <Box>
                <img src={adminPickRoom.book_info.book_img} alt={adminPickRoom.book_info.book_name} />
            </Box>
            <Box
                sx={{
                    backgroundColor: adminPickRoom.group_info.current_people === adminPickRoom.group_info.limit_people
                        ? "#E8F1F6" // 모집완료 색상
                        : "#F3E38B", // 모집중 색상
                }}
                className={styles.recruiting}
            >
                {adminPickRoom.group_info.current_people === adminPickRoom.group_info.limit_people
                    ? "모집완료"
                    : "모집중"}
            </Box>
            <div className={styles.bottomContainer}>
                <Typography sx={{ fontSize: "1.75rem", letterSpacing: "0.0175rem", fontWeight: 500, textAlign: "left" }}>
                    {adminPickRoom.chatroom_name}
                </Typography>
                <Box className={styles.dueDateWrapper}>
                    <Typography sx={{ fontSize: "1.25rem", fontWeight: 500, letterSpacing: "0.0125rem" }}>
                        {adminPickRoom.duration.start_date}
                    </Typography>
                    <Typography sx={{ fontSize: "1.25rem", fontWeight: 500, letterSpacing: "0.0125rem" }}>
                        ~
                    </Typography>
                    <Typography sx={{ fontSize: "1.25rem", fontWeight: 500, letterSpacing: "0.0125rem" }}>
                        {adminPickRoom.duration.end_date}
                    </Typography>
                </Box>
                <Box className={styles.groupLimitContainer}>
                    <Box className={styles.IconWrapper}>
                        <GroupIcon sx={{ fontSize: "2rem" }} />
                    </Box>
                    <Typography sx={{ fontSize: "1.75rem", fontWeight: 500, lineHeight: "0.0125rem" }}>
                        {adminPickRoom.group_info.current_people}
                    </Typography>
                    <Typography sx={{ fontSize: "1.75rem", fontWeight: 500, lineHeight: "0.0125rem" }}>
                        /
                    </Typography>
                    <Typography sx={{ fontSize: "1.75rem", fontWeight: 500, lineHeight: "0.0125rem" }}>
                        {adminPickRoom.group_info.limit_people}
                    </Typography>
                </Box>
            </div>
        </Box>
    );
};

export default AdminPickRoomCard;

// ✅ PropTypes 설정
AdminPickRoomCard.propTypes = {
    adminPickRoom: PropTypes.shape({
        admin: PropTypes.bool.isRequired,
        book_info: PropTypes.shape({
            book_img: PropTypes.string.isRequired,
            book_name: PropTypes.string.isRequired,
        }).isRequired,
        chatroom_ds: PropTypes.string.isRequired,
        chatroom_name: PropTypes.string.isRequired,
        duration: PropTypes.shape({
            start_date: PropTypes.string.isRequired,
            end_date: PropTypes.string.isRequired,
        }).isRequired,
        group_info: PropTypes.shape({
            limit_people: PropTypes.number.isRequired,
            current_people: PropTypes.number.isRequired,
        }).isRequired,
        id: PropTypes.number.isRequired,
    }).isRequired,
    handleOpen: PropTypes.func.isRequired,
};