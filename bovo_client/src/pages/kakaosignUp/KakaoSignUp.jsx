import { useState } from "react";
// import { useEffect } from "react";  //비활성화 필요
import { useNavigate } from "react-router-dom";
import { Box, Button, TextField, Typography, Container } from "@mui/material";
import ProfileBottomSheet from "../../components/profileImgBottomsheet/ProfileBottomSheet";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import CompleteSignUpModal from "../../components/signUpCompleteModal/CompleteSignUpModal";

const API_URL = import.meta.env.VITE_BACKEND_API_URL;

const KakaoSignUp = () => {
    const navigate = useNavigate();
    const [profileImage, setProfileImage] = useState("/src/assets/profile/profile_3.png");
    const [email, setEmail] = useState("");
    const [inputError, setInputError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    //이미지 카카오에서 안 가져올거면 제거
    // useEffect(() => {  
    //     const storedProfileImage = sessionStorage.getItem("profileImage");
    //     if (storedProfileImage) setProfileImage(storedProfileImage);
    // }, []);

    const checkEmail = async () => {
        if (!email.trim()) return;
        try {
            await axios.post(`${API_URL}/register/email`, { email });
            setEmailError("");
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setEmailError(error.response.data.message);
            } else {
                console.error("이메일 확인 실패:", error);
            }
        }
    };

    const handleProfileSelect = (profile) => {
        setProfileImage(profile.src);
        setIsBottomSheetOpen(false);
    };

    const handleSignUp = async () => {
        if (!email) {
            setInputError("이메일 필드를 입력해 주세요.");
            return;
        }

        try {
            const kakaoId = sessionStorage.getItem("kakaoId"); 
            const nickname = sessionStorage.getItem("nickname"); 
            if (!kakaoId || !nickname) {
                setInputError("카카오 로그인 정보가 없습니다.");
                return;
            }

            await axios.post(`${API_URL}/kakao/sign-up`, {
                kakaoId,
                email,
                nickname,
                profileImage, 
            });

            console.log("회원가입 성공");
            setIsModalOpen(true); 
        } catch (error) {
            if (error.response && error.response.status === 400) {
                const message = error.response.data.message;
                if (message.includes("이메일")) setEmailError(message);
            }
        }
    };

    return (
        <Container sx={{ width: "45rem", marginTop: "23rem" }}>
            <Box display="flex" flexDirection="column" alignItems="center" mb={5}>
                <h3 style={{ fontSize: "3rem", paddingBottom: "3rem", fontWeight: "500" }}>사용자 설정</h3>
                <Box
                    position="relative"
                    onClick={() => setIsBottomSheetOpen(true)}
                    sx={{
                        width: "18.75rem",
                        height: "18.75rem",
                        backgroundColor: "#E8F1F6",
                        borderRadius: "1.5rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom: "2rem",
                        marginTop: "1.5rem",
                    }}
                >
                    <img src={profileImage} alt="프로필 이미지" style={{ width: "14rem", height: "14rem", marginTop: "4.7rem" }} />
                    <SearchIcon
                        sx={{
                            position: "absolute",
                            top: "6%",
                            right: "6%",
                            fontSize: "3.8rem",
                            color: "#739CD4",
                        }}
                    />
                </Box>
            </Box>

            <Box>
                <TextField
                    fullWidth
                    variant="outlined"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={checkEmail}
                    placeholder="이메일"
                    sx={{ backgroundColor: "#E8F1F6", borderRadius: "1.3rem", "& fieldset": { border: "none" }, padding: "0.8rem 0rem", marginTop: "1rem" }}
                    inputProps={{ style: { fontSize: "1.8rem", color: "#6D6D6D", paddingLeft: "2.5rem" } }}
                />
                {emailError && <Typography textAlign="right" color="#FF0000" fontSize="1.3rem" sx={{ margin: "-1.8rem", marginRight: "0.2rem" }}>{emailError}</Typography>}
            </Box>

            <Box marginTop="5rem">
                <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={handleSignUp}
                    sx={{
                        fontSize: "2.2rem",
                        fontWeight: "600",
                        padding: "1rem",
                        borderRadius: "1rem",
                        backgroundColor: "#BDE5F1",
                        boxShadow: "none",
                        transition: "none",
                        "&:hover": { backgroundColor: "#BDE5F1" },
                        "&:focus": { backgroundColor: "#BDE5F1" },
                        "&:active": { backgroundColor: "#BDE5F1" },
                    }}
                >
                    회원가입
                </Button>
                {inputError && <Typography textAlign="right" color="#FF0000" fontSize="1.3rem" sx={{ marginTop: "1rem", marginRight: "0.2rem" }}>{inputError}</Typography>}
            </Box>

            <ProfileBottomSheet open={isBottomSheetOpen} onClose={() => setIsBottomSheetOpen(false)} onSelectProfile={handleProfileSelect} selectedProfile={profileImage} />
            <CompleteSignUpModal open={isModalOpen} handleClose={() => setIsModalOpen(false)} />
        </Container>
    );
};

export default KakaoSignUp;
