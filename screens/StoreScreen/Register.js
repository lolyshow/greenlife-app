import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet,ImageBackground,Dimensions,Image,TextInput,Alert, ScrollView,TouchableOpacity } from "react-native";
import logo from "../../assets/logo2.png";
import unsplash from "../../assets/unsplash.png";
import Entypo from "react-native-vector-icons/Entypo";
import Helper from "../../Helpers/Helper";
import {setGTPSuserDATA} from "../../redux/actions";
import { useSelector, useDispatch } from "react-redux";
import { store } from "../../redux/store";
const screenWidth = Math.round(Dimensions.get("window").width);

const screenHeight = Math.round(Dimensions.get("window").height);

import GreenButton from "../../components/GreenButton";
import WhiteButton from "../../components/WhiteButton";
import InputBox from "../../components/InputBox";
export default function Register(props) {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isEmail, setIsEmail] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [detailsResponse, setDetailsResponse] = useState({});
  const { gtpsUserData } = useSelector((state) => state.reducers);

  const gotoStores = ()=>{
    props.navigation.navigate("Stores");
    console.log("myStoreDataIsTHis",global.gtpsUserData+" glogloglo");
  }

  const dispatch = useDispatch();
  const submitForm = async()=>{
    
    if(isEmail){
        if(password == confirmPassword){

        let payload = {
          "email": email,
          "password": password,
          "confirm_password": confirmPassword,
          "btn-submit": "Admin-Login",
          "function":"new-client",
          "textMemberID": ' 202012340008',
          "param_type":"product",
          "page":"view_stores",
          "api":""
        }
        try {

          // console.log("insideTryLogin")
          setProcessing(true);
          
          let linkUrl = "UsersControllerServet?action=Client_Register_Online";
          console.log("payloadShop", payload);
          await Helper.getRequest(linkUrl,"post",payload)
          .then((result) =>{ 
            let { message, error, response } = result;
           
            setProcessing(false);
            if (!error) {
              setDetailsResponse(result.response);
              // resetForm();
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
                console.log("saved")
              }
              catch(error){
                console.log("ErrorDey ForHieOh",error)
              }
              return gotoStores();
              Alert.alert("New User", result.response.msg);
            
            } else {
              Alert.alert("Member User", message);
            }
    
          });
          
        } catch (error) {
          setProcessing(false);
          Alert.alert("Error", error.toString());
        }
      }else{
        Alert.alert("User", "Passwords Do not Match. please check and try again");
      }
    }else{
      Alert.alert("User", "Please Enter A Valid Email");
    }
  }


  const validateEmail = (text)=>{
      
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
  console.log("myDetailsResponseHere",detailsResponse);
  return (
    <View
        source={unsplash}
        style={styles.centered}
      >
      <ScrollView>
        <View style = {{marginTop:50,justifyContent:"center",alignItems:'center'}}>
            <Image source = {logo} />

        </View>
        
        <View style={{padding:30}}>
            <Text style = {{fontSize:20, fontWeight:"bold"}}>Welcome To GTPS</Text>
            <Text style = {{fontSize:12, color:"#979797"}}>Sign up In to become a User</Text>
        </View>

        <View style={{padding:20,}}>

            <View style={{padding:20,paddingTop:10}}>
                <Text style = {{fontSize:15, fontWeight:"bold"}}>Email Address</Text>
                <View style={styles.inputWrapper}>
                    <InputBox
                    onChangeText={(value) => validateEmail(value)}
                    inputValue={email}
                    borderWidth={1}
                    // inputLabel="Number of PINS"
                    placeholder=""
                    />
                    
                </View>
            </View>



            <View style={{padding:20, paddingTop:10,}}>
                <Text style = {{fontSize:15, fontWeight:"bold"}}>Password</Text>
                <View style={styles.inputWrapper}>
                    <InputBox
                    onChangeText={(value) => setPassword(value)}
                    inputValue={password}
                    borderWidth={1}
                    placeholder=""
                    secureTextEntry={true}
                    placeholder="*******"
                    />
                    
                </View>
            </View>


            
            <View style={{padding:20, paddingTop:10,}}>
                <Text style = {{fontSize:15, fontWeight:"bold"}}>Confirm Password</Text>
                <View style={styles.inputWrapper}>
                    <InputBox
                    onChangeText={(value) => setConfirmPassword(value)}
                    inputValue={confirmPassword}
                    borderWidth={1}
                    secureTextEntry={true}
                    placeholder="*******"
                    placeholder=""
                    />
                    
                </View>
            </View>


            <View style = {styles.body}>
                <View style={styles.buttonWrapper}>
                    <GreenButton
                        text="Register"
                        buttonWidth={250}
                        processing={processing}
                        disabled={processing}
                        onPress={() => submitForm()}
                    />
                </View>
            </View>
            <View style = {styles.body}>
            <TouchableOpacity onPress={()=> props.navigation.navigate("SignIn")}>
              <View style={{flexDirection:'row'}}>
                  <Entypo name = "login" color={"black"} size={30} style={{margin:5}}/>
                  <Text style={{color:"black",fontWeight:'bold',margin:10}} onPress={()=> props.navigation.navigate("SignIn")}>Already a User? Sign In</Text>
              </View>
            </TouchableOpacity>
            </View>

        </View>
      </ScrollView>
    </View>
  );
}
  
const styles = StyleSheet.create({
  centered: {
    position: "absolute",
    left:0,
    right:0,
    top:0,
    bottom:0,
    // alignItems: "center",
    paddingBottom:10,
    paddingTop:50,
    // opacity: 0.8,
  },

  body:{
    // marginTop:50,
    marginBottom:20,
    alignItems:"center",
    justifyContent:"center",
   
    
  },
  inputContainer: {
  // width:350,
  borderWidth: 1,
  // borderRadius:10,
  justifyContent:'space-between',
  // padding:10,
//   borderRightWidth: 1,
  // height: 60,
  // marginTop:10,
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
    // backgroundColor: "#eeededa8",
        padding: 5,
  },
  inputWrapper: {
    marginTop:10,
    flexDirection: "column",
    marginBottom: 10,
  },
});
