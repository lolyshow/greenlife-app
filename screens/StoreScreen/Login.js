
import React,{Component} from "react";
import {View,Text,ScrowllView,StyleSheet,Alert,ScrollView} from "react-native";
import GreenButton from "../../components/GreenButton";
import InputLine from "../../components/InputLine";
import InputLinePassword from "../../components/InputLinePassword";
import Helper from "../../Helpers/Helper";
import { store } from "../../redux/store";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { connect } from "react-redux";
import { handleGotoStore, handlesaveuserAuth, handleUpdateUserLoggedIn } from "../../reduxx/actions/requests";


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
        popupShowed: false,
        message:"",
      };
    }

    componentDidMount() {
      
      setTimeout(() => {
        this.messageComp();
      }, 2000);
    }


    messageComp(){
      global.message = null;
    }

    validateEmail = (text)=>{
      let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
      if (reg.test(text) === false) {
        setEmail(text )
        setIsEmail(false)
        return false;
      }
      else {
        setEmail(text )
        setIsEmail(true)
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
      
      if(this.props.data.memberid && this.props.data.gotoStore){
        const {gotoStore,memberid} = this.props.data;
        this.props.navigation.navigate("ContinueToStoreStack",{memberid,gotoStore});
      }else{
        this.props.navigation.navigate("ContinueToStoreStack");
      }
      
      
    }
  
  
    submitForm = async () => {
      

      try {
        let { email, password } = this.state;
        
        let { validationStatus, errorMessage } = this.validateForm();
  
        if (!validationStatus) {
          return Alert.alert("Message", errorMessage);
        }
  
        return this.Login();
      } catch (error) {
        Alert.alert("Error", error.toString());
      }
    };
  
   
  
    Login = async () => {

      let memberids = null;
      let gotoStores = false;
      try {
          let payload = {
              "email": this.state.email,
              "password": this.state.password,
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
                  let userData = {
                    email:this.state.email,
                    password:this.state.password,
                  }
                  const {email,password} = this.state

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
                  Alert.alert("User Login", response.msg);
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

      
        
        <View style={{flex:1,padding:20,backgroundColor:'#FFF'}}>
            {global.message?<Text style={{color:'green',marginBottom:20}}>{global.message}</Text>:<></>}
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
                  onPress={this.props.onclickCreateAccount}
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
const mapStateToProps = (state) => {
  return { };
};
const mapDispatchToProps = (dispatch) => ({
  dispatch, 
});

export default connect( mapStateToProps, mapDispatchToProps)(SignIn)