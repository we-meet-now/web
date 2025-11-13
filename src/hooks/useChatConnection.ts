// src/features/chat/useChatConnection.ts
import { useEffect, useRef, useState } from 'react';
import SockJS from 'sockjs-client';
import { over, Client } from 'stompjs';
import { useQueryClient } from '@tanstack/react-query';

export type ChatEventType = 'JOIN' | 'LEAVE' | 'CHAT';
export type ChatMessage = {
  id?: string;
  sender?: string;
  content?: string;
  type: ChatEventType;
  ts?: number;
  roomId?: string;
};

type UseChatConnectionProps = {
  roomId?: string;
  username?: string;
  wsUrl?: string;
  topicPath?: (roomId: string) => string;
  sendPath?: string;
  joinPath?: string;
  /** ✅ 테스트에서 주입할 수 있는 팩토리 */
  createClient?: (url: string) => Client;
};

function createRealStompClient(url: string): Client {
  const socket = new SockJS(url);
  const client = over(socket);
  // client.debug = () => {};
  return client;
}

export function useChatConnection({
  roomId,
  username,
  wsUrl = 'http://13.125.253.229:6113/ws-chat',
  topicPath = () => `/topic/public`,
  sendPath = '/app/chat.sendMessage',
  joinPath = '/app/chat.addUser',
  createClient = createRealStompClient,
}: UseChatConnectionProps) {
  const [connected, setConnected] = useState(false);
  const stompRef = useRef<Client | null>(null);
  const isConnectedRef = useRef(false); // ✅ 실제 연결 상태 ref
  const qc = useQueryClient();
  const queryKey = ['chat', 'room', roomId, 'messages'];

  useEffect(() => {
    if (!username || !roomId) return;

    const client = createClient(wsUrl);
    stompRef.current = client;

    client.connect(
      {},
      () => {
        isConnectedRef.current = true;
        setConnected(true);

        // 구독
        client.subscribe(topicPath(roomId), (message: any) => {
          try {
            const payload: ChatMessage = JSON.parse(message.body);
            qc.setQueryData<ChatMessage[]>(queryKey, (prev = []) => [
              ...prev,
              payload,
            ]);
          } catch (e) {
            console.error('Invalid message body', e);
          }
        });

        // 입장 알림 (연결 확인 후만 전송)
        client.send(
          joinPath,
          {},
          JSON.stringify({ sender: username, type: 'JOIN', roomId }),
        );
      },
      (err) => {
        // onError
        console.error('STOMP error', err);
        isConnectedRef.current = false;
        setConnected(false);
      },
    );

    return () => {
      // 아직 연결이 성립되지 않았다면 아무 것도 하지 않음
      if (stompRef.current && isConnectedRef.current) {
        try {
          // 퇴장 알림도 OPEN일 때만
          stompRef.current.send(
            joinPath,
            {},
            JSON.stringify({ sender: username, type: 'LEAVE', roomId }),
          );
          stompRef.current.disconnect(() => {
            isConnectedRef.current = false;
            setConnected(false);
          });
        } catch (e) {
          // send가 던져도 앱이 죽지 않게
          console.warn('disconnect/send during cleanup failed', e);
          isConnectedRef.current = false;
          setConnected(false);
        }
      }
    };
  }, [username, roomId, wsUrl, createClient]);

  const send = (content: string) => {
    if (!content.trim()) return;
    const c = stompRef.current;

    // ✅ 소켓/세션이 진짜 연결됐는지 다시 확인
    if (!c || !isConnectedRef.current) {
      console.warn('Not connected yet, dropping message');
      return;
    }

    const body: ChatMessage = {
      sender: username,
      content,
      type: 'CHAT',
      ts: Date.now(),
      roomId,
    };

    qc.setQueryData<ChatMessage[]>(queryKey, (prev = []) => [...prev, body]);

    try {
      c.send(sendPath, {}, JSON.stringify({ ...body, roomId }));
    } catch (e) {
      console.error('STOMP send failed', e);
    }
  };

  return { connected, send };
}
