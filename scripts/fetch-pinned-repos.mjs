// Fetch pinned repositories for a GitHub user and write a static JSON file
// to public/data/pinned.json so the client can load it without exposing tokens.

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const username = process.env.PINNED_REPOS_USERNAME || process.env.VITE_GITHUB_USERNAME || '';
const token = process.env.PINNED_REPOS_TOKEN || process.env.GITHUB_TOKEN || '';

if (!username) {
  console.log('[fetch-pinned-repos] No username provided. Skipping.');
  process.exit(0);
}

const query = `
  query($login: String!) {
    user(login: $login) {
      pinnedItems(first: 6, types: REPOSITORY) {
        nodes {
          ... on Repository {
            name
            description
            url
            primaryLanguage { name }
          }
        }
      }
    }
  }
`;

async function run() {
  try {
    const res = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {})
      },
      body: JSON.stringify({ query, variables: { login: username } })
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`GitHub GraphQL request failed: ${res.status} ${res.statusText} - ${errText}`);
    }

    const json = await res.json();
    const nodes = json?.data?.user?.pinnedItems?.nodes || [];
    const projects = nodes.map((n) => ({
      name: n.name,
      description: n.description || '',
      url: n.url,
      techStack: n.primaryLanguage?.name ? [n.primaryLanguage.name] : []
    }));

    const outDir = path.resolve(__dirname, '../public/data');
    await fs.mkdir(outDir, { recursive: true });
    const outPath = path.join(outDir, 'pinned.json');
    await fs.writeFile(outPath, JSON.stringify(projects, null, 2), 'utf8');
    console.log(`[fetch-pinned-repos] Wrote ${projects.length} projects to ${outPath}`);
  } catch (err) {
    console.warn('[fetch-pinned-repos] Failed, proceeding without pinned.json:', err.message || err);
    process.exit(0);
  }
}

run();


