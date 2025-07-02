import React from 'react';
import portfolioData from '../data/portfolioData.json';

const Introduction: React.FC = () => {
  return (
    <div className="introduction" style={{ marginBottom: '20px', textAlign: 'left' }}>
      <pre>
        Hi, I'm <span className="color-cyan">{portfolioData.data.firstName} {portfolioData.data.lastName}</span>!
        <br />
        <br />
        <span className="color-yellow">{portfolioData.data.headline}</span>
      </pre>
    </div>
  );
};

export default Introduction; 