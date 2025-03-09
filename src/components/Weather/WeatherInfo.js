import React from 'react';
import { useSelector } from 'react-redux';
import { Box, Typography, Paper, CircularProgress } from '@mui/material';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import CloudIcon from '@mui/icons-material/Cloud';
import UmbrellaIcon from '@mui/icons-material/BeachAccess';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import ThunderstormIcon from '@mui/icons-material/Thunderstorm';

const WeatherInfo = () => {
  const { weatherData, loading, error } = useSelector(state => state.weather);

  if (!weatherData && !loading) {
    return null; // Don't show anything if there's no weather data
  }

  if (loading) {
    return (
      <Paper sx={{ p: 2, mt: 2, display: 'flex', justifyContent: 'center' }}>
        <CircularProgress size={24} sx={{ mr: 1 }} />
        <Typography>Loading weather data...</Typography>
      </Paper>
    );
  }

  if (error) {
    return (
      <Paper sx={{ p: 2, mt: 2 }}>
        <Typography color="error">
          Error loading weather data: {error}
        </Typography>
      </Paper>
    );
  }

  // Get the weather icon based on condition
  const getWeatherIcon = (condition) => {
    const code = condition.toLowerCase();
    if (code.includes('sunny') || code.includes('clear')) {
      return <WbSunnyIcon sx={{ color: 'orange' }} />;
    } else if (code.includes('rain') || code.includes('drizzle')) {
      return <UmbrellaIcon sx={{ color: 'blue' }} />;
    } else if (code.includes('snow') || code.includes('ice') || code.includes('sleet')) {
      return <AcUnitIcon sx={{ color: 'lightblue' }} />;
    } else if (code.includes('thunder') || code.includes('storm')) {
      return <ThunderstormIcon sx={{ color: 'purple' }} />;
    } else {
      return <CloudIcon sx={{ color: 'gray' }} />;
    }
  };

  return (
    <Paper sx={{ p: 2, mt: 2, mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        Weather for Outdoor Tasks
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        {getWeatherIcon(weatherData.current.condition.text)}
        <Box sx={{ ml: 2 }}>
          <Typography variant="body1">
            {weatherData.location.name}, {weatherData.location.country}
          </Typography>
          <Typography variant="h5">
            {Math.round(weatherData.current.temp_c)}°C
          </Typography>
          <Typography variant="body2">
            {weatherData.current.condition.text}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Humidity: {weatherData.current.humidity}% | 
            Wind: {weatherData.current.wind_kph} km/h
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
};

export default WeatherInfo;