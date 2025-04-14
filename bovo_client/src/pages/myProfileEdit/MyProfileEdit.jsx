import { Box, Button, Container, TextField, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import styles from "./MyProfileEdit.module.css";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useEditProfileMutation, useMyProfileEditQuery } from "../../api/UserApi";
import ProfileBottomSheet from "../../components/profileImgBottomsheet/ProfileBottomSheet";
import { useNavigate } from "react-router-dom";
 
const MyProfileEdit = () => {
    const navigate = useNavigate(); // ✅ useNavigate 추가
    const [bottomSheetOpen, setBottomSheetOpen] = useState(false);
    const [selectedProfile, setSelectedProfile] = useState({ key: "", src: "" });
    const {register, handleSubmit, watch, setValue, formState: {isSubmitting, errors }} = useForm({mode : "onChange", defaultValues: { nickname: "", password: "", confirmPassword: "" }}); //프로필 수정 유효성 검사
    const { data: profileData, isLoading, isError } = useMyProfileEditQuery();
    // ✅ mutation 훅 사용
    const { mutate: editProfile, isPending } = useEditProfileMutation();

    // useEffect 삭제 대신 이 부분으로 처리
    useEffect(() => {
        if (profileData) {
            setValue("nickname", profileData.nickname || "");
            setSelectedProfile({ key: "profileImg", src: profileData.profile_pictures });
        }
    }, [profileData, setValue]);

    const nameRegex = /^\S+$/;
    const passwordRegex = /^[A-Za-z0-9]+$/;

    const password = watch("password");
    const nickname = watch("nickname");

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
                navigate("/mypage/myprofile");
            },
            onError: (error) => {
                console.error("프로필 수정 실패:", error);
            }
        });
    };

    if (isLoading) {
        return <Typography>로딩 중...</Typography>;
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
                                pattern: { value: passwordRegex, message: "특수문자 및 공백을 포함할 수 없습니다." },
                                validate: (value) => password === "" || value === password || "비밀번호가 일치하지 않습니다.",
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
                {!isPending ? (
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
                        disabled={(nickname.trim() === "" || isSubmitting) 
                                    || (password !== "" && errors.confirmPassword)}
                    >
                        확인
                    </Button>
                ) : (
                    <Button 
                        className={styles.editBtn}
                        type="button"
                        sx={{
                            borderRadius: "1.5625rem",
                            backgroundColor: "#D9D9D9",
                            fontSize: "2.1875rem",
                            color: "#FFFFFF",
                        }}
                        disabled={true}
                    >
                        전송 중...
                    </Button>
                )}
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