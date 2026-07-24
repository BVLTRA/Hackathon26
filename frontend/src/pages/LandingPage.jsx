import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';
import logo from '../assets/images/logo.png';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-layout">
      <div className="landing-card">
        <h4 className="landing-title">Welcome to</h4>

        <img src={logo} alt="Magma Rush Logo" className="landing-logo" />        
        
        <p className="landing-intro">
          Dare to challenge the volcano. Roll the dice, draw your fate, and survive the heat.
        </p>
        
        <button className="btn-lets-play" onClick={() => navigate('/setup')}>
          Let's Play
        </button>

      </div>
    </div>
  );
};

export default LandingPage;