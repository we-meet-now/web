import { BrowserRouter, Navigate, Route, Routes } from 'react-router';
import { PlacePage } from './pages/place';
import { ChatPage } from './pages/chat';
import { ChatFrinedsPage } from './pages/chat/friends';
import { ChatRoomPage } from './pages/chat/rooms';

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Navigate to="/place" replace />} />
        <Route path="place" element={<PlacePage />} />

        <Route path="chat">
          <Route index element={<ChatPage />} />
          <Route path="frinds" element={<ChatFrinedsPage />} />
          <Route path="rooms/:roomId/:username" element={<ChatRoomPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
