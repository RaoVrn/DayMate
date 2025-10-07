import React, { useState, useEffect } from "react";
import { fetchTasks, createTask, updateTask, deleteTask } from "../api";
import TaskList from "../components/TaskList";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [category, setCategory] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all"); // all, active, completed
  const [loading, setLoading] = useState(true);

  useEffect(() => { 
    loadTasks(); 
  }, []);

  async function loadTasks() {
    try {
      const data = await fetchTasks();
      setTasks(data);
    } catch (error) {
      console.error("Failed to load tasks:", error);
    } finally {
      setLoading(false);
    }
  }

  async function addTask(e) {
    e.preventDefault();
    if (!title.trim()) return;
    
    try {
      const taskData = {
        title: title.trim(),
        priority,
        category: category.trim(),
        dueDate: dueDate || null
      };
      
      const newTask = await createTask(taskData);
      setTasks(prev => [newTask, ...prev]);
      
      // Reset form
      setTitle("");
      setCategory("");
      setDueDate("");
    } catch (error) {
      console.error("Failed to create task:", error);
    }
  }

  async function toggleTask(task) {
    try {
      const updated = await updateTask(task.id, { completed: !task.completed });
      setTasks(prev => prev.map(t => t.id === task.id ? updated : t));
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  }

  async function removeTask(id) {
    try {
      await deleteTask(id);
      setTasks(prev => prev.filter(t => t.id !== id));
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  }

  // Filter tasks based on search and filter criteria
  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (task.category && task.category.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesFilter = filter === "all" || 
                         (filter === "active" && !task.completed) ||
                         (filter === "completed" && task.completed);
    
    return matchesSearch && matchesFilter;
  });

  const taskStats = {
    total: tasks.length,
    completed: tasks.filter(t => t.completed).length,
    active: tasks.filter(t => !t.completed).length,
    overdue: tasks.filter(t => !t.completed && t.dueDate && new Date(t.dueDate) < new Date()).length
  };

  if (loading) {
    return (
      <div className="main-container" style={{ textAlign: "center", paddingTop: "4rem" }}>
        <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>🔄</div>
        <div>Loading your tasks...</div>
      </div>
    );
  }

  return (
    <main className="main-container">
      <form className="task-form" onSubmit={addTask}>
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Task Title</label>
            <input
              type="text"
              className="form-input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="What do you need to do?"
              maxLength={100}
              required
            />
          </div>
          <div className="form-group" style={{ flex: "0 0 140px" }}>
            <label className="form-label">Priority</label>
            <select 
              className="form-select" 
              value={priority} 
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Category (Optional)</label>
            <input
              type="text"
              className="form-input"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="e.g., Work, Personal, Health"
              maxLength={30}
            />
          </div>
          <div className="form-group" style={{ flex: "0 0 160px" }}>
            <label className="form-label">Due Date (Optional)</label>
            <input
              type="date"
              className="form-input"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
            />
          </div>
          <div style={{ display: "flex", alignItems: "end" }}>
            <button type="submit" className="btn-primary">
              Add Task
            </button>
          </div>
        </div>
      </form>

      <div className="task-list-container">
        <div className="task-list-header">
          <h2 className="task-list-title">Your Tasks</h2>
          <div className="task-count">{taskStats.active} active</div>
        </div>
        
        <div className="controls">
          <input
            type="text"
            className="search-input"
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          
          <div className="filter-tabs">
            <button
              type="button"
              className={`filter-tab ${filter === "all" ? "active" : ""}`}
              onClick={() => setFilter("all")}
            >
              All ({taskStats.total})
            </button>
            <button
              type="button"
              className={`filter-tab ${filter === "active" ? "active" : ""}`}
              onClick={() => setFilter("active")}
            >
              Active ({taskStats.active})
            </button>
            <button
              type="button"
              className={`filter-tab ${filter === "completed" ? "active" : ""}`}
              onClick={() => setFilter("completed")}
            >
              Completed ({taskStats.completed})
            </button>
            {taskStats.overdue > 0 && (
              <span className="filter-tab" style={{ background: "var(--danger-color)", color: "white", cursor: "default" }}>
                {taskStats.overdue} overdue
              </span>
            )}
          </div>
        </div>

        <TaskList 
          tasks={filteredTasks} 
          onToggle={toggleTask} 
          onDelete={removeTask}
          searchTerm={searchTerm}
          filter={filter}
        />
      </div>
    </main>
  );
}