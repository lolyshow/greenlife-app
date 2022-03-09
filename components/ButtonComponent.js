import React from "react";
import { View, Button, StyleSheet, TouchableOpacity, Text,ActivityIndicator } from "react-native";

const ButtonComponent = ({ onPress, textinput, size, buttonWidth, backgroundColor,borderRadius,textColor,borderWidth,borderColors,boldText,processing,btnHeight=40 }) => (
    
    
    <TouchableOpacity
      onPress={onPress}
      disabled={processing}
      style={{width:buttonWidth?buttonWidth:100,backgroundColor:backgroundColor,borderRadius:borderRadius,height:btnHeight,justifyContent:'center',borderWidth:1,borderColor:borderColors,}}
    >

      {/* {console.log("thisIsTitlefd",boldText)} */}
      {processing ? (
        <Text style={styles.ButtonText}>
          Processing <ActivityIndicator size="small" color="#ffffff" />
        </Text>
      ):(
      <Text style={[styles.appButtonText, {color:textColor, fontWeight:boldText?boldText:'normal', fontSize: 12,}]}>
        {textinput}
      </Text>
      )}
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
    },
    ButtonText: {
      fontSize: 16,
      fontWeight: "500",
      fontStyle: "normal",
      color: "#ffffff",
      textAlign:'center'
    },
  });

  export default ButtonComponent;