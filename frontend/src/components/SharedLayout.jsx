import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import logo from '../assets/images/logo.png';
import './Dashboard.css'; 

const SharedLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleResetGame = () => {
    if (window.confirm("Are you sure? You will lose all your progress.")) {
      // Clear the saved memory before bouncing back to setup
      localStorage.removeItem('magma_players');
      navigate('/setup');
    }
  };

  return (
    <div className="dashboard-layout">
      {/* --- PERSISTENT SIDEBAR --- */}
      <aside className="sidebar">
        <div className="sidebar-brand">
          <span><p>OMADA HEX</p></span>
        </div>

        <nav className="sidebar-nav">
          <button 
            className={`nav-item ${location.pathname === '/dashboard' ? 'active' : ''}`} 
            onClick={() => navigate('/dashboard')}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="7" height="7" rx="1"></rect>
              <rect x="14" y="3" width="7" height="7" rx="1"></rect>
              <rect x="14" y="14" width="7" height="7" rx="1"></rect>
              <rect x="3" y="14" width="7" height="7" rx="1"></rect>
            </svg>
            Dashboard
          </button>

          <button 
            className={`nav-item ${location.pathname === '/how-to' ? 'active' : ''}`} 
            onClick={() => navigate('/how-to')}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
            </svg>
            How To Play
          </button>

          <button 
            className={`nav-item ${location.pathname === '/credits' ? 'active' : ''}`} 
            onClick={() => navigate('/credits')}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>
            Credits
          </button>

          <button className="nav-item" onClick={handleResetGame}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="1 4 1 10 7 10"></polyline>
              <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"></path>
            </svg>
            Reset Game
          </button>
        </nav>
      </aside>

      {/* --- DYNAMIC VIEWPORT --- */}
      <main className="main-viewport">
        {/* The Outlet is the "window" where Dashboard, Credits, or HowTo will render */}
        <Outlet />
      </main>
    </div>
  );
};

export default SharedLayout;