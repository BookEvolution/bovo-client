import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import axios from "axios";
import kakaoBtn from "../../assets/button/btn_kakao.png";
import { disableInterceptor, enableInterceptor, setAccessToken } from "../../api/Auth";

const CLIENT_ID = import.meta.env.VITE_KAKAO_LOGIN_API_KEY;
const REDIRECT_URI = import.meta.env.VITE_KAKAO_REDIRECT_URI;

const handleKakaoLogin = () => {
    const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;
    console.log("카카오 로그인 URL:", kakaoAuthUrl);
    window.location.href = kakaoAuthUrl;
    console.log(kakaoAuthUrl);
};

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleSignUp = () => {
        navigate("/sign-up/basic");
    };

    const handleLogin = async () => {
        setEmailError("");
        setPasswordError("");

       // 인터셉터 비활성화
        disableInterceptor();

        try {
            const response = await axios.post(
                "http://54.180.29.26:8080/login",
                { email, password },
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.status === 200) {
                console.log("로그인 성공:", response.data);

                const accessToken = response.data.accessToken;

                if (accessToken) {
                    sessionStorage.setItem("accessToken", accessToken);
                    setAccessToken(accessToken); // 만료시간 기본값 3600초 적용
                }

                // 로그인 성공 시 사용자가 입력한 이메일을 sessionStorage에 저장
                sessionStorage.setItem("userEmail", email); 

                navigate("/");
            }
        } catch (error) {
            console.error("로그인 오류:", error);
            if (error.response) {
                console.log("응답 데이터:", error.response.data);
                console.log("응답 상태 코드:", error.response.status);

                if (error.response.status === 404) {
                    setErrorMessage("등록되지 않은 이메일입니다.");
                } else if (error.response.status === 401) {
                    setErrorMessage("비밀번호가 일치하지 않습니다.");
                } else {
                    setErrorMessage("로그인 중 오류가 발생했습니다.");
                }
            } else {
                setErrorMessage("서버와의 연결에 실패했습니다.");
            }
        } finally {
            //로그인 후 인터셉터 다시 활성화
            enableInterceptor();
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

                <Box display="flex" flexDirection="column" width="100%">
                {errorMessage && (
                    <Typography textAlign="right" color="#FF0000" fontSize="1.5rem" sx={{ margin:"-1rem", marginRight:"0.2rem"}}>
                        {errorMessage}
                    </Typography>
                )}
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