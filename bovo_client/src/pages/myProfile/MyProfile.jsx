import PropTypes from 'prop-types'; // PropTypes 임포트
import { Box, Button, Container } from "@mui/material";
import profile6 from "../../assets/profile/profile_6.png";
import bedge from "../../assets/bedge/bedge6.png";
import styles from "./MyProfile.module.css";
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ProfileInfoItem from "../../components/myProfile/profileInfoItem/ProfileInfoItem";
import WithdrawModal from '../../components/withdrawModal/WithdrawModal';
// import { fetchMyProfileData } from '../../api/UserApi';
import withdraw from '../../api/AccountManager';

// MyProfile 페이지지
const MyProfile = () => {
    const navigate = useNavigate();
    // 회원 탈퇴 모달 상태 관리
    const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // const data = await fetchMyProfileData();
                // setUserData(data);
            } catch (error) {
                console.error("프로필 데이터를 불러오는 중 오류 발생:", error);
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
        {title: "닉네임", content: "김구르미", src: null},
        {title: "이메일", content: "goorm102@naver.com", src: null},
        {title: "레벨", content: "1", src: null},
        {title: "지난주 독서성과", content: null, src: {bedge}}
    ]

    const handleWithdraw = async () => {
        const emailInfo = myInfoLists.find(item => item.title === "이메일")?.content;
        // await withdraw(emailInfo);
        // 로그아웃 처리 후 로그인 페이지로 이동
        navigate("/login");
    };

    return (
        <Container className={styles.myProfileContainer}>
            <Box className={styles.profileImgWrapper}>
                <img src={profile6} alt="프로필 대체 이미지" className={styles.profileImg}/>
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

