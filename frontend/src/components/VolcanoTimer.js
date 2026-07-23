import React, { useState, useEffect } from 'react';

const VolcanoTimer = () => {
  const totalSeconds = 60; 
  const [timeLeft, setTimeLeft] = useState(totalSeconds);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timerId = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [timeLeft]);

  const fillPercentage = ((totalSeconds - timeLeft) / totalSeconds) * 100;

  return (
    <div className="widget volcano-timer">
      <h3>Volcano erupts in</h3>
      
      <div className="clock-display">
        {timeLeft}s
      </div>

      <div className="progress-bar-container">
        <div 
          className="progress-bar-fill" 
          style={{ width: `${fillPercentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default VolcanoTimer;