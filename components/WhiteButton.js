import React from "react";

import {
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

const screenWidth = Math.round(Dimensions.get("window").width);

const screenHeight = Math.round(Dimensions.get("window").height);


const styles = StyleSheet.create({
  Button: {
    borderRadius: 20,
    // backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
    height:50,
    padding: 10,
    
  },

  ButtonText: {
    fontSize: 16,
    fontWeight: "500",
    fontStyle: "normal",
     color: "white",
     textAlign:'center'
  },
});


export default function WhiteButton({
  disabled = false,
  onPress,
  text,
  textStyle = {},
  processing= false,
  buttonWidth,
  bordered
})


{

  applyWidth =  buttonWidth ?  {width:buttonWidth} : {alignSelf:'stretch'};

  applyBorder =  bordered ? {  borderColor: "white",borderWidth: 3} :{}

  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={[styles.Button, applyWidth ,applyBorder]}
    >
      {processing ? (
        <Text style={styles.ButtonText}>
          Processing <ActivityIndicator size="small"  color= "#0C9344" />
        </Text>
      ) : (
        <Text style={[styles.ButtonText, textStyle]}>{text}</Text>
      )}
    </TouchableOpacity>
  );
}
