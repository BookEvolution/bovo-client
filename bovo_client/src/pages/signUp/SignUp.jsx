import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, TextField, Typography, Container } from "@mui/material";
import ProfileBottomSheet from "../../components/profileImgBottomsheet/ProfileBottomSheet";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import logo from "../../assets/logo/logo.png";
import CompleteSignUpModal from "../../components/signUpCompleteModal/CompleteSignUpModal";
import profileImages from "../../constant/ProfileImg";

const API_URL = import.meta.env.VITE_BACKEND_API_URL;

const SignUp = () => {
    const navigate = useNavigate();
    const [profileImage, setProfileImage] = useState(profileImages[0].src);
    const [nickname, setNickname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [inputError, setInputError] = useState("");
    const [nicknameError, setNicknameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");
    const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const isSignUpDisabled = 
        nicknameError === "중복된 닉네임입니다" || 
        emailError === "중복된 이메일입니다" ||
        passwordError || 
        confirmPasswordError || 
        !nickname.trim() || 
        !email.trim() || 
        !password.trim() || 
        !confirmPassword.trim();


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

    const validatePassword = () => {
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        if (!passwordRegex.test(password)) {
            setPasswordError("영어 또는 숫자 조합, 8자 이상으로 입력해 주세요");
        } else {
            setPasswordError("");
        }
    };

    const validateConfirmPassword = () => {
        if (password !== confirmPassword) {
            setConfirmPasswordError("비밀번호가 일치하지 않습니다");
        } else {
            setConfirmPasswordError("");
        }
    };

    const handleProfileSelect = (profile) => {
        setProfileImage(profile.src);
        setIsBottomSheetOpen(false);
    };

    const handleSignUp = async () => {
        if (!nickname || !email || !password || !confirmPassword) {
            setInputError("모든 필드를 입력해 주세요");
            return;
        }
    
        if (nicknameError === "중복된 닉네임입니다" || emailError === "중복된 이메일입니다") {
            setInputError("입력 필드를 다시 확인해주세요");
            return;
        }
        
        try {
            const response = await axios.post(`${API_URL}/register`, {
                email,
                password,
                nickname,
                profile_picture: profileImage,
            });

            if (response.status === 200) {
                console.log("회원가입 성공:", response.data);
                setIsModalOpen(true);
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                const message = error.response.data.message;
                if (message.includes("이메일")) setEmailError(message);
                if (message.includes("닉네임")) setNicknameError(message);
                if (message.includes("비밀번호")) setPasswordError(message);
            }
        }
    };
    
    return (
        <Container sx={{ width: "45rem", marginTop: "18.26rem" }}>
            <Box display="flex" flexDirection="column" alignItems="center" mb={5}>
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
            <Box sx={{ width: "100%" }}>
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
                        position: "absolute",
                        top: "42.5rem",
                        width: "42rem",
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
                            position: "absolute",
                            top: "49.2rem",
                            right: "4rem",
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
                        position: "absolute",
                        top: "51.7rem",
                        width: "42rem",
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
                            position: "absolute",
                            top: "58.5rem",
                            right: "4rem",
                            color: emailError === "사용 가능한 이메일입니다" ? "#0066CC" : "#FF0000",
                        }}
                    >
                        {emailError}
                    </Typography>
                )}

                <TextField
                    fullWidth
                    type="password"
                    variant="outlined"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onBlur={validatePassword}
                    placeholder="비밀번호"
                    sx={{
                        position: "absolute",
                        top: "61rem",
                        width: "42rem",
                        backgroundColor: "#E8F1F6",
                        borderRadius: "1.3rem",
                        "& fieldset": { border: "none" },
                        padding: "0.8rem 0rem",
                    }}
                    inputProps={{ style: { fontSize: "1.8rem", color: "#6D6D6D", paddingLeft: "2.5rem" } }}
                />
                {passwordError && (
                    <Typography
                        textAlign="right"
                        fontSize="1.3rem"
                        sx={{
                            position: "absolute",
                            top: "67.7rem",
                            right: "4rem",
                            color: "#FF0000",
                        }}
                    >
                        {passwordError}
                    </Typography>
                )}

                <TextField
                    fullWidth
                    type="password"
                    variant="outlined"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    onBlur={validateConfirmPassword}
                    placeholder="비밀번호 확인"
                    sx={{
                        position: "absolute",
                        top: "70rem",
                        width: "42rem",
                        backgroundColor: "#E8F1F6",
                        borderRadius: "1.3rem",
                        "& fieldset": { border: "none" },
                        padding: "0.8rem 0rem",
                    }}
                    inputProps={{ style: { fontSize: "1.8rem", color: "#6D6D6D", paddingLeft: "2.5rem" } }}
                />
                {confirmPasswordError && (
                    <Typography
                        textAlign="right"
                        fontSize="1.3rem"
                        sx={{
                            position: "absolute",
                            top: "76.7rem",
                            right: "4rem",
                            color: "#FF0000",
                        }}
                    >
                        {confirmPasswordError}
                    </Typography>
                )}
            </Box>

            <Box
                sx={{
                    position: "absolute",
                    top: "80.5rem",
                    left:"0rem",
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={handleSignUp}
                    disabled={isSignUpDisabled}
                    sx={{
                        width: "42rem",
                        fontSize: "2.2rem",
                        fontWeight: "600",
                        padding: "1rem",
                        borderRadius: "1rem",
                        backgroundColor: isSignUpDisabled ? "#B0BEC5" : "#BDE5F1",
                        boxShadow: "none",
                        transition: "none",
                    }}
                >
                    회원가입
                </Button>
            </Box>
            {inputError && (
                    <Typography
                        textAlign="center"
                        color="#FF0000"
                        fontSize="1.5rem"
                        sx={{
                            position: "absolute",
                            top: "87rem",
                            right: "4rem",
                            color: "#FF0000",
                        }}
                    >
                        {inputError}
                    </Typography>
                )}

            <Box sx={{ position:"absolute", display: "flex", alignItems: "center", justifyContent: "center", left:"8.4rem", top:"93.5rem" }}>
                <img src={logo} alt="Bovo 로고" style={{ width: "10rem", marginRight: "1rem" }} />
                <Typography fontSize="1.8rem" fontWeight= "500" color="#343434" marginLeft="2rem">
                    소통하는 독서 플랫폼, <br /> 보보에 오신 것을 환영합니다!
                </Typography>
            </Box>

            <ProfileBottomSheet open={isBottomSheetOpen} onClose={() => setIsBottomSheetOpen(false)} onSelectProfile={handleProfileSelect} selectedProfile={profileImage} />
            <CompleteSignUpModal open={isModalOpen} handleClose={() => setIsModalOpen(false)} />
        </Container>
    );
};

export default SignUp;