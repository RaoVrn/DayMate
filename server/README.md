# DayMate Server - MongoDB Setup

This server now uses MongoDB with Mongoose for data persistence. Follow the setup instructions below.

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (Community Edition)

## MongoDB Installation Options

### Option 1: Local MongoDB Installation

#### Windows:
1. Download MongoDB Community Server from [https://www.mongodb.com/try/download/community](https://www.mongodb.com/try/download/community)
2. Run the installer and follow the setup wizard
3. Start MongoDB service:
   ```powershell
   net start MongoDB
   ```

#### macOS (using Homebrew):
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb/brew/mongodb-community
```

#### Linux (Ubuntu/Debian):
```bash
sudo apt-get update
sudo apt-get install -y mongodb
sudo systemctl start mongod
sudo systemctl enable mongod
```

### Option 2: MongoDB Atlas (Cloud)

1. Sign up for a free account at [MongoDB Atlas](https://cloud.mongodb.com/)
2. Create a new cluster
3. Get your connection string
4. Update the `MONGODB_URI` in your `.env` file with the Atlas connection string

### Option 3: Docker

```bash
docker run -d -p 27017:27017 --name daymate-mongo mongo:latest
```

## Environment Configuration

The `.env` file contains:

```env
# Server Configuration
PORT=4000

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/daymate

# Environment
NODE_ENV=development
```

For MongoDB Atlas, update `MONGODB_URI` to your Atlas connection string:
```env
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/daymate?retryWrites=true&w=majority
```

## Installation & Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Seed the database with initial data:
   ```bash
   npm run seed
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## Available Scripts

- `npm start` - Start the production server
- `npm run dev` - Start the development server with nodemon
- `npm run seed` - Populate the database with seed data

## API Endpoints

All endpoints now interact with MongoDB:

### Tasks
- `GET /api/tasks` - Get all tasks (with optional query filters)
  - Query params: `completed`, `priority`, `category`, `sortBy`
- `GET /api/tasks/:id` - Get task by ID
- `POST /api/tasks` - Create new task
- `PATCH /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

### Bulk Operations
- `POST /api/tasks/bulk/complete` - Mark multiple tasks as completed
- `DELETE /api/tasks/bulk/completed` - Delete all completed tasks

## Task Schema

```javascript
{
  title: String (required, max 200 chars),
  completed: Boolean (default: false),
  priority: String (enum: ['Low', 'Medium', 'High'], default: 'Medium'),
  category: String (max 50 chars, default: 'General'),
  dueDate: Date (optional),
  description: String (max 1000 chars),
  createdAt: Date (auto-generated),
  updatedAt: Date (auto-generated)
}
```

## Database Features

- **Validation**: Input validation with meaningful error messages
- **Indexing**: Optimized queries for common search patterns
- **Timestamps**: Automatic createdAt and updatedAt fields
- **Error Handling**: Comprehensive error handling for all operations

## Troubleshooting

1. **MongoDB Connection Error**: Ensure MongoDB is running and accessible
2. **Port Conflicts**: Change PORT in .env if 4000 is occupied
3. **Permission Issues**: Ensure MongoDB has proper read/write permissions

## Development Notes

- The server automatically connects to MongoDB on startup
- Mongoose handles schema validation and type casting
- All routes include proper error handling and validation
- The seed script can be run multiple times safely (clears existing data)