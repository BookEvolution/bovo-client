import { Box, Container, IconButton, TextField } from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import styles from "./ChatLayout.module.css";
import { useLocation, useParams } from "react-router-dom";
import Header from "../header/Header";
import { useEffect, useState } from "react";
import Sidebar from "../sidebar/Sidebar";
import ReadingShareModal from "../../../components/forum/readingShareModal/ReadingShareModal";
import { connectChat, disconnectChat, sendChatMessage } from "../../../api/ChatService";
import ForumChat from "../../../pages/forumChat/ForumChat";
import DeleteChatRoomModal from "../../../components/forum/deleteChatRoomModal/DeleteChatRoomModal";
import { useDispatch, useSelector } from "react-redux";
import { addMessage, clearChat } from "../../../store/chatInfo/ChatSlice.js";

const ChatLayout = () => {
    const dispatch = useDispatch();
    const { roomId } = useParams();
    const location = useLocation();

    const roomName = location.state?.roomName; // state로부터 roomName을 추출

    // ✅ Redux에서 채팅 메시지 가져오기
    const chatMessages = useSelector((state) => state.chat.chatMessages);


    const [modalOpen, setModalOpen] = useState(false); //독서 기록 공유 모달 상태 관리
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [exitModalOpen, setExitModalOpen] = useState(false); // 채팅방 나가기 모달 상태
    
    const [newMessage, setNewMessage] = useState("");
    console.log(chatMessages);

    const toggleSidebar = (open) => () => {
        setSidebarOpen(open);
    };

    const handleOpenModal = () => setModalOpen(true);
    const handleCloseModal = () => setModalOpen(false);

    // 채팅방 나가기 모달 열기
    const handleOpenExitModal = () => setExitModalOpen(true);
    const handleCloseExitModal = () => setExitModalOpen(false);

    // 채팅방 나가기 버튼 클릭 시
    const handleExitClick = () => {
        setSidebarOpen(false); // 사이트바 닫기
        handleOpenExitModal(); // 채팅방 나가기 모달 열기
    };

    // ✅ WebSocket 연결 및 메시지 관리
    useEffect(() => {
        const onMessageReceived = (message) => {
            dispatch(addMessage(message)); // Redux에 메시지 저장
        };

        connectChat(roomId, onMessageReceived);

        return () => {
            disconnectChat();
            dispatch(clearChat());  // ✅ Redux 상태 초기화
        };
    }, [roomId, dispatch]);

    // ✅ 새로고침 후 로컬 스토리지에서 메시지 복원
    useEffect(() => {
        const storedMessages = JSON.parse(sessionStorage.getItem('chatMessages')) || [];
        if (chatMessages.length === 0) {
            storedMessages.forEach((message) => {
                dispatch(addMessage(message)); // Redux에 메시지 추가
            });
        }
    }, [dispatch]);

    // 메시지 전송
    const handleSendMessage = () => {
        if (newMessage.trim()) {
            sendChatMessage(roomId, newMessage);
            setNewMessage("");
        }
    };

    return (
        <Container className={styles.layout}>
            <Header toggleSidebar={toggleSidebar} roomName={roomName} />
            <Sidebar open={sidebarOpen} toggleSidebar={toggleSidebar} roomName={roomName} handleExitClick={handleExitClick} />
            <ForumChat chatMessages={chatMessages} />
            <Box className={styles.inputContainer}>
                <IconButton className={styles.addBtn} onClick={handleOpenModal}>
                    <AddCircleIcon sx={{fontSize: "3.5rem", color: "#739CD4"}} />
                </IconButton>
                <TextField
                    fullWidth
                    variant="outlined"
                    type="text"
                    sx={{
                        backgroundColor: "#E8F1F6",
                        width: "35.25rem",
                        height: "4rem",  // ✅ 입력창 높이 조정
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: "1.5625rem",
                        "& input": {
                            display: "flex",
                            alignItems: "center", // ✅ Y축 중앙 정렬
                            fontSize: "1.5rem",
                            height: "2.5rem", 
                            padding: "1rem", // ✅ 내부 여백 제거
                        },
                        "& fieldset": { border: "none" }, // ✅ 아웃라인 제거
                    }}
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)} // 메시지 상태 업데이트
                />
                <IconButton 
                    className={styles.addBtn}
                    onClick={handleSendMessage}  // ✅ 메시지 전송 핸들러 추가
                    sx={{
                        borderRadius: "3.125rem",
                        backgroundColor: "#739CD4",
                    }}      
                >
                    <ArrowUpwardIcon sx={{fontSize: "2rem", color: "#FFFFFF", fontWeight: "bold"}} />
                </IconButton>
            </Box>
            <ReadingShareModal 
                open={modalOpen} 
                onClose={handleCloseModal} 
            />
            {/* 채팅방 나가기 모달 */}
            <DeleteChatRoomModal 
                open={exitModalOpen} 
                onClose={handleCloseExitModal} 
            />
        </Container>
    );
};

export default ChatLayout;