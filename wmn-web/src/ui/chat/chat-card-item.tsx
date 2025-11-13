import { CheckCircleIcon } from '@heroicons/react/24/solid';

interface ChatItemProps {
  imageUrl?: string;
  title: string;
  subtitle?: string;
  unreadCount?: number;
  isRead?: boolean;
}

export const ChatItem = ({
  imageUrl,
  title,
  subtitle,
  unreadCount = 0,
  isRead = false,
}: ChatItemProps) => {
  return (
    <li className="flex items-center justify-between border-b border-gray-300 py-3">
      {/* 왼쪽: 프로필 + 텍스트 */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gray-300 rounded-md overflow-hidden">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-full object-cover"
            />
          ) : null}
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-1">
            <span className="font-semibold text-gray-800">{title}</span>
            {unreadCount > 0 && (
              <span className="text-sm text-gray-400 font-semibold">
                {unreadCount}
              </span>
            )}
          </div>
          {subtitle && (
            <span className="text-gray-500 text-sm">{subtitle}</span>
          )}
        </div>
      </div>

      {/* 오른쪽: 읽음 표시 */}
      <CheckCircleIcon
        className={`w-6 h-6 ${
          isRead ? 'text-black' : 'text-gray-300'
        } transition-colors`}
      />
    </li>
  );
};
