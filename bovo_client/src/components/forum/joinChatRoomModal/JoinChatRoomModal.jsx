import PropTypes from "prop-types";
import { Box, Button, Dialog, TextField, Typography } from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';
import styles from './JoinChatRoomModal.module.css';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../../../api/Auth";

const JoinChatRoomModal = ({ open, onClose, chatRoomData }) => {
    // `JoinChatRoomModal` 함수 내에서 선언
    const navigate = useNavigate();

    // 상태로 답변을 관리합니다.
    const [secretAnswer, setSecretAnswer] = useState("");

    if (!chatRoomData) return null; // 데이터가 없으면 아무것도 렌더링하지 않음

    const { bookInfo, chatInfo, id } = chatRoomData;

    // 답변이 일치하는지 확인하는 함수
    const handleJoinRoom = async () => {
        // secret_answer가 없다면 빈 문자열로 설정
        const answerToSend = chatInfo.secret_answer || "";

        try {
            const response = await api.post(`/chatrooms?roomId=${id}`, {
                secret_answer: answerToSend, // 비밀 답변도 함께 전달
            });
            if (response.status === 200) {
                alert("방에 성공적으로 참여했습니다.");
                navigate(`/chatroom/${id}`); // 채팅방으로 이동
            } else {
                alert("방 참여에 실패했습니다.");
            }
        } catch (error) {
            console.error("방 참여 오류:", error);
            alert("방 참여 중 오류가 발생했습니다.");
        }
    };

    return (
        <Dialog
              open={open}
              onClose={onClose}
              sx={{
                "& .MuiDialog-paper": {
                  width: "42rem",
                  padding: "2rem 2rem 4rem 2rem",
                  backgroundColor: "#E8F1F6",
                  borderRadius: "1.5625rem",
                },
              }}
            >
            <Button
                className={styles.cancelBtn}
                onClick={onClose}
                sx={{
                    marginLeft: "34.75rem",
                }}
            >
                <ClearIcon sx={{fontSize: "2rem"}} />
            </Button>
            <Box className={styles.contentContainer}>
                <Box className={styles.bookInfoContainer}>
                    <Box className={styles.bookImg}>
                        <img src={bookInfo.book_cover} alt="책 대체 이미지" />
                    </Box>
                    <Box className={styles.bookInfoWrapper}>
                        <Typography 
                            sx={{fontSize: "2rem", fontWeight: 500, letterSpacing: "0.02rem"}}
                        >
                            {bookInfo.book_name}
                        </Typography>
                        <Box className={styles.groupLimitContainer}>
                            <Typography
                                sx={{
                                    fontSize: "1.5rem",
                                    lineHeight: "0.015rem"
                                }}
                            >
                                모집 인원
                            </Typography>
                            <Typography
                                sx={{
                                    fontSize: "1.5rem",
                                    lineHeight: "0.015rem"
                                }}
                            >
                                {chatInfo.current_people}
                            </Typography>
                            <Typography
                                sx={{
                                    fontSize: "1.5rem",
                                    lineHeight: "0.015rem"
                                }}
                            >
                                /
                            </Typography>
                            <Typography
                                sx={{
                                    fontSize: "1.5rem",
                                    lineHeight: "0.015rem"
                                }}
                            >
                                {chatInfo.limit_people}
                            </Typography>
                        </Box>
                        <Box className={styles.dueDateWrapper}>
                            <Typography
                                sx={{
                                    fontSize: "1.5rem",
                                    lineHeight: "0.015rem"
                                }}
                            >
                                {chatInfo.challenge_start_date}
                            </Typography>
                            <Typography
                                sx={{
                                    fontSize: "1.5rem",
                                    lineHeight: "0.015rem"
                                }}
                            >
                                ~
                            </Typography>
                            <Typography
                                sx={{
                                    fontSize: "1.5rem",
                                    lineHeight: "0.015rem"
                                }}
                            >
                                {chatInfo.challenge_end_date}
                            </Typography>
                        </Box>
                    </Box>
                </Box>
                <Box className={styles.chatRoomInfoContainer}>
                    <Typography
                        sx={{
                            fontSize: "2.5rem",
                            fontWeight: 500,
                            letterSpacing: "0.025rem",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                        }}
                    >
                        {chatInfo.chat_name}
                    </Typography>
                    <Typography
                        sx={{
                            fontSize: "1.5rem",
                            letterSpacing: "0.015rem",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                        }}
                    >
                        {chatInfo.chat_detail}
                    </Typography>
                </Box>
                {chatInfo.is_secret ? (
                    <>
                        <Box className={styles.secretContainer}>
                            <Typography
                                sx={{
                                    width: "7rem",
                                    fontSize: "1.5rem",
                                    textAlign: "center",
                                }}
                            >
                                질문
                            </Typography>
                            <Typography
                                sx={{
                                    width: "100%",
                                    fontSize: "1.5rem",
                                    paddingLeft: "1rem",
                                }}
                            >
                                {chatInfo.secret_question}
                            </Typography>
                        </Box>
                        <Box className={styles.secretContainer}>
                            <Typography
                                sx={{
                                    width: "7rem",
                                    fontSize: "1.5rem",
                                    textAlign: "center",
                                }}
                            >
                                답변
                            </Typography>
                            <TextField
                                variant="outlined"
                                placeholder="답변을 입력해주세요."
                                fullWidth
                                value={secretAnswer}  // 입력값 상태 연결
                                onChange={(e) => setSecretAnswer(e.target.value)}  // 값 변경 시 상태 업데이트
                                sx={{
                                    width: "100%",
                                    height: "3rem",  // ✅ 입력창 높이 조정
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    "& input": {
                                        display: "flex",
                                        alignItems: "center", // ✅ Y축 중앙 정렬
                                        fontSize: "1.5rem",
                                        height: "2.5rem", 
                                        padding: "0 1rem", // ✅ 내부 여백 제거
                                    },
                                    "& fieldset": { border: "none" }, // ✅ 아웃라인 제거
                                }}
                            />
                        </Box>
                    </>
                ) : <></>}
                <Button
                    className={styles.enrollBtn}
                    onClick={handleJoinRoom} // 클릭 시 방 이동
                    sx={{
                        borderRadius: "1.5625rem",
                        backgroundColor: "#FFFFFF",
                        fontSize: "2rem",
                        letterSpacing: "0.02rem",
                        color: "#739CD4", 
                    }}
                >
                    참여하기
                </Button>
            </Box>
        </Dialog>
    );
};

export default JoinChatRoomModal;

//props type 정의
JoinChatRoomModal.propTypes = {
    open: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    chatRoomData: PropTypes.object.isRequired
};