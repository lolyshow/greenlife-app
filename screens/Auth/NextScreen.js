import React from "react";
import { View, Text, StyleSheet,ImageBackground,Dimensions,Image,TouchableOpacity } from "react-native";
import logo from "../../assets/logo.png";
import unsplash from "../../assets/unsplash.png";
const screenWidth = Math.round(Dimensions.get("window").width);

const screenHeight = Math.round(Dimensions.get("window").height);

import GreenButton from "../../components/GreenButton";
import WhiteButton from "../../components/WhiteButton";
import Feather from 'react-native-vector-icons/Feather';
import Entypo from "react-native-vector-icons/Entypo";

// import { TouchableOpacity } from "react-native-gesture-handler";
export default function NextScreen(props) {

    
  return (
    <ImageBackground
        source={unsplash}
        style={styles.centered}
      >

        <View style = {{marginTop:50,justifyContent:"center",alignItems:'center'}}>
            <Image source = {logo} />

        </View>
        <View style = {styles.body}>
            <View style={styles.buttonWrapper}>
                <GreenButton
                    text="Sign Up GTPS User"
                    buttonWidth={250}
                    onPress={() => {props.navigation.navigate("StoreStack",{
                      screen:"Register"
                    });}}
                />
            </View>


            <View style={{ marginTop:10}}>
                <WhiteButton
                bordered
                text="Sign In GTPS User"
                buttonWidth={250}
                onPress={() => props.navigation.navigate("StoreStack",{
                  screen: 'SignIn'
                })}

                
                />
            </View>

            {/* <View style={{ marginTop:10}}>
                <Text style={{color:"white",fontWeight:'bold'}} onPress={()=> props.navigation.navigate("GtpsLogin")}>Sign in as GTPS User</Text>
            </View> */}

            <TouchableOpacity onPress={()=> props.navigation.navigate("Login")}>
              <View style={{ marginTop:10,flexDirection:'row'}}>
                  <Entypo name = "login" color={"#FFFF"} size={30} style={{margin:5}}/>
                  <Text style={{color:"white",fontWeight:'bold',margin:10}} onPress={()=> props.navigation.navigate("Login")}>Sign In GTPS Member</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=> props.navigation.navigate("StoreStack")}>
              <View style={{ marginTop:10,flexDirection:'row'}}>
                  <Feather name = "user-plus" color={"#FFFF"} size={30} style={{margin:5}}/>
                  <Text style={{color:"white",fontWeight:'bold',margin:10}} onPress={()=> props.navigation.navigate("SignUp")}>Sign Up GTPS Member</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=> props.navigation.navigate("StoreStack")}>
              <View style={{ marginTop:10,flexDirection:'row'}}>
                  <Feather name = "shopping-bag" color={"#FFFF"} size={30} style={{margin:5}}/>
                  <Text style={{color:"white",fontWeight:'bold',margin:10}} onPress={()=> props.navigation.navigate("StoreStack")}>Continue as Guest</Text>
              </View>
            </TouchableOpacity>
        </View>

       
      
    </ImageBackground>
  );
}
  
const styles = StyleSheet.create({
  centered: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
    paddingBottom:10,
    paddingTop:50,
    // opacity: 0.8,
  },

  body:{
    flex:1,
    alignItems:"center",
    justifyContent:"center",
    
  },
  title: {
    fontSize: 18,
    marginVertical: 2,
  },
  subtitle: {
    fontSize: 14,
    color: "#888",
  },
});
