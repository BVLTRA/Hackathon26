import React from 'react';
import './ActiveResult.css';

// Explicitly import the 3 cards for each deck and Badge
import GoodCard_1 from '../assets/cards/GoodCard_1.png';
import GoodCard_2 from '../assets/cards/GoodCard_2.png';
import GoodCard_3 from '../assets/cards/GoodCard_3.png';

import BadCard_1 from '../assets/cards/BadCard_1.png';
import BadCard_2 from '../assets/cards/BadCard_2.png';
import BadCard_3 from '../assets/cards/BadCard_3.png';

import BadgeCard from '../assets/badges/BadgeResActive.png'

// Map them for dynamic access
const cardImages = {
  GoodCard_1, GoodCard_2, GoodCard_3,
  BadCard_1, BadCard_2, BadCard_3
};

const ActiveResult = ({ cardData }) => {
  // If no card has been drawn yet, render the standby state
  if (!cardData) {
    return (
      <div className="active-result-container">
        <div className="result-header">
          <div className="roll-badge"><img src={BadgeCard} alt="" className='roll-badge-image' /></div>
          <h3 className="header-title">Active Result</h3>
        </div>
        <hr className="green-divider" />
        
        <div className="card-display-area">
          <div className="card-placeholder">
            <p>Awaiting Roll...</p>
          </div>
        </div>
      </div>
    );
  }

  // Construct the exact key to pull the bundled image from our map
  const imagePrefix = cardData.alignment === 'good' ? 'GoodCard' : 'BadCard';
  const imageKey = `${imagePrefix}_${cardData.imageNum}`;
  const imageSrc = cardImages[imageKey]; 

  return (
    <div className="active-result-container">
      
      {/* Header with the dynamic dice roll badge */}
      <div className="result-header">
        {/* <div className="roll-badge">{cardData.diceRollValue}</div> */}
        <div className="roll-badge"><img src={BadgeCard} alt="" className='roll-badge-image' /></div>
        <h3 className="header-title">Active Result</h3>
      </div>
      
      <hr className="green-divider" />
      
      {/* Card Render */}
      <div className="card-display-area">
        <img 
          src={imageSrc} 
          alt={`${cardData.alignment} card ${cardData.imageNum}`} 
          className="rendered-card-image"
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.nextElementSibling.style.display = 'flex';
          }}
        />
        {/* Hidden fallback just in case an image goes missing */}
        <div className="card-placeholder error-fallback" style={{ display: 'none' }}>
           <p>Missing Image:<br/>{imageKey}.png</p>
        </div>
      </div>

    </div>
  );
};

export default ActiveResult;