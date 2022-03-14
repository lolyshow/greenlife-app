import React,{Component} from "react";
import {View,Text,ScrowllView,StyleSheet,Alert,ScrollView} from "react-native";
import GreenButton from "../../components/GreenButton";
import InputLine from "../../components/InputLine";
import InputLinePassword from "../../components/InputLinePassword";
import Helper from "../../Helpers/Helper";
import { store } from "../../redux/store";
import AsyncStorage from '@react-native-async-storage/async-storage';


const styles_ = StyleSheet.create({
    container: {
      flex: 1,
      
      flexDirection: "column",
      padding: 20,
      paddingBottom: Platform.select({
        ios: 40,
        android: 10,
      }),
    },
    inputStyle:{
        borderColor:"#75757a"
    },
    buttonWrapper:{
        marginTop:20,
    },
  
    inputWrapper: {
      marginVertical: Platform.select({
        ios: 25,
        android: 12,
      }),
    
      
    },
    inputLabelStyle:{
        color:"#292828"
    },
    
    signupWrapper: {
      flex: 1,
      flexDirection: "column",
      justifyContent: "flex-end",
      paddingBottom: 20,
    },
  

  });
  class SignIn extends Component {
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
    
            let userLogin = {
              memberid:this.state.email,
              password:this.state.password,
            }
    
            await AsyncStorage.setItem("userLogin",JSON.stringify(userLogin));
    
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

    render(){
    return (
        <View style={{padding:20,backgroundColor:'#FFF'}}>
            <InputLine
            keyboardType="email-address"
            onChangeText={(email) => this.setState({ email })}
            inputValue={this.state.email}
            placeholder={"E-Mail *"}
            
            inputStyle ={styles_.inputStyle}
            inputWrapperStyle={styles_.inputWrapper}
            inputLabelStyle ={styles_.inputLabelStyle}
            />

            
            <InputLinePassword
            keyboardType="default"
            onChangeText={(password) => this.setState({ password })}
            inputValue={this.state.password}
            placeholder={"Password"}
            inputWrapperStyle={styles_.inputWrapper}
            secureTextEntry={this.state.secureTextEntry}
            inputStyle ={styles_.inputStyle}
            inputWrapperStyle={styles_.inputWrapper}
            passwordViewToggle={() =>
                this.setState({ secureTextEntry: !this.state.secureTextEntry })
            }
            />

            <View style={{flexDirection:'row',justifyContent:'flex-end', }}>
                <Text style={{color:"#0C9344"}} onPress={() => {this.props.navigation.navigate("ForgotPassword");}}>Forgot Your Password?</Text>
            
            </View>
            <View>
                <View style={styles_.buttonWrapper}>
                    
                  <GreenButton
                      text="Login"
                      buttonWidth={300}
                      disabled={this.state.processing}
                      processing={this.state.processing}
                      onPress={() => this.submitForm()}
                      borderR={2}
                  />
                </View>
                <View style = {{flexDirection:'row',margin:20,}}> 
                    <View style={{borderBottomWidth:1,borderBottomColor:'black', width:120,margin:10,marginLeft:0}}></View>
                    <Text>OR</Text>
                    <View style={{borderBottomWidth:1,borderBottomColor:'black',width:120,margin:10}}></View>
                </View>

                <View style={styles_.buttonWrapper}>
                    <GreenButton
                    text="Create Account"
                    buttonWidth={300}
                    onPress={() => this.props.navigation.navigate("SignUp")}
                    borderR ={1}
                    borderC = {"#0C9344"}
                    borderW={1}
                    backgroundCol = {"#FFFFFF"}
                    color={"#0C9344"}
                    textStyle={{color:"#0C9344"}}
                    />
                </View>
            </View>
        </View>
    )}
  }
export default SignIn;