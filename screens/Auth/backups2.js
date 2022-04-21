import {handleLoading, handleError, signupSuccess,login,handleHideResult,handleShowResult,verificationSuccess} from '../reducers/auth';
import Config from 'react-native-config';
import {NAVIGATION_SCREEN} from '../../navigation';
export const registerDispatcher = ({email, phoneNumber, password},callback) => {
  return dispatch => {
    // start loading state
    dispatch(handleLoading());
    fetch(`${Config.BASE_URL}/api/bank_user/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email, phone_number:phoneNumber, password}),
    })
      .then(response => response.json())
      .then(data => {
        if (data.status === 'failed' && data.user) {
          
            dispatch(
                signupSuccess({
                  payload: {
                    ...data.user,
                  },
                }),
            );
              if(callback){
                callback(data.user,"")
              }
        } else if(data.status === 'failed' && !data.user) {
            dispatch(
                handleError({
                  payload: {
                    errorMessage: data.message,
                  },
                }),
              );

              if(callback){
                callback(null,data.message)
              }
              
        }

        else{
            dispatch(
                handleError({
                  payload: {
                    errorMessage: "Please Try Again Later",
                  },
                }),
              );

          
              if(callback){
                callback(null,"Please Try Again Later")
              }
        }
      })
      .catch(error => {
        dispatch(
          handleError({
            payload: {
              errorMessage: error.message,
            },
          }),
        );
        if(callback){
          callback()
        }
      });
  };
};





export const loginDispatcher = (payload,callback) => {

  // return;
  return dispatch => {
    // start loading state
    dispatch(handleLoading());
    try{
      fetch(`${Config.BASE_URL}api/bank_user/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({credential:payload.emailNumber, password:payload.password}),
      })
        .then(response => response.json())
        .then(data => {
          // return;
          // return;
          if (data.status === 'failed') {
            dispatch(
              handleError({
                payload: {
                  errorMessage: data.message,
                },
              }),
            );
  
            if(callback){
              callback(null,data.message)
            }
          } else if(data.status == "successful") {
            dispatch(
              login({
                payload: {
                  ...data.user,
                },
              }),
            );
              if(callback){
                  callback(data.user,"")
              }
            
          }
        })
        .catch(error => {
          dispatch(
            handleError({
              payload: {
                errorMessage: error.message,
              },
            }),
          );
          if(callback){
            callback(null,error.message)
          }
        });
    }
    catch(error){
      if(callback){
        callback(null,error.message)
      }
    }
  };
};


export const verificationDispatcher = ({type, token, user_id},callback) => {
    return dispatch => {
      // start loading state
      dispatch(handleLoading());
      fetch(`${Config.BASE_URL}/api/bank_user/confirm_token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({type, token, user_id}),
      })
        .then(response => response.json())
        .then(data => {
          if (data.status !== "failed"&& data.error!==true ) {
            
              dispatch(
                  verificationSuccess({
                    payload: {
                      ...data.user,
                    },
                  }),
              );
                if(callback){
                  callback()
                }
          } else if(data.status === 'failed' || data.error ===true) {
              dispatch(
                  handleError({
                    payload: {
                      errorMessage: data.message,
                    },
                  }),
                );
                if(callback){
                    callback()
                  }
                
          }
  
          else{
              dispatch(
                  handleError({
                    payload: {
                      errorMessage: "Please Try Again Later",
                    },
                  }),
                );
  
            
  
          }
        })
        .catch(error => {
          dispatch(
            handleError({
              payload: {
                errorMessage: error.message,
              },
            }),
          );
          
        });
    };
  };




  export const bvnValidationDispatcher = (payload,callback) => {
    return dispatch => {
      // start loading state
      dispatch(handleLoading());
      fetch(`${Config.BASE_URL}/api/bank_user/verify_bvn`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(
            {sessionId:"122121",serviceCode: "gomony_mobile",
            bvn:payload.bvn,bvn_phone:payload.phoneNumber,
            date_of_birth:payload.dateOfBirth,first_name:payload.firstname,
            last_name:payload.lastname,text: 20,org_id: "229199",user_id:1
            }),
        })
        .then(response => response.json())
        .then(data => {
          if(data.status === 'failed') {
              let msg = data.message.data?data.message.data:data.message
              dispatch(
                  handleError({
                    payload: {
                      errorMessage: msg,
                    },
                  }),
                );
  
                if(callback){
                    callback(false,msg)
                  }
          }
          else if (data.status !== "failed" ) {
            
              dispatch(
                bvnSuccess({
                    payload: {
                      ...data.user,
                    },
                  }),
              );
                if(callback){
                  callback(true)
                }
          }else if(data.status === 'failed' || data.error && data.error ===true) {
              dispatch(
                  handleError({
                    payload: {
                      errorMessage: data.message,
                    },
                  }),
                );
  
                if(callback){
                    callback(false,data.message)
                  }
          }
  
          else{
              dispatch(
                  handleError({
                    payload: {
                      errorMessage: "Please Try Again Later",
                    },
                  }),
                );
  
            
                if(callback){
                  callback(false,"please Try again Later")
                }
          }
        })
        .catch(error => {
          dispatch(
            handleError({
              payload: {
                errorMessage: error.message,
              },
            }),
          );
          if(callback){
            callback(false,"Whoops Something went Wrong. please Try later ")
          }
        });
    };
};

