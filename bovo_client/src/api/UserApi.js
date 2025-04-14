import { useMutation, useQuery } from "@tanstack/react-query";
import api from "./Auth"; // ✅ axios 인스턴스 가져오기

// ✅ 마이 페이지 데이터 가져오기
const fetchMyPageData = async () => {
    const response = await api.get("/my-page"); // ✅ api 사용
    console.log(response.data);
    return response.data;
};

export const useMyPageQuery = () => {
    return useQuery({
        queryKey: ['myPageData'],
        queryFn: fetchMyPageData,
    });
};

// ✅ 마이 프로필 정보 가져오기
const fetchMyProfileData = async () => {
    const response = await api.get("/my-page/profile"); // ✅ api 사용
    console.log(response);
    return response.data;
};

export const useMyProfileQuery = () => {
    return useQuery({
        queryKey: ['myProfileData'],
        queryFn: fetchMyProfileData,
    });
};

// ✅ 마이 프로필 수정 정보 가져오기
const fetchMyProfileEditData = async () => {
    const response = await api.get("/my-page/profile/update"); // ✅ api 사용
    console.log("프로필 데이터:", response.data);
    return response.data;
};

export const useMyProfileEditQuery = () => {
    return useQuery({
        queryKey: ['myProfileEditData'],
        queryFn: fetchMyProfileEditData,
    });
};

// ✅ 프로필 수정 요청 (닉네임, 프로필 이미지, 비밀번호)
export const editUserProfile = async (profileData) => {
    const response = await api.put("/my-page/profile/update", profileData);
    return response.data;
};

// ✅ useMutation 훅 생성
export const useEditProfileMutation = () => {
    return useMutation({
        mutationFn: editUserProfile,
    });
};