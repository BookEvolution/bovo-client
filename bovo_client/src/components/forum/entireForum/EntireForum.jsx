import PropTypes from 'prop-types';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import styles from "./EntireForum.module.css";
import { useEffect, useState } from "react";
import JoinChatRoomModal from "../joinChatRoomModal/JoinChatRoomModal";
import { fetchChatRoomData } from "../../../api/ForumService";
import AdminPickRoomCard from '../adminPickRoomCard/AdminPickRoomCard';
import SearchBar from '../searchBar/SearchBar';
import ForumCard from '../forumCard/ForumCard';

const EntireForum = ({ chatrooms }) => {
    const [open, setOpen] = useState(false); // 모달 상태
    const [chatRoomData, setChatRoomData] = useState(null); // 참여를 위한 채팅방 데이터
    const [filteredChatrooms, setFilteredChatrooms] = useState(chatrooms); // 필터링된 채팅방 상태

    const handleOpen = async (roomId) => {
        try {
            const data = await fetchChatRoomData(roomId);
            setChatRoomData({ ...data, id: roomId }); // 받은 데이터 상태에 저장
            setOpen(true); // 모달 열기
        } catch (error) {
            console.error("채팅방 정보 요청 실패", error);
        }
    };

    const handleClose = () => setOpen(false);

    useEffect(() => {
        // ✅ chatrooms가 변경될 때 filteredChatrooms를 최신 데이터로 갱신
        setFilteredChatrooms(chatrooms);
    }, [chatrooms]);

    const handleSearch = (text) => {
        if (text.trim() === "") {
            setFilteredChatrooms(chatrooms); // 검색어가 없으면 모든 채팅방을 보여줌
        } else {
            const filtered = chatrooms.filter(room =>
                room.chatroom_name.toLowerCase().includes(text.toLowerCase()) ||
                room.book_info.book_name.toLowerCase().includes(text.toLowerCase())
            );
            setFilteredChatrooms(filtered); // 검색어에 맞는 채팅방만 필터링
        }
    };

    // admin이 true인 항목을 필터링
    const adminPick = chatrooms.find(room => room.admin === true);

    return (
        <Box className={styles.entireForumContainer}>
            {/* adminPickWrapper에 admin이 true인 항목만 표시 */}
            {adminPick && (
                <AdminPickRoomCard adminPickRoom={adminPick} handleOpen={handleOpen} />
            )}
            <Box>
                <Typography
                    sx={{
                        fontSize: "2.5rem",
                        fontWeight: "Bold",
                        lineHeight: "3.375rem",
                        letterSpacing: "0.025rem"
                    }}
                >
                    독서 토론방
                </Typography>
                <SearchBar onSearch={handleSearch} />
            </Box>
            <Box className={styles.forumListContainer}>
            {filteredChatrooms.filter(room => room.admin !== true).map((room) => (
                <ForumCard key={room.id} room={room} onClick={handleOpen} />
            ))}
            </Box>
            <JoinChatRoomModal open={open} onClose={handleClose} chatRoomData={chatRoomData}/>
        </Box>
    );
};

export default EntireForum;

// chatroom의 데이터 타입을 정의
const chatroomPropType = PropTypes.shape({
    admin: PropTypes.bool.isRequired,
    book_info: PropTypes.shape({
      book_img: PropTypes.string.isRequired,
      book_name: PropTypes.string.isRequired,
    }).isRequired,
    chatroom_ds: PropTypes.string.isRequired,
    chatroom_name: PropTypes.string.isRequired,
    duration: PropTypes.shape({
      start_date: PropTypes.string.isRequired,
      end_date: PropTypes.string.isRequired,
    }).isRequired,
    group_info: PropTypes.shape({
      limit_people: PropTypes.number.isRequired,
      current_people: PropTypes.number.isRequired,
    }).isRequired,
    id: PropTypes.number.isRequired,
});

// EntireForum 컴포넌트의 PropTypes 설정
EntireForum.propTypes = {
    chatrooms: PropTypes.arrayOf(chatroomPropType).isRequired,
};