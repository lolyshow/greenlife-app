
const actionTypes = {
  SAVE_USER_AUTH: "SAVE_USER_AUTH",
  BEGIN_REQUEST:"BEGIN_REQUEST",
  REQUEST_SUCCESS:"REQUEST_SUCCESS",
  REQUEST_FAILURE:"REQUEST_FAILURE",
  END_REQUEST:"END_REQUEST",
  ROUTER:"ROUTER",
  IS_LOGIN_TAB:"IS_LOGIN_TAB",
  SAVE_CATEGORY:'SAVE_CATEGORY',
  USERDETAILS:'USERDETAILS',
  SHOW_SPLASH_SCREEN:'SHOW_SPLASH_SCREEN',
  SAVE_USER_LOGGED_IN:'SAVE_USER_LOGGED_IN',
  SAVE_MEMBER_LOGGED_IN:'SAVE_MEMBER_LOGGED_IN'
};

export const saveUserAuth = (currentUser) => ({
  type: actionTypes.SAVE_USER_AUTH,
  payload: { currentUser },
});

export const saveUserDetails = (userDetails) => ({
  type: actionTypes.USERDETAILS,
  payload: { userDetails },
});

export function saveStoreData(gotoStore) {
  return {
    type: actionTypes.ROUTER,
    payload:{gotoStore}
  };
}

export const setActiveTab=(loginTab) =>({
    type: actionTypes.IS_LOGIN_TAB,
    payload:{loginTab}
  }
);



export const saveUserCategory = (category) => ({
  type: actionTypes.SAVE_CATEGORY,
  payload: { category },
});

export const doshowSplashScreen = (showSplashScreen) => ({
    type: actionTypes.SHOW_SPLASH_SCREEN,
    payload: { showSplashScreen },
  });

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

export default actionTypes;