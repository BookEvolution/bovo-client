import { Box, Button, Tab, Tabs } from "@mui/material";
import styles from "./Forum.module.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import EntireForum from "../../components/forum/entireForum/EntireForum";
import MyForum from "../../components/forum/myForum/MyForum";
import { fetchAllChatrooms, fetchMyChatrooms } from "../../api/ForumService";

const Forum = () => {
    const [value, setValue] = useState(0); // 탭 상태
    const [chatrooms, setChatrooms] = useState([]); // 전체 토론방 데이터
    const [myChatrooms, setMyChatrooms] = useState([]); // 초기값을 빈 배열로 설정

    // ✅ 전체 독서 토론방 목록 요청
    const loadChatrooms = async () => {
        try {
            const data = await fetchAllChatrooms();  
            setChatrooms(data);
        } catch (error) {
            console.error("토론방 목록을 불러오는 중 오류 발생", error);
        }
    };

    // ✅ 나의 독서 토론방 목록 요청
    const loadMyChatroom = async () => {
        try {
            const data = await fetchMyChatrooms();  
            setMyChatrooms(data);
        } catch (error) {
            console.error("나의 토론방 데이터를 불러오는 중 오류 발생", error);
        }
    };

    // ✅ 탭 변경 시 데이터 요청
    const handleChange = (event, newValue) => {
        setValue(newValue);

        if (newValue === 0) {
            loadChatrooms(); // 전체 토론방 목록 로드
        } else if (newValue === 1) {
            loadMyChatroom(); // 내 토론방 목록 로드
        }
    };

    // ✅ 초기 데이터 요청
    useEffect(() => {
        loadChatrooms(); // 처음 컴포넌트가 마운트될 때 전체 채팅방 목록 요청
    }, []); // 의존성 배열이 빈 배열이면 컴포넌트 마운트 시 한 번만 실행됩니다.

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
                <Link to="/forum/forum-make">
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
            {value === 0 && <EntireForum chatrooms={chatrooms} />}
            {value === 1 && <MyForum myChatrooms={myChatrooms}/>}
        </Box>
    );
};

export default Forum;
