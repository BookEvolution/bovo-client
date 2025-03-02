import { Box, Button, Container, Drawer, Typography } from "@mui/material";
import styles from "./ProfileBottomSheet.module.css";
import profile1 from "../../assets/profile/profile_1.png";
import profile2 from "../../assets/profile/profile_2.png";
import profile3 from "../../assets/profile/profile_3.png";
import profile4 from "../../assets/profile/profile_4.png";
import profile5 from "../../assets/profile/profile_5.png";
import profile6 from "../../assets/profile/profile_6.png";
import { useEffect, useState } from "react";


const ProfileBottomSheet = ({ open, onClose, onSelectProfile, selectedProfile }) => {
    const profileImages = [
        { key: "profile_1", src: profile1 },
        { key: "profile_2", src: profile2 },
        { key: "profile_3", src: profile3 },
        { key: "profile_4", src: profile4 },
        { key: "profile_5", src: profile5 },
        { key: "profile_6", src: profile6 },
    ];

    const [activeProfile, setActiveProfile] = useState(selectedProfile);

    useEffect(() => {
        setActiveProfile(selectedProfile);
    }, [selectedProfile, open]); // BottomSheet이 열릴 때 상태를 업데이트

    const handleSelectProfile = (profile) => {
        setActiveProfile(profile);
        onSelectProfile(profile); // 부모 컴포넌트로 선택한 프로필 전달
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
                    {profileImages.map(({ key, src }) => (
                        <Box 
                            key={key} 
                            className={styles.profileImgWrapper} 
                            sx={{
                                backgroundColor: activeProfile === key ? "#BDE5F1" : "#FFFFFF"
                            }}
                            onClick={() => handleSelectProfile(key)}
                        >
                            <Box className={styles.profileImg}>
                                <img src={src} alt={key} />
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
                    onClick={onClose}
                >
                    선택하기
                </Button>
            </Container>
        </Drawer>
    );
};

export default ProfileBottomSheet;