import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import SearchIcon from "@mui/icons-material/Search";
import styles from "./MyProfileEdit.module.css";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useEditProfileMutation, useMyProfileEditQuery } from "../../api/UserApi";
import ProfileBottomSheet from "../../components/profileImgBottomSheet/ProfileBottomSheet";
import LoadingSpinner from "../../components/loadingSpinner/LoadingSpinner";
import { useNavigate } from "react-router-dom";


// 공통 textfield sx 속성(style)
const commonTextFieldSx = {
    backgroundColor: "#E8F1F6",
    width: "100%",
    height: "2.5rem",
    "& input": {
      display: "flex",
      alignItems: "center",
      fontSize: "1.75rem",
      height: "2.5rem",
      padding: "0 1rem",
    },
    "& fieldset": { border: "none" },
};

// textfield 제목 sx 속성(style)
const inputTitleSx = {
    fontSize: "1.75rem",
    fontWeight: "bold",
    textAlign: "center",
    marginLeft: "1rem",
};

// error 문구 sx 속성(style)
const errorTextSx = {
    fontSize: "1.75rem",
    textAlign: "right",
};

const MyProfileEdit = () => {
    const navigate = useNavigate(); // ✅ useNavigate 추가
    const [bottomSheetOpen, setBottomSheetOpen] = useState(false);
    const [selectedProfile, setSelectedProfile] = useState({ key: "", src: "" });
    const {register, handleSubmit, setValue, getValues, formState: { errors, isValid }, trigger} = useForm({ mode: "onSubmit", defaultValues: { nickname: "", password: "", confirmPassword: "" }}); //프로필 수정 유효성 검사
    const { data: profileData, isLoading, isError } = useMyProfileEditQuery();
    // ✅ mutation 훅 사용
    const { mutate: editProfile, isPending } = useEditProfileMutation();
    // 정규식 검정
    const nameRegex = /^\S+$/;
    const passwordRegex = /^[A-Za-z0-9]+$/;
    // 유효성 검사 규칙
    const validationRules = {
        nickname: {
            validate: (value) => (value.trim() === "" ? "닉네임을 입력하세요." : true), 
            pattern: { value: nameRegex, message: "닉네임에 공백을 포함할 수 없습니다." },
        },
        password: {
            pattern: { value: passwordRegex, message: "특수문자 및 공백을 포함할 수 없습니다." },
        },
        confirmPassword: (getValues) => ({
            pattern: { value: passwordRegex, message: "특수문자 및 공백을 포함할 수 없습니다." },
            validate: (value) => {
                const password = getValues('password');
                if (!password) return true; // password 비어있으면 confirmPassword 검사 안 함
                return value === password || "비밀번호가 일치하지 않습니다.";
            },
        }),
    };

    // 컴포넌트 첫 진입시 default value 입력 데이터
    useEffect(() => {
        if (profileData) {
            setValue("nickname", profileData.nickname || "");
            setSelectedProfile({ key: "profileImg", src: profileData.profile_pictures });
        }
    }, [profileData, setValue]);


    const onSubmit = async (data) => {
        // 비밀번호가 비어있다면 null로 설정
        const updatedData = {
            profile_pictures: selectedProfile.src,
            nickname: data.nickname,
            password: data.password || null, // 비밀번호 변경하지 않으면 null
        };
    
        editProfile(updatedData, {
            onSuccess: (response) => {
                console.log("수정된 프로필:", response);
                navigate("/main/mypage/myprofile");
            },
            onError: (error) => {
                console.error("프로필 수정 실패:", error);
            }
        });
    };

    const handleBlur = async (field) => {
        await trigger(field);  // onBlur 시 유효성 검사 실행
    };

    if (isLoading) {
        return <LoadingSpinner />;
    }
    
    if (isError) {
        return <Typography color="error">프로필 정보를 불러오는 중 오류가 발생했습니다.</Typography>;
    }

    return (
        <Container className={styles.myProfileEditContainer}>
            <Box 
                className={styles.profileImgWrapper}
                onClick={() => setBottomSheetOpen(true)}
            >
                <Box className={styles.iconWrapper}>
                    <SearchIcon sx={{fontSize: "3.8rem", color: "#739CD4" }}/>
                </Box>
                <Box className={styles.profileImg}>
                {selectedProfile?.src && <img src={selectedProfile.src} alt="프로필 이미지" />}
                </Box>
            </Box>
            <form
                className={styles.profileForm} 
                onSubmit={handleSubmit(onSubmit)}
            >
                <Box className={styles.profileItem}>
                    <Box className={styles.inputBox}>
                        <Typography
                            className={styles.inputTitle} 
                            sx={inputTitleSx}
                        >
                            닉네임
                        </Typography>
                        <TextField
                            placeholder="새로운 닉네임을 입력하세요"
                            variant="outlined"
                            fullWidth
                            InputProps={{ autoComplete: "username" }}
                            {...register('nickname', validationRules.nickname)}
                            error={!!errors.nickname}
                            onBlur={() => handleBlur("nickname")}
                            sx={commonTextFieldSx}
                        />
                    </Box>
                    {errors.nickname && (
                        <Typography 
                            className={styles.errorText} 
                            color="error"
                            sx={errorTextSx}
                        >
                            {errors.nickname ? errors.nickname.message : "\u00A0"}
                        </Typography>
                    )}
                </Box>
                <Box className={styles.profileItem}>
                    <Box className={styles.inputBox}>
                        <Typography
                            className={styles.inputTitle}
                            sx={inputTitleSx}
                        >
                            새 비밀번호
                        </Typography>
                        <TextField
                            type="password"
                            placeholder="새 비밀번호를 입력하세요"
                            fullWidth
                            {...register('password', validationRules.password)}
                            InputProps={{ autoComplete: "new-password" }}
                            error={!!errors.password}
                            onBlur={() => handleBlur("password")}
                            sx={commonTextFieldSx}
                        />
                    </Box>
                    {errors.password && (
                            <Typography 
                                className={styles.errorText}
                                color="error" 
                                sx={errorTextSx}
                            >
                                {errors.password ? errors.password.message : "\u00A0"}
                            </Typography>
                    )}
                </Box>
                <Box className={styles.profileItem}>
                    <Box className={styles.inputBox}>
                        <Typography
                            className={styles.inputTitle}
                            sx={inputTitleSx}
                        >
                            비밀번호 확인
                        </Typography>
                        <TextField
                            type="password"
                            placeholder="비밀번호를 다시 입력하세요"
                            fullWidth
                            InputProps={{ autoComplete: "new-password" }}
                            {...register("confirmPassword", validationRules.confirmPassword(getValues))}
                            error={!!errors.confirmPassword}
                            onBlur={() => handleBlur("confirmPassword")}
                            sx={commonTextFieldSx}
                        />
                    </Box>
                    {errors.confirmPassword && (
                            <Typography
                                className={styles.errorText} 
                                color="error" 
                                sx={errorTextSx}
                            >
                                {errors.confirmPassword ? errors.confirmPassword.message : "\u00A0"}
                            </Typography>
                    )}
                </Box>
                <Button 
                    className={styles.editBtn}
                    type={isPending ? "button" : "submit"}
                    sx={{
                        borderRadius: "1.5625rem",
                        backgroundColor: "#BDE5F1",
                        fontSize: "2.1875rem",
                        color: "#FFFFFF",
                        "&.Mui-disabled": {  // ✅ 비활성화 시 글자색 강제 설정
                            backgroundColor: "#D9D9D9", // 배경색도 유지
                            opacity: 1, // 기본적으로 흐려지는 효과 제거
                        }
                    }}
                    disabled={isPending || !isValid}
                >
                    {isPending ? "전송 중..." : "확인"}
                </Button>
            </form>
            <ProfileBottomSheet 
                open={bottomSheetOpen} 
                onClose={() => setBottomSheetOpen(false)}
                onSelectProfile={setSelectedProfile} // 선택한 프로필 전달
                selectedProfile={selectedProfile} // 기본 선택된 프로필 전달
            />
        </Container>
    );
};

export default MyProfileEdit;