import PropTypes from "prop-types";  // PropTypes import
import Box from "@mui/material/Box";
import ListItem from '@mui/material/ListItem';
import Typography from "@mui/material/Typography";
import styles from "./MyForumList.module.css";
import { formatDate } from "../../../utils/FormatDate.js";
import { fetchMyRoomData } from "../../../api/ForumService.js";
import { useDispatch } from "react-redux";
import { addMessage } from "../../../store/chatInfo/ChatSlice.js";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

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
                // 서버 응답 데이터 (response.data)가 유효한 배열인지 확인
                if (response.data && Array.isArray(response.data)) {
                    if (response.data.length > 0) {
                        toast.success(`${myChatroom.chatroom_name}방에 성공적으로 참여했습니다.`);
                        // 서버에서 받은 메시지를 Redux 상태에 추가
                        response.data.forEach((message) => {
                            dispatch(addMessage(message));
                        });
                    } else {
                        // 메시지가 없는 빈 채팅방에 입장 성공
                        toast.success(`${myChatroom.chatroom_name}방에 성공적으로 참여했습니다.`);
                    }

                    // 서버에서 받은 메시지를 sessionStorage에도 저장
                    sessionStorage.setItem("chatMessages", JSON.stringify(response.data)); // ⭐ response.data만 저장

                    navigate(`/forum/${roomId}`, { state: { roomName: roomName } });
                } else {
                    // response.data가 배열이 아니거나 예기치 않은 형식인 경우
                    console.error("서버 응답 데이터 형식이 올바르지 않습니다:", response.data);
                    toast.error("방 참여에 실패했습니다: 유효하지 않은 응답 데이터.");
                }
            } else {
                // HTTP 상태 코드가 200이 아닌 경우 (예: 404, 500 등)
                toast.error(`방 참여에 실패했습니다. (상태 코드: ${response.status})`);
            }
        } catch (error) {
            // 네트워크 오류나 fetchMyRoomData에서 발생한 기타 오류 처리
            console.error("방 참여 중 오류 발생:", error);
            toast.error("방 참여 중 오류가 발생했습니다.");
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