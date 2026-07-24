import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import LandingPage from './pages/LandingPage';
import GameSetup from './pages/GameSetup'; 
import SharedLayout from './components/SharedLayout';
import Dashboard from './components/Dashboard';
import HowTo from './pages/HowTo';
import Credits from './pages/Credits';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/setup" element={<GameSetup />} />
        
        {/* Everything inside this wrapper shares the Sidebar */}
        <Route element={<SharedLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/how-to" element={<HowTo />} />
          <Route path="/credits" element={<Credits />} />
        </Route>
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;