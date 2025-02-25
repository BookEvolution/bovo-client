import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import kakaoBtn from "../../assets/button/btn_kakao.png";

const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=YOUR_REST_API_KEY&redirect_uri=http://localhost:3000/auth/kakao/callback&response_type=code`;
const Login = () => {
    const navigate = useNavigate(); 
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = () => {
        navigate("/");
    };

    const handleSignUp = () => {
        navigate("/sign-up/step1");
    };

    const handleKakaoLogin = () => {
        window.location.href = KAKAO_AUTH_URL;
    };

    return (
        <div className={styles.loginWrapper}>
            <div className={styles.loginWrap}>
                <input
                    type="email"
                    placeholder="이메일"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={styles.inputField}
                />
                <input
                    type="password"
                    placeholder="비밀번호"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={styles.inputField}
                />
                <button className={styles.loginButton} onClick={handleLogin}>
                    로그인
                </button>
                <div className={styles.forgotPassword}>
                    비밀번호 찾기
                </div>
            </div>
            
            <div className={styles.signUpWrapper}>
                <button className={styles.signUpButton} onClick={handleSignUp}>
                    이메일로 회원가입
                </button>
                <button className={styles.kakaoLoginButton} onClick={handleKakaoLogin}>
                    <img src={kakaoBtn} alt="카카오 로그인" className={styles.kakaoBtn} />
                </button>
            </div>
        </div>
    );
};

export default Login;
