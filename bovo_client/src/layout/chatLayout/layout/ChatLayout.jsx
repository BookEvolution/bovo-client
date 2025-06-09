import Container from '@mui/material/Container';
import styles from "./ChatLayout.module.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Header from "../header/Header";
import { useCallback, useEffect, useState } from "react";
import Sidebar from "../sidebar/Sidebar";
import ReadingShareModal from "../../../components/forum/readingShareModal/ReadingShareModal";
import { connectChat, disconnectChat, sendChatMessage } from "../../../api/ChatService";
import ForumChat from "../../../pages/forumChat/ForumChat";
import DeleteChatRoomModal from "../../../components/forum/deleteChatRoomModal/DeleteChatRoomModal";
import { useDispatch, useSelector } from "react-redux";
import { addMessage, clearChat } from "../../../store/chatInfo/ChatSlice.js";
import { deleteChatRoomUser, fetchUserList, getMemos } from "../../../api/ForumService.js";
import { useMutation, useQuery } from "@tanstack/react-query";
import ChatInputContainer from '../../../components/chat/chatInputContainer/ChatInputContainer.jsx';
import { toast } from 'react-toastify';

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
    const [selectedMemos, setSelectedMemos] = useState([]); // 메모 보내기

    // React Query 훅을 통해 사용자 목록과 메모 데이터 요청
    const { data: userList, refetch: refetchUserList } = useQuery({
        queryKey : ['userList', roomId],
        queryFn: () => fetchUserList(roomId),
        enabled: false  // 초기에는 실행하지 않음
    });

    const { 
        data: memos, 
        refetch: refetchMemos, 
        isPending: memosLoading, // 로딩 중 상태
        isError: memosError // 에러 발생 상태
    } = useQuery({
        queryKey : ['memos', roomId],
        queryFn : () => getMemos(roomId),
        enabled: false // 초기에는 실행하지 않음
    });

    const { mutate } = useMutation({
        mutationFn: () => deleteChatRoomUser(roomId),
        onSuccess: () => {
            setExitModalOpen(false);
            navigate("/main/forum");
        },
        onError: (error) => {
            console.error("채팅방 나가기 실패:", error);
        }
    });

    console.log(chatMessages);

    const toggleSidebar = useCallback((open) => () => {
        setSidebarOpen(open);

        // 사이드바 열 때 사용자 목록 요청
        if (open) {
            refetchUserList(); // 사용자 목록 refetch
        }
    }, [refetchUserList]);

    // 기록 공유 모달 오픈 관련 함수
    const handleOpenModal = useCallback(async () => {
        try {
            await refetchMemos();  // 메모 목록 refetch
            setSelectedMemos([]);  // 모달 열 때 선택된 메모 초기화
            setModalOpen(true);  // 모달 열기
        } catch (error) {
            console.error("메모 데이터를 가져오는 데 실패했습니다:", error);
            toast.error("메모 데이터를 가져오는 데 실패했습니다");
        }
    }, [refetchMemos]); // refetchMemos만 의존성에 추가

    const handleCloseModal = useCallback(() => {
        setModalOpen(false);
        setSelectedMemos([]);  // 모달 닫을 때 선택된 메모 초기화
    }, []); // 빈 의존성 배열로 한 번만 생성되도록 함


    // 채팅방 나가기 버튼 클릭 시 모달 열기
    const handleExitClick = useCallback(() => {
        setSidebarOpen(false); // 사이드바 닫기
        setExitModalOpen(true); // 모달 열기
    }, []); // 빈 의존성 배열

    // 채팅방 나가기 확인 버튼 클릭시
    const handleConfirmExit = useCallback(() => {
        mutate(roomId);
    }, [mutate, roomId]);

    // 모달 취소 버튼 클릭 시
    const handleCancelExit = useCallback(() => {
        setExitModalOpen(false); // 모달 닫기
    }, []); // 빈 의존성 배열

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

    const handleSelectMemo = useCallback((memo, checked) => {
        // 선택된 메모 업데이트
        if (checked) {
            setSelectedMemos((prevSelected) => [...prevSelected, memo]);
        } else {
            setSelectedMemos((prevSelected) => prevSelected.filter(item => item !== memo));
        }
    }, []); // 빈 의존성 배열

    const handleShareMemo = useCallback(() => {
        if (selectedMemos.length > 0) {
            selectedMemos.forEach(memo => {
                const message = `${memo.memo_Q} : ${memo.memo_A}`;  // 책 제목과 메모 질문을 결합
                sendChatMessage(roomId, message); // 메모 질문을 메시지로 보내기
            });
            setSelectedMemos([]); // 전송 후 선택된 메모 초기화
            handleCloseModal(); // 모달 닫기
        }
    }, [selectedMemos, roomId, handleCloseModal]); // selectedMemos, roomId, handleCloseModal은 의존성에 포함


    console.log('ChatLayout rendered'); // 리렌더링 확인용

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
            <ChatInputContainer
                roomId={roomId}
                sendChatMessage={sendChatMessage} // api 함수를 직접 전달
                onOpenModal={handleOpenModal} // 모달 열기 함수 전달
            />
            <ReadingShareModal 
                open={modalOpen} 
                onClose={handleCloseModal}
                handleSelectMemo={handleSelectMemo} // memo 선택 함수 추가
                handleShareMemo={handleShareMemo} // 확인 버튼 클릭 시 호출되는 함수
                memos={memos}  // 메모 데이터를 전달
                isLoading={memosLoading} // ⭐ 로딩 상태 전달
                isError={memosError}     // ⭐ 에러 상태 전달 
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