import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainDashboard from './pages/MainDashboard';
import Login from './pages/Login';
import Housing from './pages/Housing';
import Healthcare from './pages/Healthcare';
import Bureaucracy from './pages/Bureaucracy';
import SocialCalendar from './pages/SocialCalendar';
import Necessities from './pages/Necessities';
import Logistics from './pages/Logistics';

function App() {
  return (
    <Router>
      <div className="min-h-screen pb-20">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<MainDashboard />} />
          <Route path="/housing" element={<Housing />} />
          <Route path="/healthcare" element={<Healthcare />} />
          <Route path="/bureaucracy" element={<Bureaucracy />} />
          <Route path="/calendar" element={<SocialCalendar />} />
          <Route path="/necessities" element={<Necessities />} />
          <Route path="/logistics" element={<Logistics />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
