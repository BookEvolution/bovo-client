// 메인페이지 유저 정보 
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";

const UserInfo = ({ level, nickname, profile_picture, total_book_num }) => (
    <Box sx={{ position: "relative", display: "flex", flexDirection: "column", width: "100%" }}>
        <Box sx={{ position: "absolute", top: "3rem", left: "1rem", display: "flex", flexDirection: "column", width: "100%" }}>
            <Typography sx={{ fontSize: "1.9rem", color: "#000000", marginLeft: "2rem" }}>
                Lv. {level}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: "0.2rem", marginLeft: "2rem" }}>
                <Typography
                    sx={{
                        fontSize: "3.5rem",
                        fontWeight: "800",
                        maxWidth: "15rem",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        WebkitBoxOrient: "vertical",
                        WebkitLineClamp: 1,
                        display: "-webkit-box",
                        wordBreak: "break-word",
                    }}
                >
                    {nickname}
                </Typography>
                <Typography
                    sx={{
                        fontSize: "2.4rem",
                        fontWeight: "500",
                        marginTop: "0.7rem",
                        marginLeft: "1rem",
                    }}
                >
                    님
                </Typography>
            </Box>
        </Box>

        <Box sx={{ position: "absolute", top: "11rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography
                sx={{
                    width: "11rem",
                    fontSize: "5rem",
                    fontWeight: "800",
                    color: "#739CD4",
                    textAlign: "right",
                }}
            >
                {total_book_num}
            </Typography>
            <Typography
                sx={{
                    width: "10rem",
                    fontSize: "2rem",
                    textAlign: "center",
                    marginTop: "5rem",
                    marginLeft: "3rem",
                }}
            >
                권째 기록 중
            </Typography>
            <img src={profile_picture} alt="프로필" style={{ width: "12rem", height: "12rem", marginLeft: "1rem" }} />
        </Box>
    </Box>
);

UserInfo.propTypes = {
    level: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    nickname: PropTypes.string.isRequired,
    profile_picture: PropTypes.string.isRequired,
    total_book_num: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default UserInfo;
