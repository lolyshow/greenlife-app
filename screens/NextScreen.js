import React from "react";
import { View, Text, StyleSheet,ImageBackground,Dimensions,Image } from "react-native";
import logo from "../assets/logo.png";
import unsplash from "../assets/unsplash.png";
const screenWidth = Math.round(Dimensions.get("window").width);

const screenHeight = Math.round(Dimensions.get("window").height);

import GreenButton from "../components/GreenButton";
import WhiteButton from "../components/WhiteButton";
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
                    text="Sign Up"
                    buttonWidth={250}
                    onPress={() => this.props.navigation.navigate("Login")}
                />
            </View>


            <View style={{ marginTop:10}}>
                <WhiteButton
                bordered
                text="Sign In"
                buttonWidth={250}
                onPress={() => props.navigation.navigate("Login")}
                />
            </View>

            <View style={{ marginTop:10}}>
                <Text style={{color:"white",fontWeight:'bold'}}>Sign in as GTPS User</Text>
            </View>
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
