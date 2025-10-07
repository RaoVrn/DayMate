import React, { useState, useEffect } from "react";
import { fetchTasks, createTask, updateTask, deleteTask } from "./api";
import TaskList from "./components/TaskList";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("Low");

  useEffect(() => { loadTasks(); }, []);

  async function loadTasks() {
    const data = await fetchTasks();
    setTasks(data);
  }

  async function addTask(e) {
    e.preventDefault();
    if (!title.trim()) return;
    const newTask = await createTask({ title, priority });
    setTasks(prev => [newTask, ...prev]);
    setTitle("");
  }

  async function toggleTask(task) {
    const updated = await updateTask(task.id, { completed: !task.completed });
    setTasks(prev => prev.map(t => t.id === task.id ? updated : t));
  }

  async function removeTask(id) {
    await deleteTask(id);
    setTasks(prev => prev.filter(t => t.id !== id));
  }

  return (
    <div style={{
      maxWidth: "600px",
      margin: "40px auto",
      padding: "1rem",
      fontFamily: "system-ui"
    }}>
      <h1>DayMate 🕓</h1>
      <form onSubmit={addTask} style={{ display: "flex", gap: 10, marginBottom: 20 }}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a new task..."
          style={{ flex: 1, padding: "8px" }}
        />
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
        <button type="submit">Add</button>
      </form>

      <TaskList tasks={tasks} onToggle={toggleTask} onDelete={removeTask} />
    </div>
  );
}
