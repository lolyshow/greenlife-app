
import React,{Component} from "react";
import {View,Text,ScrowllView,StyleSheet,Alert,ScrollView} from "react-native";
import GreenButton from "../../components/GreenButton";
import InputLine from "../../components/InputLine";
import InputLinePassword from "../../components/InputLinePassword";
import Helper from "../../Helpers/Helper";
import { store } from "../../redux/store";
import { connect, useDispatch } from "react-redux";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { handleActiveTab, handleGotoStore, handlesaveuserAuth, handleUpdateUserLoggedIn } from "../../reduxx/actions/requests";


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
        confirm_password:"",
        phone:"",
        first_name:"",
        last_name:"",
        referral:"",
        
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

    

  //  gotoStores = ()=>{
  //    global.message = "Registration Successfull Please signin to Continue";
  //    this.props?.dispatch(handleActiveTab(true))
  //    this.props.navigation.navigate("AuthUser")
     
  // }

  gotoStores = ()=>{
      
    if(this.props.data.memberid && this.props.data.gotoStore){
      const {gotoStore,memberid} = this.props.data;
      this.props.navigation.navigate("ContinueToStoreStack",{memberid,gotoStore});
    }else{
      this.props.navigation.navigate("ContinueToStoreStack");
    }
    
    
  }


  signIn = async (email,password) => {

    let memberids = null;
      let gotoStores = false;
    try {
        let payload = {
            "email": email,
            "password": password,
            "btn-submit": "Admin-Login",
            "function":"client-login",
            "textMemberID": ' 202012340008',
            "param_type":"product",
            "page":"view_stores",
            "api":""
          }
          try {
  
            this.setState({processing:true});
            
            let linkUrl = "UsersControllerServet?action=Client_Login_Online";
            await Helper.getRequest(linkUrl,"post",payload)
            .then((result) =>{ 
              let { message, error, response } = result;
              this.setState({processing:false});
              if (!error && response.status == true) {
                this.setState({DetailsResponse:result.response});
                // resetForm();
                let userData = {

                  email:this.state.email,
                  password:this.state.password,
                  
                }
                    
                //   global.gtpsUserData = userData;

                // try{
                //   store.dispatch({
                //     type: "GTPS_USER_DATA",
                //     payload:JSON.stringify(userData),
                //   });
                // }
                // catch(error){
                  
                // }

                if(this.props.data.memberid && this.props.data.gotoStore){
                  const {gotoStore,memberid} = this.props.data;
                  memberids = memberid
                  gotoStores = gotoStore
                  // this.props.navigation.navigate("ContinueToStoreStack",{memberid,gotoStore});
                }else{
                  memberids = null;
                  gotoStores = false;
                }
                
                this.props?.dispatch(
                  handlesaveuserAuth({
                    email,
                    password,
                  })
                )

                this.props?.dispatch(
                  handleGotoStore({
                    memberid:memberids,
                    gotoStore:gotoStores
                  })
                )

                this.props?.dispatch(handleUpdateUserLoggedIn(true))
                return this.gotoStores();

                Alert.alert("New User", result.response.msg);
              
              } else {
                Alert.alert("Member User", response.msg);
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

     submitForm = async()=>{
      let { email, password,confirm_password } = this.state;
      if(email){
          if(password == confirm_password){
            
          let payload = {
            "email": email,
            "password": password,
            "confirm_password": confirm_password,
            "btn-submit": "Admin-Login",
            "function":"new-client",
            "textMemberID": ' 202012340008',
            "param_type":"product",
            "page":"view_stores",
            "api":""
          }

          try {
  
            this.setState({ processing: true });
            
            let linkUrl = "UsersControllerServet?action=Client_Register_Online";
            await Helper.getRequest(linkUrl,"post",payload)
            .then((result) =>{ 
              let { message, error, response } = result;
              
              this.setState({ processing: false });
              if (!error) {
                if(response.status == true ){
                  let userData = {
                    email:email,
                    password:password,
                  }
    
                  global.gtpsUserData = userData;
                  try{
                      store.dispatch({
                      type: "GTPS_USER_DATA",
                      payload: JSON.stringify(userData),
                    });
                  }
                  catch(error){
                    this.setState({ processing: false });
                  }
                  setTimeout(() => {
                    // this.messageComp();
                    return this.signIn(email,password);
                  }, 1000);
                  
                  // return this.gotoStores();
                  Alert.alert("New User", result.response.msg);
                }else{
                  Alert.alert("New User", response.msg);
                } 
              
              } else {
                this.setState({ processing: false });
                Alert.alert("Member User", message);
              }
      
            });
            
          } catch (error) {
            this.setState({ processing: false });
            Alert.alert("Error", error.toString());
          }
        }else{
          Alert.alert("User", "Passwords Do not Match. please check and try again");
        }
      }else{
        Alert.alert("User", "Please Enter A Valid Email");
      }
    }

      

      validateForm = () => {
        let email = this.state.email;
        let password = this.state.password;
    
        if (!email) {
          return {
            validationStatus: false,
            errorMessage: "Email cannot be empty",
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


            <InputLinePassword
            keyboardType="default"
            onChangeText={(confirm_password) => this.setState({ confirm_password })}
            inputValue={this.state.confirm_password}
            placeholder={"Confirm Password"}
            inputWrapperStyle={styles_.inputWrapper}
            secureTextEntry={this.state.secureTextEntry}
            inputStyle ={styles_.inputStyle}
            inputWrapperStyle={styles_.inputWrapper}
            passwordViewToggle={() =>
                this.setState({ secureTextEntry: !this.state.secureTextEntry })
            }
            />

            

            
            

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
            style = {{marginBottom:45}}
            ></View>
        </ScrollView>
    )}
  }
const mapStateToProps = (state) => {
  return { };
};
const mapDispatchToProps = (dispatch) => ({
  dispatch, 
});

export default connect( mapStateToProps, mapDispatchToProps)(Register)