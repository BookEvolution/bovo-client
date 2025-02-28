import PropTypes from 'prop-types'; // PropTypes 임포트
import { Box, Container, Drawer, IconButton, ListItem } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import LogoutIcon from "@mui/icons-material/ExitToApp"; // 로그아웃 아이콘
import InfoIcon from "@mui/icons-material/Info"; // 서비스 정보 아이콘
import styles from "./SideBar.module.css";
import logoImage from '../../assets/logo/logo.png';
import { Link } from "react-router-dom";

const SideBar = ({ open, toggleDrawer, handleLogout }) => {
    const menuList = [
        {path: '/archive', sideMenu: "나의 서재"},
        {path: '/calendar', sideMenu: "캘린더"},
        {path: '/forum', sideMenu: "독서 토론방"},
        {path: '/mypage/exp', sideMenu: "퀘스트"},
        {path: '/mypage', sideMenu: "마이페이지"},
    ]

    return (
        <Drawer open={open} onClose={toggleDrawer} anchor="right">
            <Container className={styles.sideBarContainer}>
                <Box className={styles.header}>
                    <Box className={styles.logoWrapper} onClick={toggleDrawer}>
                        <Link to="/">
                            <img src={logoImage} alt="logo" className={styles.logoImage}/>
                        </Link>
                    </Box>
                    <IconButton sx={{ padding: 0 }} className={styles.iconBtn} onClick={toggleDrawer}>
                        <CloseIcon sx={{ fontSize: "2.5rem"}}/>
                    </IconButton>
                </Box>
                <ul className={styles.menu}>
                    {menuList.map((item) => (
                        <li key={item.path} className={styles.listMenu} onClick={toggleDrawer}>
                            <Link to={item.path}>
                                {item.sideMenu}
                            </Link>
                        </li>
                    ))}
                </ul>
                {/* 서비스 정보 및 로그아웃 메뉴 */}
                <Container className={styles.bottomList}>
                    {/* 서비스 정보 */}
                    <ListItem  
                        component={Link} 
                        to="/mypage/service-info" 
                        className={styles.bottom_btn} 
                        onClick={toggleDrawer}
                        sx={{ color: 'text.primary' }}
                    >
                            <Box sx={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                                <InfoIcon sx={{ fontSize: "2.5rem" }} />
                            </Box>
                            <p className={styles.item_text}>
                                서비스 정보
                            </p>
                    </ListItem>

                    {/* 로그아웃 */}
                    <ListItem 
                        component='button' 
                        className={styles.bottom_btn}
                        onClick={handleLogout}
                    >
                        <Box sx={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                            <LogoutIcon sx={{ fontSize: "2.5rem" }} />
                        </Box>
                        <p className={styles.item_text}>
                            로그아웃
                        </p>
                    </ListItem>
                </Container>
            </Container>
        </Drawer>
    );
};

// props 타입 정의
SideBar.propTypes = {
    open: PropTypes.bool.isRequired, // open은 boolean 타입이고 필수 props
    toggleDrawer: PropTypes.func.isRequired, // toggleDrawer는 함수 타입이고 필수 props
    handleLogout: PropTypes.func.isRequired
};

export default SideBar;