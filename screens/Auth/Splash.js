import React, { Component,useState } from "react";

import {
  StyleSheet,
  Dimensions,
  Image,
  StatusBar,
  ImageBackground,
  View,Alert,
} from "react-native";
import Helper from "../../Helpers/Helper";
const screenWidth = Math.round(Dimensions.get("window").width);

const screenHeight = Math.round(Dimensions.get("window").height);
import { connect, Provider, useSelector } from "react-redux";
import { store } from "../../redux/store";
import AsyncStorage from '@react-native-async-storage/async-storage';

// import { store } from "../redux/store";

// import logoWatermark from "../assets/logoWatermark.png";

import Logo from "../../assets/greenlife_logo.jpeg";
import { handleShowSplashScreen } from "../../reduxx/actions/requests";

// import SwipeGestureComponents from "../components/SwipeGestureComponents";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
  },
  StatusBar: {
    color: "#FFF",
  },
});

 class Splash extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      storedCredentials: "",
      appReady: false,
      
    };
  }

  componentDidMount() {

    setTimeout(() => {
      this.gotToNextScreen();
    }, 2000);
  }

  gotToNextScreen = async() => {
    console.log("ResultNotNull")
    
    // const { loginStatus, showSplash } = useSelector((state) => state.reducers);
      await AsyncStorage
      .getItem("userData")
      .then( async (result)=>{
        // console.log("cashedData",result)
        if(result !==null){

          await AsyncStorage
          .getItem("userLogin")
          .then((result)=>{
            
            if(result !==null){
              let res = JSON.parse(result);
              // return;
              return this.signIn(res.memberid, res.password);
            }else{
            }})
          
          
          
        }else{
          this.setState({storedCredentials:null})
          this.props.dispatch(
            handleShowSplashScreen(false)
          )
        }
      })
      .catch(error=>{null})
    
  };

  signIn = async (email, password) => {
    try {

      this.setState({ processing: true });
      let res = {};
      let payload = "action=Member_login&memberid="+email+"&password="+password+"&api=";
      let { message, error, user, response } = await Helper.logInApi(
        payload
      ).then((result) => res = result);
      // console.log("loginResponse",res)
      // return;
      this.setState({ processing: false });

      if (!error) {

        await AsyncStorage.setItem("userData",JSON.stringify(response));
        global.user = res;
        this.setState({ email: "", password: "" });

        store.dispatch({
          type: "IS_SIGNED_IN",
          payload: true,
        });

        return this.props.navigation.navigate("GotoHomeStack");
      } else {
        Alert.alert("Login", message);
      }
    } catch (error) {
      this.setState({ processing: false });

      Alert.alert("Error", error.toString());
    }
  };
  

  

  onSwipePerformed = (action) => {
    switch (action) {
      
      default: {
        this.gotToNextScreen();
      }
    }
  };
  render() {
    return (
      <View
        style={{ flex: 1 }}
      >
        <View
          style={styles.container}
        
        >
          <StatusBar
            barStyle="light-content"
            backgroundColor={styles.container.backgroundColor}
          />
          <Image style={{width:200,height:200}}  source={Logo} />
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return { 
    currentUser: state.authReducer.currentUser
  };
};
const mapDispatchToProps = (dispatch) => ({
  dispatch, 
});

export default connect( mapStateToProps, mapDispatchToProps)(Splash)