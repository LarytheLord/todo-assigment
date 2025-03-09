import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/actions/authActions';
import { Box, TextField, Button, Typography, Paper, CircularProgress } from '@mui/material';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const dispatch = useDispatch();
  const error = useSelector(state => state.auth.error);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    dispatch(login({ username, password }));
    
    // Simulate loading state
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        padding: 2
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          width: '100%',
          maxWidth: 400
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Login to Todo App
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && (
            <Typography color="error" sx={{ mt: 1 }}>
              {error}
            </Typography>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={isLoading}
          >
            {isLoading ? <CircularProgress size={24} /> : 'Login'}
          </Button>
          <Typography variant="body2" color="text.secondary" align="center">
            (For testing, enter any username and password)
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default Login;