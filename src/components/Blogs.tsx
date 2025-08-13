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
    <section className="section" aria-labelledby="blogs-heading">
      <h2 id="blogs-heading">Blogs</h2>
      {loading && <div className="loading" role="status">Loading...</div>}
      {error && <p role="alert">{error}</p>}
      {!loading && (
        <div className="blogs-list">
          {posts.map((post) => (
            <article key={post.link} className="blog-post">
              <h3><a href={post.link} target="_blank" rel="noopener noreferrer">{post.title}</a></h3>
              {/* <p><small>{new Date(post.pubDate).toLocaleDateString()}</small></p> */}
              <p>{post.excerpt}</p>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};

export default Blogs;


