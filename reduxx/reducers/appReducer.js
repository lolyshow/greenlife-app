import actionTypes from '../actions/actionTypes';

const initialState =  {
    category:false,
    showSplashScreen:true
}

const authReducer = (state = initialState, action)  => {
  
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
      
        default:
            return state;
    }
};



export default authReducer;