import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet,ImageBackground,Dimensions,Image,TextInput } from "react-native";
import logo from "../../assets/logo2.png";
import unsplash from "../../assets/unsplash.png";
const screenWidth = Math.round(Dimensions.get("window").width);

const screenHeight = Math.round(Dimensions.get("window").height);

import GreenButton from "../../components/GreenButton";
import WhiteButton from "../../components/WhiteButton";
import InputBox from "../../components/InputBox";
import { ScrollView } from "react-native-gesture-handler";
export default function NextScreen(props) {

  const [pinNo, setPinNo] = useState("");
  


  return (
    <View
        source={unsplash}
        style={styles.centered}
      >
      <ScrollView>
        <View style = {{marginTop:50,justifyContent:"center",alignItems:'center'}}>
            <Image source = {logo} />

        </View>

        <View style={{padding:20}}>
            <Text style = {{fontSize:20, fontWeight:"bold"}}>GTPS Member Sign In</Text>
            
        </View>


        <View style={{padding:20}}>
            <Text style = {{fontSize:15, fontWeight:"bold"}}>Member ID</Text>
            <View style={styles.inputWrapper}>

                <InputBox
                  keyboardType="numeric"
                  onChangeText={(pinNo) => setPinNo(pinNo)}
                  inputValue={pinNo}
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
                  onChangeText={(pinNo) => setPinNo(pinNo)}
                  inputValue={pinNo}
                  borderWidth={1}
                  // inputLabel="Number of PINS"
                  placeholder="*********"
                />
                <View style = {{flexDirection:'row-reverse'}}>
                  <Text style={{color:"#0C9344"}} onPress={() => {props.navigation.navigate("ForgotPassword");}}>Forgot Password</Text>
                </View>
                
            </View>
        </View>


        

        <View style = {styles.body}>
            <View style={styles.buttonWrapper}>
                <GreenButton
                    text="Login"
                    buttonWidth={250}
                    onPress={() => props.navigation.navigate("EmailVerify")}
                />
            </View>


            <View style={{ marginTop:20}}>
                <Text>New User
                    <Text style={{ marginTop:20,color:"#0C9344"}} onPress={() => {props.navigation.navigate("SignUp");}}> Sign up Here</Text>
                </Text>
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
    marginTop:50,
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
