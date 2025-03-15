import PropTypes from 'prop-types'; // PropTypes 임포트
import { Box, IconButton, Typography } from "@mui/material";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import MenuIcon from "@mui/icons-material/Menu";
import styles from "./Header.module.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { clearChat } from '../../../store/chatInfo/ChatSlice';

const Header = ({ toggleSidebar, roomName }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // ArrowBackIcon 클릭 시 처리 함수
    const handleGoBack = () => {
        dispatch(clearChat()); // 채팅 초기화
        navigate('/forum'); // 이전 페이지로 이동
    };

    return (
        <Box className={styles.headerContainer}>
            <IconButton className={styles.iconBtn} onClick={handleGoBack}>
                <ArrowBackIosNewIcon sx={{fontSize: "2rem"}} />
            </IconButton>
            <Typography
                sx={{
                    fontSize: "2rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                {roomName}
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
    roomName: PropTypes.string.isRequired,
};