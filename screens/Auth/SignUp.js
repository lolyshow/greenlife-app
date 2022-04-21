import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet,ImageBackground,Dimensions,Image,TextInput, ScrollView } from "react-native";
import logo from "../../assets/logo2.png";
import unsplash from "../../assets/unsplash.png";
const screenWidth = Math.round(Dimensions.get("window").width);

const screenHeight = Math.round(Dimensions.get("window").height);

import GreenButton from "../../components/GreenButton";
import WhiteButton from "../../components/WhiteButton";
import InputBox from "../../components/InputBox";
export default function NextScreen(props) {

  const [pinNo, setPinNo] = useState("");
  const [memberID, setMemberID] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [referral, setReferral] = useState("");


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
            <Text style = {{fontSize:12, color:"#979797"}}>Sign up In to become a member</Text>
        </View>

        <View style={{padding:20,paddingLeft:10}}>

            <View style={{padding:20}}>
                <Text style = {{fontSize:15, fontWeight:"bold"}}>First Name</Text>
                <View style={styles.inputWrapper}>
                    <InputBox
                    keyboardType="numeric"
                    onChangeText={(value) => setMemberID(value)}
                    inputValue={memberID}
                    borderWidth={1}
                    placeholder="Insert ID here"
                    />
                </View>
            </View>


            <View style={{padding:20, paddingTop:10,}}>
                <Text style = {{fontSize:15, fontWeight:"bold"}}>Last Name</Text>
                <View style={styles.inputWrapper}>
                    <InputBox
                    // keyboardType="numeric"
                    onChangeText={(value) => setLastName(value)}
                    inputValue={lastName}
                    borderWidth={1}
                    // inputLabel="Number of PINS"
                    placeholder=""
                    />
                    
                </View>
            </View>



            <View style={{padding:20,paddingTop:10}}>
                <Text style = {{fontSize:15, fontWeight:"bold"}}>Email Address</Text>
                <View style={styles.inputWrapper}>
                    <InputBox
                    // keyboardType="numeric"
                    onChangeText={(value) => setEmail(value)}
                    inputValue={email}
                    borderWidth={1}
                    // inputLabel="Number of PINS"
                    placeholder=""
                    />
                    
                </View>
            </View>


            <View style={{padding:20,paddingTop:10}}>
                <Text style = {{fontSize:15, fontWeight:"bold"}}>Phone Number</Text>
                <View style={styles.inputWrapper}>
                    <InputBox
                    // keyboardType="numeric"
                    onChangeText={(value) => setPhone(value)}
                    inputValue={phone}
                    borderWidth={1}
                    // inputLabel="Number of PINS"
                    placeholder=""
                    />
                    
                </View>
            </View>


            <View style={{padding:20,paddingTop:10}}>
                <Text style = {{fontSize:15, fontWeight:"bold"}}>Referral/Sponsor ID</Text>
                <View style={styles.inputWrapper}>
                    <InputBox
                    // keyboardType="numeric"
                    onChangeText={(value) => setReferral(value)}
                    inputValue={referral}
                    borderWidth={1}
                    // inputLabel="Number of PINS"
                    placeholder=""
                    />
                    
                </View>
            </View>


            

            <View style = {styles.body}>
                <View style={styles.buttonWrapper}>
                    <GreenButton
                        text="Sign Up"
                        buttonWidth={250}
                        onPress={() => props.navigation.navigate("EmailVerify")}
                    />
                </View>
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
    marginBottom:60,
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
