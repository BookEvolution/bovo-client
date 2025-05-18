import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import styles from "./Forum.module.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import EntireForum from "../../components/forum/entireForum/EntireForum";
import MyForum from "../../components/forum/myForum/MyForum";
import { fetchAllChatrooms, fetchMyChatrooms } from "../../api/ForumService";
import { useQuery } from "@tanstack/react-query";

const Forum = () => {
    const [value, setValue] = useState(0); // 탭 상태

     // ✅ 전체 토론방 데이터
     const {
        data: chatrooms = [],
        isLoading: isLoadingAll,
        error: errorAll,
        refetch: refetchAll,
    } = useQuery({
        queryKey: ["allChatrooms"],
        queryFn: fetchAllChatrooms,
        enabled: value === 0, // 해당 탭이 활성화될 때만 요청
    });

    // ✅ 나의 토론방 데이터
    const {
        data: myChatrooms = [],
        isLoading: isLoadingMy,
        error: errorMy,
        refetch: refetchMy,
    } = useQuery({
        queryKey: ["myChatrooms"],
        queryFn: fetchMyChatrooms,
        enabled: value === 1, // 해당 탭이 활성화될 때만 요청
    });

    const handleChange = (event, newValue) => {
        setValue(newValue);

        // 선택된 탭에 따라 refetch 트리거 (선택적)
        if (newValue === 0) {
            refetchAll();
        } else if (newValue === 1) {
            refetchMy();
        }
    };

    return (
        <Box className={styles.ForumContainer}>
            <Box className={styles.TabContainer}>
                <Tabs value={value} onChange={handleChange} aria-label="discussion tabs">
                    <Tab 
                        label="토론방"
                        sx={{ 
                                width: "13rem", 
                                height: "4rem",
                                fontSize: "1.5rem",
                                letterSpacing: "0.015rem",
                                fontWeight: "bold"
                            }} 
                    />
                    <Tab 
                        label="내 토론" 
                        sx={{ 
                            width: "13rem", 
                            height: "4rem",
                            fontSize: "1.5rem",
                            letterSpacing: "0.015rem",
                            fontWeight: "bold"
                        }}
                    />
                </Tabs>
                <Link to="/main/forum/forum-make">
                    <Button 
                        className={styles.ForumMakeBtn}
                        sx={{
                            borderRadius: "1.5625rem",
                            backgroundColor: "#739CD4",
                            fontSize: "1.5rem",
                            letterSpacing: "0.015rem",
                            color: "#FFFFFF"
                        }}
                    >
                        방 만들기
                    </Button>
                </Link>
            </Box>
            {/* ✅ 조건부 렌더링 (로딩, 에러 처리 포함) */}
            {value === 0 && (
                <>
                    {isLoadingAll ? (
                        <p>로딩 중...</p>
                    ) : errorAll ? (
                        <p>토론방을 불러오는 중 오류가 발생했습니다.</p>
                    ) : (
                        <EntireForum chatrooms={chatrooms} />
                    )}
                </>
            )}

            {value === 1 && (
                <>
                    {isLoadingMy ? (
                        <p>로딩 중...</p>
                    ) : errorMy ? (
                        <p>내 토론방을 불러오는 중 오류가 발생했습니다.</p>
                    ) : (
                        <MyForum myChatrooms={myChatrooms} />
                    )}
                </>
            )}
        </Box>
    );
};

export default Forum;
