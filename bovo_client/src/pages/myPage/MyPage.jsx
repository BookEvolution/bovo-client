import { Container, Box, Typography, LinearProgress, Link } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import styles from './MyPage.module.css';
import { useNavigate } from "react-router-dom";
import MenuList from "../../components/myPageListMenu/MenuList";
import { useDispatch, useSelector } from "react-redux";
import { toggleLogoutModal } from "../../store/logout/LogeoutSlice";
import LogoutModal from "../../components/logoutModal/LogoutModal";
import { useEffect, useState } from "react";
import { fetchMyPageData } from "../../api/UserApi.js";
import { logout } from "../../api/AccountManager"; // ✅ logout 함수 import
import profileImages from "../../constant/ProfileImg.js";
import bedgeImages from "../../constant/BedgeImg.js";

const MyPage = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userMedalSrc, setUserMedalSrc] = useState(""); // 뱃지 이미지 상태
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isLogout = useSelector((state) => state.logout.isLogout);

    const handleLogoutModal = (state) => {
        dispatch(toggleLogoutModal(state));
    };

    useEffect(() => {

        const fetchData = async () => {
            try {
                const data = await fetchMyPageData();
                setUserData(data); // ✅ 받아온 데이터를 상태에 저장

                // ✅ 데이터가 설정된 후 뱃지 이미지 경로 업데이트
                const foundMedal = bedgeImages.find((item) => item.key === data?.medal)?.src;
                setUserMedalSrc(foundMedal);
            } catch (err) {
                setError("데이터를 불러오는 중 오류가 발생했습니다.", err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // ✅ 로그아웃 핸들러 함수
    const handleLogout = async () => {
        await logout(); // 로그아웃 실행
        dispatch(toggleLogoutModal(false)); // 모달 닫기
        navigate("/login"); // ✅ 로그인 페이지로 이동
    };

    if (loading) {
        return (
            <Container className={styles.myPageContainer}>
                <Typography sx={{ fontSize: "2rem", textAlign: "center" }}>
                    로딩 중...
                </Typography>
            </Container>
        );
    }
    
    if (error) {
        return (
            <Container className={styles.myPageContainer}>
                <Typography sx={{ fontSize: "2rem", textAlign: "center", color: "red" }}>
                    {error}
                </Typography>
            </Container>
        );
    }

    return (
        <Container className={styles.myPageContainer}>
            <Box className={styles.profileImgWrapper}>
                <img src={userData?.profile_picture || profileImages[5].src} alt="프로필 이미지" className={styles.profileImg}/>
            </Box>
            <Typography 
                className={styles.nickNameWrapper} 
                sx={{fontSize: "3rem", fontWeight: "bold"}}
            >
                {userData?.nickname || "닉네임 없음"}
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
                    {userData?.level || 1}
                </Typography>
            </Box>
            <Container className={styles.expBarContainer}>
                <Box className={styles.expBarWrapper}>
                    <LinearProgress
                        variant="determinate"
                        value={userData?.exp || 0}
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
                        {userData?.exp || 0}
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
                            <img src={userMedalSrc} alt="독서 성과 뱃지"/>
                        </Box>
                        <Box className={styles.rpContent}>
                            <Typography 
                                className={styles.rpCount}
                                sx={{
                                    width: "10.625rem",
                                    fontSize: "5rem", 
                                    fontWeight: "Bold", 
                                    color: "#739CD4",
                                    marginRight: "11rem",
                                }}
                            >
                                {userData?.total_book_num || 0}
                            </Typography>
                            <Typography
                                className={styles.rpText}
                                sx={{
                                    width: "10.625rem",
                                    fontSize: "2rem",
                                    marginLeft: "11rem",
                                }}
                            >
                                권째 기록 중
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </Container>
            <MenuList onLogout={handleLogoutModal} />
            {isLogout && <LogoutModal handleLogout={handleLogout}/>}
        </Container>
    );
};

export default MyPage;