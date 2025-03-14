import PropTypes from 'prop-types'; // PropTypes 임포트
import { Box, Typography } from "@mui/material";
import styles from "./ProfileInfoItem.module.css";

// ✅ MyProfile 내부에 ProfileInfoItem 컴포넌트 선언
const ProfileInfoItem = ({ title, content, src }) => {
    return (
        <Box className={styles.profileInfoWrapper}>
            <Typography sx={{ fontSize: "1.75rem" }} fontWeight="bold">
                {title}
            </Typography>
            {content !== "" ? (
                <Typography sx={{ fontSize: "1.75rem", textAlign: "right" }}>
                    {content}
                </Typography>
            ) : (
                <Box className={styles.imgWrapper} sx={{ textAlign: "right" }}>
                    <img src={src} alt="독서 성과 이미지" className={styles.bedgeImg} /> 
                </Box>
            )}
        </Box>
    );
};

export default ProfileInfoItem;

// props 타입 정의
ProfileInfoItem.propTypes = {
    title: PropTypes.string.isRequired, 
    content: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired
};