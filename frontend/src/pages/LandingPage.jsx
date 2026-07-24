import React from 'react';
import { useNavigate } from 'react-router-dom';
import Marquee from "react-fast-marquee";
import './LandingPage.css';
import logo from '../assets/images/logo.png'; 

// Import your badges
import BadgeDice from '../assets/badges/BadgeDice.png';
import BadgeCards from '../assets/badges/BadgeCards.png';
import BadgeEdit from '../assets/badges/BadgeEdit.png';
import BadgeProfile from '../assets/badges/BadgeProfile.png';
import BadgeResult from '../assets/badges/BadgeResult.png';
import BadgeSkull from '../assets/badges/BadgeSkull.png';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-layout">
      
      {/* Main Center Card */}
      <div className="landing-card">
        <img src={logo} alt="Magma Rush Logo" className="landing-logo" />
        <h1 className="landing-title">MAGMA RUSH</h1>
        <p className="landing-intro">
          Dare to challenge the volcano. Roll the dice, draw your fate, and survive the heat.
        </p>
        <button className="btn-lets-play" onClick={() => navigate('/setup')}>
          Let's Play
        </button>
      </div>

      {/* The Bottom Marquee Band */}
      <div className="landing-marquee-container">
        {/* autoFill={true} automatically clones the children enough times to fill the screen, preventing gaps on ultra-wide monitors */}
        <Marquee speed={40} gradient={false} autoFill={true}>
          <img src={BadgeDice} alt="Dice" className="marquee-badge" />
          <img src={BadgeCards} alt="Cards" className="marquee-badge" />
          <img src={BadgeEdit} alt="Edit" className="marquee-badge" />
          <img src={BadgeProfile} alt="Profile" className="marquee-badge" />
          <img src={BadgeResult} alt="Result" className="marquee-badge" />
          <img src={BadgeSkull} alt="Result" className="marquee-badge" />
        </Marquee>
      </div>

    </div>
  );
};

export default LandingPage;