import React, { useState, useEffect } from 'react';
import './PlayerRoster.css';

// Importing avatars
import Avatar_1 from '../assets/images/Avatar_1.png';
import Avatar_2 from '../assets/images/Avatar_2.png';
import Avatar_3 from '../assets/images/Avatar_3.png';
import Avatar_4 from '../assets/images/Avatar_4.png';

const avatarImages = [Avatar_1, Avatar_2, Avatar_3, Avatar_4];

const PlayerRoster = ({ players, activePlayerIndex, onEliminate, onDeclareWin }) => {
  // --- LOCAL STATE FOR HOVER AND RIGHT CLICK ---
  const [tooltip, setTooltip] = useState({ show: false, x: 0, y: 0, player: null });
  const [contextMenu, setContextMenu] = useState({ show: false, x: 0, y: 0, player: null });

  // Mechanism: Global click listener to close the context menu when clicking away
  useEffect(() => {
    const handleGlobalClick = () => setContextMenu({ show: false, x: 0, y: 0, player: null });
    window.addEventListener('click', handleGlobalClick);
    return () => window.removeEventListener('click', handleGlobalClick);
  }, []);

  const orderedPlayers = [
    ...players.slice(activePlayerIndex),
    ...players.slice(0, activePlayerIndex)
  ];

  const activePlayer = orderedPlayers[0];
  const queuedPlayers = orderedPlayers.slice(1);

  if (!activePlayer) return null;

  return (
    <div className="player-roster-container">
      
      {/* --- ACTIVE PLAYER CARD (Unchanged) --- */}
      <div className="roster-card active-card">
        <h3 className="card-header-title">Player Status</h3>
        <hr className="purple-divider" />
        <div className="active-player-layout">
          <div className="active-avatar-wrapper">
            <img 
               src={avatarImages[activePlayer.avatar] || avatarImages[0]} 
               alt="Active Player" 
               className="avatar-image-large" 
             />
          </div>
          <div className="active-stats-wrapper">
            <h2 className="player-name">{activePlayer.name}</h2>
            <ul className="stats-list">
              <li><span className="stat-icon">🏆</span> {activePlayer.trophies}</li>
              <li><span className="stat-icon">🪙</span> {activePlayer.coins}</li>
              <li><span className="stat-icon">🔥</span> {activePlayer.flames}</li>
              <li><span className="stat-icon">💀</span> {activePlayer.skulls}</li>
            </ul>
          </div>
        </div>
        <hr className="purple-divider" />
        <div className="status-footer">
          <span className="glow-dot green"></span>
          <span className="status-label">STATUS : </span>
          <span className="status-text green-text">IN PLAY</span>
        </div>
      </div>

      {/* --- QUEUED PLAYERS STACK --- */}
      <div className="queued-players-stack">
        {queuedPlayers.map((player, index) => {
          const isNext = index === 0;
          
          return (
            <div 
              className="roster-card queue-card interactive" 
              key={player.id}
              // Track mouse for the tooltip
              onMouseMove={(e) => setTooltip({ show: true, x: e.clientX, y: e.clientY, player })}
              onMouseLeave={() => setTooltip({ show: false, x: 0, y: 0, player: null })}
              // Intercept the native right-click
              onContextMenu={(e) => {
                e.preventDefault(); 
                setTooltip({ show: false, x: 0, y: 0, player: null }); // Kill tooltip so it doesn't block the menu
                setContextMenu({ show: true, x: e.clientX, y: e.clientY, player });
              }}
            >
              <div className="queue-avatar-wrapper">
                <img 
                   src={avatarImages[player.avatar] || avatarImages[0]} 
                   alt="Queued Player" 
                   className="avatar-image-small" 
                 />
              </div>
              <div className="queue-info-wrapper">
                <div className="queue-status-header">
                  <span className="glow-dot orange"></span>
                  <span className="status-label small">STATUS : </span>
                  <span className="status-text gray-text">
                    {isNext ? "NEXT" : "COMING UP"}
                  </span>
                </div>
                <h3 className="queue-player-name">{player.name}</h3>
              </div>
            </div>
          );
        })}
      </div>

      {/* --- PORTAL RENDERED TOOLTIP --- */}
      {tooltip.show && tooltip.player && (
        <div 
          className="cursor-tooltip" 
          style={{ top: tooltip.y + 15, left: tooltip.x + 15 }}
        >
          <h4>{tooltip.player.name} Stats</h4>
          <p>🏆 {tooltip.player.trophies} | 🪙 {tooltip.player.coins}</p>
          <p>🔥 {tooltip.player.flames} | 💀 {tooltip.player.skulls}</p>
        </div>
      )}

      {/* --- PORTAL RENDERED CONTEXT MENU --- */}
      {contextMenu.show && contextMenu.player && (
        <div 
          className="custom-context-menu"
          style={{ top: contextMenu.y, left: contextMenu.x }}
        >
          <button 
            className="menu-btn win"
            onClick={() => onDeclareWin(contextMenu.player)}
          >
            Declare Winner
          </button>
          <button 
            className="menu-btn kill"
            onClick={() => onEliminate(contextMenu.player.id)}
          >
            Kill (Kick Out)
          </button>
        </div>
      )}

    </div>
  );
};

export default PlayerRoster;