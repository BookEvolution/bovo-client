import PropTypes from "prop-types";
import { Box, Container, IconButton } from "@mui/material";
import styles from "./Header.module.css";
import logoImage from "../../assets/logo/logo.png"
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import SideBar from "../sideBar/SideBar";

const Header = ({onLogout}) => {
    const location = useLocation(); // 현재 경로 가져오기
    const isMainPage = location.pathname === "/"; // 메인 페이지 여부 확인
    const [open, setOpen] = useState(false); // 사이드바 열림 상태 관리

    const toggleDrawer = () => {
        setOpen(!open); // 사이드바 열기/닫기 토글
    };

    const handleLogout = () => {
        toggleDrawer();
        onLogout(true);
    }

    return (
        <Container className={styles.header}>
            <Box className={styles.bar}>
                <Box className={styles.logoWrapper}>
                    <img src={logoImage} alt="logo" className={styles.logo} />
                </Box>
                <Box className={styles.iconContainer}>
                    {isMainPage && ( // 메인 페이지일 때만 렌더링
                        <IconButton sx={{ padding: 0 }} className={styles.iconBtn}>
                            <Link to="/search">
                                <SearchIcon sx={{ fontSize: "2.5rem", color: "#739CD4" }} />
                            </Link>
                        </IconButton>
                    )}
                    <IconButton sx={{ padding: 0 }} className={styles.iconBtn} onClick={toggleDrawer}>
                        <MenuIcon sx={{ fontSize: "2.5rem", color: "#739CD4" }}/>
                    </IconButton>
                </Box>
            </Box>
            {/* 사이드바 컴포넌트 */}
            <SideBar open={open} toggleDrawer={toggleDrawer} handleLogout={handleLogout}/>
        </Container>
    );
};


export default Header;

Header.propTypes = {
    onLogout: PropTypes.func.isRequired, // onLogout은 필수 함수형 prop
};