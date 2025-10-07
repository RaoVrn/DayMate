const mongoose = require('mongoose');
const Task = require('../models/Task');
require('dotenv').config();

const seedTasks = [
  { 
    title: "Welcome to DayMate", 
    completed: false, 
    priority: "Medium",
    category: "Getting Started",
    dueDate: null,
    description: "Get started with DayMate and explore its features"
  },
  {
    title: "Plan your weekly goals",
    completed: false,
    priority: "High",
    category: "Planning",
    dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000), // Tomorrow
    description: "Set up your goals for the upcoming week"
  },
  {
    title: "Review completed tasks",
    completed: false,
    priority: "Low",
    category: "Review",
    dueDate: null,
    description: "Look back at what you've accomplished"
  },
  {
    title: "Try the dark theme toggle",
    completed: true,
    priority: "Low",
    category: "UI",
    dueDate: null,
    description: "Test out the dark mode feature"
  },
  {
    title: "Set up daily routine",
    completed: false,
    priority: "High",
    category: "Planning",
    dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
    description: "Create a consistent daily routine for productivity"
  }
];

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/daymate');
    console.log('Connected to MongoDB');

    // Clear existing tasks
    await Task.deleteMany({});
    console.log('Cleared existing tasks');

    // Insert seed tasks
    const insertedTasks = await Task.insertMany(seedTasks);
    console.log(`Inserted ${insertedTasks.length} seed tasks`);

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();