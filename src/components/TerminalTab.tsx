import React, { useState, useEffect } from 'react';
// import portfolioData from '../data/portfolioData.json';

const TerminalTab: React.FC = () => {
  const [currentTime, setCurrentTime] = useState<string>('');
  // const userName = portfolioData.data.firstName;
  // const userHeadline = portfolioData.data.position;

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      setCurrentTime(`${hours}:${minutes}:${seconds}`);
    };

    updateTime();
    const timerId = setInterval(updateTime, 1000);

    return () => clearInterval(timerId);
  }, []);

  return (
    <div className="terminal-tab">
      <span className="tab-name">:~/portfolio</span>
      {/* <span className="tab-center">{userHeadline}</span> */}
      <span className="tab-time">{currentTime}</span>
    </div>
  );
};

export default TerminalTab; 