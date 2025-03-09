import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../../redux/actions/taskActions';
import { fetchWeather } from '../../redux/actions/weatherActions';
import { Box, TextField, Button, Select, MenuItem, FormControl, InputLabel, Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const TaskInput = () => {
  const [taskText, setTaskText] = useState('');
  const [priority, setPriority] = useState('Medium');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskText.trim()) {
      dispatch(addTask({ text: taskText, priority }));
      
      // Check if task contains outdoor activity keywords to fetch weather
      const outdoorKeywords = ['outside', 'outdoor', 'park', 'walk', 'run', 'jog', 'bike', 'hike'];
      if (outdoorKeywords.some(keyword => taskText.toLowerCase().includes(keyword))) {
        dispatch(fetchWeather('New York')); // Default city, can be changed
      }
      
      setTaskText('');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mb: 3 }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Add a new task"
            value={taskText}
            onChange={(e) => setTaskText(e.target.value)}
            placeholder="What needs to be done?"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <FormControl fullWidth>
            <InputLabel id="priority-label">Priority</InputLabel>
            <Select
              labelId="priority-label"
              id="priority-select"
              value={priority}
              label="Priority"
              onChange={(e) => setPriority(e.target.value)}
            >
              <MenuItem value="High">High</MenuItem>
              <MenuItem value="Medium">Medium</MenuItem>
              <MenuItem value="Low">Low</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            startIcon={<AddIcon />}
            sx={{ height: '56px' }}
          >
            Add Task
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TaskInput;