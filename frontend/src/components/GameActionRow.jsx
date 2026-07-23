import React, { useState, useEffect } from 'react';
import './GameActionRow.css';

// --- DICE IMAGES MAP ---
// Replace with your actual paths
import GoodRoll_1 from '../assets/images/GoodRoll_1.png';
import GoodRoll_2 from '../assets/images/GoodRoll_2.png';
import GoodRoll_3 from '../assets/images/GoodRoll_3.png';
import BadRoll_1 from '../assets/images/BadRoll_1.png';
import BadRoll_2 from '../assets/images/BadRoll_2.png';
import BadRoll_3 from '../assets/images/BadRoll_3.png';

// Placeholders for your static card images
import CardStackImg from '../assets/images/CardStack.png'; 

const diceImages = {
  good: [GoodRoll_1, GoodRoll_2, GoodRoll_3],
  bad: [BadRoll_1, BadRoll_2, BadRoll_3]
};

export const GameActionRow = ({ onDiceRolled, onCardDrawn }) => {
  return (
    <div className="game-action-row">
      <DiceWidget onRollComplete={onDiceRolled} />
      <DrawWidget onDrawCard={onCardDrawn} />
      <PlaceholderWidget />
    </div>
  );
};

// --- WIDGET 1: THE DICE ROLL ---
const DiceWidget = ({ onRollComplete }) => {
  const [isRolling, setIsRolling] = useState(false);
  const [currentDice, setCurrentDice] = useState(diceImages.good[0]); // Default display
  const [finalAlignment, setFinalAlignment] = useState(null); // 'good' or 'bad'

  const handleRoll = () => {
    if (isRolling) return;
    
    setIsRolling(true);
    setFinalAlignment(null);

    let shuffleCount = 0;
    const shuffleInterval = setInterval(() => {
      // Pick a totally random dice for the shuffle animation
      const align = Math.random() > 0.5 ? 'good' : 'bad';
      const num = Math.floor(Math.random() * 3);
      setCurrentDice(diceImages[align][num]);
      
      shuffleCount++;
      if (shuffleCount > 10) {
        clearInterval(shuffleInterval);
        
        // Settle on the final result
        const finalAlign = Math.random() > 0.5 ? 'good' : 'bad';
        const finalNum = Math.floor(Math.random() * 3);
        const finalValue = finalNum + 1; // 1 to 3
        
        setCurrentDice(diceImages[finalAlign][finalNum]);
        setFinalAlignment(finalAlign);
        setIsRolling(false);
        
        // Send the result to the Dashboard
        onRollComplete(finalAlign, finalValue);
      }
    }, 100);
  };

  return (
    <div className="action-card dice-card">
      <div className="action-header cyan">
        <span className="badge">2</span>
        <h3>Roll The Die</h3>
      </div>
      <hr className="divider cyan-divider" />
      
      <div className="action-body clickable" onClick={handleRoll}>
        <div className="image-container">
          <img src={currentDice} alt="Dice" className={isRolling ? "rolling" : ""} />
        </div>
        <div className="text-container">
          <h4 className="cyan-text">Click to Roll</h4>
          <p>Discover their fate</p>
        </div>
      </div>

      <div className="indicator-row">
        <div className={`indicator good-indicator ${finalAlignment === 'good' ? 'blink-active' : ''}`}>
          GOOD
        </div>
        <div className={`indicator bad-indicator ${finalAlignment === 'bad' ? 'blink-active' : ''}`}>
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
        <span className="badge">3</span>
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

// --- WIDGET 3: PLACEHOLDER (RED) ---
const PlaceholderWidget = () => {
  return (
    <div className="action-card remember-card">
      <div className="action-header red">
        <span className="badge">4</span>
        <h3>Remember</h3>
      </div>
      <hr className="divider red-divider" />
      
      <div className="action-body">
        <div className="image-container">
          <div className="info-icon">i</div>
        </div>
        <div className="text-container">
          <h4 className="red-text">Resolve & Tell Player Result</h4>
          <p>And reveal moves</p>
        </div>
      </div>

      <div className="indicator-row single">
        <button className="indicator red-btn">
          REVEAL
        </button>
      </div>
    </div>
  );
};