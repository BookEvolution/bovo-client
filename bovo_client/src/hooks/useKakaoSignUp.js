import { useState } from "react";
import { checkNickname, checkEmail, registerKakaoUser } from "../api/SignUp";
import { disableInterceptor, enableInterceptor } from "../api/Auth";
import profileImages from "../constant/ProfileImg";

const useKakaoSignUp = () => {
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

    return {
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
    };
};

export default useKakaoSignUp;
