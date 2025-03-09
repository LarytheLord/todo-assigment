import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

// Load state from localStorage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem('todoAppState');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

// Save state to localStorage
const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('todoAppState', serializedState);
  } catch {
    // Ignore write errors
  }
};

const persistedState = loadState();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  persistedState,
  composeEnhancers(applyMiddleware(thunk))
);

store.subscribe(() => {
  saveState({
    auth: store.getState().auth,
    tasks: store.getState().tasks
  });
});

export default store;