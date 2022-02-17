import React from "react";
import { View, Button, StyleSheet, TouchableOpacity, Text } from "react-native";
import SelectDropdown from 'react-native-select-dropdown';
import RNPickerSelect from 'react-native-picker-select';

const Items = [
    { label: 'Football', value: 'football' },
    { label: 'Baseball', value: 'baseball' },
    { label: 'Hockey', value: 'hockey' },
];

const SelectBoxXXX = ({ onPress, textinput, size, backgroundColor,borderRadius,textColor,borderWidth,borderColors }) => (
    
    
    <View style={{width:100}}>
        <RNPickerSelect
            onValueChange={(value) => console.log(value)}
            items={Items}
            useNativeAndroidPickerStyle={false}
        />
        
    </View>
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

  export default SelectBoxXXX;