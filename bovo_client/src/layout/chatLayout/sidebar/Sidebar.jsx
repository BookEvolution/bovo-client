import PropTypes from 'prop-types'; // PropTypes 임포트
import { Avatar, Box, Container, Drawer, IconButton, List, ListItem, ListItemAvatar, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import LogoutIcon from '@mui/icons-material/Logout';
import styles from "./Sidebar.module.css";
import profileImages from '../../../constant/ProfileImg';

const Sidebar = ({ open, toggleSidebar, roomName, handleExitClick, userList}) => {
    return (
        <Drawer anchor="right" open={open} onClose={toggleSidebar(false)}>
            <Container className={styles.sideBarContainer}>
                <Box className={styles.sidebarHeader}>
                    <Typography 
                        sx={{
                            marginLeft: "1rem",
                            fontSize: "2rem",
                            fontWeight: "bold"
                        }}
                    >
                        {roomName}
                    </Typography>
                    <IconButton onClick={toggleSidebar(false)}>
                        <CloseIcon sx={{fontSize: "2rem"}} />
                    </IconButton>
                </Box>
                <Box className={styles.userListContainer}>
                    <Typography
                        sx={{
                            marginLeft: "1rem",
                            fontSize: "2rem"
                        }}
                    >
                        대화 상대
                    </Typography>
                    <List className={styles.userList}>
                        {/* userList가 유효한 배열인지 확인 */}
                        {Array.isArray(userList) && userList.length > 0 ? (
                            userList.map((user, index) => (
                                <ListItem key={index} className={styles.userListItem}>
                                    <ListItemAvatar className={styles.userAvatar}>
                                        <Avatar src={profileImages[user.profileImageId] ? profileImages[user.profileImageId].src : ""} sx={{ width: "4rem", height: "4rem" }} />
                                    </ListItemAvatar>
                                    <Typography sx={{ fontSize: "1.5rem" }}>
                                        {user.nickname}
                                    </Typography>
                                </ListItem>
                            ))
                        ) : (
                            // userList가 비어있거나 없는 경우 처리
                            <Typography sx={{ fontSize: "1.5rem", marginLeft: "1rem" }}>
                                사용자 목록이 없습니다.
                            </Typography>
                        )}
                    </List>
                </Box>
                <Box className={styles.footerContainer} onClick={handleExitClick}>
                    <Box>
                        <LogoutIcon sx={{fontSize: "2rem"}} />
                    </Box>
                    <Typography 
                        sx={{
                            fontSize: "2rem",
                            fontWeight: 500
                        }}
                    >
                        채팅방 나가기
                    </Typography>
                </Box>
            </Container>
        </Drawer>
    );
};

export default Sidebar;

Sidebar.propTypes = {
    open: PropTypes.bool.isRequired, // open은 boolean 타입이고 필수 props
    toggleSidebar: PropTypes.func.isRequired, // toggleSidebar는 함수 타입이고 필수 props
    roomName: PropTypes.string.isRequired,
    handleExitClick: PropTypes.func.isRequired,
    userList: PropTypes.array.isRequired, // userList는 배열 타입이고 필수 props
};