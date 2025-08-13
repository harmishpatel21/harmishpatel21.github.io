import type { Project } from '../components/Projects';

type PinnedRepo = {
  name: string;
  description: string | null;
  url: string;
  primaryLanguage?: { name: string } | null;
};

export async function fetchPinnedRepos(): Promise<Project[]> {
  // Runtime GitHub API if a token is available (dev/local or if you choose to ship a token)
  const token = import.meta.env.VITE_GITHUB_TOKEN || localStorage.getItem('gh_token');
  const username = import.meta.env.VITE_GITHUB_USERNAME || '';
  if (!token) return [];

  const query = username
    ? `query { user(login: "${username}") { pinnedItems(first: 6, types: REPOSITORY) { nodes { ... on Repository { name description url primaryLanguage { name } } } } } }`
    : `query { viewer { pinnedItems(first: 6, types: REPOSITORY) { nodes { ... on Repository { name description url primaryLanguage { name } } } } } }`;

  try {
    const res = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ query })
    });
    if (!res.ok) throw new Error('GitHub GraphQL failed');
    const json = await res.json();
    const nodes: PinnedRepo[] = (json.data?.viewer?.pinnedItems?.nodes || json.data?.user?.pinnedItems?.nodes || []) as PinnedRepo[];
    return nodes.map((n) => ({
      name: n.name,
      description: n.description || '',
      url: n.url,
      techStack: n.primaryLanguage?.name ? [n.primaryLanguage.name] : []
    }));
  } catch {
    return [];
  }
}


