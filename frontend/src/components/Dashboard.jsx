import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Dashboard.css";
import logo from "../assets/images/logo.png";

// --- Widget Imports ---
import PlayerRoster from "./PlayerRoster";
import ActiveResult from "./ActiveResult";
import { GameActionRow } from "./GameActionRow";
import ExplainRoll from "./ExplainRoll";
import GameTimer from "./GameTimer";

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [winner, setWinner] = useState(null);

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

  const handleEliminatePlayer = (playerId) => {
    setPlayers(prev => {
      const remaining = prev.filter(p => p.id !== playerId);
      if (activePlayerIndex >= remaining.length) {
        setActivePlayerIndex(0);
      }
      return remaining;
    });
  };

  const handleDeclareWin = (player) => {
    setWinner(player);
  };

  return (
    <>
      {winner && (
        <div className="victory-overlay">
          <div className="victory-banner">
            <h1>{winner.name} ESCAPED!</h1>
            <p>They survived the Magma Rush.</p>
            <button className="btn-start-game" onClick={handleResetGame}>
              START NEW GAME
            </button>
          </div>
        </div>
      )}

      {/* The header stays so you still have the top-right button */}
      <header className="viewport-header">
        <h1 className="current-page-title">Dashboard</h1>
        <button className="header-action-btn" onClick={handleResetGame}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="1 4 1 10 7 10"></polyline>
            <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"></path>
          </svg>
          End Game
        </button>
      </header>

      <section className="content-canvas">
        <div className="game-logo">
          <img src={logo} alt="" />
        </div>

        <main className="dashboard-content">
          <div className="left-widget-column">
            <GameTimer autoStart={shouldAutoStart} gameEnded={!!winner} />
            <PlayerRoster 
              players={players} 
              activePlayerIndex={activePlayerIndex} 
              onEliminate={handleEliminatePlayer}
              onDeclareWin={handleDeclareWin}
            />
          </div>
          
          <div className="center-action-area">
            <GameActionRow onDiceRolled={handleDiceRolled} onCardDrawn={handleCardDrawn} />
          </div>

          <div className="right-widget-column" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
             <div style={{ flex: 1 }}>
               <ActiveResult cardData={activeEvent} />
             </div>
             <ExplainRoll cardData={activeEvent} onTurnComplete={handleTurnComplete} />
          </div>
        </main>
      </section>
    </>
  );
};
export default Dashboard;
