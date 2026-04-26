import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainDashboard from './pages/MainDashboard';
import Login from './pages/Login';
import Housing from './pages/Housing';
import Healthcare from './pages/Healthcare';
import Bureaucracy from './pages/Bureaucracy';
import SocialCalendar from './pages/SocialCalendar';
import Necessities from './pages/Necessities';
import Logistics from './pages/Logistics';
import ProfileSettings from './pages/ProfileSettings';
import Chats from './pages/Chats';

function App() {
  const routerBase = import.meta.env.BASE_URL.replace(/\/$/, '') || '/';

  return (
    <Router basename={routerBase}>
      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<MainDashboard />} />
          <Route path="/housing" element={<Housing />} />
          <Route path="/healthcare" element={<Healthcare />} />
          <Route path="/bureaucracy" element={<Bureaucracy />} />
          <Route path="/calendar" element={<SocialCalendar />} />
          <Route path="/necessities" element={<Necessities />} />
          <Route path="/logistics" element={<Logistics />} />
          <Route path="/chats" element={<Chats />} />
          <Route path="/profile" element={<ProfileSettings />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
