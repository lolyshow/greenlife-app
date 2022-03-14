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
import { Provider, useSelector } from "react-redux";
import { store } from "../../redux/store";
import AsyncStorage from '@react-native-async-storage/async-storage';

// import { store } from "../redux/store";

// import logoWatermark from "../assets/logoWatermark.png";

import Logo from "../../assets/greenlife_logo.jpeg";

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

export default class Splash extends Component {

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

  signIn = async (email, password) => {
    try {

      console.log("insideTryLogin")
      this.setState({ processing: true });
      let res = {};
      let payload = "action=Member_login&memberid="+email+"&password="+password+"&api=";
      console.log("payload", payload);
      let { message, error, user, response } = await Helper.logInApi(
        payload
      ).then((result) => res = result);

      this.setState({ processing: false });

      if (!error) {

        await AsyncStorage.setItem("userData",JSON.stringify(response));
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
  

  gotToNextScreen = async() => {


    
    // const { loginStatus, showSplash } = useSelector((state) => state.reducers);
    console.log("insideGoto")
      await AsyncStorage
      .getItem("userData")
      .then( async (result)=>{
        if(result !==null){

          await AsyncStorage
          .getItem("userLogin")
          .then((result)=>{
            if(result !==null){
              console.log("ThisIsUserLoginDetails",result);
              let res = JSON.parse(result);
              // console.log("TheRealMemeberIdInAsyncIs",JSON.parse(res.memberid));
              // return;
              return this.signIn(res.memberid, res.password);
            }else{
                console.log("emptyDAtaSeen")
            }})
          
          // this.setState({storedCredentials:result})
          // console.log("credentialFound")
          // console.log(result);
          // setStoredCredentials(result);
            // return; 
          
        }else{
          this.setState({storedCredentials:null})
          console.log("noCredentialFOund");
        }
      })
      .catch(error=>{console.log("errorDetails",error)})
    
      // return;
    // return this.props.navigation.navigate("Start");
    
    store.dispatch({
      type: "SHOW_SPLASH_SCREEN",
      payload: false,
    });
    // if(this.state.storedCredentials !== null){
    //   global.user = this.state.storedCredentials;
    //   console.log("thisUserIsGlogal", global.user)
    //   store.dispatch({
    //     type: "IS_SIGNED_IN",
    //     payload: true,
    //   });

      

    // }
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
