import { Container } from "@mui/material";
import styles from "./Layout.module.css";
import { Outlet } from "react-router-dom";
import Header from "../header/Header";
import { useDispatch, useSelector } from "react-redux";
import { toggleLogoutModal } from "../../store/logout/LogeoutSlice";
import LogoutModal from "../../components/logoutModal/LogoutModal";

const Layout = () => {
    const dispatch = useDispatch();
    const isLogout = useSelector((state) => state.logout.isLogout);

    const onLogout = (state) => {
        dispatch(toggleLogoutModal(state));
    } 

    return (
        <Container className={styles.layout} disableGutters>
            <Header onLogout={onLogout}/>
            <Outlet />
            {isLogout && <LogoutModal />}
        </Container>
    );
};

export default Layout;