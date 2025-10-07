import React from "react";

export default function TaskItem({ task, onToggle, onDelete }) {
  const isOverdue = task.dueDate && !task.completed && new Date(task.dueDate) < new Date();
  
  const formatDate = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const isToday = date.toDateString() === today.toDateString();
    const isTomorrow = date.toDateString() === tomorrow.toDateString();
    
    if (isToday) return "Today";
    if (isTomorrow) return "Tomorrow";
    
    return date.toLocaleDateString(undefined, { 
      month: 'short', 
      day: 'numeric',
      year: date.getFullYear() !== today.getFullYear() ? 'numeric' : undefined
    });
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High": return "high";
      case "Medium": return "medium";
      case "Low": return "low";
      default: return "low";
    }
  };

  return (
    <div className="task-item">
      <div className="task-content">
        <input
          type="checkbox"
          className="task-checkbox"
          checked={task.completed}
          onChange={() => onToggle(task)}
        />
        
        <div className="task-details">
          <h3 className={`task-title ${task.completed ? "completed" : ""}`}>
            {task.title}
          </h3>
          
          <div className="task-meta">
            <span className={`task-priority ${getPriorityColor(task.priority)}`}>
              {task.priority}
            </span>
            
            {task.category && (
              <span className="task-category">
                {task.category}
              </span>
            )}
            
            {task.dueDate && (
              <span 
                className="task-date" 
                style={{ 
                  color: isOverdue ? "var(--danger-color)" : "var(--text-muted)",
                  fontWeight: isOverdue ? "500" : "normal"
                }}
              >
                {formatDate(task.dueDate)}
                {isOverdue && " (Overdue)"}
              </span>
            )}
          </div>
        </div>
        
        <div className="task-actions">
          <button
            onClick={() => onDelete(task.id)}
            className="btn-icon btn-danger"
            title="Delete task"
          >
            ×
          </button>
        </div>
      </div>
    </div>
  );
}
