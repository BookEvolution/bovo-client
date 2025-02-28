import { Button, Container, Typography } from "@mui/material";
import InfoIcon from '@mui/icons-material/Info';
import styles from "./ErrorPage.module.css";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
    const navigate = useNavigate();

    return (
        <Container className={styles.errorContainer}>
            <InfoIcon sx={{ fontSize: "12.5rem", color: "#BDE5F1" }} />
            <Typography sx={{ fontSize: "2.625rem", letterSpacing: "0.42px" }} fontWeight="bold">
                문제가 발생했습니다.
            </Typography>
            <Typography 
                sx={{ fontSize: "1.75rem", 
                      lineHeight: "2.5rem", 
                      letterSpacing: "0.28px",
                      textAlign: "center" 
                    }} 
                color="#6C6C6C"
            >
                요청하신 페이지를 찾을 수 없습니다.<br/>
                잠시 후 다시 시도해 주십시오.
            </Typography>
            <Button
                variant="contained"
                className={styles.btn}
                sx={{ backgroundColor: "#BDE5F1", 
                      color: "white",
                      fontSize: "2.1875rem",
                      borderRadius: "1.5625rem" 
                    }}
                onClick={() => navigate("/")}
            >
                메인으로
            </Button>
        </Container>
    );
};

export default ErrorPage;