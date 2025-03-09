import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from './redux/actions/authActions';
import { Container, AppBar, Toolbar, Typography, Button, Box, CssBaseline, useMediaQuery, IconButton, Drawer, List, ListItem, ListItemText, Divider } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

import Login from './components/Auth/Login';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import TaskInput from './components/Tasks/TaskInput';
import TaskList from './components/Tasks/TaskList';
import WeatherInfo from './components/Weather/WeatherInfo';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  const { isAuthenticated, user } = useSelector(state => state.auth);
  const weatherData = useSelector(state => state.weather.weatherData);
  const dispatch = useDispatch();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const handleLogout = () => {
    dispatch(logout());
  };

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              {isAuthenticated && isMobile && (
                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  sx={{ mr: 2 }}
                  onClick={toggleDrawer(true)}
                >
                  <MenuIcon />
                </IconButton>
              )}
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Advanced Todo App
              </Typography>
              {isAuthenticated && (
                <>
                  {!isMobile && (
                    <Typography variant="body1" sx={{ mr: 2 }}>
                      Welcome, {user.username}
                    </Typography>
                  )}
                  <Button
                    color="inherit"
                    onClick={handleLogout}
                    startIcon={<ExitToAppIcon />}
                  >
                    Logout
                  </Button>
                </>
              )}
            </Toolbar>
          </AppBar>
          
          {isAuthenticated && isMobile && (
            <Drawer
              anchor="left"
              open={drawerOpen}
              onClose={toggleDrawer(false)}
            >
              <Box
                sx={{ width: 250 }}
                role="presentation"
                onClick={toggleDrawer(false)}
                onKeyDown={toggleDrawer(false)}
              >
                <List>
                  <ListItem>
                    <ListItemText 
                      primary="Welcome"
                      secondary={user.username}
                    />
                  </ListItem>
                  <Divider />
                  <ListItem button onClick={handleLogout}>
                    <ListItemText primary="Logout" />
                  </ListItem>
                </List>
              </Box>
            </Drawer>
          )}
          
          <Container sx={{ py: 4 }}>
            <Routes>
              <Route
                path="/login"
                element={
                  isAuthenticated ? <Navigate to="/" replace /> : <Login />
                }
              />
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Box>
                      {weatherData && <WeatherInfo />}
                      <TaskInput />
                      <TaskList />
                    </Box>
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Container>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;