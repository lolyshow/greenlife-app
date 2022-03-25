import actionTypes, { saveUserAuth, saveUserCategory, doshowSplashScreen,saveStoreData,setActiveTab,saveUserDetails } from './actionTypes';


/* Utility functions */

export function requestData(subtype) {
  return {
    type: actionTypes.BEGIN_REQUEST,
    subtype
  };
}

export function requestSuccess(data) {
  return {
    type: actionTypes.REQUEST_SUCCESS,
    data
  };
}
export function requestFailure(error) {
  return {
    type: actionTypes.REQUEST_FAILURE,
    error
  };
}



// API Requests would go in here, as well as noraml dispatch requests
export function handlesaveuserAuth(currentUser) {

  return (dispatch )=> {
    return (
      dispatch(saveUserAuth(currentUser))
    );
  };
}

export function handleSaveUserDetails(userDetails){

  console.log("SaveUserDetails",userDetails)
  return (dispatch)=>{
    return(
      dispatch(saveUserDetails(userDetails))
    )
  }
}


export function handleGotoStore(storeData) {

  return (dispatch )=> {
    return (
      dispatch(saveStoreData(storeData))
    );
  };
}



export function handlesaveuserCategory(category) {
  return (dispatch) => {
    return (
      dispatch(saveUserCategory(category))
    );
  };
}

export function handleShowSplashScreen(showSplashScreen) {
    return (dispatch) => {
      return (
        dispatch(doshowSplashScreen(showSplashScreen))
      );
    };
  }

  export function handleActiveTab(loginTab) {
    return (dispatch) => {
      return (
        dispatch(setActiveTab(loginTab))
      );
    };
  }

  export function handleUpdateUserLoggedIn(userLoggedIn) {
    return (dispatch) => {
      return (
        dispatch({
            type: actionTypes.SAVE_USER_LOGGED_IN,
            payload: { userLoggedIn },
        })
        
      );
    };
  
    
  }


  export const handleUpdateLoggedInStatus =(loginStatus) => {
    return (dispatch) => {
      return (
        dispatch({
            type: actionTypes.SAVE_MEMBER_LOGGED_IN,
            payload: { loginStatus },
        })
      );
    };
  }