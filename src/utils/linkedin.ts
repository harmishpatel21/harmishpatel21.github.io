import type { ExperienceEntry } from '../components/Experience';

// PKCE helpers
async function sha256(input: string): Promise<ArrayBuffer> {
  const enc = new TextEncoder();
  return crypto.subtle.digest('SHA-256', enc.encode(input));
}

function base64UrlEncode(arrayBuffer: ArrayBuffer): string {
  const bytes = new Uint8Array(arrayBuffer);
  let str = '';
  for (let i = 0; i < bytes.length; i++) str += String.fromCharCode(bytes[i]);
  return btoa(str).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}

export async function generatePkcePair(): Promise<{ verifier: string; challenge: string }> {
  const random = crypto.getRandomValues(new Uint8Array(32));
  const verifier = base64UrlEncode(random.buffer);
  const digest = await sha256(verifier);
  const challenge = base64UrlEncode(digest);
  return { verifier, challenge };
}

export function buildLinkedInAuthUrl(state: string, codeChallenge?: string): string {
  const clientId = (import.meta.env.VITE_LINKEDIN_CLIENT_ID as string) || '';
  const redirectUri = (import.meta.env.VITE_LINKEDIN_REDIRECT_URI as string) || '';
  const scopes = (import.meta.env.VITE_LINKEDIN_SCOPES as string) || 'r_liteprofile r_emailaddress';
  if (!clientId || !redirectUri) {
    const debug = import.meta.env.VITE_DEBUG_OAUTH;
    if (debug) console.warn('LinkedIn OAuth missing config', { clientIdPresent: !!clientId, redirectUriPresent: !!redirectUri });
    return 'https://www.linkedin.com/oauth/v2/authorization';
  }
  const url = new URL('https://www.linkedin.com/oauth/v2/authorization');
  url.searchParams.set('response_type', 'code');
  url.searchParams.set('client_id', clientId);
  url.searchParams.set('redirect_uri', redirectUri);
  url.searchParams.set('scope', scopes);
  url.searchParams.set('state', state);
  if (codeChallenge) {
    url.searchParams.set('code_challenge', codeChallenge);
    url.searchParams.set('code_challenge_method', 'S256');
  }
  return url.toString();
}

export function saveToken(token: string) {
  localStorage.setItem('li_access_token', token);
}
export function getToken(): string | null {
  return localStorage.getItem('li_access_token');
}
export function clearToken() {
  localStorage.removeItem('li_access_token');
}

export function getLinkedInTokenFromUrlOrStorage(): string | null {
  const url = new URL(window.location.href);
  const fromUrl = url.searchParams.get('li_token');
  if (fromUrl) {
    localStorage.setItem('li_token', fromUrl);
    // Clean the URL
    url.searchParams.delete('li_token');
    history.replaceState({}, '', url.toString());
    return fromUrl;
  }
  const stored = localStorage.getItem('li_token');
  return stored || null;
}

export async function fetchLinkedInPositions(accessToken: string): Promise<ExperienceEntry[]> {
  try {
    const res = await fetch('https://api.linkedin.com/v2/me?projection=(positions)', {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    if (!res.ok) throw new Error('LinkedIn request failed');
    const json = await res.json();
    // NOTE: LinkedIn API shapes vary; this is a placeholder mapping.
    const items: ExperienceEntry[] = (json.positions?.values || []).map((p: any) => ({
      company: p.company?.name || 'Company',
      position: p.title || 'Role',
      dates: `${p.startDate?.month || ''}/${p.startDate?.year || ''} - ${p.isCurrent ? 'Present' : `${p.endDate?.month || ''}/${p.endDate?.year || ''}`}`,
      bullets: [p.summary || '']
    }));
    return items;
  } catch {
    return [];
  }
}

export async function fetchLinkedInProfile(accessToken: string): Promise<{ fullName: string } | null> {
  try {
    const res = await fetch('https://api.linkedin.com/v2/me?projection=(localizedFirstName,localizedLastName)', {
      headers: { Authorization: `Bearer ${accessToken}` }
    });
    if (!res.ok) throw new Error('LinkedIn request failed');
    const json = await res.json();
    const fullName = [json.localizedFirstName, json.localizedLastName].filter(Boolean).join(' ');
    return { fullName };
  } catch {
    return null;
  }
}

// If your app cannot use PKCE directly with LinkedIn, create a token proxy endpoint
// and set VITE_LINKEDIN_TOKEN_PROXY to that URL. The proxy should accept POST { code, redirect_uri }
// and return { access_token } securely using your client_secret on the server-side.
export async function exchangeCodeForToken(code: string, codeVerifier?: string): Promise<string | null> {
  const redirectUri = import.meta.env.VITE_LINKEDIN_REDIRECT_URI as string;
  const proxy = import.meta.env.VITE_LINKEDIN_TOKEN_PROXY as string | undefined;
  if (proxy) {
    try {
      const res = await fetch(proxy, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, redirect_uri: redirectUri })
      });
      if (!res.ok) throw new Error('Proxy token exchange failed');
      const json = await res.json();
      return json.access_token || null;
    } catch {
      return null;
    }
  }

  // Direct exchange (NOT RECOMMENDED in browser). Will expose client_secret in requests.
  // Use only if you accept the risk and LinkedIn allows CORS from the browser.
  const clientId = import.meta.env.VITE_LINKEDIN_CLIENT_ID as string | undefined;
  const clientSecret = (import.meta.env as any).VITE_LINKEDIN_CLIENT_SECRET || (import.meta.env as any).VITE_LINKEDIN_PRIMARY_CLIENT_SECRET;
  if (clientId && clientSecret) {
    try {
      const res = await fetch('https://www.linkedin.com/oauth/v2/accessToken', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          grant_type: 'authorization_code',
          code,
          redirect_uri: redirectUri,
          client_id: clientId,
          client_secret: clientSecret as string
        })
      });
      if (!res.ok) throw new Error('Direct token exchange failed');
      const json = await res.json();
      return json.access_token || null;
    } catch {
      return null;
    }
  }

  return null;
}

export function handleLinkedInRedirect(): Promise<string | null> {
  return new Promise(async (resolve) => {
    const url = new URL(window.location.href);
    const code = url.searchParams.get('code');
    const state = url.searchParams.get('state');
    if (!code || !state) return resolve(null);
    const expected = sessionStorage.getItem('li_oauth_state');
    const verifier = sessionStorage.getItem('li_pkce_verifier') || undefined;
    if (expected && state !== expected) return resolve(null);

    const token = await exchangeCodeForToken(code, verifier);
    if (token) saveToken(token);

    // Clean query params
    url.searchParams.delete('code');
    url.searchParams.delete('state');
    history.replaceState({}, '', url.toString());

    resolve(token);
  });
}

export async function startLinkedInLogin() {
  const state = Math.random().toString(36).slice(2);
  sessionStorage.setItem('li_oauth_state', state);
  try {
    const { verifier, challenge } = await generatePkcePair();
    sessionStorage.setItem('li_pkce_verifier', verifier);
    sessionStorage.setItem('li_login_attempted', '1');
    const authUrl = buildLinkedInAuthUrl(state, challenge);
    window.location.assign(authUrl);
  } catch {
    sessionStorage.setItem('li_login_attempted', '1');
    const authUrl = buildLinkedInAuthUrl(state);
    window.location.assign(authUrl);
  }
}


