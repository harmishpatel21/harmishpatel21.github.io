import React from 'react';
import summaryData from '@data/summary.json';
import skills from '@data/skills.json';

const Summary: React.FC = () => {
  return (
    <section className="section" aria-labelledby="summary-heading">
      <h2 id="summary-heading">Summary</h2>
      <p>{summaryData.text}</p>

      <h3>Technical Skills</h3>
      <ul className="skills">
        {Object.entries(skills as Record<string, string[]>).map(([group, items]) => (
          <li key={group}>
            <strong>{group}</strong>
            <div className="skill-badges">
              {items.map((item) => (
                <span className="tech-badge" key={`${group}-${item}`}>{item}</span>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Summary;


