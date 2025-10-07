const express = require('express');
const router = express.Router();

let tasks = [
  { 
    id: 1, 
    title: "Welcome to DayMate", 
    completed: false, 
    priority: "Medium",
    category: "Getting Started",
    dueDate: null,
    createdAt: new Date().toISOString()
  },
  {
    id: 2,
    title: "Plan your weekly goals",
    completed: false,
    priority: "High",
    category: "Planning",
    dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0], // Tomorrow
    createdAt: new Date().toISOString()
  },
  {
    id: 3,
    title: "Review completed tasks",
    completed: false,
    priority: "Low",
    category: "Review",
    dueDate: null,
    createdAt: new Date().toISOString()
  },
  {
    id: 4,
    title: "Try the dark theme toggle",
    completed: true,
    priority: "Low",
    category: "UI",
    dueDate: null,
    createdAt: new Date().toISOString()
  }
];
let nextId = 5;

router.get('/', (req, res) => res.json(tasks));

router.post('/', (req, res) => {
  const { title, priority, category, dueDate } = req.body;
  if (!title) return res.status(400).json({ error: 'Title required' });

  const newTask = { 
    id: nextId++, 
    title, 
    completed: false, 
    priority: priority || 'Medium',
    category: category || null,
    dueDate: dueDate || null,
    createdAt: new Date().toISOString()
  };
  
  tasks.unshift(newTask);
  res.status(201).json(newTask);
});

router.patch('/:id', (req, res) => {
  const id = Number(req.params.id);
  const task = tasks.find(t => t.id === id);
  if (!task) return res.status(404).json({ error: 'Task not found' });

  // Validate updates
  const allowedUpdates = ['title', 'completed', 'priority', 'category', 'dueDate'];
  const updates = {};
  
  for (const key of allowedUpdates) {
    if (req.body.hasOwnProperty(key)) {
      updates[key] = req.body[key];
    }
  }

  // Add updatedAt timestamp
  updates.updatedAt = new Date().toISOString();

  Object.assign(task, updates);
  res.json(task);
});

router.delete('/:id', (req, res) => {
  const id = Number(req.params.id);
  const taskIndex = tasks.findIndex(t => t.id === id);
  
  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }
  
  tasks.splice(taskIndex, 1);
  res.json({ success: true, message: 'Task deleted successfully' });
});

module.exports = router;
