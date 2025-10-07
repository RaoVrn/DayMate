import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

export default function Home() {
  const currentDate = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  const features = [
    {
      icon: "✅",
      title: "Simple Task Management",
      description: "Create and track tasks with priorities and categories"
    },
    {
      icon: "�",
      title: "Smart Search",
      description: "Find any task instantly with built-in search"
    },
    {
      icon: "🌙",
      title: "Dark Theme",
      description: "ChatGPT-style interface that's easy on your eyes"
    }
  ];

  return (
    <div className="home">
      <div className="home-hero">
        <div className="hero-content">
          <h1 className="hero-title">
            Welcome to <span className="brand-highlight">DayMate</span>
          </h1>
          <p className="hero-subtitle">
            Your personal productivity companion for organizing your day and accomplishing your goals
          </p>
          <p className="hero-date">{currentDate}</p>
          
          <div className="hero-actions">
            <Link to="/tasks" className="btn-primary btn-large">
              Get Started
            </Link>
            <a href="#features" className="btn-secondary btn-large">
              Learn More
            </a>
          </div>
        </div>
        
        <div className="hero-visual">
          <div className="floating-tasks">
            <div className="task-card">
              <div className="task-check">✅</div>
              <div className="task-content">
                <div className="task-title">Complete project proposal</div>
                <div className="task-meta">Work • High Priority</div>
              </div>
            </div>
            <div className="task-card">
              <div className="task-check">⭕</div>
              <div className="task-content">
                <div className="task-title">Morning workout</div>
                <div className="task-meta">Health • Medium Priority</div>
              </div>
            </div>
            <div className="task-card">
              <div className="task-check">⭕</div>
              <div className="task-content">
                <div className="task-title">Grocery shopping</div>
                <div className="task-meta">Personal • Low Priority</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section id="features" className="home-features">
        <div className="container">
          <h2 className="section-title">Built for Productivity</h2>
          <p className="section-subtitle">
            Everything you need to organize your day effectively
          </p>
          
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="home-cta">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Ready to organize your day?</h2>
            <p className="cta-subtitle">
              Start managing your tasks more effectively with DayMate
            </p>
            <Link to="/tasks" className="btn-primary btn-large">
              Start Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}