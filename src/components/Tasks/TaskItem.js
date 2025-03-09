import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteTask, updateTask } from '../../redux/actions/taskActions';
import { ListItem, ListItemText, IconButton, Checkbox, Typography, Chip, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const getPriorityColor = (priority) => {
  switch (priority) {
    case 'High':
      return 'error';
    case 'Medium':
      return 'warning';
    case 'Low':
      return 'success';
    default:
      return 'default';
  }
};

const TaskItem = ({ task }) => {
  const dispatch = useDispatch();

  const handleToggleComplete = () => {
    dispatch(updateTask({
      ...task,
      completed: !task.completed
    }));
  };

  const handleDelete = () => {
    dispatch(deleteTask(task.id));
  };

  return (
    <ListItem
      secondaryAction={
        <IconButton edge="end" aria-label="delete" onClick={handleDelete}>
          <DeleteIcon />
        </IconButton>
      }
      disablePadding
      sx={{
        mb: 1,
        bgcolor: 'background.paper',
        borderRadius: 1,
        boxShadow: 1
      }}
    >
      <Box sx={{ display: 'flex', width: '100%', alignItems: 'center', p: 2 }}>
        <Checkbox
          edge="start"
          checked={task.completed}
          onChange={handleToggleComplete}
          inputProps={{ 'aria-labelledby': `task-${task.id}` }}
        />
        <ListItemText
          id={`task-${task.id}`}
          primary={
            <Typography
              variant="body1"
              sx={{
                textDecoration: task.completed ? 'line-through' : 'none',
                color: task.completed ? 'text.secondary' : 'text.primary'
              }}
            >
              {task.text}
            </Typography>
          }
          secondary={
            <Typography variant="caption" color="text.secondary">
              {new Date(task.createdAt).toLocaleString()}
            </Typography>
          }
        />
        <Chip
          label={task.priority}
          color={getPriorityColor(task.priority)}
          size="small"
          sx={{ ml: 1 }}
        />
      </Box>
    </ListItem>
  );
};

export default TaskItem;