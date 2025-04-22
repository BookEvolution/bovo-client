import { useState } from "react";
import { loginUser } from "../api/Login";

const useLogin = (navigate) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const resetLoginErrors = () => {
        setEmailError("");
        setPasswordError("");
        setErrorMessage("");
    };

    const handleLogin = async () => {
        resetLoginErrors();

        try {
        const status = await loginUser(email, password);
        if (status === 200) {
            navigate("/");
        }
        } catch (error) {
        console.error("로그인 오류:", error);
        if (error.response) {
            if (error.response.status === 404) {
            setEmailError("등록되지 않은 이메일입니다");
            } else if (error.response.status === 400) {
            setPasswordError("비밀번호가 일치하지 않습니다");
            } else {
            setErrorMessage("로그인 중 오류가 발생했습니다");
            }
        } else {
            setErrorMessage("서버와의 연결에 실패했습니다");
        }
        }
    };

    return {
        email,
        setEmail,
        password,
        setPassword,
        emailError,
        passwordError,
        errorMessage,
        handleLogin,
    };
};

export default useLogin;
