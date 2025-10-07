import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import './Settings.css';

export default function Settings() {
  const { user } = useAuth();
  const [settings, setSettings] = useState({
    // Appearance
    theme: 'dark',
    language: 'en',
    fontSize: 'medium',
    animations: true,
    
    // Notifications
    emailNotifications: true,
    pushNotifications: true,
    taskReminders: true,
    weeklyDigest: true,
    
    // Privacy
    profileVisibility: 'private',
    dataCollection: false,
    analytics: true,
    
    // Task Management
    defaultPriority: 'medium',
    autoArchive: true,
    showCompleted: true,
    sortBy: 'created',
    
    // Advanced
    experimentalFeatures: false,
    debugMode: false,
    autoSave: true
  });

  const [activeSection, setActiveSection] = useState('appearance');

  const handleSettingChange = (setting, value) => {
    setSettings(prev => ({
      ...prev,
      [setting]: value
    }));
  };

  const handleSaveSettings = () => {
    // TODO: Implement settings save API call
    console.log('Saving settings:', settings);
    alert('Settings saved successfully!');
  };

  const handleResetSettings = () => {
    if (window.confirm('Are you sure you want to reset all settings to default?')) {
      setSettings({
        theme: 'dark',
        language: 'en',
        fontSize: 'medium',
        animations: true,
        emailNotifications: true,
        pushNotifications: true,
        taskReminders: true,
        weeklyDigest: true,
        profileVisibility: 'private',
        dataCollection: false,
        analytics: true,
        defaultPriority: 'medium',
        autoArchive: true,
        showCompleted: true,
        sortBy: 'created',
        experimentalFeatures: false,
        debugMode: false,
        autoSave: true
      });
    }
  };

  const settingSections = [
    {
      id: 'appearance',
      title: 'Appearance',
      icon: '🎨',
      settings: [
        {
          id: 'theme',
          label: 'Theme',
          type: 'select',
          options: [
            { value: 'dark', label: 'Dark' },
            { value: 'light', label: 'Light' },
            { value: 'auto', label: 'System' }
          ]
        },
        {
          id: 'language',
          label: 'Language',
          type: 'select',
          options: [
            { value: 'en', label: 'English' },
            { value: 'es', label: 'Spanish' },
            { value: 'fr', label: 'French' },
            { value: 'de', label: 'German' }
          ]
        },
        {
          id: 'fontSize',
          label: 'Font Size',
          type: 'select',
          options: [
            { value: 'small', label: 'Small' },
            { value: 'medium', label: 'Medium' },
            { value: 'large', label: 'Large' }
          ]
        },
        {
          id: 'animations',
          label: 'Enable Animations',
          type: 'toggle'
        }
      ]
    },
    {
      id: 'notifications',
      title: 'Notifications',
      icon: '🔔',
      settings: [
        {
          id: 'emailNotifications',
          label: 'Email Notifications',
          type: 'toggle'
        },
        {
          id: 'pushNotifications',
          label: 'Push Notifications',
          type: 'toggle'
        },
        {
          id: 'taskReminders',
          label: 'Task Reminders',
          type: 'toggle'
        },
        {
          id: 'weeklyDigest',
          label: 'Weekly Digest',
          type: 'toggle'
        }
      ]
    },
    {
      id: 'privacy',
      title: 'Privacy & Security',
      icon: '🔒',
      settings: [
        {
          id: 'profileVisibility',
          label: 'Profile Visibility',
          type: 'select',
          options: [
            { value: 'public', label: 'Public' },
            { value: 'private', label: 'Private' }
          ]
        },
        {
          id: 'dataCollection',
          label: 'Allow Data Collection',
          type: 'toggle'
        },
        {
          id: 'analytics',
          label: 'Usage Analytics',
          type: 'toggle'
        }
      ]
    },
    {
      id: 'tasks',
      title: 'Task Management',
      icon: '✅',
      settings: [
        {
          id: 'defaultPriority',
          label: 'Default Priority',
          type: 'select',
          options: [
            { value: 'low', label: 'Low' },
            { value: 'medium', label: 'Medium' },
            { value: 'high', label: 'High' }
          ]
        },
        {
          id: 'autoArchive',
          label: 'Auto-archive Completed Tasks',
          type: 'toggle'
        },
        {
          id: 'showCompleted',
          label: 'Show Completed Tasks',
          type: 'toggle'
        },
        {
          id: 'sortBy',
          label: 'Default Sort Order',
          type: 'select',
          options: [
            { value: 'created', label: 'Date Created' },
            { value: 'priority', label: 'Priority' },
            { value: 'due', label: 'Due Date' },
            { value: 'alphabetical', label: 'Alphabetical' }
          ]
        }
      ]
    },
    {
      id: 'advanced',
      title: 'Advanced',
      icon: '⚙️',
      settings: [
        {
          id: 'experimentalFeatures',
          label: 'Enable Experimental Features',
          type: 'toggle'
        },
        {
          id: 'debugMode',
          label: 'Debug Mode',
          type: 'toggle'
        },
        {
          id: 'autoSave',
          label: 'Auto-save Changes',
          type: 'toggle'
        }
      ]
    }
  ];

  return (
    <div className="settings-page">
      <div className="settings-container">
        <div className="settings-header">
          <h1 className="settings-title">Settings</h1>
          <p className="settings-subtitle">Customize your DayMate experience</p>
        </div>

        <div className="settings-content">
          <div className="settings-sidebar">
            {settingSections.map(section => (
              <button
                key={section.id}
                className={`settings-nav-item ${activeSection === section.id ? 'active' : ''}`}
                onClick={() => setActiveSection(section.id)}
              >
                <span className="settings-nav-icon">{section.icon}</span>
                <span className="settings-nav-text">{section.title}</span>
              </button>
            ))}
          </div>

          <div className="settings-main">
            {settingSections.map(section => (
              activeSection === section.id && (
                <div key={section.id} className="settings-section">
                  <h2 className="section-title">
                    <span className="section-icon">{section.icon}</span>
                    {section.title}
                  </h2>
                  
                  <div className="settings-list">
                    {section.settings.map(setting => (
                      <div key={setting.id} className="setting-item">
                        <div className="setting-info">
                          <label className="setting-label">{setting.label}</label>
                        </div>
                        <div className="setting-control">
                          {setting.type === 'toggle' && (
                            <label className="toggle">
                              <input
                                type="checkbox"
                                checked={settings[setting.id]}
                                onChange={(e) => handleSettingChange(setting.id, e.target.checked)}
                              />
                              <span className="toggle-slider"></span>
                            </label>
                          )}
                          {setting.type === 'select' && (
                            <select
                              value={settings[setting.id]}
                              onChange={(e) => handleSettingChange(setting.id, e.target.value)}
                              className="setting-select"
                            >
                              {setting.options.map(option => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </select>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            ))}
            
            <div className="settings-actions">
              <button className="btn btn-primary" onClick={handleSaveSettings}>
                Save Settings
              </button>
              <button className="btn btn-secondary" onClick={handleResetSettings}>
                Reset to Defaults
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}