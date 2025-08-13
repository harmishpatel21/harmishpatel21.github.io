import React, { useEffect, useMemo, useState } from 'react';
import fallback from '../data/projects.json';
import { fetchPinnedRepos } from '../utils/github';

export type Project = {
  name: string;
  description: string;
  url: string;
  techStack: string[];
};

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const cachedKey = useMemo(() => 'projects_cache_v1', []);

  useEffect(() => {
    const run = async () => {
      try {
        const cached = sessionStorage.getItem(cachedKey);
        if (cached) {
          setProjects(JSON.parse(cached));
          setLoading(false);
          return;
        }

        const apiData = await fetchPinnedRepos();
        if (apiData && apiData.length > 0) {
          setProjects(apiData);
          sessionStorage.setItem(cachedKey, JSON.stringify(apiData));
          setLoading(false);
          return;
        }
      } catch (e) {
        setError('Could not load GitHub pinned repos. Showing sample projects.');
      }
      setProjects(fallback as Project[]);
      setLoading(false);
    };
    run();
  }, [cachedKey]);

  return (
    <section className="section" aria-labelledby="projects-heading">
      <h2 id="projects-heading">Projects</h2>
      {loading && <div className="loading" role="status">Loading...</div>}
      {error && <p role="alert">{error}</p>}
      {!loading && (
        <div className="projects-list">
          {projects.map((p) => (
            <div key={p.url} className="project-card">
              <h3><a href={p.url} target="_blank" rel="noopener noreferrer">{p.name}</a></h3>
              <p>{p.description}</p>
              <div className="tech-stack">
                {p.techStack.map((t, idx) => (
                  <span className="tech-badge" key={`${p.name}-${t}-${idx}`}>{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Projects;


