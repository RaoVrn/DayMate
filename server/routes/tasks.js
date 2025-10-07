const express = require('express');
const Task = require('../models/Task');
const router = express.Router();

// Get all tasks
router.get('/', async (req, res) => {
  try {
    const { completed, priority, category, sortBy } = req.query;
    
    // Build filter object
    const filter = {};
    if (completed !== undefined) filter.completed = completed === 'true';
    if (priority) filter.priority = priority;
    if (category) filter.category = category;
    
    // Build sort object
    let sort = { createdAt: -1 }; // Default: newest first
    if (sortBy === 'dueDate') sort = { dueDate: 1, createdAt: -1 };
    if (sortBy === 'priority') {
      // Custom priority sorting: High -> Medium -> Low
      sort = { priority: 1, createdAt: -1 };
    }
    
    const tasks = await Task.find(filter).sort(sort);
    res.json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
});

// Get task by ID
router.get('/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json(task);
  } catch (error) {
    console.error('Error fetching task:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({ error: 'Invalid task ID format' });
    }
    res.status(500).json({ error: 'Failed to fetch task' });
  }
});

// Create new task
router.post('/', async (req, res) => {
  try {
    const { title, priority, category, dueDate, description } = req.body;
    
    if (!title || title.trim() === '') {
      return res.status(400).json({ error: 'Task title is required' });
    }

    const taskData = {
      title: title.trim(),
      priority: priority || 'Medium',
      category: category || 'General',
      description: description || '',
    };

    // Parse dueDate if provided
    if (dueDate) {
      taskData.dueDate = new Date(dueDate);
    }

    const newTask = new Task(taskData);
    const savedTask = await newTask.save();
    
    res.status(201).json(savedTask);
  } catch (error) {
    console.error('Error creating task:', error);
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ error: 'Validation failed', details: errors });
    }
    res.status(500).json({ error: 'Failed to create task' });
  }
});

// Update task
router.patch('/:id', async (req, res) => {
  try {
    const allowedUpdates = ['title', 'completed', 'priority', 'category', 'dueDate', 'description'];
    const updates = {};
    
    // Filter and validate updates
    for (const key of allowedUpdates) {
      if (req.body.hasOwnProperty(key)) {
        if (key === 'title' && (!req.body[key] || req.body[key].trim() === '')) {
          return res.status(400).json({ error: 'Task title cannot be empty' });
        }
        if (key === 'dueDate' && req.body[key]) {
          updates[key] = new Date(req.body[key]);
        } else {
          updates[key] = req.body[key];
        }
      }
    }

    const task = await Task.findByIdAndUpdate(
      req.params.id, 
      updates, 
      { new: true, runValidators: true }
    );
    
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    
    res.json(task);
  } catch (error) {
    console.error('Error updating task:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({ error: 'Invalid task ID format' });
    }
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ error: 'Validation failed', details: errors });
    }
    res.status(500).json({ error: 'Failed to update task' });
  }
});

// Delete task
router.delete('/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    
    res.json({ success: true, message: 'Task deleted successfully', deletedTask: task });
  } catch (error) {
    console.error('Error deleting task:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({ error: 'Invalid task ID format' });
    }
    res.status(500).json({ error: 'Failed to delete task' });
  }
});

// Bulk operations
router.post('/bulk/complete', async (req, res) => {
  try {
    const { taskIds } = req.body;
    if (!Array.isArray(taskIds) || taskIds.length === 0) {
      return res.status(400).json({ error: 'taskIds array is required' });
    }

    const result = await Task.updateMany(
      { _id: { $in: taskIds } },
      { completed: true }
    );
    
    res.json({ 
      success: true, 
      message: `${result.modifiedCount} tasks marked as completed`,
      modifiedCount: result.modifiedCount 
    });
  } catch (error) {
    console.error('Error in bulk complete:', error);
    res.status(500).json({ error: 'Failed to complete tasks' });
  }
});

router.delete('/bulk/completed', async (req, res) => {
  try {
    const result = await Task.deleteMany({ completed: true });
    
    res.json({ 
      success: true, 
      message: `${result.deletedCount} completed tasks deleted`,
      deletedCount: result.deletedCount 
    });
  } catch (error) {
    console.error('Error deleting completed tasks:', error);
    res.status(500).json({ error: 'Failed to delete completed tasks' });
  }
});

module.exports = router;
