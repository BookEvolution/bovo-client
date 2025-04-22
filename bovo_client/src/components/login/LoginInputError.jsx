import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

const LoginInputError = ({
    email,
    setEmail,
    password,
    setPassword,
    emailError,
    passwordError,
    errorMessage,
}) => {
    return (
        <Box display="flex" flexDirection="column" width="100%">
            <Box position="relative">
                <TextField
                    fullWidth
                    variant="outlined"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="이메일"
                    sx={inputStyle}
                    inputProps={{ style: inputTextStyle }}
                />
                <Typography
                    textAlign="right"
                    fontSize="1.5rem"
                    color={emailError ? "#FF0000" : "transparent"}
                    sx={{ margin: "0.3rem"}}
                >
                    {emailError || "placeholder"}
                </Typography>
            </Box>

            <Box position="relative">
                <TextField
                    fullWidth
                    type="password"
                    variant="outlined"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="비밀번호"
                    sx={inputStyle}
                    inputProps={{ style: inputTextStyle }}
                />
                <Typography
                    textAlign="right"
                    fontSize="1.5rem"
                    color={passwordError ? "#FF0000" : "transparent"}
                    sx={{ margin: "0.3rem" }}
                >
                    {passwordError || "placeholder"}
                </Typography>
            </Box>

            <Typography
                textAlign="right"
                fontSize="1.5rem"
                color={errorMessage ? "#FF0000" : "transparent"}
                sx={{ margin: "-2rem 0.5rem 0.5rem 0rem" }}
            >
                {errorMessage || "placeholder"}
            </Typography>
        </Box>
    );
};

const inputStyle = {
    backgroundColor: "#E8F1F6",
    borderRadius: "1.5625rem",
    padding: "0.8rem 0",
    border: "none",
    "& fieldset": { border: "none" },
};

const inputTextStyle = {
    fontSize: "1.8rem",
    paddingLeft: "1.4rem",
};

LoginInputError.propTypes = {
    email: PropTypes.string.isRequired,
    setEmail: PropTypes.func.isRequired,
    password: PropTypes.string.isRequired,
    setPassword: PropTypes.func.isRequired,
    emailError: PropTypes.string,
    passwordError: PropTypes.string,
    errorMessage: PropTypes.string,
};

export default LoginInputError;
