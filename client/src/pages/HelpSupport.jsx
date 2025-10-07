import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import './HelpSupport.css';

export default function HelpSupport() {
  const { user } = useAuth();
  const [activeSection, setActiveSection] = useState('getting-started');
  const [expandedFAQ, setExpandedFAQ] = useState(new Set());
  const [contactForm, setContactForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    subject: '',
    message: ''
  });
  const [searchQuery, setSearchQuery] = useState('');
  const handleContactSubmit = (e) => {
    e.preventDefault();
    // Simple form submission
    alert('Thank you for your message! We\'ll get back to you soon.');
    setContactForm({
      name: user?.name || '',
      email: user?.email || '',
      subject: '',
      message: ''
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContactForm(prev => ({ ...prev, [name]: value }));
  };

  const toggleFAQ = (sectionId, questionIndex) => {
    const key = `${sectionId}-${questionIndex}`;
    const newExpanded = new Set(expandedFAQ);
    if (newExpanded.has(key)) {
      newExpanded.delete(key);
    } else {
      newExpanded.add(key);
    }
    setExpandedFAQ(newExpanded);
  };

  const helpSections = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      icon: '🚀',
      description: 'Learn the basics of using DayMate',
      content: [
        {
          question: 'How do I create my first task?',
          answer: 'Click the "Add Task" button on your dashboard, fill in the task details including title, priority, and optional due date, then click "Add Task" to save it. You can also use the quick add feature by pressing Ctrl+N.',
          tags: ['tasks', 'create', 'basics']
        },
        {
          question: 'How do I organize my tasks?',
          answer: 'You can organize tasks using categories, priorities (Low, Medium, High), and due dates. Use the filter options to view specific types of tasks. You can also use tags to create custom groupings.',
          tags: ['organize', 'categories', 'priorities']
        },
        {
          question: 'Can I edit or delete tasks?',
          answer: 'Yes! Click on any task to edit its details, or use the delete option to remove completed or unwanted tasks. You can also bulk select multiple tasks for batch operations.',
          tags: ['edit', 'delete', 'manage']
        },

      ]
    },
    {
      id: 'account',
      title: 'Account Management',
      icon: '👤',
      description: 'Manage your profile and account settings',
      content: [
        {
          question: 'How do I change my password?',
          answer: 'Go to Settings > Profile, then click "Change Password". You\'ll need to enter your current password and your new password twice. Make sure your new password is at least 8 characters long.',
          tags: ['password', 'security', 'profile']
        },
        {
          question: 'How do I update my profile information?',
          answer: 'Navigate to your Profile page and click "Edit Profile". You can update your name, email, bio, and preferences. Changes are saved automatically.',
          tags: ['profile', 'edit', 'personal info']
        },

      ]
    },
    {
      id: 'features',
      title: 'Features & Tips',
      icon: '✨',
      description: 'Discover advanced features and productivity tips',
      content: [
        {
          question: 'What are the different priority levels?',
          answer: 'Low priority (🟢) for non-urgent tasks, Medium (🟡) for regular tasks, and High (🔴) for urgent or important tasks. Use colors to quickly identify priority levels. You can filter by priority to focus on what matters most.',
          tags: ['priority', 'organization', 'colors']
        },
        {
          question: 'Can I set reminders for my tasks?',
          answer: 'Yes! When creating or editing a task, you can set a due date and time. Enable notifications in Settings to receive reminders via email or browser notifications. You can set multiple reminders per task.',
          tags: ['reminders', 'notifications', 'due dates']
        },
        {
          question: 'How do I use tags and categories?',
          answer: 'Tags help organize tasks by context (#work, #urgent, #meeting). Categories group tasks by area (Work, Personal, Health). Use both for powerful organization and filtering.',
          tags: ['tags', 'categories', 'organization']
        },

      ]
    },
    {
      id: 'troubleshooting',
      title: 'Troubleshooting',
      icon: '🔧',
      description: 'Common issues and solutions',
      content: [
        {
          question: 'My tasks aren\'t saving properly',
          answer: 'First, check your internet connection. If online, try refreshing the page (Ctrl+F5) or clearing your browser cache. If using mobile, ensure the app has proper permissions. Contact support if the issue persists.',
          tags: ['saving', 'sync', 'connection']
        },
        {
          question: 'I\'m not receiving notifications',
          answer: 'Go to Settings > Notifications and ensure they\'re enabled. Check your browser notification permissions (click the 🔒 icon in address bar). For email notifications, check your spam folder.',
          tags: ['notifications', 'email', 'permissions']
        },
        {
          question: 'The app is running slowly',
          answer: 'Try closing other browser tabs, clearing cache and cookies, updating your browser, or restarting it. For mobile apps, restart the app or your device. Consider using Chrome or Firefox for best performance.',
          tags: ['performance', 'slow', 'browser']
        },

      ]
    },
    {
      id: 'privacy',
      title: 'Privacy & Security',
      icon: '🔒',
      description: 'Learn how we protect your data and privacy',
      content: [
        {
          question: 'How is my data protected?',
          answer: 'We use AES-256 encryption for data at rest and TLS 1.3 for data in transit. Your tasks and personal information are stored securely on certified servers and never shared with third parties without your explicit consent.',
          tags: ['encryption', 'security', 'data protection']
        },

        {
          question: 'Who can see my tasks?',
          answer: 'Your tasks are completely private by default. Only you can see them unless you explicitly share specific tasks or lists. Even our support team can only access your data with your permission.',
          tags: ['privacy', 'sharing', 'visibility']
        }
      ]
    }
  ];

  const filteredSections = helpSections.filter(section =>
    section.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    section.content.some(item =>
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <div className="help-page">
      <div className="help-container">
        <div className="help-header">
          <h1 className="help-title">Help & Support</h1>
          <p className="help-subtitle">Find answers to your questions and get support</p>
          
          <div className="help-search">
            <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
            <input
              type="text"
              placeholder="Search for help..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>
        </div>

        <div className="help-content">
          <div className="help-sidebar">
            <div className="help-nav">
              {helpSections.map(section => (
                <button
                  key={section.id}
                  className={`help-nav-item ${activeSection === section.id ? 'active' : ''}`}
                  onClick={() => setActiveSection(section.id)}
                >
                  <span className="help-nav-icon">{section.icon}</span>
                  <span className="help-nav-text">{section.title}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="help-main">
            {filteredSections.map(section => (
              (activeSection === section.id || searchQuery) && (
                <div key={section.id} className="help-section">
                  <h2 className="section-title">
                    <span className="section-icon">{section.icon}</span>
                    {section.title}
                  </h2>
                  
                  <div className="faq-list">
                    {section.content.filter(item =>
                      !searchQuery || 
                      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      item.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      item.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
                    ).map((item, index) => {
                      const key = `${section.id}-${index}`;
                      const isExpanded = expandedFAQ.has(key);
                      
                      return (
                        <div key={index} className={`faq-item ${isExpanded ? 'expanded' : ''}`}>
                          <button 
                            className="faq-question"
                            onClick={() => toggleFAQ(section.id, index)}
                            aria-expanded={isExpanded}
                          >
                            <span className="faq-question-text">{item.question}</span>
                            <span className={`faq-toggle ${isExpanded ? 'expanded' : ''}`}>
                              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                <path d="M4.427 7.427l3.396 3.396a.25.25 0 00.354 0l3.396-3.396A.25.25 0 0011.396 7H4.604a.25.25 0 00-.177.427z"/>
                              </svg>
                            </span>
                          </button>
                          <div className="faq-answer-wrapper">
                            <div className="faq-answer">{item.answer}</div>

                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )
            ))}

            {searchQuery && filteredSections.length === 0 && (
              <div className="no-results">
                <div className="no-results-icon">🔍</div>
                <h3>No results found</h3>
                <p>Try searching with different keywords or browse our help sections above.</p>
                <div className="search-suggestions">
                  <p>Popular searches:</p>
                  <div className="search-tags">
                    <button className="search-tag" onClick={() => setSearchQuery('create task')}>Create task</button>
                    <button className="search-tag" onClick={() => setSearchQuery('notifications')}>Notifications</button>
                    <button className="search-tag" onClick={() => setSearchQuery('password')}>Password</button>
                    <button className="search-tag" onClick={() => setSearchQuery('export')}>Export data</button>
                  </div>
                </div>
              </div>
            )}



            <div className="contact-section">
              <h2 className="section-title">
                <span className="section-icon">📧</span>
                Contact Support
              </h2>
              <p className="contact-intro">
                Can't find what you're looking for? Send us a message and we'll help you out!
              </p>
              
              <form onSubmit={handleContactSubmit} className="contact-form">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={contactForm.name}
                      onChange={handleInputChange}
                      required
                      className="form-input"
                      placeholder="Your full name"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={contactForm.email}
                      onChange={handleInputChange}
                      required
                      className="form-input"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>
                

                
                <div className="form-group">
                  <label htmlFor="subject">Subject *</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={contactForm.subject}
                    onChange={handleInputChange}
                    required
                    className="form-input"
                    placeholder="Brief description of your inquiry"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="message">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={contactForm.message}
                    onChange={handleInputChange}
                    required
                    rows="5"
                    className="form-textarea"
                    placeholder="Describe your issue or question..."
                  />
                </div>
                
                <button type="submit" className="btn btn-primary">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}