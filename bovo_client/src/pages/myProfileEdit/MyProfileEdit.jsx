import { Box, Button, Container, TextField, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import profile6 from "../../assets/profile/profile_6.png";
import styles from "./MyProfileEdit.module.css";
import { useForm } from "react-hook-form";
import { useState } from "react";
import ProfileBottomSheet from "../../components/profileImgBottomSheet/ProfileBottomSheet";
 
const MyProfileEdit = () => {
    const [bottomSheetOpen, setBottomSheetOpen] = useState(false);
    const [selectedProfile, setSelectedProfile] = useState({ key: "profile_6", src: profile6 });
    const {register, handleSubmit, watch, formState: {isSubmitting, errors, isValid }} = useForm({mode : "onChange", defaultValues: { nickname: "", password: "", confirmPassword: "" }}); //프로필 수정 유효성 검사

    const nameRegex = /^\S+$/;
    const passwordRegex = /^[A-Za-z0-9]+$/;

    const password = watch("password");

    const onSubmit = (data) => {
        console.log("입력 데이터:", data);
    };

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
                    <img src={selectedProfile.src} alt="프로필 대체 이미지" />
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
                            sx={{
                                fontSize: "1.75rem", 
                                fontWeight: "bold",
                                textAlign: "center",
                                marginLeft: "1rem"
                            }}
                        >
                            닉네임
                        </Typography>
                        <TextField
                            placeholder="새로운 닉네임을 입력하세요"
                            variant="outlined"
                            fullWidth
                            InputProps={{ autoComplete: "username" }}
                            {...register('nickname', {
                                validate: (value) => (value.trim() === "" ? "닉네임을 입력하세요." : true), 
                                pattern: { value: nameRegex, message: "닉네임에 공백을 포함할 수 없습니다." },
                            })}
                            error={!!errors.nickname}
                            sx={{
                                backgroundColor: "#E8F1F6",
                                width: "100%",
                                height: "2.5rem",  // ✅ 입력창 높이 조정
                                "& input": {
                                    display: "flex",
                                    alignItems: "center", // ✅ Y축 중앙 정렬
                                    fontSize: "1.75rem",
                                    height: "2.5rem", 
                                    padding: "0 1rem", // ✅ 내부 여백 제거
                                },
                                "& fieldset": { border: "none" }, // ✅ 아웃라인 제거
                            }}
                        />
                    </Box>
                    {errors.nickname && (
                        <Typography 
                            className={styles.errorText} 
                            color="error"
                            sx={{ fontSize: "1.75rem", textAlign: "right" }}
                        >
                            {errors.nickname ? errors.nickname.message : "\u00A0"}
                        </Typography>
                    )}
                </Box>
                <Box className={styles.profileItem}>
                    <Box className={styles.inputBox}>
                        <Typography
                            className={styles.inputTitle}
                            sx={{
                                fontSize: "1.75rem",
                                fontWeight: "bold",
                                textAlign: "center",
                                marginLeft: "1rem"
                            }}
                        >
                            새 비밀번호
                        </Typography>
                        <TextField
                            type="password"
                            placeholder="새 비밀번호를 입력하세요"
                            fullWidth
                            {...register('password', {
                                required: true, 
                                pattern: { value: passwordRegex, 
                                        message: "특수문자 및 공백을 포함할 수 없습니다." },
                            })}
                            InputProps={{ autoComplete: "new-password" }}
                            error={!!errors.password}
                            sx={{
                                backgroundColor: "#E8F1F6",
                                width: "100%",
                                height: "2.5rem",  // ✅ 입력창 높이 조정
                                "& input": {
                                    display: "flex",
                                    alignItems: "center", // ✅ Y축 중앙 정렬
                                    fontSize: "1.75rem",
                                    height: "2.5rem", 
                                    padding: "0 1rem", // ✅ 내부 여백 제거
                                },
                                "& fieldset": { border: "none" }, // ✅ 아웃라인 제거
                            }}
                        />
                    </Box>
                    {errors.password && (
                            <Typography 
                                className={styles.errorText}
                                color="error" 
                                sx={{ fontSize: "1.75rem", textAlign: "right" }}
                            >
                                {errors.password ? errors.password.message : "\u00A0"}
                            </Typography>
                    )}
                </Box>
                <Box className={styles.profileItem}>
                    <Box className={styles.inputBox}>
                        <Typography
                            className={styles.inputTitle}
                            sx={{
                                fontSize: "1.75rem",
                                fontWeight: "bold",
                                textAlign: "center",
                                marginLeft: "1rem"
                            }}
                        >
                            비밀번호 확인
                        </Typography>
                        <TextField
                            type="password"
                            placeholder="비밀번호를 다시 입력하세요"
                            fullWidth
                            InputProps={{ autoComplete: "new-password" }}
                            {...register("confirmPassword", {
                                required: true,
                                pattern: { value: passwordRegex, message: "특수문자 및 공백을 포함할 수 없습니다." },
                                validate: (value) => value === password || "비밀번호가 일치하지 않습니다.",
                            })}
                            error={!!errors.confirmPassword}
                            sx={{
                                backgroundColor: "#E8F1F6",
                                width: "100%",
                                height: "2.5rem",  // ✅ 입력창 높이 조정
                                "& input": {
                                    display: "flex",
                                    alignItems: "center", // ✅ Y축 중앙 정렬
                                    fontSize: "1.75rem",
                                    height: "2.5rem", 
                                    padding: "0 1rem", // ✅ 내부 여백 제거
                                },
                                "& fieldset": { border: "none" }, // ✅ 아웃라인 제거
                            }}
                        />
                    </Box>
                    {errors.confirmPassword && (
                            <Typography
                                className={styles.errorText} 
                                color="error" 
                                sx={{ fontSize: "1.75rem", textAlign: "right" }}
                            >
                                {errors.confirmPassword ? errors.confirmPassword.message : "\u00A0"}
                            </Typography>
                    )}
                </Box>
                <Button 
                    className={styles.editBtn}
                    type="submit"
                    sx={{
                        borderRadius: "1.5625rem",
                        backgroundColor: "#BDE5F1",
                        fontSize: "2.1875rem",
                        color: "#FFFFFF",
                        "&.Mui-disabled": {  // ✅ 비활성화 시 글자색 강제 설정
                            color: "#FFFFFF",
                            backgroundColor: "#ccc", // 배경색도 유지
                            opacity: 1, // 기본적으로 흐려지는 효과 제거
                        }
                    }}
                    disabled={!isValid || isSubmitting} 
                >
                    확인
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