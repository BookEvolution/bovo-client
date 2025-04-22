import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import ProfileImgSelect from "../../components/signUp/ProfileImgSelect";
import SignUpInputs from "../../components/signUp/SignUpInputs";
import SignUpButton from "../../components/signUp/SignUpButton";
import CompleteSignUpModal from "../../components/signUpCompleteModal/CompleteSignUpModal";
import logo from "../../assets/logo/logo.png";
import useKakaoSignUp from "../../hooks/useKakaoSignUp";

const KakaoSignUp = () => {
    const {
        profileImage,
        setProfileImage,
        nickname,
        setNickname,
        email,
        setEmail,
        nicknameError,
        emailError,
        inputError,
        isBottomSheetOpen,
        setIsBottomSheetOpen,
        isModalOpen,
        setIsModalOpen,
        isSignUpDisabled,
        handleCheckNickname,
        handleCheckEmail,
        handleSignUp,
    } = useKakaoSignUp();

    return (
        <Container sx={{ width: "45rem", marginTop: "23rem" }}>
        <Box display="flex" flexDirection="column" alignItems="center" mb={5}>
            <Typography fontSize="3rem" fontWeight="500" marginBottom="3rem">
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
