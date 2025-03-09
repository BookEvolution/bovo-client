import { Box, InputAdornment, TextField, Typography } from "@mui/material";
import GroupIcon from '@mui/icons-material/Group';
import SearchIcon from '@mui/icons-material/Search';
import Book from "../../assets/book/book_ex.png"
import styles from "./EntireForum.module.css";

const EntireForum = () => {
    return (
        <Box className={styles.entireForumContainer}>
            <Box className={styles.adminPickWrapper}>
                <Box>
                    <img src={Book} alt="책 예시 이미지" />
                </Box>
                <Box className={styles.recruiting}>
                    모집 중
                </Box>
                <div className={styles.bottomContainer}>
                    <Typography 
                        sx={{
                                fontSize: "1.75rem", 
                                letterSpacing: "0.0175rem",
                                fontWeight: 500,
                                textAlign: "left"
                            }}
                    >
                        챌린지 제목
                    </Typography>
                    <Box className={styles.dueDateWrapper}>
                        <Typography
                            sx={{
                                fontSize: "1.25rem",
                                fontWeight: 500,
                                letterSpacing: "0.0125rem",
                            }}
                        >
                            YY.MM.DD
                        </Typography>
                        <Typography
                            sx={{
                                fontSize: "1.25rem",
                                fontWeight: 500,
                                letterSpacing: "0.0125rem",
                            }}
                        >
                            ~
                        </Typography>
                        <Typography
                            sx={{
                                fontSize: "1.25rem",
                                fontWeight: 500,
                                letterSpacing: "0.0125rem",
                            }}
                        >
                            YY.MM.DD
                        </Typography>
                    </Box>
                    <Box className={styles.groupLimitContainer}>
                            <Box className={styles.IconWrapper}>
                                <GroupIcon sx={{ fontSize: "2rem" }} />
                            </Box>
                            <Typography
                                sx={{
                                    fontSize: "1.75rem",
                                    fontWeight: 500,
                                    lineHeight: "0.0125rem"
                                }}
                            >
                                00
                            </Typography>
                            <Typography
                                sx={{
                                    fontSize: "1.75rem",
                                    fontWeight: 500,
                                    lineHeight: "0.0125rem"
                                }}
                            >
                                /
                            </Typography>
                            <Typography
                                sx={{
                                    fontSize: "1.75rem",
                                    fontWeight: 500,
                                    lineHeight: "0.0125rem"
                                }}
                            >
                                00
                            </Typography>
                    </Box>
                </div>
            </Box>
            <Box>
                <Typography
                    sx={{
                        fontSize: "2.5rem",
                        fontWeight: "Bold",
                        lineHeight: "3.375rem",
                        letterSpacing: "0.025rem"
                    }}
                >
                    독서 토론방
                </Typography>
                <TextField
                    variant="standard" // 외부 border를 제거하는 방법
                    placeholder="토론방 검색"
                    sx={{ 
                            width: '39.5rem',
                            backgroundColor: "#E8F1F6",
                            borderRadius: "1.5625rem",
                            border: "none",
                            padding: "0.5rem 1.25rem",
                            margin: "1.8125rem 0",
                            "& .MuiInputBase-input": {
                                width: "35.5rem",
                                fontSize: "1.75rem",  // 입력창 글자 크기 변경
                            }    
                        }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon sx={{fontSize: "2.5rem", color: "#739CD4", margin: "0 0.75rem"}}/>
                            </InputAdornment>
                        ),
                        // input 요소의 스타일을 이곳에서 조정
                        disableUnderline: true, // underline 제거
                    }}
                />
            </Box>
            <Box className={styles.forumListContainer}>
                <Box className={styles.forumList}>
                    <Box className={styles.forumBook}>
                        <img src={Book} alt="책 예시 이미지" />
                    </Box>
                    <Box className={styles.forumRecruiteComplete}>
                        모집 완료
                    </Box>
                    <div className={styles.forumBottomContainer}>
                        <Typography 
                            sx={{
                                    fontSize: "1.75rem", 
                                    letterSpacing: "0.0175rem",
                                    fontWeight: 500,
                                    textAlign: "left"
                                }}
                        >
                            챌린지 제목
                        </Typography>
                        <Typography
                            sx={{
                                fontSize: "1.25rem",
                                fontWeight: 500,
                                letterSpacing: "0.0125rem",
                            }}
                        >
                            챌린지 세부 설명
                        </Typography>
                        <Box className={styles.groupLimitContainer}>
                                <Box className={styles.IconWrapper}>
                                    <GroupIcon sx={{ fontSize: "2rem" }} />
                                </Box>
                                <Typography
                                    sx={{
                                        fontSize: "1.75rem",
                                        fontWeight: 500,
                                        lineHeight: "0.0125rem"
                                    }}
                                >
                                    00
                                </Typography>
                                <Typography
                                    sx={{
                                        fontSize: "1.75rem",
                                        fontWeight: 500,
                                        lineHeight: "0.0125rem"
                                    }}
                                >
                                    /
                                </Typography>
                                <Typography
                                    sx={{
                                        fontSize: "1.75rem",
                                        fontWeight: 500,
                                        lineHeight: "0.0125rem"
                                    }}
                                >
                                    00
                                </Typography>
                        </Box>
                    </div>
                </Box>
                <Box className={styles.forumList}>
                    <Box className={styles.forumBook}>
                        <img src={Book} alt="책 예시 이미지" />
                    </Box>
                    <Box className={styles.forumRecruiteComplete}>
                        모집 완료
                    </Box>
                    <div className={styles.forumBottomContainer}>
                        <Typography 
                            sx={{
                                    fontSize: "1.75rem", 
                                    letterSpacing: "0.0175rem",
                                    fontWeight: 500,
                                    textAlign: "left"
                                }}
                        >
                            챌린지 제목
                        </Typography>
                        <Typography
                            sx={{
                                fontSize: "1.25rem",
                                fontWeight: 500,
                                letterSpacing: "0.0125rem",
                            }}
                        >
                            챌린지 세부 설명
                        </Typography>
                        <Box className={styles.groupLimitContainer}>
                                <Box className={styles.IconWrapper}>
                                    <GroupIcon sx={{ fontSize: "2rem" }} />
                                </Box>
                                <Typography
                                    sx={{
                                        fontSize: "1.75rem",
                                        fontWeight: 500,
                                        lineHeight: "0.0125rem"
                                    }}
                                >
                                    00
                                </Typography>
                                <Typography
                                    sx={{
                                        fontSize: "1.75rem",
                                        fontWeight: 500,
                                        lineHeight: "0.0125rem"
                                    }}
                                >
                                    /
                                </Typography>
                                <Typography
                                    sx={{
                                        fontSize: "1.75rem",
                                        fontWeight: 500,
                                        lineHeight: "0.0125rem"
                                    }}
                                >
                                    00
                                </Typography>
                        </Box>
                    </div>
                </Box>
                <Box className={styles.forumList}>
                    <Box className={styles.forumBook}>
                        <img src={Book} alt="책 예시 이미지" />
                    </Box>
                    <Box className={styles.forumRecruiteComplete}>
                        모집 완료
                    </Box>
                    <div className={styles.forumBottomContainer}>
                        <Typography 
                            sx={{
                                    fontSize: "1.75rem", 
                                    letterSpacing: "0.0175rem",
                                    fontWeight: 500,
                                    textAlign: "left"
                                }}
                        >
                            챌린지 제목
                        </Typography>
                        <Typography
                            sx={{
                                fontSize: "1.25rem",
                                fontWeight: 500,
                                letterSpacing: "0.0125rem",
                            }}
                        >
                            챌린지 세부 설명
                        </Typography>
                        <Box className={styles.groupLimitContainer}>
                                <Box className={styles.IconWrapper}>
                                    <GroupIcon sx={{ fontSize: "2rem" }} />
                                </Box>
                                <Typography
                                    sx={{
                                        fontSize: "1.75rem",
                                        fontWeight: 500,
                                        lineHeight: "0.0125rem"
                                    }}
                                >
                                    00
                                </Typography>
                                <Typography
                                    sx={{
                                        fontSize: "1.75rem",
                                        fontWeight: 500,
                                        lineHeight: "0.0125rem"
                                    }}
                                >
                                    /
                                </Typography>
                                <Typography
                                    sx={{
                                        fontSize: "1.75rem",
                                        fontWeight: 500,
                                        lineHeight: "0.0125rem"
                                    }}
                                >
                                    00
                                </Typography>
                        </Box>
                    </div>
                </Box>
            </Box>
        </Box>
    );
};

export default EntireForum;