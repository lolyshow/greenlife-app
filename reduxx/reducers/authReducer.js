import actionTypes from "../actions/actionTypes";

const initialState  = {
  currentUser: {
      email:"",
      password:""
  },
  userLoggedIn:false,
  loginStatus:false,
};


const authReducer = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case actionTypes.SAVE_USER_AUTH:
      return {
        ...state,
        currentUser:action.payload?.currentUser
      };
      case actionTypes.SAVE_USER_LOGGED_IN:
        return {
          ...state,
          userLoggedIn:action.payload?.userLoggedIn
        };

    case actionTypes.SAVE_MEMBER_LOGGED_IN:
        return {
            ...state,
            loginStatus:action.payload?.loginStatus
    };

    default:
      return  state
      
  }
};

export default authReducer;