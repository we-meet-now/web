import { useParams, useNavigate } from 'react-router-dom';
import { useChat } from '@/hooks/useChat';
import { useEffect, useRef, useState } from 'react';
import { ChatArea, ChatInput, ChatMessage } from '@/ui/chat';
import { PageLayout } from '@/ui/layout/page-layout';
import Header from '@/ui/header';
import { Gnb } from '@/ui/gnb';

export function ChatRoomPage() {
  const params = useParams<{ roomId: string; username: string }>();

  const navigate = useNavigate();

  const roomId: number = Number(params.roomId);
  const username: number = Number(params.username);

  const { connected, messages, connect, disconnect, sendMessage } = useChat(
    'http://52.78.183.143:6113/ws-chat',
  );
  const [message, setMessage] = useState('');

  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!username || !roomId) {
      navigate('/');
      return;
    }
    connect(username, roomId);
    return () => disconnect(username, roomId);
  }, [username, roomId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!message.trim()) return;
    sendMessage(username!, message, roomId!);
    setMessage('');
  };

  /** ✅ 뒤로가기 클릭 시 알림 */
  const handleBack = async () => {
    const confirmed = window.confirm('채팅방을 나가시겠습니까?');
    if (confirmed) {
      await disconnect(username, roomId);
      navigate('/chat'); // 이전 페이지로 이동
    }
  };

  return (
    <PageLayout
      header={
        <Header
          leftIcons={[{ type: 'back', onClick: handleBack }]}
          rightIcons={[
            { type: 'share', onClick: () => alert('공유하기 클릭!') },
          ]}
        />
      }
    >
      <ChatArea>
        {messages.map((msg, i) => {
          if (msg.system) {
            return (
              <li key={i} className="text-gray-400 text-center italic text-sm">
                {msg.text}
              </li>
            );
          }

          const isMe = msg.text.startsWith(String(username));
          const content = msg.text.replace(`${username!}:`, '').trim();
          console.log(content);
          return (
            <ChatMessage key={i} sender={isMe ? 'me' : 'other'}>
              {content}
            </ChatMessage>
          );
        })}
        <div ref={bottomRef} />
      </ChatArea>
      <ChatInput value={message} onChange={setMessage} onEnter={handleSend} />
      <Gnb />
    </PageLayout>
  );
}
