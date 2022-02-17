import React from "react";
import {
  Text,
  View,
  Keyboard,
  TouchableWithoutFeedback,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

const styles = StyleSheet.create({
  inputWrapper: {
    // flexDirection: "column",
    borderWidth:1,
    borderRadius:10,
    borderColor:'#979797',
  },

  inputLabel: {
    fontSize: 14,
    fontWeight: "500",
    fontStyle: "normal",
    lineHeight: 21,

    letterSpacing: 0,
    textAlign: "left",
    color: "#707070",
    marginBottom: 5,
  },

  line155: {
    height: 50,
    borderRadius: 10,
    backgroundColor: "#f7f7f7",
    padding: 10,
    color: "#17375e",
  },
});

export default function InputBox({
  inputWidth,
  inputStyle = {},
  inputWrapperStyle = {},
  inputLabelStyle = {},
  inputLabel,
  onChangeText,
  placeholder,
  placeholderTextColor,
  background,
  inputValue,
  keyboardType = "default",
  borderWidth,
  editable = true,
  multiline = false,
  textColor,
  secureTextEntry = false,
  maxLength = Number.MAX_SAFE_INTEGER,
}) {
  applyWidth = inputWidth ? { width: inputWidth } : { alignSelf: "stretch" };
  placeholderTextColor = placeholderTextColor? placeholderTextColor: "#707070"
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      // behavior="position"
      // keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={[ inputWrapperStyle]}>
          <Text style={[styles.inputLabel, {color:textColor?textColor:'#707070'}, inputLabelStyle]}>{inputLabel?inputLabel:""}</Text>
          <View style = {styles.inputWrapper}>  
            <TextInput
              keyboardType={keyboardType}
              onChangeText={onChangeText}
              placeholder={placeholder}
              secureTextEntry={secureTextEntry}
              value={inputValue}
              editable={editable}
              multiline={multiline}
              maxLength={maxLength}
              placeholderTextColor={placeholderTextColor}
              style={[
                styles.line155,
                {backgroundColor:background?background:"#f7f7f7"},
                inputStyle,
                applyWidth,
                editable == false && { backgroundColor: "#eff6ff" },
                multiline && { height: 80 },
              ]}
            ></TextInput>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
