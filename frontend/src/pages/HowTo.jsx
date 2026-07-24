import React from 'react';
import './InfoPages.css';

const HowTo = () => {
  return (
    <>
      <header className="viewport-header">
        <h1 className="current-page-title">How To Play</h1>
      </header>

      <section className="content-canvas">
        <div className="info-card">
          <h2 className="cyan-text">Rules of Magma Rush</h2>
          <div className="info-content">
            <h3>1. The Roll</h3>
            <p>The Game Master selects the active player and rolls the die. A Good Roll brings fortune; a Bad Roll brings peril.</p>
            
            <h3>2. The Draw</h3>
            <p>Draw a card corresponding to the die's alignment to reveal the player's exact fate.</p>
            
            <h3>3. Resolution</h3>
            <p>Execute the moves shown on the Active Result panel, update the physical board, and click "Turn Completed" to pass the torch to the next player.</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default HowTo;