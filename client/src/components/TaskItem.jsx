import React from "react";

export default function TaskItem({ task, onToggle, onDelete }) {
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "8px",
      borderBottom: "1px solid #ddd"
    }}>
      <label style={{ flex: 1 }}>
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task)}
          style={{ marginRight: "10px" }}
        />
        <span style={{
          textDecoration: task.completed ? "line-through" : "none",
          color: task.completed ? "#999" : "#000"
        }}>
          {task.title}
        </span>
      </label>
      <small style={{ marginRight: 10, color: "#666" }}>{task.priority}</small>
      <button onClick={() => onDelete(task.id)}>❌</button>
    </div>
  );
}
