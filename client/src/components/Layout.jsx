import React from 'react';
import { Link, useLocation, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ProfileDropdown from './ProfileDropdown';
import './Layout.css';

export default function Layout({ darkMode, toggleTheme }) {
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  const isHomePage = location.pathname === '/';

  return (
    <div className="app">
      <header className={`app-header ${isHomePage ? 'home-header' : ''}`}>
        <div className="header-content">
          <Link to={isAuthenticated ? "/tasks" : "/"} className="header-brand">
            <h1 className="app-title">DayMate</h1>
            {!isHomePage && (
              <p className="app-subtitle">Organize your day, accomplish your goals</p>
            )}
          </Link>
          
          <nav className="main-nav">
            {!isAuthenticated && (
              <Link 
                to="/" 
                className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
              >
                Home
              </Link>
            )}
            
            {isAuthenticated ? (
              <Link 
                to="/tasks" 
                className={`nav-link ${location.pathname === '/tasks' ? 'active' : ''}`}
              >
                Tasks
              </Link>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className={`nav-link ${location.pathname === '/login' ? 'active' : ''}`}
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className={`nav-link ${location.pathname === '/register' ? 'active' : ''}`}
                >
                  Register
                </Link>
              </>
            )}
          </nav>

          <div className="header-actions">
            {isAuthenticated && <ProfileDropdown />}
            <button 
              onClick={toggleTheme}
              className="theme-toggle btn-secondary"
              title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {darkMode ? "☀️" : "🌙"}
            </button>
          </div>
        </div>
      </header>

      <Outlet />
    </div>
  );
}