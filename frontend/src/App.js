import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import LandingPage from './pages/LandingPage';
import GameSetup from './pages/GameSetup'; 
import Dashboard from './components/Dashboard';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        
        {/* The Game Flow */}
        <Route path="/setup" element={<GameSetup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        
        {/* Safety for bad URLs */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;