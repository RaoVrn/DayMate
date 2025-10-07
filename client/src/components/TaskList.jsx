import React from "react";
import TaskItem from "./TaskItem";

export default function TaskList({ tasks, onToggle, onDelete, searchTerm, filter }) {
  if (!tasks.length) {
    return (
      <div className="empty-state">
        <h3 className="empty-state-title">
          {filter === "completed" 
            ? "No completed tasks yet" 
            : searchTerm 
              ? "No tasks found" 
              : "No tasks yet"
          }
        </h3>
        <p className="empty-state-description">
          {filter === "completed"
            ? "Complete some tasks to see them here"
            : searchTerm
              ? `No tasks match "${searchTerm}"`
              : "Add your first task above to get started"
          }
        </p>
      </div>
    );
  }

  // Sort tasks: incomplete first, then by priority, then by due date
  const sortedTasks = [...tasks].sort((a, b) => {
    // Completed tasks go to bottom
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1;
    }
    
    // Sort by priority (High > Medium > Low)
    const priorityOrder = { High: 3, Medium: 2, Low: 1 };
    if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    }
    
    // Sort by due date (earlier dates first)
    if (a.dueDate && b.dueDate) {
      return new Date(a.dueDate) - new Date(b.dueDate);
    }
    if (a.dueDate) return -1;
    if (b.dueDate) return 1;
    
    // Finally sort by creation time (newest first for same priority)
    return b.id - a.id;
  });

  return (
    <div className="task-list">
      {sortedTasks.map(task => (
        <TaskItem 
          key={task.id} 
          task={task} 
          onToggle={onToggle} 
          onDelete={onDelete} 
        />
      ))}
    </div>
  );
}
