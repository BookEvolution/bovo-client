import PropTypes from "prop-types";  // PropTypes import
import Box from "@mui/material/Box";
import ListItem from '@mui/material/ListItem';
import Typography from "@mui/material/Typography";
import styles from "./MyForumList.module.css";
import { formatDate } from "../../../../utils/FormatDate.js";
import { fetchMyRoomData } from "../../../../api/ForumService.js";
import { useDispatch } from "react-redux";
import { addMessage } from "../../../../store/chatInfo/ChatSlice.js";
import { useNavigate } from "react-router-dom";

const MyForumList = ({myChatroom}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // ✅ formatDate 함수 사용하여 날짜 포맷팅
    const formattedDate = formatDate(myChatroom.last_msg_info.last_message_date);

    const handleRoomClick = async (roomId, roomName) => {
        try {
            const response = await fetchMyRoomData(roomId);
            console.log("채팅방 참여 api", response);
            if (response.status === 200) {
                alert("방에 성공적으로 참여했습니다.");
    
    
                // 서버에서 받은 메시지를 Redux 상태에 추가
                response.data.forEach((message) => {
                    dispatch(addMessage(message));
                });

                // 서버에서 받은 메시지를 sessionStorage에도 저장 (새로고침 시 복원 가능)
                sessionStorage.setItem("chatMessages", JSON.stringify(response));
                
                // Redux에 저장된 메시지를 사용하므로 navigate의 state는 필요 없음
                navigate(`/forum/${roomId}`, { state: { roomName: roomName } });
            } else {
                alert("방 참여에 실패했습니다.");
            }
        } catch (error) {
          console.error("방 참여 오류:", error);
          alert("방 참여 중 오류가 발생했습니다.");
        }
    };

    return (
        <ListItem 
            button="true" 
            key={myChatroom.id} 
            className={styles.myChatRoom}
            onClick={() => handleRoomClick(myChatroom.id, myChatroom.chatroom_name)}
        >
            <Box className={styles.chatContentContainer}>
                <Box className={styles.chatBookWrapper}>
                    <img src={myChatroom.book_info.book_img} alt="책 대체 이미지" />
                </Box>
                <Box className={styles.chatDescription}>
                    <Typography 
                        sx={{
                            fontSize: "1.75rem", 
                            letterSpacing: "0.0175rem",
                            fontWeight: "bold"
                        }}
                    >
                        {myChatroom.chatroom_name}
                    </Typography>
                    <Typography 
                        sx={{
                            fontSize: "1.25rem", 
                            letterSpacing: "0.01rem",
                            color: "#D9D9D9",
                            textAlign: "right"
                        }}
                    >
                        {formattedDate}
                    </Typography>
                    <Box className={styles.chatMessageInfoWrapper}>
                        <Typography
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: "1.25rem", 
                                letterSpacing: "0.0125rem",
                            }}
                        >
                            {myChatroom.last_msg_info.last_message} 
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </ListItem>
    );
};

export default MyForumList;

MyForumList.propTypes = {
    myChatroom: PropTypes.shape({
        id: PropTypes.number.isRequired,
        chatroom_name: PropTypes.string.isRequired,
        book_info: PropTypes.shape({
            book_img: PropTypes.string.isRequired,
        }).isRequired,
        last_msg_info: PropTypes.shape({
            last_message: PropTypes.string.isRequired,
            last_message_date: PropTypes.string.isRequired,
        }).isRequired,
    }).isRequired,
};