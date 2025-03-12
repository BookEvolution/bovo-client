import { Box, Button, FormControlLabel, Switch, TextField, Typography } from "@mui/material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import 'dayjs/locale/ko';
import styles from "./ForumMake.module.css";
import { useState } from "react";
import { Link } from "react-router-dom";

const ForumMake = () => {

    const [startDate, setStartDate] = useState(dayjs());
    const [endDate, setEndDate] = useState(dayjs().add(7, "day"));
    const [isPrivate, setIsPrivate] = useState(false);
    const [capacity, setCapacity] = useState("");

    const handleToggle = () => {
        setIsPrivate((prev) => !prev);
    };

    return (
        <Box className={styles.forumMakeContainer}>
            <Link to='/search'>
                <Box className={styles.addBookWrapper}>
                    <AddCircleOutlineIcon sx={{fontSize: "3rem", color: "#739CD4"}}/>
                </Box>
            </Link>
            <Box className={styles.inputBox}>
                <Typography
                    className={styles.inputTitle} 
                    sx={{
                        fontSize: "1.5rem", 
                        color: "rgba(0, 0, 0, 0.5)",
                        textAlign: "center",
                    }}
                >
                    방 제목
                </Typography>
                <TextField
                    variant="outlined"
                    fullWidth
                    sx={{
                        backgroundColor: "#E8F1F6",
                        width: "100%",
                        height: "3rem",  // ✅ 입력창 높이 조정
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        "& input": {
                            display: "flex",
                            alignItems: "center", // ✅ Y축 중앙 정렬
                            fontSize: "1.5rem",
                            height: "2.5rem", 
                            padding: "0 1rem", // ✅ 내부 여백 제거
                        },
                        "& fieldset": { border: "none" }, // ✅ 아웃라인 제거
                    }}
                />
            </Box>
            <Box className={styles.descriptionInputBox}>
                <Typography
                    className={styles.inputTitle} 
                    sx={{
                        fontSize: "1.5rem", 
                        color: "rgba(0, 0, 0, 0.5)",
                        textAlign: "center",
                    }}
                >
                    세부 설명
                </Typography>
                <TextField
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={4} // 줄 개수 지정 (4줄)
                    sx={{
                        backgroundColor: "#E8F1F6",
                        width: "100%",
                        height: "5rem",  // ✅ 입력창 높이 조정
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        "& input": {
                            display: "flex",
                            alignItems: "center", // ✅ Y축 중앙 정렬
                            fontSize: "1.5rem",
                            height: "2.5rem", 
                            padding: "0 1rem", // ✅ 내부 여백 제거
                        },
                        "& fieldset": { border: "none" }, // ✅ 아웃라인 제거
                    }}
                />
            </Box>
            <Box className={styles.inputBox}>
                <Typography
                    className={styles.inputTitle} 
                    sx={{
                        fontSize: "1.5rem", 
                        color: "rgba(0, 0, 0, 0.5)",
                        textAlign: "center",
                    }}
                >
                    기간 설정
                </Typography>
                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko">
                    <DatePicker
                        label="시작 날짜"
                        value={startDate}
                        onChange={(newValue) => setStartDate(newValue)}
                        format="YYYY.MM.DD" // 날짜 형식 변경
                        disablePortal
                        sx={{
                            width: "100%",
                            "& .MuiOutlinedInput-root": { // DatePicker의 input 스타일 수정
                                height: "3rem", // 전체 높이 조정
                                padding: "0", // 내부 패딩 제거
                                display: "flex",
                                alignItems: "center",
                            },
                            "& input": { // 실제 입력 필드 스타일 조정
                                fontSize: "1.2rem",
                                textAlign: "center",
                                padding: "0", // 내부 패딩 제거
                                height: "3rem", // 입력 필드 높이 맞추기
                            },
                            "& fieldset": { // 아웃라인 박스 크기 조정
                                border: "none",
                                height: "100%", // fieldset이 입력 필드보다 커지는 현상 방지
                            },
                        }}
                        slotProps={{
                            textField: {
                                inputProps: { 'aria-hidden': 'false' }, // 접근성 오류 방지
                            }
                        }}
                    />
                    <Typography 
                        sx={{ 
                            width: "5rem",
                            fontSize: "1.5rem",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center", 
                        }}
                    >
                        ~
                    </Typography>
                    {/* 종료 날짜 선택 */}
                    <DatePicker
                        label="종료 날짜"
                        value={endDate}
                        onChange={(newValue) => setEndDate(newValue)}
                        format="YYYY.MM.DD"
                        disablePortal
                        sx={{
                            width: "100%",
                            "& .MuiOutlinedInput-root": { // DatePicker의 input 스타일 수정
                                height: "3rem", // 전체 높이 조정
                                padding: "0", // 내부 패딩 제거
                                display: "flex",
                                alignItems: "center",
                            },
                            "& input": { // 실제 입력 필드 스타일 조정
                                fontSize: "1.2rem",
                                textAlign: "center",
                                padding: "0", // 내부 패딩 제거
                                height: "3rem", // 입력 필드 높이 맞추기
                            },
                            "& fieldset": { // 아웃라인 박스 크기 조정
                                border: "none",
                                height: "100%", // fieldset이 입력 필드보다 커지는 현상 방지
                            },
                        }}
                        slotProps={{
                            textField: {
                                inputProps: { 'aria-hidden': 'false' }, // 접근성 오류 방지
                            }
                        }}
                    />
                </LocalizationProvider>
            </Box>
            <Box className={styles.inputBox}>
                <Typography
                    className={styles.inputTitle} 
                    sx={{
                        fontSize: "1.5rem", 
                        color: "rgba(0, 0, 0, 0.5)",
                        textAlign: "center",
                    }}
                >
                    모집 인원
                </Typography>
                <TextField
                    variant="outlined"
                    fullWidth
                    type="number"
                    value={capacity}
                    onChange={(e) => {
                        const value = e.target.value;
                        if (/^\d*$/.test(value)) { // 숫자만 허용
                            setCapacity(value);
                        }
                    }}
                    inputProps={{
                        min: 1, // 최소값 설정
                        step: 1, // 1씩 증가하도록 설정
                        pattern: "[0-9]*", // 모바일 키보드에서 숫자 키패드가 뜨도록 설정
                    }}
                    sx={{
                        backgroundColor: "#E8F1F6",
                        width: "100%",
                        height: "3rem",  // ✅ 입력창 높이 조정
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        "& input": {
                            display: "flex",
                            alignItems: "center", // ✅ Y축 중앙 정렬
                            fontSize: "1.5rem",
                            height: "2.5rem", 
                            padding: "0 1rem", // ✅ 내부 여백 제거
                        },
                        "& fieldset": { border: "none" }, // ✅ 아웃라인 제거
                    }}
                />
            </Box>
            <Box className={styles.secretKeyContainer}>
                {/* 비밀방 설정 */}
                <Box 
                    className={styles.inputBox}
                    sx={{
                        backgroundColor: isPrivate ? "#E8F1F6": "#D9D9D9"
                    }}
                >
                    <Typography
                        className={styles.inputTitle} 
                        sx={{
                            fontSize: "1.5rem", 
                            color: isPrivate ? "rgba(0, 0, 0, 0.5)" : "#000000",
                            textAlign: "center",
                        }}
                    >
                        비밀방
                    </Typography>
                    <TextField
                        fullWidth
                        variant="outlined"
                        type="password"
                        disabled={!isPrivate} // ✅ isPrivate가 false이면 비활성화
                        sx={{
                            backgroundColor: isPrivate ? "#E8F1F6": "#D9D9D9",
                            width: "100%",
                            height: "3rem",  // ✅ 입력창 높이 조정
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            "& input": {
                                display: "flex",
                                alignItems: "center", // ✅ Y축 중앙 정렬
                                fontSize: "1.5rem",
                                height: "2.5rem", 
                                padding: "0 1rem", // ✅ 내부 여백 제거
                            },
                            "& fieldset": { border: "none" }, // ✅ 아웃라인 제거
                        }}
                    />
                    <FormControlLabel 
                        control={<Switch checked={isPrivate} onChange={handleToggle} />} 
                        sx={{
                            marginLeft: "1rem",
                        }}    
                    />
                </Box>
                <Typography
                    sx={{
                        paddingLeft: "1rem",
                        fontSize: "1.125rem",
                        color: "#739CD4"
                    }}
                >
                    비밀방 설정 시 세부 설명에 비밀번호 힌트를 적어주세요!
                </Typography>
            </Box>

            {/* 방 만들기 버튼 */}
            <Button 
                className={styles.makeRoomBtn} 
                sx={{
                    backgroundColor: "#E8F1F6",
                    borderRadius: "1.5625rem",
                    fontSize: "2rem",
                    letterSpacing: "0.02rem",
                    color: "#739CD4",
                    fontWeight: 500
                }}
            >
                방 만들기
            </Button>
        </Box>
    );
};

export default ForumMake;