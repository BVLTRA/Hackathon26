import React from 'react';
import './ExplainRoll.css';
import BadgeResult from '../assets/badges/BadgeResult.png'

const ExplainRoll = ({ cardData, onTurnComplete }) => {
  
  // The "Dictionary" that holds your game rules
  const getExplanation = (alignment, rollValue) => {
    if (alignment === 'bad') {
      switch (rollValue) {
        case 1: return { action: "Move back 1 space.", reason: "Rolled a Bad 1" };
        case 2: return { action: "Move back 1 space. Volcano meter moves up by 1.", reason: "Rolled a Bad 2" };
        case 3: return { action: "Move back 2 spaces.", reason: "Rolled a Bad 3" };
        default: return { action: "Unknown bad roll.", reason: "" };
      }
    } else if (alignment === 'good') {
      switch (rollValue) {
        case 1: return { action: "Move forward 1 space.", reason: "Rolled a Good 1" };
        case 2: return { action: "Move forward 2 spaces. Volcano meter reduced by 1.", reason: "Rolled a Good 2" };
        case 3: return { action: "Move forward 2 spaces.", reason: "Rolled a Good 3" };
        default: return { action: "Unknown good roll.", reason: "" };
      }
    }
    return null;
  };

  // If no card has been drawn yet, show a standby state
  if (!cardData) {
    return (
      <div className="widget explain-roll-container empty">
        <div className="explain-header">
          <div className="explain-badge empty"><img src={BadgeResult} alt="" className='roll-badge-image' /></div>
          <h3>Explain Roll</h3>
        </div>
        <hr className="green-divider" />
        <div className="explain-body placeholder">
          <p>Awaiting card draw...</p>
        </div>
      </div>
    );
  }

  // Look up the specific rules for this turn
  const explanation = getExplanation(cardData.alignment, cardData.diceRollValue);

  return (
    <div className="widget explain-roll-container">
      <div className="explain-header">
        {/* The Badge matching your mockup */}
        <div className="explain-badge"><img src={BadgeResult} alt="" className='roll-badge-image' /></div>
        <h3>Explain Roll</h3>
        {/* Space for the right-side icon you mentioned */}
        <div className="header-icon-space"></div>
      </div>
      
      <hr className="green-divider" />
      
      <div className="explain-body">
        <div className="instruction-group">
          <div className="instruction-header">
            <span className="glow-dot green"></span>
            <h4 className="green-text">Card / Roll Meaning</h4>
          </div>
          <p className="reason-text">Reason: {explanation.reason}</p>
          <p className="action-text">{explanation.action}</p>
        </div>
      </div>

      <div className="explain-footer">
        <button className="btn-green-outline" onClick={onTurnComplete}>
          Turn Completed
        </button>
      </div>
    </div>
  );
};

export default ExplainRoll;