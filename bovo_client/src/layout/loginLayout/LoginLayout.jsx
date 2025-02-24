import { Container, Box } from "@mui/material";
import styles from "./LoginLayout.module.css";
import { Outlet } from 'react-router-dom';
import logoImage from '../../assets/logo/logo.png';

const LoginLayout = () => {
    return (
        <Container className={styles.loginContainer}>
            <Box className={styles.logoWrapper}>
                <img src={logoImage} alt="logo" className={styles.logoImage}/>
            </Box>
            <Outlet />
        </Container>
    );
};

export default LoginLayout;