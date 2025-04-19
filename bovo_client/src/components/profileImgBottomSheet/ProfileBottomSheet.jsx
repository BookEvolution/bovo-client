import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Drawer from "@mui/material/Drawer";
import styles from "./ProfileBottomSheet.module.css";
import { useEffect, useState } from "react";
import profileImages from "../../constant/ProfileImg.js";


const ProfileBottomSheet = ({ open, onClose, onSelectProfile, selectedProfile }) => {

    const [activeProfile, setActiveProfile] = useState(selectedProfile);

    useEffect(() => {
        setActiveProfile(selectedProfile);
    }, [selectedProfile, open]); // BottomSheet이 열릴 때 상태를 업데이트

    // 프로필 이미지 선택시 활성화
    const handleSelectProfile = (profile) => {
        setActiveProfile(profile);
    };

    // 확인 버튼 클릭시 반영
    const handleConfirm = () => {
        if (activeProfile) {
            onSelectProfile(activeProfile); // 부모 컴포넌트로 전달
        }
        onClose(); // 바텀시트 닫기
    };

    return (
        <Drawer 
            anchor="bottom" 
            open={open} 
            onClose={onClose}
            PaperProps={{
                sx: {
                    backgroundColor: "#E8F1F6",  // BottomSheet 배경
                    borderTopLeftRadius: "1.5625rem",  // 상단 모서리 둥글게
                    borderTopRightRadius: "1.5625rem",
                    padding: "1rem 2.5625rem",  // ✅ 내부 여백 조정
                    height: "47.5rem", // ✅ BottomSheet 높이
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "4rem"
                },
            }}
        >
            <Box className={styles.header} onClick={onClose}/>
            <Container className={styles.profileEditContainer}>
                <Box className={styles.profileImgContainer}>
                    {profileImages.map((profile) => (
                        <Box 
                            key={profile.key} 
                            className={styles.profileImgWrapper} 
                            sx={{
                                backgroundColor: activeProfile?.key === profile.key ? "#BDE5F1" : "#FFFFFF"
                            }}
                            onClick={() => handleSelectProfile(profile)}
                        >
                            <Box className={styles.profileImg}>
                                <img src={profile.src} alt={profile.key} />
                            </Box>
                        </Box>
                    ))}
                </Box>
                <Button
                    className={styles.choiceBtn} 
                    fullWidth 
                    variant="contained" 
                    sx={{
                            borderRadius: "1.5625rem",
                            backgroundColor: "#BDE5F1",
                            color: "#FFFFFF", 
                            fontSize: "1.5rem", 
                            lineHeight: "0.015rem" 
                        }} 
                    onClick={handleConfirm}
                >
                    선택하기
                </Button>
            </Container>
        </Drawer>
    );
};

ProfileBottomSheet.propTypes = {
    open: PropTypes.bool,
    onClose: PropTypes.func,
    onSelectProfile: PropTypes.func,
    selectedProfile:  PropTypes.object,
};

export default ProfileBottomSheet;