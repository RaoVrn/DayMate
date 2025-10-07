# 🗓️ DayMate - Your Daily Task Organizer

DayMate is a beautiful, modern task management application that helps you organize your daily tasks with priorities, categories, and due dates. Built with React and Node.js.

![DayMate Screenshot](https://via.placeholder.com/800x400/3b82f6/ffffff?text=DayMate+Task+Manager)

## ✨ Features

- **📝 Task Management**: Create, edit, complete, and delete tasks
- **🎯 Priority Levels**: Organize tasks by High, Medium, and Low priority
- **📁 Categories**: Group tasks by custom categories (Work, Personal, etc.)
- **📅 Due Dates**: Set and track due dates with overdue notifications  
- **🔍 Search & Filter**: Find tasks quickly with search and filter options
- **📱 Responsive Design**: Works perfectly on desktop and mobile devices
- **🌓 Dark Mode Support**: Automatic dark/light mode based on system preference
- **⚡ Real-time Updates**: Instant synchronization between UI and server
- **🎨 Modern UI**: Beautiful, clean interface with smooth animations

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/DayMate.git
   cd DayMate
   ```

2. **Install server dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install client dependencies**
   ```bash
   cd ../client
   npm install
   ```

4. **Start the development servers**

   **Terminal 1 - Start the backend server:**
   ```bash
   cd server
   npm run dev
   ```
   Server will run on `http://localhost:4000`

   **Terminal 2 - Start the frontend client:**
   ```bash
   cd client
   npm run dev
   ```
   Client will run on `http://localhost:5173`

5. **Open your browser**
   Navigate to `http://localhost:5173` to start using DayMate!

## 📋 Usage

### Adding Tasks
1. Enter your task title in the "What do you need to do?" field
2. Select a priority level (High, Medium, Low)
3. Optionally add a category and due date
4. Click "✨ Add Task"

### Managing Tasks
- **Complete tasks**: Check the checkbox next to any task
- **Delete tasks**: Click the 🗑️ delete button
- **Filter tasks**: Use the "All", "Active", "Completed" tabs
- **Search tasks**: Use the search bar to find specific tasks

### Task Features
- **Priority indicators**: Visual priority levels with colors and icons
- **Category tags**: Organize tasks by custom categories
- **Due date tracking**: See overdue tasks highlighted in red
- **Auto-sorting**: Tasks automatically sort by completion status and priority

## 🛠️ Technology Stack

### Frontend
- **React 19** - Modern React with hooks
- **Vite** - Fast build tool and development server
- **CSS3** - Custom CSS with CSS variables for theming
- **Google Fonts** - Inter font family for beautiful typography

### Backend  
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **CORS** - Cross-origin resource sharing
- **Body Parser** - Request body parsing middleware

### Development Tools
- **ESLint** - Code linting and formatting
- **Nodemon** - Auto-restart for development

## 📁 Project Structure

```
DayMate/
├── client/                 # Frontend React application
│   ├── public/            # Static assets
│   ├── src/
│   │   ├── components/    # React components
│   │   │   ├── TaskItem.jsx
│   │   │   └── TaskList.jsx
│   │   ├── App.jsx        # Main App component
│   │   ├── App.css        # Component styles
│   │   ├── api.js         # API client functions
│   │   ├── index.css      # Global styles
│   │   └── main.jsx       # App entry point
│   ├── index.html         # HTML template
│   ├── package.json       # Dependencies and scripts
│   └── vite.config.js     # Vite configuration
└── server/                # Backend Node.js application
    ├── routes/
    │   └── tasks.js       # Task API routes
    ├── index.js           # Server entry point
    └── package.json       # Dependencies and scripts
```

## 🎨 Design System

### Colors
- **Primary Blue**: `#3b82f6` - Main accent color
- **Success Green**: `#10b981` - Completed states
- **Warning Orange**: `#f59e0b` - Medium priority
- **Danger Red**: `#ef4444` - High priority and overdue

### Typography
- **Font Family**: Inter (Google Fonts)
- **Headings**: 600-700 font weight
- **Body**: 400-500 font weight

### Components
- **Cards**: Rounded corners (8px), subtle shadows
- **Buttons**: 8px border radius, smooth hover transitions
- **Form Elements**: Consistent padding, focus states
- **Icons**: Emoji-based for universal compatibility

## 🔄 API Endpoints

### Tasks API (`/api/tasks`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tasks` | Retrieve all tasks |
| POST | `/api/tasks` | Create a new task |
| PATCH | `/api/tasks/:id` | Update a specific task |
| DELETE | `/api/tasks/:id` | Delete a specific task |

### Task Object Structure
```json
{
  "id": 1,
  "title": "Complete project documentation",
  "completed": false,
  "priority": "High",
  "category": "Work", 
  "dueDate": "2024-12-25",
  "createdAt": "2024-12-20T10:00:00Z",
  "updatedAt": "2024-12-20T15:30:00Z"
}
```

## 🚀 Deployment

### Production Build

1. **Build the client**
   ```bash
   cd client
   npm run build
   ```

2. **Start production server**
   ```bash
   cd server
   npm start
   ```

### Environment Variables
Create a `.env` file in the server directory:
```env
PORT=4000
NODE_ENV=production
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Icons by emoji standards
- Fonts by Google Fonts (Inter)
- Inspiration from modern task management apps

## 📞 Support

If you have any questions or need help with DayMate:

- Create an issue on GitHub
- Check the [documentation](README.md)
- Review the code comments for implementation details

---

**Happy task organizing! 🎉**

Made with ❤️ by [Your Name]