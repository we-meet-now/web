import { useState } from 'react';
import {
  HomeIcon,
  CalendarDaysIcon,
  ChatBubbleLeftEllipsisIcon,
  PhotoIcon,
  UserIcon,
} from '@heroicons/react/24/outline';

type TabType = 'home' | 'calendar' | 'chat' | 'gallery' | 'profile';

const tabs: { type: TabType; icon: React.ReactNode }[] = [
  { type: 'home', icon: <HomeIcon className="w-6 h-6" /> },
  { type: 'calendar', icon: <CalendarDaysIcon className="w-6 h-6" /> },
  { type: 'chat', icon: <ChatBubbleLeftEllipsisIcon className="w-6 h-6" /> },
  { type: 'gallery', icon: <PhotoIcon className="w-6 h-6" /> },
  { type: 'profile', icon: <UserIcon className="w-6 h-6" /> },
];

export const Gnb = () => {
  const [active, setActive] = useState<TabType>('home');

  return (
    <nav className="fixed bottom-0 bg-white shadow-md max-w-[440px] w-full">
      <ul className="flex justify-around items-center py-3">
        {tabs.map((tab) => (
          <li
            key={tab.type}
            onClick={() => setActive(tab.type)}
            className="flex flex-col items-center cursor-pointer"
          >
            <span
              className={`${
                active === tab.type ? 'text-indigo-600' : 'text-gray-400'
              }`}
            >
              {tab.icon}
            </span>
          </li>
        ))}
      </ul>
    </nav>
  );
};
