import { useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import profileImages from "../../constant/ProfileImg";
import logo from "../../assets/logo/logo.png";
import useSignUp from "../../hooks/useSignUp";
import SignUpInputs from "../../components/signUp/SignUpInputs";
import ProfileImgSelect from "../../components/signUp/ProfileImgSelect";
import SignUpButton from "../../components/signUp/SignUpButton";
import CompleteSignUpModal from "../../components/signUpCompleteModal/CompleteSignUpModal";

const SignUp = () => {
    const [profileImage, setProfileImage] = useState(profileImages[0].src);
    const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const {
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
    } = useSignUp(profileImage, setIsModalOpen);

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
