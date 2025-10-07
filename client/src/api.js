const API_BASE = 'http://localhost:4000';

async function handleResponse(response) {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Network error' }));
    throw new Error(error.message || `HTTP ${response.status}`);
  }
  return response.json();
}

export async function fetchTasks() {
  try {
    const res = await fetch(`${API_BASE}/api/tasks`);
    return handleResponse(res);
  } catch (error) {
    console.error('Failed to fetch tasks:', error);
    throw error;
  }
}

export async function createTask(task) {
  try {
    const res = await fetch(`${API_BASE}/api/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task)
    });
    return handleResponse(res);
  } catch (error) {
    console.error('Failed to create task:', error);
    throw error;
  }
}

export async function updateTask(id, data) {
  try {
    const res = await fetch(`${API_BASE}/api/tasks/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return handleResponse(res);
  } catch (error) {
    console.error('Failed to update task:', error);
    throw error;
  }
}

export async function deleteTask(id) {
  try {
    const res = await fetch(`${API_BASE}/api/tasks/${id}`, { 
      method: 'DELETE' 
    });
    return handleResponse(res);
  } catch (error) {
    console.error('Failed to delete task:', error);
    throw error;
  }
}
