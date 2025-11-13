import { Button } from '@/ui/button';
import { ChatArea, ChatInput, ChatMessage } from '@/ui/chat';
import { Gnb } from '@/ui/gnb';
import Header from '@/ui/header';
import { PageLayout } from '@/ui/layout/page-layout';

export const PlacePage = () => {
  return (
    <PageLayout
      header={
        <Header
          showSearchInput
          leftIcons={[{ type: 'back', onClick: () => alert('뒤로가기!') }]}
          rightIcons={[
            { type: 'share', onClick: () => alert('공유하기 클릭!') },
          ]}
        />
      }
    >
      <ChatArea>
        <ChatMessage sender="me">안녕하세요 😀</ChatMessage>
        <ChatMessage sender="other">무엇을 도와드릴까요?</ChatMessage>
        <ChatMessage sender="me">오늘 일정 좀 알려주세요</ChatMessage>

        <ChatMessage sender="other">무엇을 도와드릴까요?</ChatMessage>
        <ChatMessage sender="me">오늘 일정 좀 알려주세요</ChatMessage>
        <ChatMessage sender="me">안녕하세요 😀</ChatMessage>
        <ChatMessage sender="other">무엇을 도와드릴까요?</ChatMessage>
        <ChatMessage sender="me">오늘 일정 좀 알려주세요</ChatMessage>
      </ChatArea>

      <Gnb />
    </PageLayout>
  );
};
