import PropTypes from 'prop-types'; // PropTypes 임포트
import Box from '@mui/material/Box';
import Typography from "@mui/material/Typography";
import styles from "./ProfileInfoItem.module.css";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium"; // 추가

// ✅ MyProfile 내부에 ProfileInfoItem 컴포넌트 선언
const ProfileInfoItem = ({ title, content, src }) => {
    return (
        <Box className={styles.profileInfoWrapper}>
            <Typography sx={{ fontSize: "1.75rem" }} fontWeight="bold">
                {title}
            </Typography>
            {content !== null ? (
                <Typography sx={{ fontSize: "1.75rem", textAlign: "right" }}>
                    {content}
                </Typography>
            ) : (
                <Box className={styles.imgWrapper} sx={{ textAlign: "right" }}>
                    {src ? (
                        <img src={src} alt="독서 성과 이미지" className={styles.bedgeImg} />
                    ) : (
                        <WorkspacePremiumIcon sx={{ fontSize: "4rem", color: "#D9D9D9" }} />
                    )} 
                </Box>
            )}
        </Box>
    );
};

export default ProfileInfoItem;

// props 타입 정의
ProfileInfoItem.propTypes = {
    title: PropTypes.string.isRequired, 
    content: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    src: PropTypes.string
};