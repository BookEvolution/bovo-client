import { Client } from "@stomp/stompjs";

let client = null;

const wsKey = import.meta.env.VITE_WS_API_URL;

// WebSocket 연결 함수
export const connectChat = (roomId, onMessageReceived) => {
    client = new Client({
        brokerURL: `${wsKey}`,
        reconnectDelay: 5000, // 자동 재연결
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000,
        onConnect: () => {
            console.log("🟢 WebSocket 연결됨");

            // 채팅방 구독
            client.subscribe(`/topic/chatroom/${roomId}`, (message) => {
                const receivedMessage = JSON.parse(message.body);
                console.log("📩 받은 메시지:", receivedMessage);
                onMessageReceived(receivedMessage);
            });
        },
        onDisconnect: () => {
            console.log("🔴 WebSocket 연결 종료");
        },
        onStompError: (frame) => {
            console.error("🔴 STOMP ERROR: ", frame.headers["message"]);
        },
    });

    client.activate(); // WebSocket 연결 시작
};

// WebSocket 연결 해제 함수
export const disconnectChat = () => {
    if (client) {
        client.deactivate();
        console.log("🔴 WebSocket 연결 해제됨");
    }
};

// 메시지 전송 함수
export const sendChatMessage = (roomId, message) => {
    if (client && client.connected) {
        const userEmail = sessionStorage.getItem("userEmail"); // ✅ 세션에서 userEmail 가져오기
        
        if (!userEmail) {
            console.error("❌ 사용자 이메일 없음");
            return;
        }

        const chatMessage = {
            users: {
                email: userEmail, // 유저 이메일 추가
            },
            message: message,
            type: "CHAT",
        };

        client.publish({
            destination: `/app/chatroom/${roomId}`,
            body: JSON.stringify(chatMessage),
        });

        console.log("🚀 보낸 메시지:", chatMessage);
    } else {
        console.error("❌ WebSocket 연결되지 않음");
    }
};