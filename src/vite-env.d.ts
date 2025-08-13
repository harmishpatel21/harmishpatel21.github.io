/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_GITHUB_TOKEN?: string;
	readonly VITE_GITHUB_USERNAME?: string;
	readonly VITE_MEDIUM_USERNAME?: string;
	readonly VITE_MEDIUM_PROXY?: string;
	readonly VITE_BASE?: string;
    readonly VITE_LINKEDIN_CLIENT_ID?: string;
    readonly VITE_LINKEDIN_REDIRECT_URI?: string;
    readonly VITE_LINKEDIN_SCOPES?: string;
    readonly VITE_LINKEDIN_TOKEN_PROXY?: string;
    readonly VITE_LINKEDIN_CLIENT_SECRET?: string; // WARNING: Not recommended to expose in browser
    readonly VITE_LINKEDIN_PRIMARY_CLIENT_SECRET?: string; // alias if used
    readonly VITE_DEBUG_OAUTH?: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}


