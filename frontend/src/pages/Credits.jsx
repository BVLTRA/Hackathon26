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
          <h2 className="purple-text" style={{ marginBottom: '8px' }}>The Magma Rush Team</h2>
          <h4 style={{ color: '#888', marginTop: '0', marginBottom: '32px', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '500' }}>
            Open Window Hackathon 2026
          </h4>
          
          <div className="info-content" style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            
            {/* Digital Team */}
            <div>
              <h3 className="cyan-text" style={{ borderBottom: '1px solid rgba(1, 232, 247, 0.3)', paddingBottom: '8px', display: 'inline-block', marginBottom: '16px' }}>
                Digital Engineering & UI/UX
              </h3>
              <p style={{ margin: '4px 0' }}><strong>Britney Leigh Cronje</strong> <span style={{color: '#666', fontSize: '0.85rem'}}>&lt;241078@virtualwindow.co.za&gt;</span></p>
              <p style={{ margin: '4px 0' }}><strong>Ntsika Madlala</strong> <span style={{color: '#666', fontSize: '0.85rem'}}>&lt;241275@virtualwindow.co.za&gt;</span></p>
              <p style={{ margin: '4px 0' }}><strong>Nicole Soldatos</strong> <span style={{color: '#666', fontSize: '0.85rem'}}>&lt;251045@virtualwindow.co.za&gt;</span></p>
              <p style={{ margin: '4px 0' }}><strong>Shané Oberholzer</strong> <span style={{color: '#666', fontSize: '0.85rem'}}>&lt;241241@virtualwindow.co.za&gt;</span></p>
              <p style={{ margin: '4px 0' }}><strong>Tshedza Mosehane</strong> <span style={{color: '#666', fontSize: '0.85rem'}}>&lt;251056@virtualwindow.co.za&gt;</span></p>
            </div>

            {/* Physical/Tech Team */}
            <div>
              <h3 className="purple-text" style={{ borderBottom: '1px solid rgba(160, 32, 240, 0.3)', paddingBottom: '8px', display: 'inline-block', marginBottom: '16px' }}>
                Physical & Technical Design
              </h3>
              <p style={{ margin: '4px 0' }}><strong>Immre-Lee Rudman</strong> <span style={{color: '#666', fontSize: '0.85rem'}}>&lt;241101@virtualwindow.co.za&gt;</span></p>
              <p style={{ margin: '4px 0' }}><strong>Nicole Lamarque</strong> <span style={{color: '#666', fontSize: '0.85rem'}}>&lt;251086@virtualwindow.co.za&gt;</span></p>
              <p style={{ margin: '4px 0' }}><strong>Nell Janse van Rensburg</strong> <span style={{color: '#666', fontSize: '0.85rem'}}>&lt;251061@virtualwindow.co.za&gt;</span></p>
              <p style={{ margin: '4px 0' }}><strong>Reece Livingston</strong> <span style={{color: '#666', fontSize: '0.85rem'}}>&lt;241049@virtualwindow.co.za&gt;</span></p>
            </div>

          </div>
        </div>
      </section>
    </>
  );
};

export default Credits;