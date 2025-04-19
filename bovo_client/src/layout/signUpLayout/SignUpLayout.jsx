import Container from '@mui/material/Container';
import styles from "./SignUpLayout.module.css";
import { Outlet } from "react-router-dom";

const SignUpLayout = () => {
    return (
        <Container className={styles.signUpContainer}>
            <Outlet />
        </Container>
    );
};

export default SignUpLayout;