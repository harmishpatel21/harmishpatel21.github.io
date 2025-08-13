import React from 'react';
import profilePhoto from '../assets/images/Harmish Patel.jpeg';
import { NavLink } from 'react-router-dom';

type ThemeName = 'light' | 'dark';

export type NavItem = { to: string; label: string };

type SidebarProps = {
  theme: ThemeName;
  onToggleTheme: () => void;
  navItems: NavItem[];
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
};

const Sidebar: React.FC<SidebarProps> = ({ theme, onToggleTheme, navItems, mobileMenuOpen, setMobileMenuOpen }) => {
  const githubUsername = (import.meta.env.VITE_GITHUB_USERNAME as string) || 'username';
  const linkedinUsername = (import.meta.env.VITE_LINKEDIN_USERNAME as string) || 'username';
  const githubUrl = `https://github.com/${githubUsername}`;
  const linkedinUrl = `https://linkedin.com/in/${linkedinUsername}`;
  const rawMedium = (import.meta.env.VITE_MEDIUM_USERNAME as string) || 'username';
  const mediumHandle = rawMedium.startsWith('@') ? rawMedium : `@${rawMedium}`;
  const mediumUrl = `https://medium.com/${mediumHandle}`;
  return (
    <aside className="sidebar" aria-label="Sidebar">
      <div className="profile">
        <img src={profilePhoto} alt="Profile photo of Harmish Patel" width={100} height={100} />
        <h1>Harmish Patel</h1>
        <p>Senior AI Data Scientist</p>
      </div>

      <div className="hamburger" aria-hidden={false}>
        <button aria-expanded={mobileMenuOpen} aria-controls="primary-navigation" aria-label="Toggle navigation" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <rect x="3" y="6" width="18" height="2" fill="currentColor"/>
            <rect x="3" y="11" width="18" height="2" fill="currentColor"/>
            <rect x="3" y="16" width="18" height="2" fill="currentColor"/>
          </svg>
        </button>
      </div>

      <nav id="primary-navigation" className={`nav ${mobileMenuOpen ? 'open' : ''}`} aria-label="Primary">
        {navItems.map((item) => (
          <NavLink key={item.to} to={item.to} end={item.to === '/'}>
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-bottom">
        <div className="controls-row">
          <button className="icon-button theme-toggle" onClick={onToggleTheme} aria-label="Toggle Dark Mode">
            {theme === 'light' ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M6.76 4.84l-1.8-1.79-1.41 1.41 1.79 1.8 1.42-1.42zM1 13h3v-2H1v2zm10 10h2v-3h-2v3zm7.04-3.96l1.79 1.8 1.41-1.41-1.8-1.79-1.4 1.4zM20 11v2h3v-2h-3zm-8-9h2V-1h-2v3zm-7.04 3.04l1.4-1.4-1.79-1.8-1.41 1.41 1.8 1.79zM12 6a6 6 0 100 12 6 6 0 000-12z"/></svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M21.64 13.65A9 9 0 1110.35 2.36 7 7 0 0021.64 13.65z"/></svg>
            )}
          </button>
          <a className="icon-button" href={githubUrl} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .5a12 12 0 0 0-3.79 23.4c.6.1.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.38-1.34-1.74-1.34-1.74-1.1-.75.09-.74.09-.74 1.22.08 1.86 1.25 1.86 1.25 1.08 1.86 2.83 1.33 3.52 1.02.11-.79.42-1.33.76-1.63-2.67-.3-5.47-1.34-5.47-5.98 0-1.32.47-2.4 1.24-3.25-.12-.3-.54-1.52.12-3.18 0 0 1-.32 3.3 1.24a11.4 11.4 0 0 1 6 0c2.3-1.56 3.3-1.24 3.3-1.24.66 1.66.24 2.88.12 3.18.77.85 1.24 1.93 1.24 3.25 0 4.65-2.8 5.67-5.48 5.97.43.37.81 1.1.81 2.23v3.3c0 .32.21.69.82.58A12 12 0 0 0 12 .5Z"/></svg>
          </a>
          <a className="icon-button" href={linkedinUrl} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.226.792 24 1.771 24h20.454C23.204 24 24 23.226 24 22.271V1.729C24 .774 23.204 0 22.225 0zM7.06 20.452H3.877V9h3.183v11.452zM5.47 7.433a1.843 1.843 0 110-3.686 1.843 1.843 0 010 3.686zM20.452 20.452h-3.183v-5.569c0-1.33-.027-3.039-1.852-3.039-1.853 0-2.136 1.448-2.136 2.944v5.664H10.1V9h3.056v1.561h.043c.425-.804 1.463-1.65 3.011-1.65 3.22 0 3.8 2.12 3.8 4.877v6.664z"/></svg>
          </a>
          <a className="icon-button" href={mediumUrl} target="_blank" rel="noopener noreferrer" aria-label="Medium">
            <svg width="24" height="24" viewBox="0 0 104 88" fill="currentColor" aria-hidden="true" focusable="false">
              <circle cx="34" cy="44" r="28" />
              <ellipse cx="72" cy="44" rx="18" ry="28" />
              <ellipse cx="96" cy="44" rx="8" ry="28" />
            </svg>
          </a>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;


