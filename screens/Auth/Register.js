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
  class Register extends Component {
    constructor(props) {
      super(props);
      this.state = {
        email: "",
        password: "",
        phone:"",
        first_name:"",
        last_name:"",
        referral:"",
        sponsor:"",
        secureTextEntry: true,
        processing: false,
        errorMessage: undefined,
        biometric: undefined,
        popupShowed: false,
        showBiometric: false,
        response: false,
        biometryType: undefined,
        token: "",
        showTokenModal: false,
        deviceAccessLogId: "",
        
      };
    }

    validate = (text) => {
      let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
      if (reg.test(text) === false) {
        console.log("not Correct")
        return false;
      }
      else {
        console.log("Correct")
        true;
      }
    }

    submitForm = async () => {

        if(this.validate(this.state.email) ===false){
          return Alert.alert("Validation Error", "Please enter A valid Email")
        }
        

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
        // Alert.alert("Login", "Server Erorr. Please try again later");
        // return this.props.navigation.navigate("EmailVerify");
        const {first_name,last_name,email,phone,sponsor,referral} = this.state;
        let payload = {
          "firstname": first_name,
          "lastname": last_name,
          "email": email,
          "phone": phone,
          "sponsorid": referral,
          "sponsor": sponsor,
          "btn-submit": 'Admin-Login' 
        }
        try {
    
          this.setState({ processing: true });
          let res = {};
          let linkUrl = "MemberControllerServlet?action=Member_Register_Online&api";
            await Helper.Request(linkUrl,"post",payload)
            .then((result) =>{ 
              let { message, error, response } = result;
              this.setState({ processing: false });
              if (!error && result.response.success === true) {
                this.setState({response:result.response});
                // const {memberid,}
                return this.props.navigation.navigate("EmailVerify",{memberid:response.memberid,email});
                // resetForm();
                //  AsyncStorage.setItem("userLogin",JSON.stringify(userLogin));
    
                // await AsyncStorage.setItem("userData",JSON.stringify(response));
                // Alert.alert("New Member", result.response.msg);
              } else {
                Alert.alert("Member", response.msg);
              }
      
            });
            
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
            errorMessage: "Email cannot be empty",
          };
        } else {
          return { validationStatus: true, errorMessage: "Ok" };
        }
      };

    render(){
    return (
        <ScrollView showsVerticalScrollIndicator={false} style={{padding:20,backgroundColor:'#fff'}}>
            
            <InputLine
            keyboardType="email-address"
            onChangeText={(email) => this.setState({ email })}
            inputValue={this.state.email}
            placeholder={"E-Mail *"}
            inputStyle ={styles_.inputStyle}
            inputWrapperStyle={styles_.inputWrapper}
            inputLabelStyle ={styles_.inputLabelStyle}
            />
            

            <InputLine
            // keyboardType="email-address"
            onChangeText={(first_name) => this.setState({ first_name })}
            inputValue={this.state.first_name}
            placeholder={"First Name"}
            
            inputStyle ={styles_.inputStyle}
            inputWrapperStyle={styles_.inputWrapper}
            inputLabelStyle ={styles_.inputLabelStyle}
            />

            <InputLine
            // keyboardType="email-address"
            onChangeText={(last_name) => this.setState({ last_name })}
            inputValue={this.state.last_name}
            placeholder={"Last Name"}
            
            inputStyle ={styles_.inputStyle}
            inputWrapperStyle={styles_.inputWrapper}
            inputLabelStyle ={styles_.inputLabelStyle}
            />

            <InputLine
            // keyboardType="email-address"
            onChangeText={(phone) => this.setState({ phone })}
            inputValue={this.state.phone}
            placeholder={"Phone Number"}
            
            inputStyle ={styles_.inputStyle}
            inputWrapperStyle={styles_.inputWrapper}
            inputLabelStyle ={styles_.inputLabelStyle}
            />

            <View style = {{marginBottom:20}}>
              <InputLine
              // keyboardType="email-address"
              onChangeText={(referral) => this.setState({ referral })}
              inputValue={this.state.referral}
              placeholder={"Referral/Sponsor ID"}
              
              inputStyle ={styles_.inputStyle}
              inputWrapperStyle={styles_.inputWrapper}
              inputLabelStyle ={styles_.inputLabelStyle}
              />
            </View>


            <View style = {{marginBottom:20}}>
              <InputLine
              // keyboardType="email-address"
              onChangeText={(sponsor) => this.setState({ sponsor })}
              inputValue={this.state.sponsor}
              placeholder={"Sponsor"}
              
              inputStyle ={styles_.inputStyle}
              inputWrapperStyle={styles_.inputWrapper}
              inputLabelStyle ={styles_.inputLabelStyle}
              />
            </View>
            
            

            {/* <View style={{flexDirection:'row',justifyContent:'flex-end', }}>
                <Text style={{color:"#0C9344"}} onPress={() => {this.props.navigation.navigate("ForgotPassword");}}>Forgot Your Password?</Text>
            
            </View> */}
            <View>
                <View style={styles_.buttonWrapper}>
                    
                  <GreenButton
                      text="Create Account"
                      buttonWidth={300}
                      disabled={this.state.processing}
                      processing={this.state.processing}
                      onPress={() => this.submitForm()}
                      borderR={2}
                  />
                </View>
                
            </View>

            <View
            style = {{marginBottom:60}}
            ></View>
        </ScrollView>
    )}
  }
export default Register;