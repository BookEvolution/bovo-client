import { Container } from "@mui/material";
import styles from "./Layout.module.css";
import { Outlet } from "react-router-dom";
import Header from "../header/Header";

const Layout = () => {
    return (
        <Container className={styles.layout} disableGutters>
            <Header />
            <Outlet />
        </Container>
    );
};

export default Layout;