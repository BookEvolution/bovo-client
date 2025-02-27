import { Container } from "@mui/material";
import styles from "./Layout.module.css";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../header/Header";
import { useDispatch, useSelector } from "react-redux";
import { toggleLogoutModal } from "../../store/logout/LogeoutSlice";
import LogoutModal from "../../components/logoutModal/LogoutModal";

const Layout = () => {
    const location = useLocation();  // 현재 경로 가져오기
    const dispatch = useDispatch();
    const isLogout = useSelector((state) => state.logout.isLogout); //logout 모달 상태

    const onLogout = (state) => {
        dispatch(toggleLogoutModal(state));
    } 

    return (
        <Container className={styles.layout} disableGutters>
            {location.pathname !== "/404" && <Header onLogout={onLogout} />}
            <Outlet />
            {isLogout && <LogoutModal />}
        </Container>
    );
};

export default Layout;