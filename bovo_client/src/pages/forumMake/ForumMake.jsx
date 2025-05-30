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
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";

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
    const book = useSelector((state) => state.book.book);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isPrivate, setIsPrivate] = useState(false);

    // React Hook Form 설정
    const {
        control,
        handleSubmit,
        getValues,
        formState: { isSubmitting }
    } = useForm({
        mode: 'onSubmit', // 제출 시에만 유효성 검사 (리렌더링 최소화)
        defaultValues: {
            chatName: '',
            chatDetail: '',
            capacity: '',
            startDate: dayjs(),
            endDate: dayjs().add(7, "day"),
            secretQuestion: '',
            secretAnswer: ''
        }
    });

    const handleToggle = () => {
        setIsPrivate((prev) => !prev);
    };

    const mutation = useMutation({
        mutationFn: createForumRoom,
        onSuccess: (data, variables) => {
            console.log('Room created!', data);
            if (data.roomId) {
                const { chat_name } = variables.chat_info;
                toast.success('방이 성공적으로 생성되었습니다!');
                navigate(`/forum/${data.roomId}`, {
                    state: { roomName: chat_name }
                });
                dispatch(clearBook());
            } else {
                toast.error("채팅방 생성에 실패했습니다.");
            }
        },
        onError: (error) => {
            console.error('Error creating room:', error);
            toast.error("방 만들기에 실패했습니다.");
        },
    });

    // 폼 제출 성공 시
    const onSubmit = async (data) => {
        // 책이 선택되지 않은 경우 체크
        if (!book) {
            toast.error("책을 먼저 선택해주세요.");
            return;
        }

        const forumData = {
            book_info: {
                book_name: book.title,
                book_cover: book.thumbnail,
                book_author: book.authors.join(", ")
            },
            chat_info: {
                chat_name: data.chatName,
                chat_detail: data.chatDetail,
                challenge_start_date: data.startDate.format("YYYY-MM-DD"),
                challenge_end_date: data.endDate.format("YYYY-MM-DD"),
                is_secret: isPrivate,
                secret_question: isPrivate ? data.secretQuestion : "",
                secret_answer: isPrivate ? data.secretAnswer : "",
                max_recruiting: parseInt(data.capacity)
            }
        };

        mutation.mutate(forumData);
    };

    // 폼 제출 실패 시 (유효성 검사 오류)
    const onError = (validationErrors) => {
        console.log("error 출력", validationErrors);
        const errorFieldNames = [];

        // Object.keys()를 사용하여 에러가 있는 필드 이름들을 배열로 가져옵니다.
        Object.keys(validationErrors).forEach((fieldName) => {
            // 비밀방 관련 필드는 isPrivate이 true일 때만 메시지에 포함
            if (!isPrivate && (fieldName === "secretQuestion" || fieldName === "secretAnswer")) {
                return; // 다음 필드로 넘어감
            }

            switch (fieldName) {
                case "chatName":
                    errorFieldNames.push("방 제목");
                    break;
                case "chatDetail":
                    errorFieldNames.push("세부 설명");
                    break;
                case "startDate":
                    errorFieldNames.push("시작 날짜");
                    break;
                case "endDate":
                    errorFieldNames.push("종료 날짜");
                    break;
                case "capacity":
                    errorFieldNames.push("모집 인원");
                    break;
                case "secretQuestion":
                    errorFieldNames.push("비밀방 질문");
                    break;
                case "secretAnswer":
                    errorFieldNames.push("비밀방 답변");
                    break;
                default:
                    // 알 수 없는 필드는 포함하지 않거나, 필요하다면 추가 처리
                    break;
            }
        });

        if (errorFieldNames.length > 0) {
            const errorMessage = `${errorFieldNames.join(", ")}을(를) 입력해주세요.`;
            toast.error(errorMessage);
        } else {
            // 예상치 못한 에러가 발생했거나, isPrivate이 false여서 비밀방 관련 에러가 무시된 경우
            // 첫 번째 에러 메시지를 표시하거나, 일반적인 에러 메시지 표시
            const firstError = Object.values(validationErrors)[0];
            if (firstError?.message) {
                toast.error(firstError.message);
            } else {
                toast.error("폼 입력에 오류가 있습니다. 다시 확인해주세요.");
            }
        }
    };

    return (
        <form className={styles.forumMakeContainer} onSubmit={handleSubmit(onSubmit, onError)}>
            {book ? (
                <Box className={styles.bookWrapper}>
                    <img src={book.thumbnail} alt={book.title} />
                </Box>
            ) : (
                <Link to='/main/search'>
                    <Box className={styles.addBookWrapper}>
                        <AddCircleOutlineIcon sx={{fontSize: "3rem", color: "#739CD4"}}/>
                    </Box>
                </Link>
            )}
            {/* 방 제목 */}
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
                <Controller
                    name="chatName"
                    control={control}
                    rules={{
                        required: (value) => {
                            if (!value || !value.trim()) {
                                return '방 제목을 입력해주세요.';
                            }
                            return true;
                        }
                    }}
                    render={({ field, fieldState: { error } }) => (
                        <TextField
                            {...field}
                            variant="outlined"
                            fullWidth
                            error={!!error}
                            sx={{
                                ...textFieldStyle,
                                backgroundColor: "#E8F1F6",
                            }}
                        />
                    )}
                />
            </Box>

            {/* 세부 설명 */}
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
                <Controller
                    name="chatDetail"
                    control={control}
                    rules={{
                        required: (value) => {
                            if (!value || !value.trim()) {
                                return '세부 설명을 입력해주세요.';
                            }
                            return true;
                        }
                    }}
                    render={({ field, fieldState: { error } }) => (
                        <TextField
                            {...field}
                            variant="outlined"
                            fullWidth
                            multiline
                            rows={4}
                            error={!!error}
                            sx={{
                                ...textFieldStyle,
                                backgroundColor: "#E8F1F6",
                            }}
                        />
                    )}
                />
            </Box>

            {/* 기간 설정 */}
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
                    <Controller
                        name="startDate"
                        control={control}
                        rules={{
                            required: '시작 날짜를 선택해주세요.',
                            validate: (value) => {
                                if (value && dayjs(value).isBefore(dayjs(), 'day')) {
                                    return '시작 날짜는 오늘 이후여야 합니다.';
                                }
                                return true;
                            }
                        }}
                        render={({ field, fieldState: { error } }) => (
                            <DatePicker
                                {...field}
                                label="시작 날짜"
                                format="YYYY.MM.DD"
                                disablePortal
                                sx={datePickerStyle}
                                slotProps={{
                                    textField: {
                                        error: !!error,
                                        inputProps: { 'aria-hidden': 'false' },
                                    }
                                }}
                            />
                        )}
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
                    <Controller
                        name="endDate"
                        control={control}
                        rules={{
                            required: '종료 날짜를 선택해주세요.',
                            validate: (value) => {
                                const startDate = getValues('startDate');
                                if (value && startDate && dayjs(value).isBefore(startDate, 'day')) {
                                    return '종료 날짜는 시작 날짜 이후여야 합니다.';
                                }
                                return true;
                            }
                        }}
                        render={({ field, fieldState: { error } }) => (
                            <DatePicker
                                {...field}
                                label="종료 날짜"
                                format="YYYY.MM.DD"
                                disablePortal
                                sx={datePickerStyle}
                                slotProps={{
                                    textField: {
                                        error: !!error,
                                        inputProps: { 'aria-hidden': 'false' },
                                    }
                                }}
                            />
                        )}
                    />
                </LocalizationProvider>
            </Box>

            {/* 모집 인원 */}
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
                <Controller
                    name="capacity"
                    control={control}
                    rules={{
                        required: '모집 인원을 입력해주세요.',
                        validate: (value) => {
                            const num = parseInt(value);
                            if (isNaN(num) || num < 2) {
                                return '최소 2명 이상이어야 합니다.';
                            }
                            return true;
                        }
                    }}
                    render={({ field, fieldState: { error } }) => (
                        <TextField
                            {...field}
                            variant="outlined"
                            fullWidth
                            type="number"
                            error={!!error}
                            onChange={(e) => {
                                const value = e.target.value;
                                if (/^\d*$/.test(value)) {
                                    field.onChange(value);
                                }
                            }}
                            inputProps={{
                                min: 2,
                                max: 50,
                                step: 1,
                                pattern: "[0-9]*",
                            }}
                            sx={{
                                ...textFieldStyle,
                                backgroundColor: "#E8F1F6",
                            }}
                        />
                    )}
                />
            </Box>

            {/* 비밀방 설정 */}
            <Box className={styles.secretKeyContainer}>
                <FormControlLabel 
                    control={<Switch checked={isPrivate} onChange={handleToggle} />}
                    label="비밀방 설정"
                    labelPlacement="start"     
                />
                
                {/* 질문 */}
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
                    <Controller
                        name="secretQuestion"
                        control={control}
                        rules={isPrivate ? {
                            required: '비밀방 질문을 입력해주세요.',
                            minLength: {
                                value: 3,
                                message: '질문은 최소 3글자 이상이어야 합니다.'
                            }
                        } : {}}
                        render={({ field, fieldState: { error } }) => (
                            <TextField
                                {...field}
                                fullWidth
                                variant="outlined"
                                disabled={!isPrivate}
                                error={!!error && isPrivate}
                                sx={{
                                    ...textFieldStyle,
                                    backgroundColor: isPrivate ? "#E8F1F6": "#D9D9D9",
                                }}
                            />
                        )}
                    />
                </Box>

                {/* 답변 */}
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
                    <Controller
                        name="secretAnswer"
                        control={control}
                        rules={isPrivate ? {
                            required: '비밀방 답변을 입력해주세요.',
                            minLength: {
                                value: 1,
                                message: '답변을 입력해주세요.'
                            }
                        } : {}}
                        render={({ field, fieldState: { error } }) => (
                            <TextField
                                {...field}
                                fullWidth
                                variant="outlined"
                                disabled={!isPrivate}
                                error={!!error && isPrivate}
                                sx={{
                                    ...textFieldStyle,
                                    backgroundColor: isPrivate ? "#E8F1F6": "#D9D9D9",
                                }}
                            />
                        )}
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
                type="submit"
                disabled={isSubmitting || mutation.isPending}
                className={styles.makeRoomBtn}
                sx={{
                    backgroundColor: "#E8F1F6",
                    borderRadius: "1.5625rem",
                    fontSize: "2rem",
                    letterSpacing: "0.02rem",
                    color: "#739CD4",
                    fontWeight: 500,
                    opacity: (isSubmitting || mutation.isPending) ? 0.6 : 1
                }}
            >
                {isSubmitting || mutation.isPending ? '방 생성 중...' : '방 만들기'}
            </Button>
        </form>
    );
};

export default ForumMake;