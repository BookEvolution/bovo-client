import PropTypes from 'prop-types';
import { Box, InputAdornment, TextField, Typography } from "@mui/material";
import GroupIcon from '@mui/icons-material/Group';
import SearchIcon from '@mui/icons-material/Search';
import styles from "./EntireForum.module.css";
import { useEffect, useState } from "react";
import JoinChatRoomModal from "../joinChatRoomModal/JoinChatRoomModal";
import { fetchChatRoomData } from "../../../api/ForumService";

const EntireForum = ({ chatrooms }) => {
    const [open, setOpen] = useState(false); // 모달 상태
    const [chatRoomData, setChatRoomData] = useState(null); // 참여를 위한 채팅방 데이터
    const [searchQuery, setSearchQuery] = useState(""); // 검색어 상태
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
            setSearchQuery("");
            setFilteredChatrooms(chatrooms); // 검색어가 없으면 모든 채팅방을 보여줌
        } else {
            setSearchQuery(text);
            const filtered = chatrooms.filter(room =>
                room.chatroom_name.toLowerCase().includes(text.toLowerCase()) ||
                room.book_info.book_name.toLowerCase().includes(text.toLowerCase())
            );
            setFilteredChatrooms(filtered); // 검색어에 맞는 채팅방만 필터링
        }
    };

    // admin이 true인 항목을 필터링
    const adminPick = chatrooms.filter(room => room.admin === true);

    return (
        <Box className={styles.entireForumContainer}>
            {/* adminPickWrapper에 admin이 true인 항목만 표시 */}
            {adminPick.length > 0 && (
                <Box className={styles.adminPickWrapper} onClick={() => handleOpen(adminPick[0].id)}>
                    <Box>
                        <img src={adminPick[0].book_info.book_img} alt={adminPick[0].book_info.book_name} />
                    </Box>
                    <Box
                        sx={{
                            backgroundColor: adminPick[0].group_info.current_people === adminPick[0].group_info.limit_people
                                ? "#E8F1F6" // 모집완료 색상
                                : "#F3E38B", // 모집중 색상
                        }}
                        className={styles.recruiting}
                    >
                        {adminPick[0].group_info.current_people === adminPick[0].group_info.limit_people
                            ? "모집완료"
                            : "모집중"}
                    </Box>
                    <div className={styles.bottomContainer}>
                        <Typography sx={{ fontSize: "1.75rem", letterSpacing: "0.0175rem", fontWeight: 500, textAlign: "left" }}>
                            {adminPick[0].chatroom_name}
                        </Typography>
                        <Box className={styles.dueDateWrapper}>
                            <Typography sx={{ fontSize: "1.25rem", fontWeight: 500, letterSpacing: "0.0125rem" }}>
                                {adminPick[0].duration.start_date}
                            </Typography>
                            <Typography sx={{ fontSize: "1.25rem", fontWeight: 500, letterSpacing: "0.0125rem" }}>
                                ~
                            </Typography>
                            <Typography sx={{ fontSize: "1.25rem", fontWeight: 500, letterSpacing: "0.0125rem" }}>
                                {adminPick[0].duration.end_date}
                            </Typography>
                        </Box>
                        <Box className={styles.groupLimitContainer}>
                            <Box className={styles.IconWrapper}>
                                <GroupIcon sx={{ fontSize: "2rem" }} />
                            </Box>
                            <Typography sx={{ fontSize: "1.75rem", fontWeight: 500, lineHeight: "0.0125rem" }}>
                                {adminPick[0].group_info.current_people}
                            </Typography>
                            <Typography sx={{ fontSize: "1.75rem", fontWeight: 500, lineHeight: "0.0125rem" }}>
                                /
                            </Typography>
                            <Typography sx={{ fontSize: "1.75rem", fontWeight: 500, lineHeight: "0.0125rem" }}>
                                {adminPick[0].group_info.limit_people}
                            </Typography>
                        </Box>
                    </div>
                </Box>
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
                <TextField
                    variant="standard" // 외부 border를 제거하는 방법
                    placeholder="토론방 검색"
                    value={searchQuery} // 입력 값 상태 바인딩
                    onChange={(e) => handleSearch(e.target.value)} // 입력값 업데이트
                    onBlur={() => handleSearch(searchQuery)} // 블러 시 검색 처리
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            e.preventDefault(); // 기본 엔터키 동작 방지
                        }
                    }}
                    sx={{ 
                            width: '39.5rem',
                            backgroundColor: "#E8F1F6",
                            borderRadius: "1.5625rem",
                            border: "none",
                            padding: "0.5rem 1.25rem",
                            margin: "1.8125rem 0",
                            "& .MuiInputBase-input": {
                                width: "35.5rem",
                                fontSize: "1.75rem",  // 입력창 글자 크기 변경
                            }    
                        }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon sx={{fontSize: "2.5rem", color: "#739CD4", margin: "0 0.75rem"}}/>
                            </InputAdornment>
                        ),
                        // input 요소의 스타일을 이곳에서 조정
                        disableUnderline: true, // underline 제거
                    }}
                />
            </Box>
            <Box className={styles.forumListContainer}>
            {filteredChatrooms.filter(room => room.admin !== true).map((room) => (
                    <Box key={room.id} className={styles.forumList} onClick={() => handleOpen(room.id)}>
                        <Box className={styles.forumBook}>
                            <img src={room.book_info.book_img} alt="책 이미지" />
                        </Box>
                        <Box
                            className={styles.recruiting}
                            sx={{
                                backgroundColor: room.group_info.current_people === room.group_info.limit_people
                                    ? "#E8F1F6" // 모집완료 색상
                                    : "#F3E38B", // 모집중 색상
                            }}
                        >
                            {room.group_info.current_people === room.group_info.limit_people
                                ? "모집완료"
                                : "모집중"}
                        </Box>
                        <div className={styles.forumBottomContainer}>
                            <Typography
                                className={styles.forumInfoText} 
                                sx={{
                                    textOverflow: "ellipsis", 
                                    fontSize: "1.75rem", 
                                    letterSpacing: "0.0175rem", 
                                    fontWeight: 500, 
                                    textAlign: "left" 
                                    }}
                            >
                                {room.chatroom_name}
                            </Typography>
                            <Typography
                                className={styles.forumInfoText} 
                                sx={{ 
                                     textOverflow: "ellipsis", 
                                     fontSize: "1.25rem", 
                                     fontWeight: 500, 
                                     letterSpacing: "0.0125rem" 
                                    }}
                            >
                                {room.chatroom_ds}
                            </Typography>
                            <Box className={styles.groupLimitContainer}>
                                <Box className={styles.IconWrapper}>
                                    <GroupIcon sx={{ fontSize: "2rem" }} />
                                </Box>
                                <Typography sx={{ fontSize: "1.75rem", fontWeight: 500, lineHeight: "0.0125rem" }}>
                                    {room.group_info.current_people}
                                </Typography>
                                <Typography sx={{ fontSize: "1.75rem", fontWeight: 500, lineHeight: "0.0125rem" }}>
                                    /
                                </Typography>
                                <Typography sx={{ fontSize: "1.75rem", fontWeight: 500, lineHeight: "0.0125rem" }}>
                                    {room.group_info.limit_people}
                                </Typography>
                            </Box>
                        </div>
                    </Box>
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