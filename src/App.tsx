import React, { Suspense, useEffect, useMemo, useState } from 'react';
import { NavLink, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
const Summary = React.lazy(() => import('./components/Summary'));
const Experience = React.lazy(() => import('./components/Experience'));
const Projects = React.lazy(() => import('./components/Projects'));
const Education = React.lazy(() => import('./components/Education'));
const Blogs = React.lazy(() => import('./components/Blogs'));

type ThemeName = 'light' | 'dark';

const App: React.FC = () => {
  const [theme, setTheme] = useState<ThemeName>('light');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const stored = localStorage.getItem('theme') as ThemeName | null;
    if (stored) setTheme(stored);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

  const navItems = useMemo(
    () => [
      { to: '/', label: 'Summary' },
      { to: '/experience', label: 'Experience' },
      { to: '/projects', label: 'Projects' },
      { to: '/education', label: 'Education' },
      { to: '/blogs', label: 'Blogs' }
    ],
    []
  );

  return (
    <div className="layout">
      <Sidebar
        theme={theme}
        onToggleTheme={toggleTheme}
        navItems={navItems}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />
      <main id="main" className="content" aria-live="polite" aria-busy="false">
        <Suspense fallback={<div className="loading" role="status">Loading...</div>}>
          <Routes>
            <Route path="/" element={<Summary />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/education" element={<Education />} />
          </Routes>
        </Suspense>
      </main>
    </div>
  );
};

export default App;


