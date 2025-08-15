import React from 'react';
import summaryData from '@data/summary.json';
import skills from '@data/skills.json';

const Summary: React.FC = () => {
  return (
    <section className="section summary-section" aria-labelledby="summary-heading">
      <div className="summary-header">
        <h2 id="summary-heading">Summary</h2>
        <div className="summary-badge">AI/ML Expert</div>
      </div>
      
      <div className="summary-content">
        <p className="summary-text">{summaryData.text}</p>
        
        {summaryData.highlights && (
          <div className="achievements">
            <h4>Key Achievements</h4>
            <div className="achievement-grid">
              {summaryData.highlights.map((highlight, index) => (
                <div key={index} className="achievement-item">
                  <div className="achievement-icon">🏆</div>
                  <span>{highlight}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="skills-section">
        <div className="skills-header">
          <h3>Technical Skills</h3>
          {/* <p className="skills-subtitle">Comprehensive expertise across the AI/ML stack</p> */}
        </div>
        
        <div className="skills-grid">
          {Object.entries(skills as Record<string, string[]>).map(([group, items]) => (
            <div key={group} className="skill-category">
              <div className="category-header">
                <div className="category-icon">⚡</div>
                <h4>{group}</h4>
              </div>
              <div className="skill-badges">
                {items.map((item) => (
                  <span className="skill-badge" key={`${group}-${item}`}>
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Summary;


