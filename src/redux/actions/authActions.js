export const login = (credentials) => {
    return (dispatch) => {
      try {
        // Simulate API call
        setTimeout(() => {
          // Simple validation
          if (credentials.username && credentials.password) {
            dispatch({
              type: 'LOGIN_SUCCESS',
              payload: { username: credentials.username }
            });
          } else {
            dispatch({
              type: 'LOGIN_FAILURE',
              payload: 'Invalid credentials'
            });
          }
        }, 1000);
      } catch (error) {
        dispatch({
          type: 'LOGIN_FAILURE',
          payload: error.message
        });
      }
    };
  };
  
  export const logout = () => {
    return {
      type: 'LOGOUT'
    };
  };