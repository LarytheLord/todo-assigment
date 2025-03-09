import React from 'react';
import { useSelector } from 'react-redux';
import TaskItem from './TaskItem';
import { List, Typography, Box, Paper } from '@mui/material';

const TaskList = () => {
  const { tasks, loading, error } = useSelector(state => state.tasks);

  if (loading) {
    return <Typography>Loading tasks...</Typography>;
  }

  if (error) {
    return <Typography color="error">Error: {error}</Typography>;
  }

  if (tasks.length === 0) {
    return (
      <Paper sx={{ p: 3, textAlign: 'center', bgcolor: 'background.default' }}>
        <Typography variant="subtitle1" color="text.secondary">
          No tasks yet. Add a task to get started!
        </Typography>
      </Paper>
    );
  }

  // Sort tasks by priority (High > Medium > Low)
  const sortedTasks = [...tasks].sort((a, b) => {
    const priorityOrder = { High: 0, Medium: 1, Low: 2 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h6" gutterBottom>
        Your Tasks ({tasks.length})
      </Typography>
      <List sx={{ width: '100%', bgcolor: 'background.default', borderRadius: 1 }}>
        {sortedTasks.map(task => (
          <TaskItem key={task.id} task={task} />
        ))}
      </List>
    </Box>
  );
};

export default TaskList;