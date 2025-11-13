import { useState } from 'react';

interface TabItem {
  label: string;
  value: string;
}

interface TabProps {
  items: TabItem[];
  defaultValue?: string;
  onChange?: (value: string) => void;
}

export const Tab = ({ items, defaultValue, onChange }: TabProps) => {
  const [active, setActive] = useState(defaultValue ?? items[0].value);

  const handleClick = (value: string) => {
    setActive(value);
    onChange?.(value);
  };

  return (
    <div className="w-full bg-white flex justify-around  border-gray-200">
      {items.map((item) => {
        const isActive = active === item.value;
        return (
          <button
            key={item.value}
            onClick={() => handleClick(item.value)}
            className={`flex-1 py-3 text-center font-semibold transition-colors ${
              isActive ? 'text-gray-800' : 'text-gray-400'
            }`}
          >
            <div className="flex flex-col items-center">
              <span>{item.label}</span>
              <div
                className={`w-full h-[2px] mt-2 ${
                  isActive ? 'bg-gray-700' : 'bg-transparent'
                }`}
              />
            </div>
          </button>
        );
      })}
    </div>
  );
};
