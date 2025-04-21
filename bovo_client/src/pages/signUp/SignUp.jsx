import { useState } from "react";
import { Box, Container } from "@mui/material";
import profileImages from "../../constant/ProfileImg";
import logo from "../../assets/logo/logo.png";

import useLoginSignUp from "../../hooks/useLoginSignUp";
import { checkNickname, checkEmail, registerUser } from "../../api/SignUp";

import SignUpInputs from "../../components/signUp/SignUpInputs";
import ProfileImgSelect from "../../components/signUp/ProfileImgSelect";
import SignUpButton from "../../components/signUp/SignUpButton";
import CompleteSignUpModal from "../../components/signUpCompleteModal/CompleteSignUpModal";

const SignUp = () => {
    const {
        email, setEmail,
        password, setPassword,
        confirmPassword, setConfirmPassword,
        nickname, setNickname,
        emailError, setEmailError,
        passwordError, setPasswordError,
        confirmPasswordError, setConfirmPasswordError,
        nicknameError, setNicknameError,
        inputError, setInputError,
        resetErrors,
    } = useLoginSignUp();

    const [profileImage, setProfileImage] = useState(profileImages[0].src);
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

    // 닉네임 중복 체크
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

    // 이메일 중복 체크
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

    // 비밀번호 유효성 검사
    const validatePassword = () => {
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        if (!passwordRegex.test(password)) {
        setPasswordError("영어 또는 숫자 조합, 8자 이상으로 입력해 주세요");
        } else {
        setPasswordError("");
        }
    };

    // 비밀번호 일치 확인
    const validateConfirmPassword = () => {
        if (password !== confirmPassword) {
        setConfirmPasswordError("비밀번호가 일치하지 않습니다");
        } else {
        setConfirmPasswordError("");
        }
    };

    // 회원가입 요청
    const handleSignUp = async () => {
        resetErrors();

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

    return (
        <Container sx={{ width: "45rem", marginTop: "18.26rem" }}>
        <Box display="flex" flexDirection="column" alignItems="center" mb={5}>
            <ProfileImgSelect
            profileImage={profileImage}
            setProfileImage={setProfileImage}
            isBottomSheetOpen={isBottomSheetOpen}
            setIsBottomSheetOpen={setIsBottomSheetOpen}
            />
        </Box>

        <SignUpInputs
            nickname={nickname}
            setNickname={setNickname}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            confirmPassword={confirmPassword}
            setConfirmPassword={setConfirmPassword}
            nicknameError={nicknameError}
            emailError={emailError}
            passwordError={passwordError}
            confirmPasswordError={confirmPasswordError}
            handleCheckNickname={handleCheckNickname}
            handleCheckEmail={handleCheckEmail}
            validatePassword={validatePassword}
            validateConfirmPassword={validateConfirmPassword}
        />

        <SignUpButton
            disabled={isSignUpDisabled}
            onClick={handleSignUp}
            inputError={inputError}
            logo={logo}
        />

        <CompleteSignUpModal
            open={isModalOpen}
            handleClose={() => setIsModalOpen(false)}
        />
        </Container>
    );
};

export default SignUp;
