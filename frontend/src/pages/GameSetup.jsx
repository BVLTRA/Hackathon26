import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './GameSetup.css';
import logo from "../assets/images/logo.png"; 

// 1. Explicitly import the avatars so the bundler packages them
import Avatar_1 from '../assets/images/Avatar_1.png';
import Avatar_2 from '../assets/images/Avatar_2.png';
import Avatar_3 from '../assets/images/Avatar_3.png';
import Avatar_4 from '../assets/images/Avatar_4.png';

const avatarImages = [Avatar_1, Avatar_2, Avatar_3, Avatar_4];

const GameSetup = () => {
  const navigate = useNavigate();
  
  // State: Controls how many inputs render (2 to 4)
  const [playerCount, setPlayerCount] = useState(2);

  // State: The master roster being built
  const [players, setPlayers] = useState([
    { id: 1, name: "Player 1", avatar: 0, trophies: 0, coins: 0, flames: 0, skulls: 0 },
    { id: 2, name: "Player 2", avatar: 1, trophies: 0, coins: 0, flames: 0, skulls: 0 },
  ]);

  // Mechanism: Adjust the array size dynamically
  const handlePlayerCountChange = (e) => {
    const newCount = parseInt(e.target.value, 10);
    setPlayerCount(newCount);

    setPlayers(prevPlayers => {
      const updated = [...prevPlayers];
      // If we increased the count, push new default players
      while (updated.length < newCount) {
        const nextId = updated.length + 1;
        updated.push({
          id: nextId,
          name: `Player ${nextId}`,
          avatar: nextId - 1, // Binds Avatar_3 to Player 3, etc.
          trophies: 0, coins: 0, flames: 0, skulls: 0
        });
      }
      // If we decreased the count, slice the array down
      return updated.slice(0, newCount);
    });
  };

  const handleNameChange = (index, newName) => {
    setPlayers(prev => {
      const updated = [...prev];
      updated[index].name = newName;
      return updated;
    });
  };

  const handleStartGame = () => {
    // The Mechanism: We navigate to the dashboard, but we pack the custom
    // 'players' array into the route state. We also set a flag to auto-start the timer.
    navigate('/dashboard', { state: { customPlayers: players, autoStart: true } });
  };

  return (
    <div className="setup-layout">
      
      {/* Keeping the sidebar structure for consistency, but gutted */}
      <aside className="sidebar">
        <div className="sidebar-brand">
          <img src={logo} alt="Relay Logo" className="brand-logo" height="15" />
        </div>
        <nav className="sidebar-nav">
          <button className="nav-item active">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
            Game Setup
          </button>
        </nav>
        
      </aside>

      <main className="main-viewport setup-viewport">
        <div className="setup-card">
          <div className="setup-header">
            <div className="setup-icon-container">
               <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#ff4500" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><line x1="20" y1="8" x2="20" y2="14"></line><line x1="23" y1="11" x2="17" y2="11"></line>
               </svg>
            </div>
            <div className="setup-title-area">
              <h2>Create Your Crew</h2>
              <p>Add Player To The Game<br/><span>Select or assign a player slot</span></p>
            </div>
          </div>

          <div className="player-count-selector">
            <label>Total Players</label>
            <select value={playerCount} onChange={handlePlayerCountChange}>
              <option value={2}>2 Players</option>
              <option value={3}>3 Players</option>
              <option value={4}>4 Players</option>
            </select>
          </div>

          <div className="player-inputs-container">
            {players.map((player, index) => (
              <div className="player-input-row" key={player.id}>
                <div className="avatar-preview">
                  <img 
                    src={avatarImages[player.avatar]} 
                    alt={`Avatar ${player.id}`} 
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                </div>
                <input 
                  type="text" 
                  value={player.name}
                  onChange={(e) => handleNameChange(index, e.target.value)}
                  placeholder={`Player ${player.id} Name`}
                  maxLength={15}
                />
              </div>
            ))}
          </div>

          <button className="btn-start-game-massive" onClick={handleStartGame}>
            START GAME
          </button>
        </div>
      </main>

    </div>
  );
};

export default GameSetup;