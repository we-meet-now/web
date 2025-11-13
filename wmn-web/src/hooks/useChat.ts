import { useState, useRef } from 'react';
import SockJS from 'sockjs-client';
import { over, Client, Message } from 'stompjs';

export interface ChatMessage {
  text: string;
  system: boolean;
}

export function useChat(serverUrl: string = 'http://localhost:8080/ws-chat') {
  const [connected, setConnected] = useState<boolean>(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const stompClient = useRef<Client | null>(null);
  const subscribed = useRef<boolean>(false);
  const joined = useRef<boolean>(false);

  /** 서버 연결 및 구독 */
  const connect = (username: Number, roomId: Number) => {
    const socket = new SockJS(serverUrl);
    const client = over(socket);
    stompClient.current = client;

    if (stompClient.current && connected) {
      console.warn('이미 연결되어 있음, 재연결 방지');
      return;
    }

    client.connect({}, () => {
      console.log(`✅ STOMP 연결 성공 (roomId: ${roomId})`);
      setConnected(true);

      if (!subscribed.current) {
        client.subscribe(`/topic/public`, (message: Message) => {
          const msg = JSON.parse(message.body);
          console.log('📩 받은 메시지 구조:', msg);

          setMessages((prev) => [
            ...prev,
            msg.type === 'ENTER'
              ? { text: `${msg.userId} 님이 입장하셨습니다.`, system: true }
              : msg.type === 'LEAVE'
              ? { text: `${msg.userId} 님이 퇴장하셨습니다.`, system: true }
              : { text: `${msg.userId}: ${msg.message}`, system: false },
          ]);
        });
        subscribed.current = true;
      }
      // 입장 알림 전송
      if (!joined.current) {
        client.send(
          `/app/chat.addUser`,
          {},
          JSON.stringify({
            chatRoomId: roomId,
            userId: username,
            message: '',
            chatType: 'ENTER',
          }),
        );
        joined.current = true;
      }
    });
  };

  /** 서버 연결 종료 */
  const disconnect = (username: Number, roomId: Number) => {
    if (stompClient.current && connected) {
      stompClient.current.send(
        `/app/chat.addUser`,
        {},
        JSON.stringify({
          chatRoomId: roomId,
          userId: username,
          message: '',
          chatType: 'LEAVE',
        }),
      );
      stompClient.current.disconnect(() => {
        console.log('🔌 Disconnected');
        setConnected(false);
        setMessages([]);
        subscribed.current = false;
        joined.current = false;
      });
    }
  };

  /** 메시지 전송 */
  const sendMessage = (username: Number, content: string, roomId: Number) => {
    if (!content.trim() || !stompClient.current) return;
    stompClient.current.send(
      `/app/chat.sendMessage`,
      {},
      JSON.stringify({
        chatRoomId: roomId,
        userId: username,
        message: content,
        chatType: 'CHAT',
      }),
    );
  };

  return {
    connected,
    messages,
    connect,
    disconnect,
    sendMessage,
  };
}
