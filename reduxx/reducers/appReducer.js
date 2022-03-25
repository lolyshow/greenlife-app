import actionTypes from '../actions/actionTypes';

const initialState =  {
    category:false,
    showSplashScreen:true,
    loginTab:true,
    userDetails:{},
    lol:{},
}

const appReducer = (state = initialState, action)  => {
  
    switch (action.type) {
        case actionTypes.SAVE_CATEGORY:
        return {
          ...state,
          category: action.payload.category,
        };
        case actionTypes.SHOW_SPLASH_SCREEN:
        return {
          ...state,
          showSplashScreen: action.payload.showSplashScreen,
        };


        case actionTypes.USERDETAILS:
        return {
          ...state,
          userDetails: action.payload.userDetails,
        };
        

        case actionTypes.IS_LOGIN_TAB:
        return {
          ...state,
          loginTab: action.payload.loginTab,
        };
      
        default:
            return state;
    }
};



export default appReducer;