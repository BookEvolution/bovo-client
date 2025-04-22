import { useState } from "react";
import { checkNickname, checkEmail, registerUser } from "../api/SignUp";

const useSignUp = (profileImage, setIsModalOpen) => {
    const [nickname, setNickname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [nicknameError, setNicknameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");
    const [inputError, setInputError] = useState("");

    const resetSignUpInputs = () => {
        setNickname("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
    };

    const handleCheckNickname = async () => {
        if (!nickname.trim()) {
        setNicknameError("");
        return;
        }
        try {
        const response = await checkNickname(nickname);
        if (response.status === 200) {
            setNicknameError("사용 가능한 닉네임입니다");
        }
        } catch (error) {
        if (error.response?.status === 400) {
            setNicknameError("중복된 닉네임입니다");
        }
        }
    };

    const handleCheckEmail = async () => {
        if (!email.trim()) {
        setEmailError("");
        return;
        }
        try {
        const response = await checkEmail(email);
        if (response.status === 200) {
            setEmailError("사용 가능한 이메일입니다");
        }
        } catch (error) {
        if (error.response?.status === 400) {
            setEmailError("중복된 이메일입니다");
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

    const handleSignUp = async () => {
        if (!nickname || !email || !password || !confirmPassword) {
        setInputError("모든 필드를 입력해 주세요");
        return;
        }
        if (nicknameError.includes("중복") || emailError.includes("중복")) {
        setInputError("입력 필드를 다시 확인해주세요");
        return;
        }

        try {
        const response = await registerUser(email, password, nickname, profileImage);
        if (response.status === 200) {
            setIsModalOpen(true);
            resetSignUpInputs();
        }
        } catch (error) {
        if (error.response?.status === 400) {
            const message = error.response.data.message;
            if (message.includes("이메일")) setEmailError(message);
            if (message.includes("닉네임")) setNicknameError(message);
            if (message.includes("비밀번호")) setPasswordError(message);
        }
        }
    };

    const isSignUpDisabled =
        nicknameError === "중복된 닉네임입니다" ||
        emailError === "중복된 이메일입니다" ||
        passwordError ||
        confirmPasswordError ||
        !nickname.trim() ||
        !email.trim() ||
        !password.trim() ||
        !confirmPassword.trim();

    return {
        nickname,
        setNickname,
        email,
        setEmail,
        password,
        setPassword,
        confirmPassword,
        setConfirmPassword,

        nicknameError,
        emailError,
        passwordError,
        confirmPasswordError,
        inputError,

        handleCheckNickname,
        handleCheckEmail,
        validatePassword,
        validateConfirmPassword,
        handleSignUp,
        isSignUpDisabled,
    };
};

export default useSignUp;
