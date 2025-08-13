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
    <section className="section" aria-labelledby="education-heading">
      <h2 id="education-heading">Education</h2>
      {loading && <div className="loading" role="status">Loading...</div>}
      {!loading && (
        <div className="timeline" aria-label="Education timeline">
          {entries.map((item, idx) => (
            <div className="timeline-item" key={`${item.school}-${idx}`}>
              <h3><strong>{item.school}</strong></h3>
              <p><em>{item.degree}</em></p>
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
    </section>
  );
};

export default Education;


