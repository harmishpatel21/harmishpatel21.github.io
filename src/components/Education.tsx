import React, { useEffect, useMemo, useState } from 'react';
import fallback from '@data/education.json';

export type EducationEntry = {
  school: string;
  degree: string;
  dates: string;
  bullets: string[];
};

const Education: React.FC = () => {
  const [entries, setEntries] = useState<EducationEntry[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const cachedKey = useMemo(() => 'education_cache_v1', []);

  useEffect(() => {
    const cached = sessionStorage.getItem(cachedKey);
    if (cached) {
      setEntries(JSON.parse(cached));
      setLoading(false);
      return;
    }
    setEntries(fallback as EducationEntry[]);
    sessionStorage.setItem(cachedKey, JSON.stringify(fallback));
    setLoading(false);
  }, [cachedKey]);

  return (
    <section className="section education-section" aria-labelledby="education-heading">
      <div className="section-header">
        <h2 id="education-heading">Education</h2>
        <div className="section-badge">Academic</div>
      </div>
      
      {loading && <div className="loading" role="status">Loading...</div>}
      {!loading && (
        <div className="education-grid" aria-label="Education timeline">
          {entries.map((item, idx) => (
            <div className="education-card" key={`${item.school}-${idx}`}>
              <div className="education-header">
                <div className="school-info">
                  <h3 className="school-name">{item.school}</h3>
                  <p className="degree-title">{item.degree}</p>
                  <span className="dates">{item.dates}</span>
                </div>
                <div className="education-icon">🎓</div>
              </div>
              <div className="education-content">
                <ul className="achievement-list">
                  {item.bullets.map((b, i) => (
                    <li key={i} className="achievement-item">
                      <span className="bullet-point">•</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Education;


