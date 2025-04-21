import { useState } from "react";
import { Box, Container, Typography } from "@mui/material";
import { disableInterceptor, enableInterceptor } from "../../api/Auth";

import ProfileImgSelect from "../../components/signUp/ProfileImgSelect";
import SignUpInputs from "../../components/signUp/SignUpInputs";
import SignUpButton from "../../components/signUp/SignUpButton";
import CompleteSignUpModal from "../../components/signUpCompleteModal/CompleteSignUpModal";
import { checkNickname, checkEmail, registerKakaoUser } from "../../api/SignUp";
import profileImages from "../../constant/ProfileImg";
import logo from "../../assets/logo/logo.png";

const KakaoSignUp = () => {
    const [profileImage, setProfileImage] = useState(profileImages[0].src);
    const [nickname, setNickname] = useState("");
    const [email, setEmail] = useState("");
    const [nicknameError, setNicknameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [inputError, setInputError] = useState("");
    const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const isSignUpDisabled =
        nicknameError !== "사용 가능한 닉네임입니다" ||
        emailError !== "사용 가능한 이메일입니다" ||
        !nickname.trim() ||
        !email.trim();

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

    const handleSignUp = async () => {
        if (!nickname || !email) {
        setInputError("모든 필드를 입력해 주세요");
        return;
        }
        if (nicknameError.includes("중복") || emailError.includes("중복")) {
        setInputError("입력 필드를 다시 확인해주세요");
        return;
        }

        disableInterceptor();
        const token = sessionStorage.getItem("AccessToken");
        if (!token) {
        console.error("AccessToken 없음");
        return;
        }

        try {
        const response = await registerKakaoUser(email, nickname, profileImage);
        if (response.status === 200) {
            setIsModalOpen(true);
        }
        } catch (error) {
        if (error.response?.status === 400) {
            const message = error.response.data.message;
            if (message.includes("이메일")) setEmailError(message);
            if (message.includes("닉네임")) setNicknameError(message);
        }
        } finally {
        enableInterceptor();
        }
    };

    return (
        <Container sx={{ width: "45rem", marginTop: "23rem" }}>
        <Box display="flex" flexDirection="column" alignItems="center" mb={5}>
            <Typography fontSize="3rem" fontWeight="500" mb={3}>
            사용자 설정
            </Typography>

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
        nicknameError={nicknameError}
        emailError={emailError}
        handleCheckNickname={handleCheckNickname}
        handleCheckEmail={handleCheckEmail}
        nicknameTop={54} 
        emailTop={63}     
        />

        <SignUpButton
            disabled={isSignUpDisabled}
            onClick={handleSignUp}
            inputError={inputError}
            logo={logo}
            top="73rem" 
            showWelcome={false}
        />

        <CompleteSignUpModal
            open={isModalOpen}
            handleClose={() => setIsModalOpen(false)}
        />
        </Container>
    );
};

export default KakaoSignUp;
