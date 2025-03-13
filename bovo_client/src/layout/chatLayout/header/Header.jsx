import PropTypes from 'prop-types'; // PropTypes 임포트
import { Box, IconButton, Typography } from "@mui/material";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import MenuIcon from "@mui/icons-material/Menu";
import styles from "./Header.module.css";
import { Link } from "react-router-dom";

const Header = ({ toggleSidebar }) => {

    return (
        <Box className={styles.headerContainer}>
            <Link to='/forum'>
                <IconButton className={styles.iconBtn}>
                    <ArrowBackIosNewIcon sx={{fontSize: "2rem"}} />
                </IconButton>
            </Link>
            <Typography
                sx={{
                    fontSize: "2rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                채팅방 이름
            </Typography>
            <IconButton className={styles.iconBtn} onClick={toggleSidebar(true)}>
                <MenuIcon sx={{ fontSize: "3rem" }}/>
            </IconButton>
        </Box>
    );
};

export default Header;

Header.propTypes = {
    toggleSidebar: PropTypes.func.isRequired, // toggleSidebar는 함수 타입이고 필수 props
};