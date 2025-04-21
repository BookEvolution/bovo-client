import { Box, Button, Typography } from "@mui/material";
import logo from "../../assets/logo/logo.png";

const SignUpButton = ({ disabled, onClick, top = "80.5rem", inputError, showWelcome = true }) => {
    return (
        <>
        <Box
            sx={{
            position: "absolute",
            top: top,
            left: "0rem",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            }}
        >
            <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={onClick}
            disabled={disabled}
            sx={{
                width: "42rem",
                fontSize: "2.2rem",
                fontWeight: "600",
                padding: "1rem",
                borderRadius: "1rem",
                backgroundColor: disabled ? "#B0BEC5" : "#BDE5F1",
                boxShadow: "none",
                transition: "none",
            }}
            >
            회원가입
            </Button>
        </Box>

        {inputError && (
            <Typography
            textAlign="center"
            color="#FF0000"
            fontSize="1.5rem"
            sx={{
                position: "absolute",
                top: "87rem",
                right: "4rem",
            }}
            >
            {inputError}
            </Typography>
        )}

        {showWelcome && (
            <Box
            sx={{
                position: "absolute",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                left: "8.4rem",
                top: "93.5rem",
            }}
            >
            <img
                src={logo}
                alt="Bovo 로고"
                style={{ width: "10rem", marginRight: "1rem" }}
            />
            <Typography
                fontSize="1.8rem"
                fontWeight="500"
                color="#343434"
                marginLeft="2rem"
            >
                소통하는 독서 플랫폼, <br /> 보보에 오신 것을 환영합니다!
            </Typography>
            </Box>
        )}
        </>
    );
};

export default SignUpButton;

