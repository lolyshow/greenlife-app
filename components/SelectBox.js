import React from "react";
import { StyleSheet, ScrollView, Platform, TouchableWithoutFeedback, Keyboard, Text, View, KeyboardAvoidingView } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import Ionicons from "react-native-vector-icons/Ionicons";


export default function SelectBox({
  items,
  value,
  onValueChange,
  placeholder,
  disabled = false,
  inputAndroid,
  inputIOS,
  iconName = "chevron-down-outline",
  iconColor = "gray",
  iconSize = 20,
  inputWidth,
  inputLabel,
  inputLabelColor = { color: "black" },
  inputWrapperStyle = styles.inputWrapper,
  inputBackGround = { backgroundColor:null }
}) {

  applyWidth = inputWidth ? { width: inputWidth } : { alignSelf: 'stretch' };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"} >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={inputWrapperStyle}>
          <Text style={[inputLabelColor, styles.inputLabel]}>{inputLabel}</Text>
          <ScrollView style = {{borderWidth:1,borderColor:'#979797',borderRadius:8}}>
            <RNPickerSelect
              placeholder={placeholder}
              items={items}
              onValueChange={onValueChange}
              disabled={disabled}
              style={{
                
                inputAndroid: [styles.inputAndroid, inputAndroid, applyWidth, inputBackGround],
                inputIOS: [styles.inputIOS, inputIOS, applyWidth, inputBackGround],
                iconContainer:
                  Platform.OS == "android"
                    ? styles.iconContainerAndroid
                    : styles.iconContainerIOS,
              }}
              value={value}
              useNativeAndroidPickerStyle={false}
              Icon={() => {
                return <Ionicons name="chevron-down" size={20} color="black" />;
              }}
            />
          </ScrollView>

        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({

  inputWrapper: {
    flexDirection: "column",
  },


  inputLabel: {
    fontSize: 14,
    fontWeight: "500",
    fontStyle: "normal",
    lineHeight: 21,
    letterSpacing: 0,
    textAlign: "left",
    marginBottom: 5,
    
  },


  inputIOS: {

    height: 50,
    borderRadius: 10,
    padding: 10,
    color: "#17375e",

  },
  inputAndroid: {
    height: 50,
    borderRadius: 10,
    padding: 10,
    color: "#17375e",
  },
  iconContainerAndroid: {
    right: 10,
    bottom: 10,
  },
  iconContainerIOS: {
    bottom: 10,
    right: 10,
  },
});
