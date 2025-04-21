import { useState } from "react";

const useLoginSignUp = () => {
    // 로그인용
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    // 회원가입용
    const [nickname, setNickname] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [nicknameError, setNicknameError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");
    const [inputError, setInputError] = useState("");

    const resetErrors = () => {
        setEmailError("");
        setPasswordError("");
        setNicknameError("");
        setConfirmPasswordError("");
        setErrorMessage("");
        setInputError("");
    };

    return {
        email, setEmail,
        password, setPassword,
        confirmPassword, setConfirmPassword,
        nickname, setNickname,

        emailError, setEmailError,
        passwordError, setPasswordError,
        nicknameError, setNicknameError,
        confirmPasswordError, setConfirmPasswordError,
        errorMessage, setErrorMessage,
        inputError, setInputError,

        resetErrors,
    };
};

export default useLoginSignUp;
