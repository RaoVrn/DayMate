const express = require('express');
const router = express.Router();

let tasks = [
  { id: 1, title: "Welcome to DayMate 🎉", completed: false, priority: "Medium" }
];
let nextId = 2;

router.get('/', (req, res) => res.json(tasks));

router.post('/', (req, res) => {
  const { title, priority } = req.body;
  if (!title) return res.status(400).json({ error: 'Title required' });

  const newTask = { id: nextId++, title, completed: false, priority: priority || 'Low' };
  tasks.unshift(newTask);
  res.status(201).json(newTask);
});

router.patch('/:id', (req, res) => {
  const id = Number(req.params.id);
  const task = tasks.find(t => t.id === id);
  if (!task) return res.status(404).json({ error: 'Task not found' });

  Object.assign(task, req.body);
  res.json(task);
});

router.delete('/:id', (req, res) => {
  const id = Number(req.params.id);
  const before = tasks.length;
  tasks = tasks.filter(t => t.id !== id);
  res.json({ deleted: before - tasks.length });
});

module.exports = router;
