import {createSlice} from '@reduxjs/toolkit';
const initialState = {
  id: 0,
  status: '',
  loading: false,
  phone_number: '',
  email: '',
  first_name: null,
  last_name: null,
  middle_name: null,
  bvn: null,
  date_of_birth: null,
  verificationId: null,
  nuban: null,
  org_id: null,
  error: '',
  failed:false,
  showResult:false,
  userData:null,
  loggedIn:false,
};

export const authSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    handleLoading: state => {
      state.loading = true;
    },

    handleShowResult: state => {
      state.showResult = true;
    },

    handleHideResult: state => {
      state.showResult = false;
    },
    handleError: (state, {payload}) => {
      state.error = payload.payload.errorMessage;
      state.loading = false;
      state.failed = true;
      state.showResult = true;
      
    },

    signupSuccess: (state, {payload}) => {
      state.error = "";
      state.loading = false;
      state.id = payload.payload.id;
      state.phone_number = payload.payload.phone_number;
      
    },
    login: (state, {payload}) => {
      state.error = "";
      state.loading = false;
      state.id = payload.payload.id;
      state.phone_number = payload.payload.phone_number;
      state.userData = payload.payload;
    },

    loginSuccess: state => {
      state.error = "";
      state.loading = false;
      state.loggedIn = true;
      
    },

    emailVerification: (state, {payload}) => {
      state.error = payload.payload.message;
      state.loading = false;
      state.showResult = true;
      
    },

    verificationSuccess: (state, {payload}) => {
      state.error = "";
      state.loading = false;
      
    },

    bvnSuccess: (state, {payload}) => {
      state.error = "";
      state.loading = false;
    },

    loginFailed: state => {
      state.loading = false;
    },
    logout: state => {
      state = initialState;
    },
  },
});

// Action creators are generated for each case reducer function
export const {handleLoading, logout, loginFailed, signupSuccess,login,loginSuccess, handleError,handleHideResult,handleShowResult,verificationSuccess} =
  authSlice.actions;

export default authSlice.reducer;
