import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import IssueCard from "./IssueCard";
import "./Dashboard.css";
import logo from "../assets/images/logo.png"; 

// --- Widget Imports ---
import PlayerRoster from "./PlayerRoster";
import DrawCards from "./DrawCards";
import ActiveResult from "./ActiveResult";
import { GameActionRow } from "./GameActionRow";
import ExplainRoll from "./ExplainRoll";


const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  

  const [players, setPlayers] = useState([
    { id: 1, name: "Player 1", trophies: 750, coins: 320, flames: 3, skulls: 1 },
    { id: 2, name: "Player 2", trophies: 400, coins: 150, flames: 0, skulls: 2 },
    { id: 3, name: "Player 3", trophies: 900, coins: 50, flames: 4, skulls: 0 },
    { id: 4, name: "Player 4", trophies: 900, coins: 50, flames: 4, skulls: 0 }
  ]);
  const [activePlayerIndex, setActivePlayerIndex] = useState(0);

  // Tracks the result of the dice roll so the card draw knows what to pull
  const [pendingDiceRoll, setPendingDiceRoll] = useState(null); 
  
  // The actual card data passed to ActiveResult.jsx
  const [activeEvent, setActiveEvent] = useState(null); 

  // --- HANDLERS ---
  const handleDiceRolled = (alignment, value) => {
    // Save the roll outcome in memory
    setPendingDiceRoll({ alignment, value });
    // Reset the active card since a new turn is starting
    setActiveEvent(null); 
  };

  const handleCardDrawn = () => {
    if (!pendingDiceRoll) {
      alert("You must roll the die before drawing a card!");
      return;
    }

    // Pick a random card number from 1 to 3
    const randomCardNum = Math.floor(Math.random() * 3) + 1;

    // Send the combined data to the Active Result component
    setActiveEvent({
      alignment: pendingDiceRoll.alignment,
      imageNum: randomCardNum,
      diceRollValue: pendingDiceRoll.value
    });
  };

  // Handles rotating the active player in the carousel
  const cyclePlayer = (direction) => {
    if (direction === 'next') {
      setActivePlayerIndex((prev) => (prev + 1) % players.length);
    } else {
      setActivePlayerIndex((prev) => (prev === 0 ? players.length - 1 : prev - 1));
    }
  };

  const handleTurnComplete = () => {
    // Wipe the active turn data
    setActiveEvent(null);
    setPendingDiceRoll(null);
    
    // Cycle to the next player
    cyclePlayer('next');
  };
  

  return (
    <div className="dashboard-layout">
      {/* --- SIDEBAR --- */}
      <aside className="sidebar">
        <div className="sidebar-brand">
          <img src={logo} alt="Relay Logo" className="brand-logo" height="15" />
        </div>

        <nav className="sidebar-nav">
          <button className="nav-item active" onClick={() => navigate('/dashboard')}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="7" height="7" rx="1"></rect>
              <rect x="14" y="3" width="7" height="7" rx="1"></rect>
              <rect x="14" y="14" width="7" height="7" rx="1"></rect>
              <rect x="3" y="14" width="7" height="7" rx="1"></rect>
            </svg>
            Dashboard
          </button>

          <button className="nav-item" onClick={() => navigate('/report-issue')}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Report Issue
          </button>
          
          <button className="nav-item" onClick={() => navigate('/all-reports')}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M8 2v4"></path>
              <path d="M16 2v4"></path>
              <rect x="4" y="8" width="16" height="14" rx="2"></rect>
              <path d="M9 14h6"></path>
              <path d="M9 18h6"></path>
              <path d="M12 11v8"></path>
            </svg>
            All Reports
          </button>
          
          <button className="nav-item" onClick={() => navigate('/analytics')}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="20" x2="18" y2="10"></line>
              <line x1="12" y1="20" x2="12" y2="4"></line>
              <line x1="6" y1="20" x2="6" y2="14"></line>
            </svg>
            Analytics
          </button>
          
          <button className="nav-item">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="3"></circle>
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
            </svg>
            Settings
          </button>
        </nav>

        <div className="sidebar-user">
          <div className="user-avatar">{user ? user.name.charAt(0) : "U"}</div>
          <div className="user-info">
            <span className="user-name">
              {user ? `${user.name} ${user.surname}` : "User"}
            </span>
          </div>
          <button className="logout-icon">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
          </button>
        </div>
      </aside>

      {/* --- MAIN VIEWPORT --- */}
      <main className="main-viewport">
        <header className="viewport-header">
          <h1 className="current-page-title">Dashboard</h1>
          <button className="header-action-btn">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            End Game
          </button>
        </header>

        <section className="content-canvas">
          <main className="dashboard-content" style={{ flexDirection: 'column' }}>
            
            {/* TOP ROW: Roster & Result */}
            <div style={{ display: 'flex', gap: '24px', width: '100%', flex: 1 }}>
              <div className="left-widget-column">
                <PlayerRoster 
                  players={players} 
                  activePlayerIndex={activePlayerIndex} 
                />
              </div>
              
              <div className="right-content-area" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                 {/* Active Result takes up the top space */}
                 <div style={{ flex: 1 }}>
                   <ActiveResult cardData={activeEvent} />
                 </div>
                 
                 {/* Explain Roll sits exactly underneath it */}
                 <ExplainRoll 
                   cardData={activeEvent} 
                   onTurnComplete={handleTurnComplete} 
                 />
              </div>
            </div>

            {/* BOTTOM ROW: The 3 action widgets */}
            <div className="bottom-widget-row">
              <GameActionRow 
                onDiceRolled={handleDiceRolled} 
                onCardDrawn={handleCardDrawn} 
              />
            </div>
            
          </main>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;