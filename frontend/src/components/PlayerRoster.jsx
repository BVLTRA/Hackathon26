import React from 'react';
import './PlayerRoster.css';

const PlayerRoster = ({ players, activePlayerIndex }) => {
  // Mechanism: Rotate the array so the active player is always at index 0.
  // If activePlayerIndex is 1, it takes everything from index 1 to the end, 
  // and staples the beginning of the array to the back.
  const orderedPlayers = [
    ...players.slice(activePlayerIndex),
    ...players.slice(0, activePlayerIndex)
  ];

  const activePlayer = orderedPlayers[0];
  const queuedPlayers = orderedPlayers.slice(1);

  if (!activePlayer) return null;

  return (
    <div className="player-roster-container">
      
      {/* --- ACTIVE PLAYER CARD --- */}
      <div className="roster-card active-card">
        <h3 className="card-header-title">Player Status</h3>
        <hr className="purple-divider" />
        
        <div className="active-player-layout">
          <div className="active-avatar-wrapper">
            {/* Replace with actual image later */}
            <div className="avatar-placeholder-large">🤖</div>
          </div>
          
          <div className="active-stats-wrapper">
            <h2 className="player-name">{activePlayer.name}</h2>
            <ul className="stats-list">
              {/* Using emojis as image placeholders for the icons */}
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
          // The first person in the queued array is ALWAYS "NEXT"
          const isNext = index === 0;
          
          return (
            <div className="roster-card queue-card" key={player.id}>
              <div className="queue-avatar-wrapper">
                <div className="avatar-placeholder-small">🤖</div>
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

    </div>
  );
};

export default PlayerRoster;