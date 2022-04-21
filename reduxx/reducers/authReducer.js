import actionTypes from "../actions/actionTypes";

const initialState  = {
  currentUser: {
      email:"",
      password:"",
  },
  gotoStore:{
    memberid:null,
    gotoStore:false
  },
  userLoggedIn:false,
  loginStatus:false,
  loginTabSwitch:true,
  userDetailsgggg:{},

  
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

    // case actionTypes.USERDETAILS:
    //   return {
    //     ...state,
    //     userDetails: action.payload.userDetails,
    //   };

    case actionTypes.ROUTER:
        return {
            ...state,
            gotoStore:action.payload?.gotoStore
    };

    case actionTypes.SAVE_MEMBER_LOGGED_IN:
      return {
            ...state,
            loginStatus:action.payload?.loginStatus
    };

    case actionTypes.IS_LOGIN_TAB:
      
      return {
        ...state,
        loginTab:action.payload?.loginTab
    };

    default:
      return  state
      
  }
};

export default authReducer;