import { useQuery } from '@tanstack/react-query';
import type { ChatMessage } from '@/hooks/useChatConnection.ts';

async function fetchChatHistory(roomId: string): Promise<ChatMessage[]> {
  // 실제 API로 교체하세요. 예시:
  // const res = await fetch(`/api/chat/rooms/${roomId}/history`);
  // if (!res.ok) throw new Error("failed");
  // return res.json();
  return []; // 서버 준비 전이라면 빈 배열로
}

export function useChatHistory(roomId: string) {
  const queryKey = ['chat', 'room', roomId, 'messages'];
  return useQuery({
    queryKey,
    queryFn: () => fetchChatHistory(roomId),
    staleTime: 1000 * 60, // 필요에 맞게
    refetchOnWindowFocus: false,
  });
}
