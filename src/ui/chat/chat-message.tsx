import { PropsWithChildren } from 'react';

interface ChatMessageProps {
  sender: 'me' | 'other';
}

export const ChatMessage = ({
  sender,
  children,
}: PropsWithChildren<ChatMessageProps>) => {
  const isMe = sender === 'me';

  return (
    <li className={`flex mb-2 ${isMe ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`px-3 py-2 rounded-lg max-w-xs ${
          isMe
            ? 'bg-blue-500 text-white rounded-br-none'
            : 'bg-blue-100 text-black rounded-bl-none'
        }`}
      >
        {children}
      </div>
    </li>
  );
};
