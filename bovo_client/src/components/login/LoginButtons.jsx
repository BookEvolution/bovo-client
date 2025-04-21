import { Box, Button } from "@mui/material";
import kakaoBtn from "../../assets/button/btn_kakao.png";
import { getKakaoAuthUrl } from "../../utils/KakaoAuth";

const LoginButtonGroup = ({ handleLogin, handleSignUp }) => {
    const handleKakaoLogin = () => {
        window.location.href = getKakaoAuthUrl();
    };

    return (
        <>
            <Button 
                fullWidth 
                variant="contained" 
                onClick={handleLogin}
                sx={{
                    fontSize: "2.3rem",
                    fontWeight: "700",
                    padding: "1rem 0",
                    borderRadius: "1.2rem",
                    backgroundColor: "#BDE5F1",
                    boxShadow: "none",
                }}
            >
                로그인
            </Button>
            <Box display="flex" justifyContent="flex-end" width="100%" >
                <Button
                    variant="text"
                    sx={{
                        color: "#7B7B7B",
                        fontSize: "1.5rem",
                        textDecoration: "underline"
                    }}
                >
                    비밀번호 찾기
                </Button>
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
                        "&:hover": { backgroundColor: "#739CD4" }
                    }}
                >
                    이메일로 회원가입
                </Button>
                <Button
                    fullWidth
                    sx={{ backgroundColor: "transparent", padding: 0, boxShadow: "none" }}
                    onClick={handleKakaoLogin}
                >
                    <img src={kakaoBtn} alt="카카오 로그인" style={{ width: "25rem", cursor: "pointer" }} />
                </Button>
            </Box>
        </>
    );
};

export default LoginButtonGroup;