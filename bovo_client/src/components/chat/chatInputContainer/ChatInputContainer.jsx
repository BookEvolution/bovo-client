import PropTypes from 'prop-types';
import React, { useState, useCallback } from 'react';
import Box from '@mui/material/Box';
import NoteShareBtn from '../noteShareBtn/NoteShareBtn';
import MsgInputField from '../msgInputField/MsgInputField';
import SendMsgBtn from '../sendMsgBtn/SendMsgBtn';
import styles from './ChatInputContainer.module.css';

const ChatInputContainer = React.memo(function ChatInputContainer({ roomId, sendChatMessage, onOpenModal }) {
    const [newMessage, setNewMessage] = useState("");

    const handleSendMessage = useCallback(() => {
        if (newMessage.trim()) {
            sendChatMessage(roomId, newMessage);
            setNewMessage("");
        }
    }, [newMessage, roomId, sendChatMessage]);

    const handleInputChange = useCallback((e) => {
        setNewMessage(e.target.value);
    }, []);

    console.log('ChatInputContainer rendered'); // 리렌더링 확인용

    return (
        <Box 
            className={styles.inputContainer}
            sx={{ 
                display: 'flex',
                alignItems: 'center',
                gap: '1rem' 
            }} // flexbox 설정 및 간격
        >
            <NoteShareBtn onClick={onOpenModal} /> {/* handleOpenModal 대신 onOpenModal로 이름 변경 */}
            <MsgInputField value={newMessage} onChange={handleInputChange} />
            <SendMsgBtn onClick={handleSendMessage} />
        </Box>
    )
});

// PropTypes 정의
ChatInputContainer.propTypes = {
    roomId: PropTypes.string.isRequired, // roomId는 필수 문자열
    sendChatMessage: PropTypes.func.isRequired, // sendChatMessage는 필수 함수
    onOpenModal: PropTypes.func.isRequired, // onOpenModal은 필수 함수
};

export default ChatInputContainer;