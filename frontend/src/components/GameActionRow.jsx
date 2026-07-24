import React, { useState, useEffect } from 'react';
import './GameActionRow.css';

// --- DICE IMAGES MAP ---
import GoodRoll_1 from '../assets/images/GoodRoll_1.png';
import GoodRoll_2 from '../assets/images/GoodRoll_2.png';
import GoodRoll_3 from '../assets/images/GoodRoll_3.png';
import BadRoll_1 from '../assets/images/BadRoll_1.png';
import BadRoll_2 from '../assets/images/BadRoll_2.png';
import BadRoll_3 from '../assets/images/BadRoll_3.png';

import CardStackImg from '../assets/images/CardStack.png'; 

import BadgeDice from '../assets/badges/BadgeDice.png'
import BadgeCards from '../assets/badges/BadgeCards.png'
import BadgeEdit from '../assets/badges/BadgeEdit.png'

const diceImages = {
  good: [GoodRoll_1, GoodRoll_2, GoodRoll_3],
  bad: [BadRoll_1, BadRoll_2, BadRoll_3]
};

export const GameActionRow = ({ onDiceRolled, onCardDrawn, activePlayer, onUpdateStat }) => {
  return (
    <div className="game-action-row">
      <DiceWidget onRollComplete={onDiceRolled} />
      <DrawWidget onDrawCard={onCardDrawn} />
      <EditStatsWidget activePlayer={activePlayer} onUpdateStat={onUpdateStat} />
    </div>
  );
};

// --- WIDGET 1: THE DICE ROLL ---
const DiceWidget = ({ onRollComplete }) => {
  const [isRolling, setIsRolling] = useState(false);
  const [currentDice, setCurrentDice] = useState(diceImages.good[0]); // Default display
  const [finalAlignment, setFinalAlignment] = useState(null); // 'good' or 'bad'

  // Accept the chosen alignment from the indicator click
  const handleRoll = (selectedAlignment) => {
    if (isRolling) return;
    
    setIsRolling(true);
    setFinalAlignment(null);

    let shuffleCount = 0;
    const shuffleInterval = setInterval(() => {
      // Shuffle ONLY within the selected alignment group
      const num = Math.floor(Math.random() * 3);
      setCurrentDice(diceImages[selectedAlignment][num]);
      
      shuffleCount++;
      if (shuffleCount > 10) {
        clearInterval(shuffleInterval);
        
        // Settle on the final random number (1 to 3)
        const finalNum = Math.floor(Math.random() * 3);
        const finalValue = finalNum + 1; 
        
        setCurrentDice(diceImages[selectedAlignment][finalNum]);
        setFinalAlignment(selectedAlignment);
        setIsRolling(false);
        
        // Send the result to the Dashboard
        onRollComplete(selectedAlignment, finalValue);
      }
    }, 100);
  };

  return (
    <div className="action-card dice-card">
      <div className="action-header cyan">
        <span className="badge"><img src={BadgeDice} alt="" className='roll-badge-image' /></span>
        <h3>Roll The Die</h3>
      </div>
      <hr className="divider cyan-divider" />
      
      {/* Removed the 'clickable' class and onClick event from here */}
      <div className="action-body">
        <div className="image-container">
          <img src={currentDice} alt="Dice" className={isRolling ? "rolling" : ""} />
        </div>
        <div className="text-container">
          <h4 className="cyan-text">Choose Fate</h4>
          <p>Select Good or Bad</p>
        </div>
      </div>

      <div className="indicator-row">
        {/* The indicators now trigger the roll and pass their specific alignment */}
        <div 
          className={`indicator good-indicator interactive-indicator ${finalAlignment === 'good' ? 'blink-active' : ''}`}
          onClick={() => handleRoll('good')}
        >
          GOOD
        </div>
        <div 
          className={`indicator bad-indicator interactive-indicator ${finalAlignment === 'bad' ? 'blink-active' : ''}`}
          onClick={() => handleRoll('bad')}
        >
          BAD
        </div>
      </div>
    </div>
  );
};

// --- WIDGET 2: DRAW A CARD ---
const DrawWidget = ({ onDrawCard }) => {
  return (
    <div className="action-card draw-card">
      <div className="action-header purple">
        <span className="badge"><img src={BadgeCards} alt="" className='roll-badge-image' /></span>
        <h3>Draw a Card</h3>
      </div>
      <hr className="divider purple-divider" />
      
      <div className="action-body">
        <div className="image-container">
          <img src={CardStackImg} alt="Card Stack" />
        </div>
        <div className="text-container">
          <h4 className="purple-text">Draw from the top</h4>
          <p>And reveal moves</p>
        </div>
      </div>

      <div className="indicator-row single">
        <button className="indicator purple-btn" onClick={onDrawCard}>
          DRAW CARD
        </button>
      </div>
    </div>
  );
};

// --- WIDGET 3: EDIT ACTIVE STATS ---
const EditStatsWidget = ({ activePlayer, onUpdateStat }) => {
  if (!activePlayer) return null;

  // Reusable sub-component for the + / - buttons
  const StatBox = ({ icon, statKey, value }) => (
    <div className="stat-edit-box">
      <span className="stat-edit-icon">{icon}</span>
      <div className="stat-edit-controls">
        <button className="stat-edit-btn minus" onClick={() => onUpdateStat(statKey, -1)}>−</button>
        <span className="stat-edit-val">{value}</span>
        <button className="stat-edit-btn plus" onClick={() => onUpdateStat(statKey, 1)}>+</button>
      </div>
    </div>
  );

  return (
    <div className="action-card edit-stats-card">
      <div className="action-header orange">
        <span className="badge"><img src={BadgeEdit} alt="" className='roll-badge-image' /></span>
        <h3>Edit Stats</h3>
      </div>
      <hr className="divider orange-divider" />
      
      <div className="edit-stats-grid">
        <StatBox icon="🏆" statKey="trophies" value={activePlayer.trophies} />
        <StatBox icon="🪙" statKey="coins" value={activePlayer.coins} />
        <StatBox icon="🔥" statKey="flames" value={activePlayer.flames} />
        <StatBox icon="💀" statKey="skulls" value={activePlayer.skulls} />
      </div>
    </div>
  );
};