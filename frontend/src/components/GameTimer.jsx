import React, { useState, useEffect } from 'react';
import './GameTimer.css';

const GameTimer = ({ autoStart = false }) => {
  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(autoStart);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isActive && !isPaused) {
      interval = setInterval(() => {
        setTime((time) => time + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, isPaused]);

  const handleStart = () => {
    setIsActive(true);
    setIsPaused(false);
  };

  const handlePause = () => {
    setIsPaused(!isPaused);
  };

  const handleEnd = () => {
    // Native browser confirmation popup
    if (window.confirm("Are you sure you want to end the game? All progress will be lost.")) {
      setIsActive(false);
      setTime(0);
      setIsPaused(false);
    }
  };

  const formatTime = (totalSeconds) => {
    const getSeconds = `0${(totalSeconds % 60)}`.slice(-2);
    const minutes = `${Math.floor(totalSeconds / 60)}`;
    const getMinutes = `0${minutes % 60}`.slice(-2);
    const getHours = `0${Math.floor(totalSeconds / 3600)}`.slice(-2);
    return { getHours, getMinutes, getSeconds };
  };

  const { getHours, getMinutes, getSeconds } = formatTime(time);

  return (
    <div className="widget game-timer-card">
      {!isActive && time === 0 ? (
        <button className="btn-start-game" onClick={handleStart}>START GAME</button>
      ) : (
        <div className="active-timer-ui">
          <div className="stopwatch-display">
            {/* The 'key' prop forces React to remount the span, triggering the CSS animation */}
            <div className="digit-wheel">
              <span key={`h-${getHours}`} className="bouncy-digit">{getHours}</span>
            </div>
            :
            <div className="digit-wheel">
              <span key={`m-${getMinutes}`} className="bouncy-digit">{getMinutes}</span>
            </div>
            :
            <div className="digit-wheel">
              <span key={`s-${getSeconds}`} className="bouncy-digit">{getSeconds}</span>
            </div>
          </div>
          
          <div className="timer-controls">
            <button className="btn-yellow-outline" onClick={handlePause}>
              {isPaused ? "RESUME" : "PAUSE"}
            </button>
            <button className="btn-red-outline" onClick={handleEnd}>
              END
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameTimer;