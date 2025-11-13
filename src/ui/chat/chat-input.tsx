import { PaperAirplaneIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onEnter?: () => void;
}

export const ChatInput = ({ value, onChange, onEnter }: ChatInputProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const handleClear = () => {
    onChange('');
  };

  const handleSend = () => {
    if (onEnter && value.trim().length > 0) {
      onEnter();
    }
  };

  return (
    <div className="w-full flex flex-col px-5">
      <div className="flex items-center rounded-md px-3 py-2 bg-gray-200">
        {/* 지우기 버튼: 입력 있을 때만 표시 */}
        {value.length > 0 && (
          <button onClick={handleClear} className="mr-2">
            <XMarkIcon className="w-6 h-6 text-gray-500 hover:text-gray-700" />
          </button>
        )}

        {/* 입력창 */}
        <input
          type="text"
          placeholder="메시지를 입력하세요."
          value={value}
          onChange={handleChange}
          className="flex-1 bg-transparent outline-none text-gray-800 placeholder-gray-400"
        />

        {/* 전송 버튼: 항상 표시 */}
        <button
          onClick={handleSend}
          disabled={value.trim().length === 0}
          className="ml-2 p-1 text-blue-500 hover:text-blue-600 transition disabled:opacity-40"
        >
          <PaperAirplaneIcon className="w-6 h-6 rotate-45" />
        </button>
      </div>
    </div>
  );
};
