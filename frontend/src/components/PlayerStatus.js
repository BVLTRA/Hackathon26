import React from 'react';

const PlayerStatus = () => {
  return (
    <div className="widget player-status">
      <h3>Player Status</h3>
      
      <div className="avatar-container">
        {/* Placeholder for Avatar */}
        <div className="avatar-placeholder">Avatar</div>
      </div>

      <div className="stats-container">
        <p>Stat 1: --</p>
        <p>Stat 2: --</p>
      </div>

      <div className="status-indicator">
        <h4>Status: <span>In Play</span></h4> 
      </div>
    </div>
  );
};

export default PlayerStatus;