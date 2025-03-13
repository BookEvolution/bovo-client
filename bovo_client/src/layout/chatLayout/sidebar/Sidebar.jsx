import PropTypes from 'prop-types'; // PropTypes 임포트
import { Avatar, Box, Container, Drawer, IconButton, List, ListItem, ListItemAvatar, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import LogoutIcon from '@mui/icons-material/Logout';
import styles from "./Sidebar.module.css";
import Profile from "../../../assets/profile/profile_1.png";

const Sidebar = ({ open, toggleSidebar}) => {
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
                        채팅방 이름
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
                        <ListItem className={styles.userListItem}>
                            <ListItemAvatar className={styles.userAvatar}>
                                <Avatar src={Profile} sx={{width: "4rem", height: "4rem"}} />
                            </ListItemAvatar>
                            <Typography sx={{fontSize: "1.5rem"}}>
                                userNickname
                            </Typography>
                        </ListItem>
                    </List>
                </Box>
                <Box className={styles.footerContainer}>
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
};