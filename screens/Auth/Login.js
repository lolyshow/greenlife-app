import React, { useState, useEffect,Component } from "react";
import { View, Text, StyleSheet,ImageBackground,Dimensions,Image,TextInput,Alert,ScrollView } from "react-native";
import logo from "../../assets/logo2.png";
import unsplash from "../../assets/unsplash.png";
import { store } from "../../redux/store";
const screenWidth = Math.round(Dimensions.get("window").width);

const screenHeight = Math.round(Dimensions.get("window").height);

import GreenButton from "../../components/GreenButton";
import WhiteButton from "../../components/WhiteButton";
import InputBox from "../../components/InputBox";
class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      secureTextEntry: true,
      processing: false,
      errorMessage: undefined,
      biometric: undefined,
      popupShowed: false,
      showBiometric: false,
      biometryType: undefined,
      token: "",
      showTokenModal: false,
      deviceAccessLogId: "",
    };
  }
  
  submitForm = async () => {
    try {
      let { email, password } = this.state;

      // let { validationStatus, errorMessage } = this.validateForm();

      // if (!validationStatus) {
      //   return Alert.alert("Message", errorMessage);
      // }

      return this.signIn(email, password);
    } catch (error) {
      Alert.alert("Error", error.toString());
    }
  };

  
  setId = (email) =>{
    this.setState({ email });
  }

  setPassword = (password) =>{
    this.setState({ password });
  }

  validateForm = () => {
    let email = this.state.email;
    let password = this.state.password;

    if (!email) {
      return {
        validationStatus: false,
        errorMessage: "Username cannot be empty",
      };
    } else if (!password) {
      return {
        validationStatus: false,
        errorMessage: "Password cannot be empty",
      };
    } else {
      return { validationStatus: true, errorMessage: "Ok" };
    }
  };





  submitForm = async () => {
    try {
      let { email, password } = this.state;

      let { validationStatus, errorMessage } = this.validateForm();

      if (!validationStatus) {
        return Alert.alert("Message", errorMessage);
      }

      return this.signIn(email, password);
    } catch (error) {
      Alert.alert("Error", error.toString());
    }
  };


  signIn = async (email, password) => {
    console.log("OutsideTryLogin")
    try {

      console.log("insideTryLogin")
      // this.setState({ processing: true });

      // let { message, error, user, response } = await Helper.logInApi(
      //   email,
      //   password
      // ).then((result) => result);

      // this.setState({ processing: false });

      // if (!error) {
        // this.setState({ email: "", password: "" });

        

        

        // return this.props.navigation.navigate("Home");
        return this.loginStatusAction(true);
      // } else {
      //   Alert.alert("Login", message);
      // }
    } catch (error) {
      // this.setState({ processing: false });

      Alert.alert("Error", error.toString());
    }
  };

  loginStatusAction = (status = false) => {
    return store.dispatch({
      type: "IS_SIGNED_IN",
      payload: status,
    });
  };

  render(){
    return (
      <View source={unsplash} style={styles.centered}>
        <ScrollView>
          <View style = {{marginTop:50,justifyContent:"center",alignItems:'center'}}>
              <Image source = {logo} />

          </View>

          <View style={{padding:20}}>
              <Text style = {{fontSize:20, fontWeight:"bold"}}>Welcome Back</Text>
              <Text style = {{fontSize:12, color:"#979797"}}>Sign In to continue</Text>
          </View>


          <View style={{padding:20}}>
              <Text style = {{fontSize:15, fontWeight:"bold"}}>Member ID</Text>
              <View style={styles.inputWrapper}>

                  <InputBox
                    keyboardType="numeric"
                    onChangeText={(id) => this.setId(id)}
                    inputValue={this.state.email}
                    borderWidth={1}
                    // inputLabel="Number of PINS"
                    placeholder="Insert ID here"
                  />
              </View>
          </View>


          <View style={{padding:20}}>
              <Text style = {{fontSize:15, fontWeight:"bold"}}>Password</Text>
              <View style={styles.inputWrapper}>
                  <InputBox
                    keyboardType="numeric"
                    onChangeText={(password) => this.setPassword(password)}
                    inputValue={this.state.password}
                    borderWidth={1}
                    // inputLabel="Number of PINS"
                    placeholder="**"
                  />
                  <View style = {{flexDirection:'row-reverse'}}>
                    <Text style={{color:"#0C9344"}} onPress={() => {this.props.navigation.navigate("ForgotPassword");}}>Forgot Password</Text>
                  </View>
                  
              </View>
          </View>


          

          <View style = {styles.body}>
              <View style={styles.buttonWrapper}>
                  <GreenButton
                      text="Login"
                      buttonWidth={250}
                      onPress={() => this.submitForm()}
                  />
              </View>


              <View style={{ marginTop:20}}>
                  <Text>New User
                      <Text style={{ marginTop:20,color:"#0C9344"}} onPress={() => {this.props.navigation.navigate("SignUp");}}> Sign up Here</Text>
                  </Text>
              </View>
          </View>

        </ScrollView>
        
      </View>
    );
  }
}
export default Login;

const styles = StyleSheet.create({
  centered: {
    position: "absolute",
    left:0,
    right:0,
    top:0,
    bottom:0,
    paddingBottom:10,
    paddingTop:50,
  },

  body:{
    marginTop:50,
    alignItems:"center",
    justifyContent:"center",
    
  },
  inputContainer: {
  borderWidth: 1,
  justifyContent:'space-between',
  flexDirection:'row',
},
  title: {
    fontSize: 18,
    marginVertical: 2,
  },
  subtitle: {
    fontSize: 14,
    color: "#888",
  },
  input: {
    height: 50,
    padding: 5,
  },
  inputWrapper: {
    marginTop:10,
    flexDirection: "column",
    marginBottom: 10,
  },
});

