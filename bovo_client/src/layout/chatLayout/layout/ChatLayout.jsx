import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import TextField from "@mui/material/TextField";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import styles from "./ChatLayout.module.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Header from "../header/Header";
import { useEffect, useState } from "react";
import Sidebar from "../sidebar/Sidebar";
import ReadingShareModal from "../../../components/forum/readingShareModal/ReadingShareModal";
import { connectChat, disconnectChat, sendChatMessage } from "../../../api/ChatService";
import ForumChat from "../../../pages/forumChat/ForumChat";
import DeleteChatRoomModal from "../../../components/forum/deleteChatRoomModal/DeleteChatRoomModal";
import { useDispatch, useSelector } from "react-redux";
import { addMessage, clearChat } from "../../../store/chatInfo/ChatSlice.js";
import { deleteChatRoomUser, fetchUserList, getMemos } from "../../../api/ForumService.js";
import { useMutation, useQuery } from "@tanstack/react-query";

const ChatLayout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { roomId } = useParams();
    const location = useLocation();

    const roomName = location.state?.roomName; // state로부터 roomName을 추출

    // ✅ Redux에서 채팅 메시지 가져오기
    const chatMessages = useSelector((state) => state.chat.chatMessages);


    const [modalOpen, setModalOpen] = useState(false); //독서 기록 공유 모달 상태 관리
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [exitModalOpen, setExitModalOpen] = useState(false); // 채팅방 나가기 모달 상태
    const [newMessage, setNewMessage] = useState("");
    const [selectedMemos, setSelectedMemos] = useState([]); // 메모 보내기

    // React Query 훅을 통해 사용자 목록과 메모 데이터 요청
    const { data: userList, refetch: refetchUserList } = useQuery({
        queryKey : ['userList', roomId],
        queryFn: () => fetchUserList(roomId),
        enabled: false  // 초기에는 실행하지 않음
    });

    const { data: memos, refetch: refetchMemos } = useQuery({
        queryKey : ['memos', roomId],
        queryFn : () => getMemos(roomId),
        enabled: false // 초기에는 실행하지 않음
    });

    const { mutate } = useMutation({
        mutationFn: () => deleteChatRoomUser(roomId),
        onSuccess: () => {
            setExitModalOpen(false);
            navigate("/forum");
        },
        onError: (error) => {
            console.error("채팅방 나가기 실패:", error);
        }
    });

    console.log(chatMessages);

    const toggleSidebar = (open) => () => {
        setSidebarOpen(open);

        // 사이드바 열 때 사용자 목록 요청
        if (open) {
            refetchUserList();  // 사용자 목록 refetch
        }
    };

    // 기록 공유 모달 오픈 관련 함수
    const handleOpenModal = async () => {
        try {
            refetchMemos();  // 메모 목록 refetch
            setSelectedMemos([]);  // 모달 열 때 선택된 메모 초기화
            setModalOpen(true);  // 모달 열기
        } catch (error) {
            console.error("메모 데이터를 가져오는 데 실패했습니다:", error);
        }
    };
    const handleCloseModal = () => {
        setModalOpen(false);
        setSelectedMemos([]);  // 모달 닫을 때 선택된 메모 초기화
    };

    // 채팅방 나가기 버튼 클릭 시 모달 열기
    const handleExitClick = () => {
        setSidebarOpen(false); // 사이드바 닫기
        setExitModalOpen(true); // 모달 열기
    };

    // 채팅방 나가기 확인 버튼 클릭시
    const handleConfirmExit = () => {
        mutate(roomId);
    };

    // 모달 취소 버튼 클릭 시
    const handleCancelExit = () => {
        setExitModalOpen(false); // 모달 닫기
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

    const handleSelectMemo = (memo, checked) => {
        // 선택된 메모 업데이트
        if (checked) {
            setSelectedMemos((prevSelected) => [...prevSelected, memo]);
        } else {
            setSelectedMemos((prevSelected) => prevSelected.filter(item => item !== memo));
        }
    };

    const handleShareMemo = () => {
        if (selectedMemos.length > 0) {
            selectedMemos.forEach(memo => {
                const message = `${memo.memo_Q} : ${memo.memo_A}`;  // 책 제목과 메모 질문을 결합
                sendChatMessage(roomId, message); // 메모 질문을 메시지로 보내기
            });
            setSelectedMemos([]); // 전송 후 선택된 메모 초기화
            handleCloseModal(); // 모달 닫기
        }
    };

    return (
        <Container className={styles.layout}>
            <Header toggleSidebar={toggleSidebar} roomName={roomName} />
            <Sidebar 
                open={sidebarOpen} 
                toggleSidebar={toggleSidebar} 
                roomName={roomName} 
                handleExitClick={handleExitClick} 
                userList={userList}  // 사용자 목록 전달
            />
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
                handleSelectMemo={handleSelectMemo} // memo 선택 함수 추가
                handleShareMemo={handleShareMemo} // 확인 버튼 클릭 시 호출되는 함수
                memos={memos}  // 메모 데이터를 전달 
            />
            {/* 채팅방 나가기 모달 */}
            <DeleteChatRoomModal 
                open={exitModalOpen}
                onClose={handleCancelExit}
                onConfirm={handleConfirmExit}
            />
        </Container>
    );
};

export default ChatLayout;