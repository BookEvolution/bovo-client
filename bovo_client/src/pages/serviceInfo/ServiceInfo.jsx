import { Box, Container, Typography } from "@mui/material";
import styles from './ServiceInfo.module.css';
import logo from '../../assets/logo/logo.png';

const ServiceInfo = () => {
    return (
        <Container className={styles.serviceInfoContainer}>
            <Box className={styles.logoBox}>
                <img src={logo} alt="logo" />
            </Box>
            <Container className={styles.infoContentContainer}>
                <Box className={styles.versionInfo}>
                    <Typography sx={{ fontSize: "1.75rem" }} fontWeight="bold">
                        버전 정보
                    </Typography>
                    <Typography sx={{ fontSize: "1.75rem" }}>
                        1.0.0
                    </Typography>
                </Box>
                <Typography sx={{ fontSize: "1.75rem" }} fontWeight="bold">
                    Designed by Freepik
                </Typography>
                <Box className={styles.serviceIntro}>
                    <Typography  
                        sx={{ fontSize: "1.75rem", 
                              color: "#739CD4", 
                              marginBottom: "1.25rem"
                            }}
                        fontWeight="bold"
                    >
                        서비스 소개
                    </Typography>
                    <Typography sx={{ fontSize: "1.25rem", textAlign: "left" }}>
                        Bovo는 책을 의미하는 ‘Book’과 진화를 의미하는 ‘Evolution’의
                        합성어로 독서 경험을 진화시키겠다는 의미를 담았습니다. 저희 팀은
                        이 플랫폼을 통해 ‘혼자만의 독서’에서 ‘함께 성장하는 독서’로
                        패러다임을 바꾸고자 합니다.
                    </Typography>
                </Box>
                <Box>
                    <Typography
                        sx={{ fontSize: "1.75rem", 
                              marginBottom: "1.25rem"
                            }}
                        fontWeight="bold"
                    >
                        개인 정보 처리 방침
                    </Typography>
                    <Typography sx={{ fontSize: "1.25rem", textAlign: "left" }}>
                        Bovo 팀은 다음의 목적을 위하여 개인정보를 수집하여 처리합니다.
                        처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며
                        이용목적이 변경되는 경우에는 「개인정보 보호법」제 18조에 따라 별도의
                        동의를 받는 등 필요한 조치를 이행할 예정입니다.<br/>
                    </Typography>
                    <Typography 
                        sx={{ fontSize: "1.5rem",
                              marginTop: "1.25rem", 
                              marginBottom: "0.5rem"
                            }}
                        fontWeight="bold"
                    >
                        개인정보 수집 및 이용 목적
                    </Typography>
                    <Typography sx={{ fontSize: "1.25rem", textAlign: "left" }}> 
                        1. 계정 생성 및 사용자 인증<br/>
                        2. 독서 기록 저장 및 기록 관리<br/>
                        3. 서비스 개선 및 고객 지원<br/>
                    </Typography>
                    <Typography 
                        sx={{ fontSize: "1.5rem",
                              marginTop: "1.25rem", 
                              marginBottom: "0.5rem"
                            }}
                        fontWeight="bold"
                    >
                        개인정보 보관 기간
                    </Typography>
                    <Typography sx={{ fontSize: "1.25rem", textAlign: "left" }}> 
                        계정 탈퇴 시 즉시 삭제<br/>
                        법적 의무가 있는 경우, 해당 기간 동안 보관 후 삭제
                    </Typography>
                </Box>
            </Container>
        </Container>
    );
};

export default ServiceInfo;