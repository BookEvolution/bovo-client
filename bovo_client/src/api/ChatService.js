import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

let stompClient = null;

export const connectToChat = (roomId, onMessageReceived) => {
    return new Promise((resolve, reject) => {
        const socket = new SockJS(`ws://{base_url}/ws-chat`);
        stompClient = new Client({
            webSocketFactory: () => socket,
            reconnectDelay: 5000, // 자동 재연결 설정
            onConnect: () => {
                stompClient.subscribe(`/topic/chatroom/${roomId}`, (message) => {
                    onMessageReceived(JSON.parse(message.body));
                });
                resolve(stompClient);
            },
            onStompError: (frame) => {
                console.error("STOMP error:", frame);
                reject(frame);
            },
        });

        const token = sessionStorage.getItem("accessToken");
        if (token) {
            stompClient.connectHeaders = { Authorization: `Bearer ${token}` };
        }

        stompClient.activate();
    });
};

export const sendMessage = (roomId, message) => {
    if (stompClient && stompClient.connected) {
        const userId = sessionStorage.getItem("userId");  // 🔹 사용자 ID 가져오기

        stompClient.publish({
            destination: `/app/chatroom/${roomId}`,
            body: JSON.stringify({
                users: { id: userId },
                message: message,
                type: "CHAT",
            }),
        });
    }
};

export const disconnectChat = () => {
    if (stompClient) {
        stompClient.deactivate();
        stompClient = null;
    }
};