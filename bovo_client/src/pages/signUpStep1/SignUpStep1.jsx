import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, TextField, Typography, Container } from "@mui/material";
import ProfileSelectModal from "./ProfileSelectModal";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import logo from "../../assets/logo/logo.png";

const API_URL = ""; // 백엔드 API

const SignUpStep1 = () => {
    const navigate = useNavigate();
    const [profileImage, setProfileImage] = useState("/src/assets/profile/profile_3.png");
    const [nickname, setNickname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [nicknameError, setNicknameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);

    const checkNickname = async () => {
        if (!nickname.trim()) return;
        try {
            const response = await axios.post(`${API_URL}/check-nickname`, { nickname });
            if (response.data.exists) {
                setNicknameError(response.data.message || "중복된 닉네임입니다.");
            } else {
                setNicknameError("");
            }
        } catch (error) {
            console.error("닉네임 확인 실패", error);
        }
    };

    const checkEmail = async () => {
        if (!email.trim()) return;
        try {
            const response = await axios.post(`${API_URL}/check-email`, { email });
            if (response.data.exists) {
                setEmailError(response.data.message || "이미 가입된 이메일입니다.");
            } else {
                setEmailError("");
            }
        } catch (error) {
            console.error("이메일 확인 실패:", error);
        }
    };

    const validatePassword = () => {
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        if (!passwordRegex.test(password)) {
            setPasswordError("영어 또는 숫자 조합, 8자 이상으로 입력해 주세요.");
        } else {
            setPasswordError("");
        }
    };

    const validateConfirmPassword = () => {
        if (password !== confirmPassword) {
            setConfirmPasswordError("비밀번호가 일치하지 않습니다.");
        } else {
            setConfirmPasswordError("");
        }
    };

    const handleSignUp = async () => {
        if (nicknameError || emailError || passwordError || confirmPasswordError) {
            return;
        }

        try {
            const response = await axios.post(`${API_URL}/register`, {
                profile_img: profileImage,
                nickname,
                email,
                password,
                pwd_check: confirmPassword,
            });

            if (response.status === 201) {
                console.log("회원가입 성공:", response.data);
                navigate("/login");
            }
        } catch (error) {
            if (error.response) {
                const { status, message } = error.response.data;

                if (status === 400) {
                    if (message.includes("이메일")) setEmailError(message);
                    if (message.includes("닉네임")) setNicknameError(message);
                    if (message.includes("비밀번호")) setPasswordError(message);
                }
            }
        }
    };

    return (
        <Container sx={{ width: "45rem", marginTop: "18.26rem" }}>
            <Box display="flex" flexDirection="column" alignItems="center" mb={5}>
                <Box
                    position="relative"
                    onClick={() => setIsModalOpen(true)}
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

            <Box display="flex" flexDirection="column" gap={5.2}>
                <TextField
                    fullWidth
                    variant="outlined"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    onBlur={checkNickname}
                    placeholder="닉네임"
                    sx={{ backgroundColor: "#E8F1F6", borderRadius: "1.3rem", "& fieldset": { border: "none" }, padding: "0.8rem 0rem", marginTop:"2.5rem" }}
                    inputProps={{ style: { fontSize: "1.8rem", color: "#6D6D6D", paddingLeft:"2.5rem" } }}
                />
                {nicknameError && <Typography textAlign="right" color="#FF0000" fontSize="1.3rem"sx={{ margin:"-1.8rem", marginRight:"0.2rem"}}>{nicknameError}</Typography>}

                <TextField
                    fullWidth
                    variant="outlined"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={checkEmail}
                    placeholder="이메일"
                    sx={{ backgroundColor: "#E8F1F6", borderRadius: "1.3rem", "& fieldset": { border: "none" }, padding: "0.8rem 0rem" }}
                    inputProps={{ style: { fontSize: "1.8rem", color: "#6D6D6D", paddingLeft:"2.5rem" }}}
                />
                {emailError && <Typography textAlign="right" color="#FF0000" fontSize="1.3rem" sx={{ margin:"-1.8rem", marginRight:"0.2rem"}}>{emailError}</Typography>}

                <TextField
                    fullWidth
                    type="password"
                    variant="outlined"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onBlur={validatePassword}
                    placeholder="비밀번호"
                    sx={{ backgroundColor: "#E8F1F6", borderRadius: "1.3rem", "& fieldset": { border: "none" }, padding: "0.8rem 0rem" }}
                    inputProps={{ style: { fontSize: "1.8rem", color: "#6D6D6D", paddingLeft:"2.5rem" } }}
                />
                {passwordError && <Typography textAlign="right" color="#FF0000" fontSize="1.3rem"sx={{ margin:"-1.8rem", marginRight:"0.2rem"}}>{passwordError}</Typography>}

                <TextField
                    fullWidth
                    type="password"
                    variant="outlined"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    onBlur={validateConfirmPassword}
                    placeholder="비밀번호 확인"
                    sx={{ backgroundColor: "#E8F1F6", borderRadius: "1.3rem", "& fieldset": { border: "none" }, padding: "0.8rem 0rem" }}
                    inputProps={{ style: { fontSize: "1.8rem", color: "#6D6D6D", paddingLeft:"2.5rem" } }}
                />
                {confirmPasswordError && <Typography textAlign="right" color="#FF0000" fontSize="1.3rem"sx={{ margin:"-1.8rem", marginRight:"0.2rem"}}>{confirmPasswordError}</Typography>}
            </Box>

            <Box marginTop="3rem">
                <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={handleSignUp}
                    // 버튼 효과랑 그림자 제거 안됨 수정 필요
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
            </Box>

            {/* 하단에 고정 필요 */}
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: "7rem" }}>
                <img src={logo} alt="Bovo 로고" style={{ width: "10rem", marginRight: "1rem" }} />
                <Typography fontSize="1.8rem" fontWeight= "500" color="#343434" marginLeft="2rem">
                    소통하는 독서 플랫폼, <br /> 보보에 오신 것을 환영합니다!
                </Typography>
            </Box>

            {/* 프로필 모달만 완료/회원가입 성공 후 로그인 이동 모달 필요 */}
            <ProfileSelectModal open={isModalOpen} onClose={() => setIsModalOpen(false)} onSelect={setProfileImage} />
        </Container>
    );
};

export default SignUpStep1;
