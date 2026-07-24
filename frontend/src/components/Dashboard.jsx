import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import IssueCard from "./IssueCard";
import "./Dashboard.css";
import logo from "../assets/images/logo.png";

// --- Widget Imports ---
import PlayerRoster from "./PlayerRoster";
import DrawCards from "./DrawCards";
import ActiveResult from "./ActiveResult";
import { GameActionRow } from "./GameActionRow";
import ExplainRoll from "./ExplainRoll";
import GameTimer from "./GameTimer";

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);

  const initialPlayers = location.state?.customPlayers || [
    {
      id: 1,
      name: "Player 1",
      avatar: 0,
      trophies: 0,
      coins: 0,
      flames: 0,
      skulls: 0,
    },
    {
      id: 2,
      name: "Player 2",
      avatar: 1,
      trophies: 0,
      coins: 0,
      flames: 0,
      skulls: 0,
    },
  ];

  const shouldAutoStart = location.state?.autoStart || false;

  const [players, setPlayers] = useState(initialPlayers);
  const [activePlayerIndex, setActivePlayerIndex] = useState(0);
  const [pendingDiceRoll, setPendingDiceRoll] = useState(null);
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

    const matchedCardNum = pendingDiceRoll.value;

    setActiveEvent({
      alignment: pendingDiceRoll.alignment,
      imageNum: matchedCardNum, // The 1:1 connection happens here
      diceRollValue: pendingDiceRoll.value,
    });
  };

  // Handles rotating the active player in the carousel
  const cyclePlayer = (direction) => {
    if (direction === "next") {
      setActivePlayerIndex((prev) => (prev + 1) % players.length);
    } else {
      setActivePlayerIndex((prev) =>
        prev === 0 ? players.length - 1 : prev - 1,
      );
    }
  };

  const handleTurnComplete = () => {
    // Wipe the active turn data
    setActiveEvent(null);
    setPendingDiceRoll(null);

    // Cycle to the next player
    cyclePlayer("next");
  };

  const handleResetGame = () => {
    if (window.confirm("Are you sure? You will lose all your progress.")) {
      navigate('/setup');
    }
  };

  return (
    <div className="dashboard-layout">
      {/* --- SIDEBAR --- */}
      <aside className="sidebar">
        <div className="sidebar-brand">
          <span>Omada Hex</span>
        </div>

        <nav className="sidebar-nav">
          <button
            className="nav-item active"
            onClick={() => navigate("/dashboard")}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="3" width="7" height="7" rx="1"></rect>
              <rect x="14" y="3" width="7" height="7" rx="1"></rect>
              <rect x="14" y="14" width="7" height="7" rx="1"></rect>
              <rect x="3" y="14" width="7" height="7" rx="1"></rect>
            </svg>
            Dashboard
          </button>

          {/* <button className="nav-item" onClick={() => navigate("/setup")}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
            Game Setup
          </button> */}

          <button className="nav-item" onClick={() => navigate("")}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M8 2v4"></path>
              <path d="M16 2v4"></path>
              <rect x="4" y="8" width="16" height="14" rx="2"></rect>
              <path d="M9 14h6"></path>
              <path d="M9 18h6"></path>
              <path d="M12 11v8"></path>
            </svg>
            Credits
          </button>

          {/* <button className="nav-item" onClick={() => navigate("/analytics")}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="20" x2="18" y2="10"></line>
              <line x1="12" y1="20" x2="12" y2="4"></line>
              <line x1="6" y1="20" x2="6" y2="14"></line>
            </svg>
            Analytics
          </button> */}

          <button className="nav-item">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="3"></circle>
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
            </svg>
            Settings
          </button>
        </nav>
      </aside>

      {/* --- MAIN VIEWPORT --- */}
      <main className="main-viewport">
        <header className="viewport-header">
          <h1 className="current-page-title">Dashboard</h1>
          <button className="header-action-btn" onClick={handleResetGame}>
            {/* Swapped to a 'refresh' icon */}
            <svg 
              width="14" height="14" viewBox="0 0 24 24" 
              fill="none" stroke="currentColor" strokeWidth="2" 
              strokeLinecap="round" strokeLinejoin="round"
            >
              <polyline points="1 4 1 10 7 10"></polyline>
              <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"></path>
            </svg>
            End Game
          </button>
        </header>

        <section className="content-canvas">
          {/* THE FLOATING LOGO */}
          <div className="game-logo">
            <img src={logo} alt="" />
          </div>
          <main className="dashboard-content">
            {/* LEFT PILLAR */}
            <div className="left-widget-column">
              <GameTimer autoStart={shouldAutoStart} />
              <PlayerRoster
                players={players}
                activePlayerIndex={activePlayerIndex}
                onCycle={cyclePlayer}
              />
            </div>

            {/* CENTER BASE (The floor of the U-shape) */}
            <div className="center-action-area">
              <GameActionRow
                onDiceRolled={handleDiceRolled}
                onCardDrawn={handleCardDrawn}
              />
            </div>

            {/* RIGHT PILLAR */}
            <div className="right-widget-column">
              <ActiveResult cardData={activeEvent} />
              <ExplainRoll
                cardData={activeEvent}
                onTurnComplete={handleTurnComplete}
              />
            </div>
          </main>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
