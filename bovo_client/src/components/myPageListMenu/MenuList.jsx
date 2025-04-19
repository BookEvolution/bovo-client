import PropTypes from "prop-types";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import EventIcon from "@mui/icons-material/Event";
import InfoIcon from "@mui/icons-material/Info";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import styles from "./MenuList.module.css";
import { Link } from "react-router-dom";

const menuItem = [
    { text: "내 프로필", icon: <AccountBoxIcon sx={{fontSize: "3rem"}} />, path: "/mypage/myprofile" },
    { text: "독서 캘린더", icon: <EventIcon sx={{fontSize: "3rem"}} />, path: "/calendar" },
    { text: "서비스 정보", icon: <InfoIcon sx={{fontSize: "3rem"}} />, path: "/mypage/service-info" },
    { text: "로그 아웃", icon: <ExitToAppIcon sx={{fontSize: "3rem"}} />, path: "", action: "logout" },
];

const MenuList = ({ onLogout }) => {
    return (
        <List
            className={styles.menuListContainer} 
            sx={{ backgroundColor: "#E5F1FB", borderRadius: "1.625rem" }}
        >
            {menuItem.map((item, index) => (
                item.action === "logout" ? (
                    <ListItemButton 
                        key={index}
                        className={styles.menuBtn} 
                        onClick={() => onLogout(true)}
                    >
                        <ListItemIcon className={styles.menuIcon}>
                            {item.icon}
                        </ListItemIcon>
                        <ListItemText 
                            primary={item.text}
                            primaryTypographyProps={{fontSize: "1.8rem"}}
                        />
                        <Box sx={{width: "2rem", height: "2rem", display: "flex", alignItems: "center", justifyContent: "center"}}>
                            <ChevronRightIcon sx={{ color: "#739CD4", fontSize: "3rem" }} />
                        </Box>
                    </ListItemButton>
                ) : (
                    <ListItemButton 
                        key={index}
                        className={styles.menuBtn} 
                        component={Link} // Link로 감싸기
                        to={item.path} 
                    >
                        <ListItemIcon className={styles.menuIcon}>
                            {item.icon}
                        </ListItemIcon>
                        <ListItemText 
                            primary={item.text}
                            primaryTypographyProps={{fontSize: "1.8rem"}} 
                        />
                        <Box sx={{width: "2rem", height: "2rem", display: "flex", alignItems: "center", justifyContent: "center"}}>
                            <ChevronRightIcon sx={{ color: "#739CD4", fontSize: "3rem" }} />
                        </Box>
                    </ListItemButton>
                )
            ))}
        </List>
    );
};

export default MenuList;

//props type 정의
MenuList.propTypes = {
    onLogout: PropTypes.func.isRequired, // onLogout은 필수 함수형 prop
};