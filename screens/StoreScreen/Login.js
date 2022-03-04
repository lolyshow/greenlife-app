import React, { useState, useEffect,Component } from "react";
import { View, Text, StyleSheet,ImageBackground,Dimensions,Image,TextInput,Alert,ScrollView } from "react-native";
import logo from "../../assets/logo2.png";
import unsplash from "../../assets/unsplash.png";
import Helper from "../../Helpers/Helper";
import { store } from "../../redux/store";
import AsyncStorage from '@react-native-async-storage/async-storage';
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
      DetailsResponse:null,
      token: "",
      showTokenModal: false,
      deviceAccessLogId: "",
    };
  }
  

   validateEmail = (text)=>{
      
    console.log("emailEntered",text);
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(text) === false) {
      console.log("Email is Not Correct");
      setEmail(text )
      setIsEmail(false)
      return false;
    }
    else {
      setEmail(text )
      setIsEmail(true)
      console.log("Email is Correct");
    }
  
}
  
 

  
  setEmail = (email) =>{
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


  gotoStores = ()=>{
    this.props.navigation.navigate("Products");
    console.log("myStoreDataIsTHis",global.gtpsUserData+" glogloglo");
  }


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


  signIn = async () => {
    try {
        let payload = {
            "email": this.state.email,
            "password": this.state.password,
            // "confirm_password": confirmPassword,
            "btn-submit": "Admin-Login",
            "function":"client-login",
            "textMemberID": ' 202012340008',
            "param_type":"product",
            "page":"view_stores",
            "api":""
          }
          try {
  
            // console.log("insideTryLogin")
            this.setState({processing:true});
            
            let linkUrl = "UsersControllerServet?action=Client_Login_Online";
            console.log("payloadShop", payload);
            await Helper.getRequest(linkUrl,"post",payload)
            .then((result) =>{ 
              let { message, error, response } = result;
             
              this.setState({processing:false});
              if (!error) {
                this.setState({DetailsResponse:result.response});
                // resetForm();
                let userData = {
                  email:this.state.email,
                  password:this.state.password,
                }
  
                global.gtpsUserData = userData;
                try{
                    store.dispatch({
                    type: "GTPS_USER_DATA",
                    payload: JSON.stringify(userData),
                  });
                  console.log("saved")
                }
                catch(error){
                  console.log("ErrorDey ForHieOh",error)
                }
                return this.gotoStores();
                Alert.alert("New User", result.response.msg);
              
              } else {
                Alert.alert("Member User", message);
              }
      
            });
            
          } catch (error) {
            this.setState({processing:false});
            Alert.alert("Error", error.toString());
          }
    }
    catch(error){

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
              <Text style = {{fontSize:20, fontWeight:"bold"}}>Welcome User</Text>
              <Text style = {{fontSize:12, color:"#979797"}}>Sign In to continue</Text>
          </View>


          <View style={{padding:20}}>
              <Text style = {{fontSize:15, fontWeight:"bold"}}>Email</Text>
              <View style={styles.inputWrapper}>

                  <InputBox
                    // keyboardType="numeric"
                    onChangeText={(id) => this.setEmail(id)}
                    inputValue={this.state.email}
                    borderWidth={1}
                    placeholder="Email"
                  />
              </View>
          </View>


          <View style={{padding:20}}>
              <Text style = {{fontSize:15, fontWeight:"bold"}}>Password</Text>
              <View style={styles.inputWrapper}>
                  <InputBox
                    // keyboardType="numeric"
                    onChangeText={(password) => this.setPassword(password)}
                    inputValue={this.state.password}
                    borderWidth={1}
                    secureTextEntry={true}
                    placeholder="*******"
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
                      disabled={this.state.processing}
                      processing={this.state.processing}
                      onPress={() => this.signIn()}
                  />
              </View>


              <View style={{ marginTop:20}}>
                  <Text>New User
                      <Text style={{ marginTop:20,color:"#0C9344"}} onPress={() => {this.props.navigation.navigate("Register");}}> Sign up Here</Text>
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

