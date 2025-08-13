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
    <section className="section" aria-labelledby="experience-heading">
      <h2 id="experience-heading">Experience</h2>
      {loading && <div className="loading" role="status">Loading...</div>}
      {error && <p role="alert">{error}</p>}
      {!loading && (
        <div className="timeline" aria-label="Career timeline">
          {entries.map((item, idx) => (
            <div className="timeline-item" key={`${item.company}-${idx}`}>
              <h3><strong>{item.company}</strong></h3>
              <p><em>{item.position}</em></p>
              <p>{item.dates}</p>
              <ul>
                {item.bullets.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
      {/* LinkedIn fetching disabled per request. */}
    </section>
  );
};

export default Experience;


