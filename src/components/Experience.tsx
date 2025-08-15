import React, { useEffect, useMemo, useState } from 'react';
import fallback from '../data/experience.json';

export type ExperienceEntry = {
  company: string;
  position: string;
  dates: string;
  bullets: string[];
};

const Experience: React.FC = () => {
  const [entries, setEntries] = useState<ExperienceEntry[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const cachedKey = useMemo(() => 'experience_cache_v1', []);

  useEffect(() => {
    // Simplified: always load from local JSON
    try {
      const cached = sessionStorage.getItem(cachedKey);
      if (cached) {
        setEntries(JSON.parse(cached));
        setLoading(false);
        return;
      }
      setEntries(fallback as ExperienceEntry[]);
      sessionStorage.setItem(cachedKey, JSON.stringify(fallback));
      setLoading(false);
    } catch (e) {
      setError('Failed to load experience entries.');
      setLoading(false);
    }
  }, [cachedKey]);

  return (
    <section className="section experience-section" aria-labelledby="experience-heading">
      <div className="section-header">
        <h2 id="experience-heading">Experience</h2>
        <div className="section-badge">Career Journey</div>
      </div>
      
      {loading && <div className="loading" role="status">Loading...</div>}
      {error && <p role="alert" className="error-message">{error}</p>}
      {!loading && (
        <div className="experience-grid" aria-label="Career timeline">
          {entries.map((item, idx) => (
            <div className="experience-card" key={`${item.company}-${idx}`}>
              <div className="experience-header">
                <div className="company-info">
                  <h3 className="company-name">{item.company}</h3>
                  <p className="position-title">{item.position}</p>
                  <span className="dates">{item.dates}</span>
                </div>
                <div className="experience-icon">💼</div>
              </div>
              <div className="experience-content">
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
      {/* LinkedIn fetching disabled per request. */}
    </section>
  );
};

export default Experience;


