import { Container, Box, Typography, LinearProgress, Link } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import styles from './MyPage.module.css';
import profile6 from "../../assets/profile/profile_6.png";
import bedge from "../../assets/bedge/bedge6.png";
import { useNavigate } from "react-router-dom";
import MenuList from "../../components/myPageListMenu/MenuList";
import { useDispatch, useSelector } from "react-redux";
import { toggleLogoutModal } from "../../store/logout/LogeoutSlice";
import LogoutModal from "../../components/logoutModal/LogoutModal";
import { useEffect, useState } from "react";
import { fetchMyPageData } from "../../api/UserApi";

const MyPage = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isLogout = useSelector((state) => state.logout.isLogout);

    const handleLogout = (state) => {
        dispatch(toggleLogoutModal(state));
    };

    useEffect(() => {

        const fetchData = async () => {
            try {
                await fetchMyPageData();
            } catch (err) {
                setError("데이터를 불러오는 중 오류가 발생했습니다.", err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <Container className={styles.myPageContainer}>
            <Box className={styles.profileImgWrapper}>
                <img src={profile6} alt="프로필 대체 이미지" className={styles.profileImg}/>
            </Box>
            <Typography 
                className={styles.nickNameWrapper} 
                sx={{fontSize: "3rem", fontWeight: "bold"}}
            >
                김구름
            </Typography>
            <Box className={styles.levelContianer}>
                <Typography 
                    className={styles.levelWrapper}
                    sx={{fontSize: "2rem", fontWeight: "bold"}}
                >
                    Lv
                </Typography>
                <Typography
                    className={styles.lvCountWrapper}
                    sx={{fontSize: "2rem"}}
                >
                    1
                </Typography>
            </Box>
            <Container className={styles.expBarContainer}>
                <Box className={styles.expBarWrapper}>
                    <LinearProgress
                        variant="determinate"
                        value={70}
                        sx={{
                            width: "100%",
                            height: "1.25rem",
                            borderRadius: "6.25rem",
                            backgroundColor: "#E8F1F6",
                            "& .MuiLinearProgress-bar": {
                                borderRadius: "6.25rem",
                                background: "#739CD4",
                            },
                        }}
                    />
                </Box>
                <Box className={styles.expCountWrapper}>
                    <Typography 
                        className={styles.exp}
                        sx={{fontSize: "1.5rem"}}
                    >
                        70
                    </Typography>
                    <Typography
                        className={styles.entireExp}
                        sx={{fontSize: "1.5rem", fontWeight: "bold"}}
                    >
                        /100
                    </Typography>
                </Box>
            </Container>
            <Container className={styles.rpContainer}>
                <Box className={styles.rpHeader}>
                    <Typography 
                        className={styles.rpTitle}
                        sx={{fontSize: "2rem"}}
                    >
                        독서 성과
                    </Typography>
                    <Link
                        component="button"
                        onClick={() => navigate("/mypage/exp")}
                        className={styles.rpLink}
                        sx={{
                            color: "#739CD4", 
                            textDecoration: "none",
                            fontSize: "1.25rem",
                            fontWeight: "bold"
                        }}
                    >
                        <AddIcon />
                        더보기
                    </Link>
                </Box>
                <Box className={styles.rpContentContainer}>
                    <Box className={styles.rpContentWrapper}>
                        <Box className={styles.rpBedge}>
                            <img src={bedge} alt="독서 성과 뱃지"/>
                        </Box>
                        <Box className={styles.rpContent}>
                            <Typography 
                                className={styles.rpCount}
                                sx={{fontSize: "5rem", fontWeight: "Bold", color: "#739CD4"}}
                            >
                                486
                            </Typography>
                            <Typography
                                className={styles.rpText}
                                sx={{fontSize: "2rem"}}
                            >
                                권째 기록 중
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </Container>
            <MenuList onLogout={handleLogout} />
            {isLogout && <LogoutModal />}
        </Container>
    );
};

export default MyPage;