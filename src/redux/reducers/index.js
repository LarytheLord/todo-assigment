import { combineReducers } from 'redux';
import authReducer from './authReducer';
import taskReducer from './taskReducer';
import weatherReducer from './weatherReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  tasks: taskReducer,
  weather: weatherReducer
});

export default rootReducer;