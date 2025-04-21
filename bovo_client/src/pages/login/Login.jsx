import { useNavigate } from "react-router-dom";
import { Box, Container } from "@mui/material";
import useLoginSignUp from "../../hooks/useLoginSignUp";
import { loginUser } from "../../api/Login";
import LoginInputError from "../../components/login/LoginInputError";
import LoginButtonGroup from "../../components/login/LoginButtons";

const Login = () => {
    const navigate = useNavigate();
    const {
        email, setEmail,
        password, setPassword,
        emailError, setEmailError,
        passwordError, setPasswordError,
        errorMessage, setErrorMessage,
        resetErrors,
    } = useLoginSignUp();

    const handleSignUp = () => {
        navigate("/sign-up/basic");
    };

    const handleLogin = async () => {
        resetErrors();

        try {
            const status = await loginUser(email, password);

            if (status === 200) {
                navigate("/");
            }
        } catch (error) {
            console.error("로그인 오류:", error);
            if (error.response) {
                if (error.response.status === 404) {
                    setEmailError("등록되지 않은 이메일입니다.");
                } else if (error.response.status === 401) {
                    setPasswordError("비밀번호가 일치하지 않습니다.");
                } else {
                    setErrorMessage("로그인 중 오류가 발생했습니다.");
                }
            } else {
                setErrorMessage("서버와의 연결에 실패했습니다.");
            }
        }
    };

    return (
        <Container sx={{ maxWidth: "45rem" }}>
            <Box display="flex" flexDirection="column" alignItems="center">
                <LoginInputError
                    email={email}
                    setEmail={setEmail}
                    password={password}
                    setPassword={setPassword}
                    emailError={emailError}
                    passwordError={passwordError}
                    errorMessage={errorMessage}
                />

                <LoginButtonGroup handleLogin={handleLogin} handleSignUp={handleSignUp} />
            </Box>
        </Container>
    );
};

export default Login;
