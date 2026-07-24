import React from 'react';
import './InfoPages.css';

const Credits = () => {
  return (
    <>
      <header className="viewport-header">
        <h1 className="current-page-title">Credits</h1>
      </header>

      <section className="content-canvas">
        <div className="info-card text-center">
          <h2 className="purple-text">The Magma Rush Team</h2>
          <div className="info-content">
            <p><strong>Game Design & Logic</strong><br/>Your Name</p>
            <p><strong>UI/UX Engineering</strong><br/>BVLTRA Metrics Core</p>
            <p><strong>Assets & Artwork</strong><br/>[Artist Name / Studio]</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Credits;