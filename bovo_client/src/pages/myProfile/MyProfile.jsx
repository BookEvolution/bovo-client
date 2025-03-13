import PropTypes from 'prop-types'; // PropTypes 임포트
import { Box, Button, Container } from "@mui/material";
import styles from "./MyProfile.module.css";
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ProfileInfoItem from "../../components/myProfile/profileInfoItem/ProfileInfoItem";
import WithdrawModal from '../../components/withdrawModal/WithdrawModal';
import { fetchMyProfileData } from '../../api/UserApi';
import { withdraw } from '../../api/AccountManager.js';
import bedgeImages from '../../constant/BedgeImg.js';

// MyProfile 페이지지
const MyProfile = () => {
    const navigate = useNavigate();
    // 회원 탈퇴 모달 상태 관리
    const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userMedalSrc, setUserMedalSrc] = useState(""); // 기본값 설정

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchMyProfileData();
                setUserData(data);
                // ✅ `medal`에 해당하는 이미지 찾기
                const foundMedal = bedgeImages.find((item) => item.key === data.medal)?.src;
                setUserMedalSrc(foundMedal);
            } catch (error) {
                console.log(error)
                setError("프로필 데이터를 불러오는 중 오류 발생");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // 회원 탈퇴 모달 열기
    const openWithdrawModal = () => {
        setIsWithdrawModalOpen(true);
    };

    // 회원 탈퇴 모달 닫기
    const closeWithdrawModal = () => {
        setIsWithdrawModalOpen(false);
    };

    const myInfoLists = [
        {title: "닉네임", content: userData?.nickname || "사용자", src: null},
        {title: "이메일", content: userData?.email || "알 수 없음", src: null},
        {title: "레벨", content: userData?.level || 0, src: null},
        {title: "지난주 독서성과", content: null, src: userMedalSrc}
    ]

    const handleWithdraw = async () => {
        if (!userData?.email) {
            console.error("이메일이 존재하지 않습니다.");
            return;
        }

        await withdraw(userData.email);
        // 로그아웃 처리 후 로그인 페이지로 이동
        navigate("/login");
    };

    if (loading) return <p>로딩 중...</p>;
    if (error) return <p>{error}</p>;

    return (
        <Container className={styles.myProfileContainer}>
            <Box className={styles.profileImgWrapper}>
                <img src={userData.profile_picture} alt="프로필 이미지" className={styles.profileImg}/>
            </Box>
            <Box className={styles.profileInfoContainer}>
                {myInfoLists.map(({ title, content, src }) => (
                    <ProfileInfoItem key={title} title={title} content={content} src={src} />
                ))}
            </Box>
            <Box className={styles.btnWrapper}>
                <Button 
                    component={Link}
                    to="/mypage/myprofile/edit" 
                    className={styles.btn} 
                    sx={{
                        backgroundColor: "#BDE5F1",
                        fontSize: "2.1875rem",
                        color: "#FFFFFF",
                        borderRadius: "1.5625rem"
                    }}
                >
                    프로필 수정
                </Button>
                <Button 
                    className={styles.btn}
                    onClick={openWithdrawModal} 
                    sx={{
                        backgroundColor: "#FCA18D",
                        fontSize: "2.1875rem",
                        color: "#FFFFFF",
                        borderRadius: "1.5625rem"
                    }}
                >
                    회원 탈퇴
                </Button>
            </Box>
            { isWithdrawModalOpen && 
                <WithdrawModal open={openWithdrawModal} onClose={closeWithdrawModal} handleWithdraw={handleWithdraw}/>}
        </Container>
    );
};

// props 타입 정의
ProfileInfoItem.propTypes = {
    title: PropTypes.string.isRequired, // title은 string 타입이고 필수 props
    content: PropTypes.node.isRequired, // content는 string 또는 JSX 요소(ReactNode) 가능
};

export default MyProfile;

