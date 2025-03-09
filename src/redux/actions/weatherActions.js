import axios from 'axios';

export const fetchWeather = (city) => {
  return async (dispatch) => {
    dispatch({ type: 'FETCH_WEATHER_REQUEST' });
    
    try {
      // Using WeatherAPI.com - a free weather API
      const response = await axios.get(
        `https://api.weatherapi.com/v1/current.json?key=c21d0aeb4bc24a7e88745636250903&q=${city}&aqi=no`
      );
      
      dispatch({
        type: 'FETCH_WEATHER_SUCCESS',
        payload: response.data
      });
    } catch (error) {
      dispatch({
        type: 'FETCH_WEATHER_FAILURE',
        payload: error.message
      });
    }
  };
};