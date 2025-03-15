import { useState } from "react";
// import { useEffect } from "react";  //비활성화 필요
import { useNavigate } from "react-router-dom";
import { Box, Button, TextField, Typography, Container } from "@mui/material";
import ProfileBottomSheet from "../../components/profileImgBottomsheet/ProfileBottomSheet";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import CompleteSignUpModal from "../../components/signUpCompleteModal/CompleteSignUpModal";
import profileImages from "../../constant/ProfileImg";
import { disableInterceptor, enableInterceptor } from "../../api/Auth";

const API_URL = import.meta.env.VITE_BACKEND_API_URL;

const KakaoSignUp = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [inputError, setInputError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [profileImage, setProfileImage] = useState(profileImages[0].src);
    const [nickname, setNickname] = useState("");
    const [nicknameError, setNicknameError] = useState("");

    const isSignUpDisabled = 
    nicknameError !== "사용 가능한 닉네임입니다" ||
    emailError !== "사용 가능한 이메일입니다" ||
    !nickname.trim() || 
    !email.trim();


    const checkNickname = async () => {
        if (!nickname.trim()) {
            setNicknameError("");
            return;
        }
        try {
            const response = await axios.post(`${API_URL}/register/nickname`, { nickname });
    
            if (response.status === 200) {
                setNicknameError("사용 가능한 닉네임입니다");
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setNicknameError("중복된 닉네임입니다");
            } else {
                console.error("닉네임 확인 실패", error);
            }
        }
    };
    

    const checkEmail = async () => {
        if (!email.trim()) {
            setEmailError("");
            return;
        }
        try {
            const response = await axios.post(`${API_URL}/register/email`, { email });
    
            if (response.status === 200) {
                setEmailError("사용 가능한 이메일입니다");
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setEmailError("중복된 이메일입니다");
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
        if (!nickname || !email) {
            setInputError("모든 필드를 입력해 주세요");
            return;
        }
    
        if (nicknameError === "중복된 닉네임입니다" || emailError === "중복된 이메일입니다") {
            setInputError("입력 필드를 다시 확인해주세요");
            return;
        }

    disableInterceptor();

    const token = sessionStorage.getItem("AccessToken");
    if (!token) {
        console.error("AccessToken 없음");
        return;
    }
        try {
            await axios.post("https://c374-112-158-33-80.ngrok-free.app/kakao/register", {
                email,
                nickname,
                profile_picture: profileImage, 
            },
                {   
                    withCredentials: true,
                    headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`, 
                    "ngrok-skip-browser-warning": "69420",
                },
            }
        );

            console.log("회원가입 성공");
            setIsModalOpen(true); 
            enableInterceptor();
        } catch (error) {
            if (error.response && error.response.status === 400) {
                const message = error.response.data.message;
                if (message.includes("이메일")) setEmailError(message);
                if (message.includes("닉네임")) setNicknameError(message);
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
                <Box sx={{width:"43rem"}}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        value={nickname}
                        onChange={(e) => {
                            setNickname(e.target.value);
                            setNicknameError(""); 
                        }}
                        onBlur={checkNickname} 
                        placeholder="닉네임"
                        sx={{
                            width:"42.5rem",
                            marginLeft:"3.2rem",
                            position: "absolute",
                            top: "57rem",
                            left: "0",
                            backgroundColor: "#E8F1F6",
                            borderRadius: "1.3rem",
                            "& fieldset": { border: "none" },
                            padding: "0.8rem 0rem",
                        }}
                        inputProps={{ style: { fontSize: "1.8rem", color: "#6D6D6D", paddingLeft: "2.5rem" } }}
                    />
                    {nicknameError && (
                        <Typography
                            textAlign="right"
                            fontSize="1.3rem"
                            sx={{
                                marginTop: "9.1rem",
                                marginRight: "0.5rem",
                                color: nicknameError === "사용 가능한 닉네임입니다" ? "#0066CC" : "#FF0000",
                            }}
                        >
                            {nicknameError}
                        </Typography>
                    )}
                    <TextField
                        fullWidth
                        variant="outlined"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            setEmailError(""); 
                        }}
                        onBlur={checkEmail} 
                        placeholder="이메일"
                        sx={{
                            width:"42.5rem",
                            marginLeft:"3.2rem",
                            position: "absolute",
                            top: "66rem",
                            left: "0",
                            backgroundColor: "#E8F1F6",
                            borderRadius: "1.3rem",
                            "& fieldset": { border: "none" },
                            padding: "0.8rem 0rem",
                        }}
                        inputProps={{ style: { fontSize: "1.8rem", color: "#6D6D6D", paddingLeft: "2.5rem" } }}
                    />
                    {emailError && (
                        <Typography
                            textAlign="right"
                            fontSize="1.3rem"
                            sx={{
                                marginTop: "7rem",
                                marginRight: "0.5rem",
                                color: emailError === "사용 가능한 이메일입니다" ? "#0066CC" : "#FF0000",
                            }}
                        >
                            {emailError}
                        </Typography>
                    )}
                </Box>
            </Box>

            <Box marginTop="1rem" sx={{position:"absolute", left:"3.5rem", top:"76rem"}}>
                <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={handleSignUp}
                    disabled={isSignUpDisabled}
                    sx={{
                        fontSize: "2.2rem",
                        fontWeight: "600",
                        padding: "1rem 17rem",
                        borderRadius: "1rem",
                        backgroundColor: isSignUpDisabled ? "#B0BEC5" : "#BDE5F1",
                        boxShadow: "none",
                        transition: "none",
                    }}
                >
                    회원가입
                </Button>
                {inputError && <Typography textAlign="right" color="#FF0000" fontSize="1.3rem" sx={{ marginTop: "0.5rem", marginRight: "0.2rem" }}>{inputError}</Typography>}
            </Box>

            <ProfileBottomSheet open={isBottomSheetOpen} onClose={() => setIsBottomSheetOpen(false)} onSelectProfile={handleProfileSelect} selectedProfile={profileImage} />
            <CompleteSignUpModal open={isModalOpen} handleClose={() => setIsModalOpen(false)} />
        </Container>
    );
};

export default KakaoSignUp;
