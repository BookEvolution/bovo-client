import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';
import Link from '@mui/material/Link';
import AddIcon from "@mui/icons-material/Add";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import styles from './MyPage.module.css';
import { useNavigate } from "react-router-dom";
import MenuList from "../../components/myPageListMenu/MenuList";
import { useDispatch, useSelector } from "react-redux";
import { toggleLogoutModal } from "../../store/logout/LogoutSlice.js";
import LogoutModal from "../../components/logoutModal/LogoutModal";
import { useEffect, useState } from "react";
import { useMyPageQuery } from "../../api/UserApi.js";
import { logout } from "../../api/AccountManager"; // ✅ logout 함수 import
import profileImages from "../../constant/ProfileImg.js";
import bedgeImages from "../../constant/BedgeImg.js";

const MyPage = () => {
    const { data: userData, isLoading, isError, error } = useMyPageQuery(); // ✅ react-query 사용
    const [userMedalSrc, setUserMedalSrc] = useState(""); // 뱃지 이미지 상태
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isLogout = useSelector((state) => state.logout.isLogout);

    const handleLogoutModal = (state) => {
        dispatch(toggleLogoutModal(state));
    };

    // ✅ 뱃지 이미지 설정
    useEffect(() => {
        if (userData?.medal) {
            const foundMedal = bedgeImages.find((item) => item.key === userData.medal)?.src;
            setUserMedalSrc(foundMedal);
        }
    }, [userData]);

    // ✅ 로그아웃 핸들러 함수
    const handleLogout = async () => {
        await logout(); // 로그아웃 실행
        dispatch(toggleLogoutModal(false)); // 모달 닫기
        navigate("/login"); // ✅ 로그인 페이지로 이동
    };

    if (isLoading) {
        return (
            <Container className={styles.myPageContainer}>
                <Typography sx={{ fontSize: "2rem", textAlign: "center" }}>
                    로딩 중...
                </Typography>
            </Container>
        );
    }
    
    if (isError) {
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
            <Box className={styles.expBarContainer}>
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
            </Box>
            <Box className={styles.rpContainer}>
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
                        {userData?.medal === "NONE" ? (
                            <WorkspacePremiumIcon sx={{ fontSize: "9rem", color: "#D9D9D9" }} />
                        ) : (
                            <img src={userMedalSrc} alt="독서 성과 뱃지" />
                        )}
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
            </Box>
            <MenuList onLogout={handleLogoutModal} />
            {isLogout && <LogoutModal handleLogout={handleLogout}/>}
        </Container>
    );
};

export default MyPage;