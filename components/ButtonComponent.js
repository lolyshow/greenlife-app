import React from "react";
import { View, Button, StyleSheet, TouchableOpacity, Text } from "react-native";

const ButtonComponent = ({ onPress, textinput, size, buttonWidth, backgroundColor,borderRadius,textColor,borderWidth,borderColors,boldText }) => (
    
    
    <TouchableOpacity
      onPress={onPress}
      style={{width:buttonWidth?buttonWidth:100,backgroundColor:backgroundColor,borderRadius:borderRadius,height:40,justifyContent:'center',borderWidth:1,borderColor:borderColors,}}
    >

      {console.log("thisIsTitlefd",boldText)}
      <Text style={[styles.appButtonText, {color:textColor, fontWeight:boldText?boldText:'normal', fontSize: 12,}]}>
        {textinput}
      </Text>
    </TouchableOpacity>
  );

  const styles = StyleSheet.create({
    // ...
    appButtonContainer: {
      elevation: 8,
      backgroundColor: "#009688",
      borderRadius: 10,
      paddingVertical: 10,
      paddingHorizontal: 12,
      
    },
    appButtonText: {
      fontSize: 18,
      // fontWeight: "bold",
      alignSelf: "center",
      textTransform: "uppercase"
    }
  });

  export default ButtonComponent;