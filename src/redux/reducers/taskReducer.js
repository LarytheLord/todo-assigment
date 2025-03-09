const initialState = {
    tasks: [],
    loading: false,
    error: null
  };
  
  const taskReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'FETCH_TASKS_REQUEST':
        return {
          ...state,
          loading: true
        };
      case 'FETCH_TASKS_SUCCESS':
        return {
          ...state,
          tasks: action.payload,
          loading: false,
          error: null
        };
      case 'FETCH_TASKS_FAILURE':
        return {
          ...state,
          loading: false,
          error: action.payload
        };
      case 'ADD_TASK':
        return {
          ...state,
          tasks: [...state.tasks, action.payload]
        };
      case 'DELETE_TASK':
        return {
          ...state,
          tasks: state.tasks.filter(task => task.id !== action.payload)
        };
      case 'UPDATE_TASK':
        return {
          ...state,
          tasks: state.tasks.map(task =>
            task.id === action.payload.id ? action.payload : task
          )
        };
      default:
        return state;
    }
  };
  
  export default taskReducer;