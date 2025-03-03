import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, TextField, Typography, Container } from "@mui/material";
import axios from "axios";
import kakaoBtn from "../../assets/button/btn_kakao.png";

const API_URL = ""; 
const CLIENT_ID = "3b94e5d2a73bbc7a2961819922e17b23"; 
const REDIRECT_URI = "http://localhost:5173/auth/kakao/callback"; 

const handleKakaoLogin = () => {
    const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;
    window.location.href = kakaoAuthUrl; 
};

const Login = () => {
    const navigate = useNavigate(); 
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const handleSignUp = () => {
        navigate("/sign-up/step1");
    };

    const handleLogin = async () => {
        setEmailError("");
        setPasswordError("");

        try {
            const response = await axios.post(`${API_URL}/login`, { email, password });

            if (response.status === 200) {
                console.log("로그인 성공:", response.data);
                navigate("/");
            }
        } catch (error) {
            if (error.response) {
                const status = error.response.status;
                if (status === 404) {
                    setEmailError("등록되지 않은 이메일입니다."); 
                } else if (status === 401) {
                    setPasswordError("비밀번호가 일치하지 않습니다.");
                } else {
                    setEmailError("로그인 중 오류가 발생했습니다.");
                }
            } else {
                setEmailError("서버 연결 실패"); 
            }
        }
    };

    return (
        <Container sx={{ maxWidth: "45rem"}}>
            <Box display="flex" flexDirection="column" alignItems="center" gap={3}>
                <Box display="flex" flexDirection="column" gap={5} width="100%">
                    <TextField
                        fullWidth
                        variant="outlined"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="이메일"
                        sx={{ 
                            backgroundColor: "#E8F1F6",
                            borderRadius: "1.5625rem",
                            padding: "0.8rem 0rem",
                            border: "none",
                            marginTop: "-2rem",
                            "& fieldset": { border: "none" } 
                        }}
                        inputProps={{
                            style: { fontSize: "1.8rem", paddingLeft: "1.4rem" },
                        }}
                    />
                    {emailError && (
                        <Typography textAlign="right" color="#FF0000" fontSize="1.3rem" sx={{ margin:"-1.8rem", marginRight:"0.2rem"}}>
                            {emailError}
                        </Typography>
                    )}
                    
                    <TextField
                        fullWidth
                        type="password"
                        variant="outlined"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="비밀번호"
                        sx={{ 
                            backgroundColor: "#E8F1F6",
                            borderRadius: "1.5625rem",
                            padding: "0.8rem 0rem",
                            border: "none",
                            "& fieldset": { border: "none" } 
                        }}
                        inputProps={{
                            style: { fontSize: "1.8rem", paddingLeft: "1.4rem" },
                        }}
                    />
                    {passwordError && (
                        <Typography textAlign="right" color="#FF0000" fontSize="1.3rem" sx={{ margin:"-1.8rem", marginRight:"0.2rem"}}>
                            {passwordError}
                        </Typography>
                    )}
                </Box>

                <Box display="flex" flexDirection="column" alignItems="center" width="100%">
                    <Button 
                        fullWidth 
                        variant="contained" 
                        color="primary" 
                        disableRipple 
                        disableElevation 
                        onClick={handleLogin}
                        sx={{
                            fontSize: "2.3rem",
                            fontWeight: "700",
                            marginTop: "1.5rem",
                            padding: "1rem 0rem",
                            borderRadius: "1.2rem",
                            backgroundColor: "#BDE5F1",
                            boxShadow: "none",
                            transition: "none", 
                            "&:hover, &:focus, &:active": {
                                backgroundColor: "#BDE5F1"
                            }
                        }}
                    >
                        로그인
                    </Button>
                    <Box display="flex" justifyContent="flex-end" width="100%" marginTop="1.2rem">
                        <Typography 
                            textAlign="right" 
                            color="#7B7B7B" 
                            fontSize="1.5rem"
                            sx={{ cursor: "pointer", "&:hover": { textDecoration: "underline" } }}
                        >
                            비밀번호 찾기
                        </Typography>
                    </Box>
                </Box>

                <Box display="flex" flexDirection="column" gap={2} sx={{ marginTop: "5rem" }} alignItems="center">
                    <Button 
                        fullWidth 
                        variant="contained" 
                        color="secondary" 
                        onClick={handleSignUp}
                        sx={{
                            fontSize: "2rem",
                            fontWeight: "500",
                            width: "25rem",
                            padding: "1.4rem",
                            borderRadius: "0.8rem",
                            backgroundColor: "#739CD4",
                            boxShadow: "none",
                            transition: "none",
                            "&:hover, &:focus, &:active": {
                                backgroundColor: "#739CD4"
                            }
                        }}
                    >
                        이메일로 회원가입
                    </Button>
                    <Button 
                        fullWidth 
                        variant="contained"
                        sx={{
                            backgroundColor: "transparent",
                            padding: 0,
                            boxShadow: "none",
                            transition: "none",
                            "&:hover, &:focus, &:active": {
                                backgroundColor: "transparent"
                            }
                        }}
                    >
                        <img 
                            onClick={handleKakaoLogin}
                            src={kakaoBtn} 
                            alt="카카오 로그인" 
                            style={{ width: "25rem", boxShadow: "none", cursor: "pointer" }} 
                        />
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default Login;
