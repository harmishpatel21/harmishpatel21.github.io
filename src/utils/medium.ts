import type { BlogPost } from '../components/Blogs';

function sanitizeUsername(raw?: string): string | null {
  if (!raw) return null;
  return raw.startsWith('@') ? raw.substring(1) : raw;
}

export async function fetchMediumFeed(): Promise<BlogPost[]> {
  const userFromEnv = import.meta.env.VITE_MEDIUM_USERNAME as string | undefined;
  const username = sanitizeUsername(userFromEnv || localStorage.getItem('medium_username') || undefined);
  if (!username) return [];

  const feedUrl = `https://medium.com/feed/@${username}`;
  const proxy = import.meta.env.VITE_MEDIUM_PROXY as string | undefined;
  const urlToFetch = proxy ? `${proxy}?rss=${encodeURIComponent(feedUrl)}` : feedUrl;

  try {
    const res = await fetch(urlToFetch, { headers: { 'User-Agent': 'Mozilla/5.0' } });
    if (!res.ok) throw new Error('Medium RSS failed');
    const xml = await res.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(xml, 'application/xml');
    const items = Array.from(doc.querySelectorAll('item'));
    return items.slice(0, 10).map((item) => ({
      title: item.querySelector('title')?.textContent || 'Untitled',
      link: item.querySelector('link')?.textContent || '#',
      pubDate: item.querySelector('pubDate')?.textContent || new Date().toISOString(),
      excerpt: (item.querySelector('description')?.textContent || '').replace(/<[^>]*>/g, '').slice(0, 200)
    }));
  } catch {
    // If proxy was used and failed, try direct as a fallback
    if (proxy) {
      try {
        const res = await fetch(feedUrl);
        if (!res.ok) throw new Error('Medium RSS direct failed');
        const xml = await res.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(xml, 'application/xml');
        const items = Array.from(doc.querySelectorAll('item'));
        return items.slice(0, 10).map((item) => ({
          title: item.querySelector('title')?.textContent || 'Untitled',
          link: item.querySelector('link')?.textContent || '#',
          pubDate: item.querySelector('pubDate')?.textContent || new Date().toISOString(),
          excerpt: (item.querySelector('description')?.textContent || '').replace(/<[^>]*>/g, '').slice(0, 200)
        }));
      } catch {
        return [];
      }
    }
    return [];
  }
}


