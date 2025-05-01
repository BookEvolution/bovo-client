import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import 'dayjs/locale/ko';
import styles from "./ForumMake.module.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createForumRoom } from "../../api/ForumService";
import { useDispatch, useSelector } from "react-redux";
import { clearBook } from "../../store/bookForum/BookSlice";
import { useMutation } from "@tanstack/react-query";

// 공통 스타일
const inputTitleStyle = {
    fontSize: "1.5rem",
    textAlign: "center",
};
  
const textFieldStyle = {
    width: "100%",
    height: "3rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "& input": {
      display: "flex",
      alignItems: "center",
      fontSize: "1.5rem",
      height: "2.5rem",
      padding: "0 1rem",
    },
    "& fieldset": { border: "none" },
};
  
const datePickerStyle = {
    width: "100%",
    "& .MuiOutlinedInput-root": {
      height: "3rem",
      padding: "0",
      display: "flex",
      alignItems: "center",
    },
    "& input": {
      fontSize: "1.2rem",
      textAlign: "center",
      padding: "0",
      height: "3rem",
    },
    "& fieldset": {
      border: "none",
      height: "100%",
    },
};


const ForumMake = () => {
    const book = useSelector((state) => state.book.book); // Redux에서 book 정보 가져오기
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [startDate, setStartDate] = useState(dayjs());
    const [endDate, setEndDate] = useState(dayjs().add(7, "day"));
    const [isPrivate, setIsPrivate] = useState(false);
    const [capacity, setCapacity] = useState("");
    const [chatName, setChatName] = useState("");
    const [chatDetail, setChatDetail] = useState("");
    const [secretQuestion, setSecretQuestion] = useState("");
    const [secretAnswer, setSecretAnswer] = useState("");

    const handleToggle = () => {
        setIsPrivate((prev) => !prev);
    };

    const mutation = useMutation({
        mutationFn: createForumRoom,
        onSuccess: (data, variables) => {
            console.log('Room created!', data);
            if (data.roomId) {
                const { chat_name } = variables.chat_info;
                navigate(`/forum/${data.roomId}`, {
                    state: { roomName: chat_name }
                });
                dispatch(clearBook());
            } else {
                alert("채팅방 생성에 실패했습니다.");
            }
        },
        onError: (error) => {
            console.error('Error creating room:', error);
            alert("방 만들기에 실패했습니다.");
        },
    });

    const handleSubmit = async () => {
        if (!chatName.trim() || !chatDetail.trim() || !capacity.trim()) {
            alert("필수 정보를 입력해주세요.");
            return;
        }

        const forumData = {
            book_info: {
                book_name: book.title, // 선택된 책 정보
                book_cover: book.thumbnail,
                book_author: book.authors.join(", ")
            },
            chat_info: {
                chat_name: chatName,
                chat_detail: chatDetail,
                challenge_start_date: startDate.format("YYYY-MM-DD"),
                challenge_end_date: endDate.format("YYYY-MM-DD"),
                is_secret: isPrivate,
                secret_question: isPrivate ? secretQuestion : "",
                secret_answer: isPrivate ? secretAnswer : "",
                max_recruiting: parseInt(capacity)
            }
        };

        mutation.mutate(forumData);
    };

    return (
        <Box className={styles.forumMakeContainer}>
            {book ? (
                <Box className={styles.bookWrapper}>
                    <img src={book.thumbnail} alt={book.title} />
                </Box>
            ) : (
                <Link to='/search'>
                    <Box className={styles.addBookWrapper}>
                        <AddCircleOutlineIcon sx={{fontSize: "3rem", color: "#739CD4"}}/>
                    </Box>
                </Link>
            )}
            <Box className={styles.inputBox}>
                <Typography
                    className={styles.inputTitle} 
                    sx={{
                        ...inputTitleStyle,
                        color: "rgba(0, 0, 0, 0.5)",
                    }}
                >
                    방 제목
                </Typography>
                <TextField
                    variant="outlined"
                    fullWidth
                    value={chatName} 
                    onChange={(e) => setChatName(e.target.value)}
                    sx={{
                        ...textFieldStyle,
                        backgroundColor: "#E8F1F6",
                    }}
                />
            </Box>
            <Box className={styles.descriptionInputBox}>
                <Typography
                    className={styles.inputTitle} 
                    sx={{
                        ...inputTitleStyle,
                        color: "rgba(0, 0, 0, 0.5)",
                    }}
                >
                    세부 설명
                </Typography>
                <TextField
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={4} // 줄 개수 지정 (4줄)
                    value={chatDetail} 
                    onChange={(e) => setChatDetail(e.target.value)} 
                    sx={{
                        ...textFieldStyle,
                        backgroundColor: "#E8F1F6",
                    }}
                />
            </Box>
            <Box className={styles.inputBox}>
                <Typography
                    className={styles.inputTitle} 
                    sx={{
                        ...inputTitleStyle,
                        color: "rgba(0, 0, 0, 0.5)",
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
                        sx={datePickerStyle}
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
                        sx={datePickerStyle}
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
                        ...inputTitleStyle,
                        color: "rgba(0, 0, 0, 0.5)",
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
                        ...textFieldStyle,
                        backgroundColor: "#E8F1F6",
                    }}
                />
            </Box>
            <Box className={styles.secretKeyContainer}>
                <FormControlLabel 
                    control={<Switch checked={isPrivate} onChange={handleToggle} />}
                    label="비밀방 설정"
                    labelPlacement="start"     
                />
                {/* 비밀방 설정 */}
                <Box 
                    className={styles.secretInputBox}
                    sx={{
                        backgroundColor: isPrivate ? "#E8F1F6": "#D9D9D9"
                    }}
                >
                    <Typography
                        className={styles.inputTitle} 
                        sx={{
                            ...inputTitleStyle,
                            color: isPrivate ? "rgba(0, 0, 0, 0.5)" : "#000000",
                        }}
                    >
                        질문
                    </Typography>
                    <TextField
                        fullWidth
                        variant="outlined"
                        disabled={!isPrivate} // ✅ isPrivate가 false이면 비활성화
                        value={secretQuestion} 
                        onChange={(e) => setSecretQuestion(e.target.value)}
                        sx={{
                            ...textFieldStyle,
                            backgroundColor: isPrivate ? "#E8F1F6": "#D9D9D9",
                        }}
                    />
                    
                </Box>
                <Box 
                    className={styles.secretInputBox}
                    sx={{
                        backgroundColor: isPrivate ? "#E8F1F6": "#D9D9D9"
                    }}
                >
                    <Typography
                        className={styles.inputTitle} 
                        sx={{
                            ...inputTitleStyle,
                            color: isPrivate ? "rgba(0, 0, 0, 0.5)" : "#000000",
                        }}
                    >
                        답변
                    </Typography>
                    <TextField
                        fullWidth
                        variant="outlined"
                        disabled={!isPrivate} // ✅ isPrivate가 false이면 비활성화
                        value={secretAnswer} 
                        onChange={(e) => setSecretAnswer(e.target.value)}
                        sx={{
                            ...textFieldStyle,
                            backgroundColor: isPrivate ? "#E8F1F6": "#D9D9D9",
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
                    완독한 사람들만 함께 하고 싶다면 비밀방을 설정하시는 것은 어떨까요?
                </Typography>
            </Box>

            {/* 방 만들기 버튼 */}
            <Button 
                className={styles.makeRoomBtn}
                onClick={handleSubmit} 
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