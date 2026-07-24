import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Import your actual game components
import GameSetup from './pages/GameSetup'; // This replaces your old ReportIssue import
import Dashboard from './components/Dashboard';
import Analytics from './pages/Analytics'; // Keeping this if you still plan to use it

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Instantly bounces anyone hitting the root domain straight to the Setup screen */}
        <Route path="/" element={<Navigate to="/setup" replace />} />
        
        {/* Unprotected, fully open routes */}
        <Route path="/setup" element={<GameSetup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/analytics" element={<Analytics />} />
        
        {/* A catch-all safety net: if they type a URL that doesn't exist, send them to Setup */}
        <Route path="*" element={<Navigate to="/setup" replace />} />
      </Routes>
    </Router>
  );
};

export default App;