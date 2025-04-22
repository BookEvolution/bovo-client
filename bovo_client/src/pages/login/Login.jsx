import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import useLogin from "../../hooks/useLogin";
import LoginInputError from "../../components/login/LoginInputError";
import LoginButtonGroup from "../../components/login/LoginButtons";

const Login = () => {
    const navigate = useNavigate();

    const {
        email,
        setEmail,
        password,
        setPassword,
        emailError,
        passwordError,
        errorMessage,
        handleLogin,
    } = useLogin(navigate);

    const handleSignUp = () => {
        navigate("/sign-up/basic");
    };

    return (
        <Container sx={{ maxWidth: "45rem" }}>
        <Box display="flex" flexDirection="column" alignItems="center" width="100%">
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
