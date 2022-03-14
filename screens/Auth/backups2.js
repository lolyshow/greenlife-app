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
              console.log("SuccessResponse",data)
              if(callback){
                callback(data.user,"")
              }
        } else if(data.status === 'failed' && !data.user) {
            console.log("insideLife")
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
              
          console.log("SuccessResponse",data);
        }

        else{
            console.log("insideLife")
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
          console.log("SuccessResponse",data);
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
        console.log("ErrorResponse",error);
      });
  };
};





export const loginDispatcher = (payload,callback) => {

  console.log("payloadLoginoooo",payload)
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
          // console.log("AuthResponse1",data);
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
            console.log("AuthResponse0",data);
          } else if(data.status == "successful") {
            dispatch(
              login({
                payload: {
                  ...data.user,
                },
              }),
            );
            console.log("AuthResponse2",data);
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
          console.log("AuthResponseError",error);
        });
    }
    catch(error){
      console.log("errorHere",error)
      if(callback){
        callback(null,error.message)
      }
    }
  };
};


export const verificationDispatcher = ({type, token, user_id},callback) => {
    console.log("typeOfOf",type," Tokeken",token,", user_id",user_id)
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
                console.log("SuccessResponse",data)
                if(callback){
                  callback()
                }
          } else if(data.status === 'failed' || data.error ===true) {
              console.log("insideLife")
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
                
            console.log("SuccessResponse",data);
          }
  
          else{
              console.log("insideLife")
              dispatch(
                  handleError({
                    payload: {
                      errorMessage: "Please Try Again Later",
                    },
                  }),
                );
  
            
  
            console.log("SuccessResponse",data);
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
          
          console.log("ErrorResponse",error);
        });
    };
  };




  export const bvnValidationDispatcher = (payload,callback) => {
    console.log("BVNPAYLOADSUMBIT",payload);
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
            console.log("dataGottenStaysHere",data.status);
          if(data.status === 'failed') {
              // console.log("insideLifeFailed")
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
            console.log("SuccessResponse",data);
          }
          else if (data.status !== "failed" ) {
            
              dispatch(
                bvnSuccess({
                    payload: {
                      ...data.user,
                    },
                  }),
              );
                console.log("SuccessResponse",data)
                if(callback){
                  callback(true)
                }
          }else if(data.status === 'failed' || data.error && data.error ===true) {
              console.log("insideLife")
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
            console.log("SuccessResponse",data);
          }
  
          else{
              console.log("insideLife")
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
            console.log("failureReponse",data);
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
          console.log("ErrorResponse",error.message);
        });
    };
};

