import React, { useState } from 'react';

// 1. Explicitly tell the bundler these files exist so it packages them
import GoodCard_1 from '../assets/cards/GoodCard_1.png';
import GoodCard_2 from '../assets/cards/GoodCard_2.png';
import GoodCard_3 from '../assets/cards/GoodCard_3.png';
import GoodCard_4 from '../assets/cards/GoodCard_4.png';
import GoodCard_5 from '../assets/cards/GoodCard_5.png';

import BadCard_1 from '../assets/cards/BadCard_1.png';
import BadCard_2 from '../assets/cards/BadCard_2.png';
import BadCard_3 from '../assets/cards/BadCard_3.png';
import BadCard_4 from '../assets/cards/BadCard_4.png';
import BadCard_5 from '../assets/cards/BadCard_5.png';

// 2. Map your dynamic state strings to the actual hashed files the bundler generated
const cardImages = {
  GoodCard_1, GoodCard_2, GoodCard_3, GoodCard_4, GoodCard_5,
  BadCard_1, BadCard_2, BadCard_3, BadCard_4, BadCard_5
};

const DrawCards = () => {
  const [cardType, setCardType] = useState('good'); 
  const [drawnCardNum, setDrawnCardNum] = useState(null); 

  const handleToggle = () => {
    setCardType(prev => (prev === 'good' ? 'bad' : 'good'));
    setDrawnCardNum(null); 
  };

  const handleDraw = () => {
    const randomNum = Math.floor(Math.random() * 5) + 1;
    setDrawnCardNum(randomNum);
  };

  // 3. Construct the key, then grab the correct bundled image from the map
  const imagePrefix = cardType === 'good' ? 'GoodCard' : 'BadCard';
  const imageKey = `${imagePrefix}_${drawnCardNum}`;
  const imageSrc = cardImages[imageKey]; 

  return (
    <div className="widget draw-cards">
      <div className="draw-cards-header">
        <h3>Draw Cards</h3>
        
        <div className="toggle-container" onClick={handleToggle}>
          <span className={cardType === 'good' ? 'active' : ''}>Good</span>
          <div className={`toggle-switch ${cardType}`}></div>
          <span className={cardType === 'bad' ? 'active' : ''}>Bad</span>
        </div>
      </div>

      <div className="card-area" onClick={handleDraw}>
        {drawnCardNum === null ? (
          <div className="card-placeholder">
            <p>Click to reveal<br/><span>({cardType} deck)</span></p>
          </div>
        ) : (
          <div className="drawn-card-container">
            <img 
              src={imageSrc} 
              alt={`${cardType} card ${drawnCardNum}`} 
              className="drawn-card-image"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextElementSibling.style.display = 'flex';
              }}
            />
            <div className="card-placeholder error-fallback" style={{ display: 'none' }}>
               <p>Missing:<br/>{imageKey}.png<br/><br/>Click to reshuffle</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DrawCards;