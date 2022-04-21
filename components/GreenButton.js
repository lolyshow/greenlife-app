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
    backgroundColor: "#0C9344",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    height: 50,
    padding: 10,
  },

  ButtonText: {
    fontSize: 18,
    fontWeight: "500",
    fontStyle: "normal",
    fontWeight:'bold',
    color: "#ffffff",
    textAlign:'center',
    

  },
});

export default function GreenButton({
  disabled = false,
  onPress,
  text,
  textStyle = {},
  processing= false,
  buttonWidth,
  borderR,
  backgroundCol,
  borderC,
  borderW,
})


{

  applyWidth =  buttonWidth ?  {width:buttonWidth} : {alignSelf:'stretch'};

  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={[styles.Button,
      {borderRadius:borderR?borderR:20, 
      backgroundColor:backgroundCol?backgroundCol:"#0C9344",
      borderColor:borderC?borderC:null,borderWidth:borderW?borderW:null}
      , applyWidth ]}
    >
      {processing ? (
        <Text style={styles.ButtonText}>
          Processing <ActivityIndicator size="small" color="#ffffff" />
        </Text>
      ) : (
        <Text style={[styles.ButtonText, textStyle]}>{text}</Text>
      )}
    </TouchableOpacity>
  );
}
