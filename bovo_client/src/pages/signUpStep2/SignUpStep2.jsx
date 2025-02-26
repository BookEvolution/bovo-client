import React, { useState } from "react";
import styles from "./SignUpStep2.module.css";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";

import profile1 from "../../assets/profile/profile_1.png";
import profile2 from "../../assets/profile/profile_2.png";
import profile3 from "../../assets/profile/profile_3.png";
import profile4 from "../../assets/profile/profile_4.png";
import profile5 from "../../assets/profile/profile_5.png";
import profile6 from "../../assets/profile/profile_6.png";

const profileImages = [profile1, profile2, profile3, profile4, profile5, profile6];

const SignUpStep2 = () => {
    const navigate = useNavigate();
    const [selectedProfile, setSelectedProfile] = useState(profileImages[0]);
    const [tempSelectedProfile, setTempSelectedProfile] = useState(null);
    const [nickname, setNickname] = useState("");
    const [nicknameError, setNicknameError] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false); 
    const [isClosing, setIsClosing] = useState(false);
    const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false); 

    const handleProfileClick = () => {
        setIsModalOpen(true);
        setIsClosing(false);
    };

    const handleTempSelect = (image) => {
        setTempSelectedProfile(image);
    };

    const handleConfirmSelection = () => {
        if (tempSelectedProfile) {
            setSelectedProfile(tempSelectedProfile);
        }
        setIsClosing(true);
        setTimeout(() => {
            setIsModalOpen(false);
        }, 300);
    };

    const handleSignUp = () => {
        if (!nickname.trim()) {
            setNicknameError(true);
            return;
        }
        setNicknameError(false);
        setIsSignUpModalOpen(true); 
    };

    const handleNavigateToLogin = () => {
        setIsSignUpModalOpen(false);
        navigate("/login"); 
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>사용자 설정</h2>

            <div className={styles.profileContainer} onClick={handleProfileClick}>
                <img src={selectedProfile} alt="Profile" className={styles.profileImage} />
                <div className={styles.searchIcon}>
                    <SearchIcon />
                </div>
            </div>

            <input
                type="text"
                className={`${styles.nicknameInput} ${nicknameError ? styles.inputError : ""}`}
                placeholder="별명"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
            />
            {nicknameError && <p className={styles.errorText}>별명을 입력해 주세요</p>}

            <button className={styles.signUpButton} onClick={handleSignUp}>
                가입하기
            </button>

            {isModalOpen && (
                <div className={styles.modalOverlay} onClick={() => setIsClosing(true)}>
                    <div
                        className={`${styles.modalContent} ${isClosing ? styles.slideDown : styles.slideUp}`}
                        onClick={(e) => e.stopPropagation()}
                        onAnimationEnd={() => isClosing && setIsModalOpen(false)}
                    >
                        <div className={styles.profileGrid}>
                            {profileImages.map((image, index) => (
                                <div
                                    key={index}
                                    className={`${styles.profileOption} ${
                                        tempSelectedProfile === image ? styles.selectedProfile : ""
                                    }`}
                                    onClick={() => handleTempSelect(image)}
                                >
                                    <img src={image} alt={`Profile ${index + 1}`} />
                                </div>
                            ))}
                        </div>
                        <button className={styles.selectButton} onClick={handleConfirmSelection}>
                            선택하기
                        </button>
                    </div>
                </div>
            )}

            {isSignUpModalOpen && (
                <div className={styles.signUpmodalOverlay}>
                    <div className={styles.signUpModal}>
                        <h3 className={styles.signUpModalTitle}>회원가입 완료!</h3>
                        <p className={styles.signUpModalText}>로그인 페이지로 이동합니다</p>
                        <button className={styles.signUpModalButton} onClick={handleNavigateToLogin}>
                            이동하기
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SignUpStep2;
