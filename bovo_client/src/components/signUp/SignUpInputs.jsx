import { Box, TextField, Typography } from "@mui/material";

const SignUpInputs = ({
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
    handleCheckNickname,
    handleCheckEmail,
    validatePassword,
    validateConfirmPassword,
    nicknameTop = 42.5,
    emailTop = 51.7,
    }) => {
    return (
        <Box sx={{ width: "100%", marginTop: "2rem" }}>
        <TextField
            fullWidth
            variant="outlined"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            onBlur={handleCheckNickname}
            placeholder="닉네임"
            sx={inputStyle(nicknameTop)}
            inputProps={inputPropsStyle}
        />
        {nicknameError && (
            <Typography sx={errorStyle(nicknameTop + 6.7)} color={nicknameError === "사용 가능한 닉네임입니다" ? "#0066CC" : "#FF0000"}>
            {nicknameError}
            </Typography>
        )}

        <TextField
            fullWidth
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={handleCheckEmail}
            placeholder="이메일"
            sx={inputStyle(emailTop)}
            inputProps={inputPropsStyle}
        />
        {emailError && (
            <Typography sx={errorStyle(emailTop + 6.8)} color={emailError === "사용 가능한 이메일입니다" ? "#0066CC" : "#FF0000"}>
            {emailError}
            </Typography>
        )}

        {password !== undefined && setPassword && (
            <>
            <TextField
                fullWidth
                type="password"
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={validatePassword}
                placeholder="비밀번호"
                sx={inputStyle(61)}
                inputProps={inputPropsStyle}
            />
            {passwordError && (
                <Typography sx={errorStyle(67.7)} color="#FF0000">
                {passwordError}
                </Typography>
            )}
            </>
        )}

        {confirmPassword !== undefined && setConfirmPassword && (
            <>
            <TextField
                fullWidth
                type="password"
                variant="outlined"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                onBlur={validateConfirmPassword}
                placeholder="비밀번호 확인"
                sx={inputStyle(70)}
                inputProps={inputPropsStyle}
            />
            {confirmPasswordError && (
                <Typography sx={errorStyle(76.7)} color="#FF0000">
                {confirmPasswordError}
                </Typography>
            )}
            </>
        )}
        </Box>
    );
};

const inputStyle = (top) => ({
    position: "absolute",
    top: `${top}rem`,
    width: "42rem",
    backgroundColor: "#E8F1F6",
    borderRadius: "1.3rem",
    "& fieldset": { border: "none" },
    padding: "0.8rem 0rem",
});

const inputPropsStyle = {
    style: { fontSize: "1.8rem", color: "#6D6D6D", paddingLeft: "2.5rem" },
};

const errorStyle = (top) => ({
    position: "absolute",
    top: `${top}rem`,
    right: "4rem",
    fontSize: "1.3rem",
    textAlign: "right",
});

export default SignUpInputs;
