import React, { useEffect, useMemo, useState } from 'react';
import fallback from '../data/blogs.json';
import { fetchMediumFeed } from '../utils/medium';

export type BlogPost = {
  title: string;
  link: string;
  pubDate: string;
  excerpt: string;
};

const Blogs: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const cachedKey = useMemo(() => 'blogs_cache_v1', []);

  useEffect(() => {
    const run = async () => {
      try {
        const cached = sessionStorage.getItem(cachedKey);
        if (cached) {
          setPosts(JSON.parse(cached));
          setLoading(false);
          return;
        }

        const apiPosts = await fetchMediumFeed();
        if (apiPosts && apiPosts.length > 0) {
          setPosts(apiPosts);
          sessionStorage.setItem(cachedKey, JSON.stringify(apiPosts));
          setLoading(false);
          return;
        }
      } catch (e) {
        setError('Could not load Medium feed. Showing sample posts.');
      }
      setPosts(fallback as BlogPost[]);
      setLoading(false);
    };
    run();
  }, [cachedKey]);

  return (
    <section className="section blogs-section" aria-labelledby="blogs-heading">
      <div className="section-header">
        <h2 id="blogs-heading">Blogs</h2>
        <div className="section-badge">Writing</div>
      </div>
      
      {loading && <div className="loading" role="status">Loading...</div>}
      {error && <p role="alert" className="error-message">{error}</p>}
      {!loading && (
        <div className="blogs-grid">
          {posts.map((post) => (
            <article key={post.link} className="blog-card">
              <div className="blog-header">
                <h3 className="blog-title">
                  <a href={post.link} target="_blank" rel="noopener noreferrer">{post.title}</a>
                </h3>
                <div className="blog-icon">✍️</div>
              </div>
              <div className="blog-content">
                <p className="blog-excerpt">{post.excerpt}</p>
                <div className="blog-meta">
                  <span className="blog-date">{new Date(post.pubDate).toLocaleDateString()}</span>
                  <a href={post.link} target="_blank" rel="noopener noreferrer" className="read-more">
                    Read More →
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};

export default Blogs;


