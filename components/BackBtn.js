
import React from "react";

import {
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  View,
} from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
const screenWidth = Math.round(Dimensions.get("window").width);

const screenHeight = Math.round(Dimensions.get("window").height);


const styles = StyleSheet.create({
  Button: {
    borderRadius: 20,
    backgroundColor: "#0C9344",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    height: 50,
    padding: 10,
  },

  ButtonText: {
    fontSize: 16,
    fontWeight: "500",
    fontStyle: "normal",
    color: "#ffffff",
    textAlign:'center'
  },
  circle: {
    //   flex:1,
    height: 48,
    width: 48,
    borderRadius: 30,
    backgroundColor:'#ffffff',
    justifyContent:'center',
    alignItems:'center',
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  }

});

export default function BackBtn({
  disabled = false,
  onPress,
  text,
  textStyle = {},
  processing= false,
  buttonWidth
})


{

//   applyWidth =  buttonWidth ?  {width:buttonWidth} : {alignSelf:'stretch'};

  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={[styles.circle ]}
    >
      
        {/* <Text style={styles.ButtonText}>
          Processing <ActivityIndicator size="small" color="#ffffff" />
        </Text> */}
        <Ionicons 
        name="chevron-back-outline" 
        size={35}
        />
      
      
    </TouchableOpacity>
  );
}
