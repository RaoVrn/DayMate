const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Task title is required'],
    trim: true,
    maxlength: [200, 'Task title cannot exceed 200 characters']
  },
  completed: {
    type: Boolean,
    default: false
  },
  priority: {
    type: String,
    enum: ['Low', 'Medium', 'High'],
    default: 'Medium'
  },
  category: {
    type: String,
    trim: true,
    maxlength: [50, 'Category cannot exceed 50 characters'],
    default: 'General'
  },
  dueDate: {
    type: Date,
    default: null
  },
  description: {
    type: String,
    trim: true,
    maxlength: [1000, 'Description cannot exceed 1000 characters'],
    default: ''
  }
}, {
  timestamps: true // This automatically adds createdAt and updatedAt fields
});

// Index for better query performance
TaskSchema.index({ completed: 1, priority: 1 });
TaskSchema.index({ dueDate: 1 });
TaskSchema.index({ category: 1 });

module.exports = mongoose.model('Task', TaskSchema);