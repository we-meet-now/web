import { ChatItem } from '@/ui/chat/chat-card-item';
import { ChatCardList } from '@/ui/chat/chat-card-list';
import Header from '@/ui/header';
import { PageLayout } from '@/ui/layout/page-layout';
import { Tab } from '@/ui/tab';
import { useState } from 'react';
import { useNavigate } from 'react-router';

export const ChatPage = () => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleJoin = () => {
    //if (!username.trim()) return alert('이름을 입력하세요!');
    const roomId = 1; // 채팅방 생성시 Roomid 부여
    const username = 1234; //이름을 id로 변경
    navigate(`rooms/${roomId}/${username}`);
  };

  const [activeTab, setActiveTab] = useState('chat');

  return (
    <PageLayout
      header={
        <Header
          leftIcons={[{ type: 'back', onClick: () => alert('뒤로가기!') }]}
          rightIcons={[
            { type: 'search', onClick: () => alert('찾기!') },
            { type: 'plus', onClick: () => alert('추가!') },
          ]}
          title="채팅"
        />
      }
    >
      <Tab
        items={[
          { label: '채팅방', value: 'chat' },
          { label: '친구', value: 'friend' },
        ]}
        defaultValue="chat"
        onChange={setActiveTab}
      />

      {/* ✅ 탭별 콘텐츠 분기 */}
      {activeTab === 'chat' ? (
        <ChatCardList>
          <ChatItem
            title="팀 채팅방"
            subtitle="회의 일정 확인 부탁드립니다."
            unreadCount={2}
            isRead={false}
          />
          <ChatItem
            title="전체 공지방"
            subtitle="업데이트가 완료되었습니다."
            unreadCount={0}
            isRead={true}
          />
          <ChatItem
            title="개발자 채팅방"
            subtitle="API 연결 테스트 중"
            unreadCount={1}
            isRead={false}
          />
        </ChatCardList>
      ) : (
        <ChatCardList>
          <ChatItem title="김철수" subtitle="오늘 점심?" isRead={true} />
          <ChatItem
            title="홍길동"
            subtitle="자료 확인 부탁드려요."
            isRead={false}
          />
          <ChatItem
            title="박영희"
            subtitle="회의 들어갔습니다."
            isRead={true}
          />
        </ChatCardList>
      )}
    </PageLayout>
  );
};
