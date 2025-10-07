import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import './Profile.css';

export default function Profile() {
  const { user } = useAuth();
  const { getCurrentTheme, setTheme } = useTheme();
  
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    bio: '',
    timezone: 'UTC',
    notifications: true,
    theme: getCurrentTheme()
  });
  const [isLoading, setIsLoading] = useState(false);

  // Update form data when theme changes externally
  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      theme: getCurrentTheme()
    }));
  }, [getCurrentTheme]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: newValue
    }));

    // Apply theme change immediately
    if (name === 'theme') {
      setTheme(value);
    }
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      // TODO: Implement actual API call
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      console.log('Saving profile:', formData);
      
      // Update localStorage for demo purposes
      const updatedUser = { ...user, ...formData };
      localStorage.setItem('userData', JSON.stringify(updatedUser));
      
      alert('Profile updated successfully!');
    } catch (error) {
      alert('Failed to update profile. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="profile-page">
      <div className="profile-container">
        <div className="profile-header">
          <div className="profile-avatar-large">
            {getInitials(formData.name)}
          </div>
          <div className="profile-header-info">
            <h1 className="profile-title">{formData.name}</h1>
            <p className="profile-subtitle">{formData.email}</p>
            <div className="profile-stats-mini">
              <span className="mini-stat">
                <strong>0</strong> tasks completed
              </span>
              <span className="mini-stat">
                <strong>0</strong> active tasks
              </span>
            </div>
          </div>
        </div>

        <div className="profile-content">
          <div className="profile-section">
            <div className="form-grid-compact">
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="Enter your full name"
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="Enter your email"
                />
              </div>
              <div className="form-group">
                <label htmlFor="timezone">Timezone</label>
                <select
                  id="timezone"
                  name="timezone"
                  value={formData.timezone}
                  onChange={handleInputChange}
                  className="form-select"
                >
                  <option value="UTC">UTC</option>
                  <option value="America/New_York">Eastern Time</option>
                  <option value="America/Chicago">Central Time</option>
                  <option value="America/Denver">Mountain Time</option>
                  <option value="America/Los_Angeles">Pacific Time</option>
                  <option value="Europe/London">London</option>
                  <option value="Europe/Paris">Paris</option>
                  <option value="Asia/Tokyo">Tokyo</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="theme">Theme Preference</label>
                <select
                  id="theme"
                  name="theme"
                  value={formData.theme}
                  onChange={handleInputChange}
                  className="form-select"
                >
                  <option value="dark">Dark Mode</option>
                  <option value="light">Light Mode</option>
                  <option value="auto">System Default</option>
                </select>
              </div>
              <div className="form-group form-group-full">
                <label htmlFor="bio">About Me</label>
                <textarea
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  className="form-textarea"
                  placeholder="Tell us about yourself..."
                  rows="3"
                />
              </div>
              <div className="form-group form-group-full">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="notifications"
                    checked={formData.notifications}
                    onChange={handleInputChange}
                    className="form-checkbox"
                  />
                  <span className="checkbox-text">
                    <strong>Email Notifications</strong> - Receive updates about your tasks
                  </span>
                </label>
              </div>
            </div>

            <div className="profile-actions">
              <button 
                className="btn btn-primary" 
                onClick={handleSave}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="loading-spinner"></span>
                    Saving...
                  </>
                ) : (
                  'Save Changes'
                )}
              </button>
              <button className="btn btn-secondary" onClick={() => window.history.back()}>
                Go Back
              </button>
            </div>
          </div>

          <div className="quick-stats">
            <h3 className="stats-title">Quick Stats</h3>
            <div className="stats-grid-compact">
              <div className="stat-card-compact">
                <div className="stat-number">0</div>
                <div className="stat-label">Completed</div>
              </div>
              <div className="stat-card-compact">
                <div className="stat-number">0</div>
                <div className="stat-label">Active</div>
              </div>
              <div className="stat-card-compact">
                <div className="stat-number">0</div>
                <div className="stat-label">Days Streak</div>
              </div>
              <div className="stat-card-compact">
                <div className="stat-number">0%</div>
                <div className="stat-label">Efficiency</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}