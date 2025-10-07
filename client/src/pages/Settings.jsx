import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import './Settings.css';

export default function Settings() {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  
  // Get current theme from document
  const getCurrentTheme = () => {
    const isDark = !document.documentElement.hasAttribute('data-theme');
    return isDark ? 'dark' : 'light';
  };

  const [settings, setSettings] = useState({
    // Appearance
    theme: getCurrentTheme(),
    language: 'en',
    fontSize: 'medium',
    animations: true,
    
    // Notifications
    emailNotifications: true,
    taskReminders: true,
    
    // Task Management
    defaultPriority: 'medium',
    autoArchive: true,
    showCompleted: true,
    
    // Privacy
    dataCollection: false,
    autoSave: true
  });

  const handleSettingChange = (setting, value) => {
    setSettings(prev => ({
      ...prev,
      [setting]: value
    }));

    // Apply theme change immediately
    if (setting === 'theme') {
      applyTheme(value);
    }
  };

  const applyTheme = (theme) => {
    if (theme === 'dark') {
      document.documentElement.removeAttribute('data-theme');
    } else if (theme === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
    }
    
    // Save to localStorage
    localStorage.setItem('theme', theme);
  };

  const handleSaveSettings = async () => {
    setIsLoading(true);
    try {
      // Save to localStorage for persistence
      localStorage.setItem('userSettings', JSON.stringify(settings));
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      alert('Settings saved successfully!');
    } catch (error) {
      alert('Failed to save settings. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetSettings = () => {
    if (window.confirm('Are you sure you want to reset all settings to default?')) {
      const defaultSettings = {
        theme: 'dark',
        language: 'en',
        fontSize: 'medium',
        animations: true,
        emailNotifications: true,
        taskReminders: true,
        defaultPriority: 'medium',
        autoArchive: true,
        showCompleted: true,
        dataCollection: false,
        autoSave: true
      };
      setSettings(defaultSettings);
      applyTheme('dark');
    }
  };

  // Load saved settings on mount
  useEffect(() => {
    const savedSettings = localStorage.getItem('userSettings');
    if (savedSettings) {
      const parsed = JSON.parse(savedSettings);
      setSettings(prev => ({ ...prev, ...parsed }));
      if (parsed.theme) {
        applyTheme(parsed.theme);
      }
    }
  }, []);

  return (
    <div className="settings-page">
      <div className="settings-container">
        <div className="settings-header">
          <h1 className="settings-title">Settings</h1>
          <p className="settings-subtitle">Customize your DayMate experience</p>
        </div>

        <div className="settings-content-compact">
          <div className="settings-section-compact">
            <h2 className="section-title-compact">
              <span className="section-icon">🎨</span>
              Appearance
            </h2>
            
            <div className="settings-grid">
              <div className="setting-item-compact">
                <label className="setting-label">Theme</label>
                <select
                  value={settings.theme}
                  onChange={(e) => handleSettingChange('theme', e.target.value)}
                  className="setting-select"
                >
                  <option value="dark">Dark</option>
                  <option value="light">Light</option>
                </select>
              </div>

              <div className="setting-item-compact">
                <label className="setting-label">Language</label>
                <select
                  value={settings.language}
                  onChange={(e) => handleSettingChange('language', e.target.value)}
                  className="setting-select"
                >
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                  <option value="de">German</option>
                </select>
              </div>

              <div className="setting-item-compact">
                <label className="setting-label">Font Size</label>
                <select
                  value={settings.fontSize}
                  onChange={(e) => handleSettingChange('fontSize', e.target.value)}
                  className="setting-select"
                >
                  <option value="small">Small</option>
                  <option value="medium">Medium</option>
                  <option value="large">Large</option>
                </select>
              </div>

              <div className="setting-item-compact">
                <label className="setting-label">Enable Animations</label>
                <label className="toggle">
                  <input
                    type="checkbox"
                    checked={settings.animations}
                    onChange={(e) => handleSettingChange('animations', e.target.checked)}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>
            </div>
          </div>

          <div className="settings-section-compact">
            <h2 className="section-title-compact">
              <span className="section-icon">🔔</span>
              Notifications
            </h2>
            
            <div className="settings-grid">
              <div className="setting-item-compact">
                <label className="setting-label">Email Notifications</label>
                <label className="toggle">
                  <input
                    type="checkbox"
                    checked={settings.emailNotifications}
                    onChange={(e) => handleSettingChange('emailNotifications', e.target.checked)}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>

              <div className="setting-item-compact">
                <label className="setting-label">Task Reminders</label>
                <label className="toggle">
                  <input
                    type="checkbox"
                    checked={settings.taskReminders}
                    onChange={(e) => handleSettingChange('taskReminders', e.target.checked)}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>
            </div>
          </div>

          <div className="settings-section-compact">
            <h2 className="section-title-compact">
              <span className="section-icon">✅</span>
              Task Management
            </h2>
            
            <div className="settings-grid">
              <div className="setting-item-compact">
                <label className="setting-label">Default Priority</label>
                <select
                  value={settings.defaultPriority}
                  onChange={(e) => handleSettingChange('defaultPriority', e.target.value)}
                  className="setting-select"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              <div className="setting-item-compact">
                <label className="setting-label">Auto-archive Completed</label>
                <label className="toggle">
                  <input
                    type="checkbox"
                    checked={settings.autoArchive}
                    onChange={(e) => handleSettingChange('autoArchive', e.target.checked)}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>

              <div className="setting-item-compact">
                <label className="setting-label">Show Completed Tasks</label>
                <label className="toggle">
                  <input
                    type="checkbox"
                    checked={settings.showCompleted}
                    onChange={(e) => handleSettingChange('showCompleted', e.target.checked)}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>

              <div className="setting-item-compact">
                <label className="setting-label">Auto-save Changes</label>
                <label className="toggle">
                  <input
                    type="checkbox"
                    checked={settings.autoSave}
                    onChange={(e) => handleSettingChange('autoSave', e.target.checked)}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>
            </div>
          </div>

          <div className="settings-section-compact">
            <h2 className="section-title-compact">
              <span className="section-icon">🔒</span>
              Privacy & Security
            </h2>
            
            <div className="settings-grid">
              <div className="setting-item-compact">
                <label className="setting-label">Data Collection</label>
                <label className="toggle">
                  <input
                    type="checkbox"
                    checked={settings.dataCollection}
                    onChange={(e) => handleSettingChange('dataCollection', e.target.checked)}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>
            </div>
          </div>

          <div className="settings-actions">
            <button 
              className="btn btn-primary" 
              onClick={handleSaveSettings}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="loading-spinner"></span>
                  Saving...
                </>
              ) : (
                'Save Settings'
              )}
            </button>
            <button className="btn btn-secondary" onClick={handleResetSettings}>
              Reset to Defaults
            </button>
            <button className="btn btn-secondary" onClick={() => window.history.back()}>
              Go Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}