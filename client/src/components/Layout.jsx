import React from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import './Layout.css';

export default function Layout({ darkMode, toggleTheme }) {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <div className="app">
      <header className={`app-header ${isHomePage ? 'home-header' : ''}`}>
        <div className="header-content">
          <Link to="/" className="header-brand">
            <h1 className="app-title">DayMate</h1>
            {!isHomePage && (
              <p className="app-subtitle">Organize your day, accomplish your goals</p>
            )}
          </Link>
          
          <nav className="main-nav">
            <Link 
              to="/" 
              className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
            >
              Home
            </Link>
            <Link 
              to="/tasks" 
              className={`nav-link ${location.pathname === '/tasks' ? 'active' : ''}`}
            >
              Tasks
            </Link>
          </nav>

          <button 
            onClick={toggleTheme}
            className="theme-toggle btn-secondary"
            title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {darkMode ? "☀️" : "🌙"}
          </button>
        </div>
      </header>

      <Outlet />
    </div>
  );
}