import React, { useState } from "react";
import styles from "./SignUpStep1.module.css";
import { useNavigate } from "react-router-dom";
import logoImage from "../../assets/logo/logo.png";
import kakaoBtn from "../../assets/button/btn_kakao.png";

const SignUpStep1 = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [isTouched, setIsTouched] = useState(false);

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        if (isTouched && e.target.value !== confirmPassword) {
            setError("비밀번호가 일치하지 않습니다");
        } else {
            setError("");
        }
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
        setIsTouched(true);
        if (password !== e.target.value) {
            setError("비밀번호가 일치하지 않습니다");
        } else {
            setError("");
        }
    };

    const handleNext = () => {
        if (password !== confirmPassword) {
            setError("비밀번호가 일치하지 않습니다");
            return;
        }
        setError("");
        navigate("/sign-up/step2");
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <img src={logoImage} alt="Bovo Logo" className={styles.logo} />
                <p className={styles.welcomeText}>
                    소통하는 독서 플랫폼, <br />
                    보보에 오신 것을 환영합니다!
                </p>
            </div>

            <div className={styles.inputContainer}>
                <input
                    type="email"
                    className={styles.inputField}
                    placeholder="example@google.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    className={styles.inputField}
                    placeholder="영문, 숫자, 특수문자 최소 8자리 이상 조합"
                    value={password}
                    onChange={handlePasswordChange}
                />
                <input
                    type="password"
                    className={styles.inputField}
                    placeholder="비밀번호 확인"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    onBlur={() => setIsTouched(true)}
                />
                {isTouched && error && <p className={styles.errorText}>{error}</p>}

                <button
                    className={styles.nextButton}
                    onClick={handleNext}
                    disabled={!email || !password || !confirmPassword}
                >
                    다음
                </button>
            </div>

            <p className={styles.anotherLoginText}>다른 방법으로 가입하기</p>
            <img
                src={kakaoBtn}
                alt="카카오 로그인"
                className={styles.kakaoLogin}
            />
        </div>
    );
};

export default SignUpStep1;
