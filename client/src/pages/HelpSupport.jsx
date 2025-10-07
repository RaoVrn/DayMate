import React, { useState } from 'react';
import './HelpSupport.css';

export default function HelpSupport() {
  const [activeSection, setActiveSection] = useState('getting-started');
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [searchQuery, setSearchQuery] = useState('');

  const handleContactSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement contact form submission
    console.log('Contact form submitted:', contactForm);
    alert('Thank you for your message! We\'ll get back to you soon.');
    setContactForm({ name: '', email: '', subject: '', message: '' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContactForm(prev => ({ ...prev, [name]: value }));
  };

  const helpSections = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      icon: '🚀',
      content: [
        {
          question: 'How do I create my first task?',
          answer: 'Click the "Add Task" button on your dashboard, fill in the task details including title, priority, and optional due date, then click "Add Task" to save it.'
        },
        {
          question: 'How do I organize my tasks?',
          answer: 'You can organize tasks using categories, priorities (Low, Medium, High), and due dates. Use the filter options to view specific types of tasks.'
        },
        {
          question: 'Can I edit or delete tasks?',
          answer: 'Yes! Click on any task to edit its details, or use the delete option to remove completed or unwanted tasks.'
        }
      ]
    },
    {
      id: 'account',
      title: 'Account Management',
      icon: '👤',
      content: [
        {
          question: 'How do I change my password?',
          answer: 'Go to Settings > Profile, then click "Change Password". You\'ll need to enter your current password and your new password twice.'
        },
        {
          question: 'How do I update my profile information?',
          answer: 'Navigate to your Profile page and click "Edit Profile". You can update your name, email, bio, and preferences.'
        },
        {
          question: 'How do I delete my account?',
          answer: 'Contact our support team for account deletion. We\'ll help you securely remove your data while preserving any necessary records.'
        }
      ]
    },
    {
      id: 'features',
      title: 'Features & Tips',
      icon: '✨',
      content: [
        {
          question: 'What are the different priority levels?',
          answer: 'Low priority for non-urgent tasks, Medium for regular tasks, and High for urgent or important tasks. Use colors to quickly identify priority levels.'
        },
        {
          question: 'Can I set reminders for my tasks?',
          answer: 'Yes! When creating or editing a task, you can set a due date. Enable notifications in Settings to receive reminders.'
        },
        {
          question: 'How do I use categories?',
          answer: 'Categories help organize tasks by type (Work, Personal, Health, etc.). Add a category when creating a task to keep things organized.'
        }
      ]
    },
    {
      id: 'troubleshooting',
      title: 'Troubleshooting',
      icon: '🔧',
      content: [
        {
          question: 'My tasks aren\'t saving properly',
          answer: 'Check your internet connection first. If the problem persists, try refreshing the page or clearing your browser cache.'
        },
        {
          question: 'I\'m not receiving notifications',
          answer: 'Go to Settings > Notifications and ensure they\'re enabled. Also check your browser notification permissions.'
        },
        {
          question: 'The app is running slowly',
          answer: 'Try closing other browser tabs, clearing your browser cache, or using an updated browser version.'
        }
      ]
    },
    {
      id: 'privacy',
      title: 'Privacy & Security',
      icon: '🔒',
      content: [
        {
          question: 'How is my data protected?',
          answer: 'We use industry-standard encryption to protect your data. Your tasks and personal information are stored securely and never shared with third parties.'
        },
        {
          question: 'Can I export my data?',
          answer: 'Yes! Go to Settings > Privacy and use the "Export Data" feature to download your tasks and account information.'
        },
        {
          question: 'Who can see my tasks?',
          answer: 'Your tasks are private by default. Only you can see your tasks unless you explicitly share them.'
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
            <svg className="search-icon" width="20" height="20" viewBox="0 0 16 16" fill="currentColor">
              <path d="M11.742 10.344a6.5 6.5 0 10-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 001.415-1.414l-3.85-3.85a1.007 1.007 0 00-.115-.1zM12 6.5a5.5 5.5 0 11-11 0 5.5 5.5 0 0111 0z"/>
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

            <div className="quick-actions">
              <h3 className="quick-actions-title">Quick Actions</h3>
              <div className="quick-action-buttons">
                <button className="quick-action-btn">
                  <span className="quick-action-icon">📧</span>
                  <span>Contact Support</span>
                </button>
                <button className="quick-action-btn">
                  <span className="quick-action-icon">📚</span>
                  <span>User Guide</span>
                </button>
                <button className="quick-action-btn">
                  <span className="quick-action-icon">💬</span>
                  <span>Community</span>
                </button>
              </div>
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
                      item.answer.toLowerCase().includes(searchQuery.toLowerCase())
                    ).map((item, index) => (
                      <div key={index} className="faq-item">
                        <h3 className="faq-question">{item.question}</h3>
                        <p className="faq-answer">{item.answer}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )
            ))}

            {searchQuery && filteredSections.length === 0 && (
              <div className="no-results">
                <div className="no-results-icon">🔍</div>
                <h3>No results found</h3>
                <p>Try searching with different keywords or browse our help sections above.</p>
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
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={contactForm.name}
                      onChange={handleInputChange}
                      required
                      className="form-input"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={contactForm.email}
                      onChange={handleInputChange}
                      required
                      className="form-input"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="subject">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={contactForm.subject}
                    onChange={handleInputChange}
                    required
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={contactForm.message}
                    onChange={handleInputChange}
                    required
                    rows="6"
                    className="form-textarea"
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