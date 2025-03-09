let nextTaskId = 1;

export const addTask = (task) => {
  return {
    type: 'ADD_TASK',
    payload: {
      id: nextTaskId++,
      text: task.text,
      priority: task.priority || 'Medium',
      completed: false,
      createdAt: new Date().toISOString()
    }
  };
};

export const deleteTask = (id) => {
  return {
    type: 'DELETE_TASK',
    payload: id
  };
};

export const updateTask = (task) => {
  return {
    type: 'UPDATE_TASK',
    payload: task
  };
};